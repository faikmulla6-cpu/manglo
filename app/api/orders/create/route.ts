import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {assertSameOrigin,cleanText,randomToken} from '@/lib/security';
import {providerAdd,ProviderError} from '@/lib/provider';
import {recordAnalytics} from '@/lib/analytics';
import {serviceIsFresh} from '@/lib/catalog-freshness';
import {validateServiceDestination} from '@/lib/service-destination';
import {refreshServiceHealth} from '@/lib/service-health';

const orderInput=z.object({
 serviceId:z.string().min(1).max(100),
 link:z.string().url().max(1500),
 quantity:z.number().int().positive().max(100_000_000),
 expectedChargePaise:z.number().int().nonnegative().max(100_000_000).optional(),
});

function json(requestId:string,body:Record<string,unknown>,status=200){
 return NextResponse.json(body,{status,headers:{'Cache-Control':'no-store','X-Manglo-Request-Id':requestId}});
}

async function refundDefinitiveProviderFailure(orderId:string){
 await db.$transaction(async tx=>{
  const order=await tx.order.findUniqueOrThrow({where:{id:orderId}});
  const key=`order:${order.id}:refund-provider-reject`;
  const existing=await tx.walletLedger.findUnique({where:{idempotencyKey:key}});
  if(existing)return;
  await tx.user.update({where:{id:order.userId},data:{walletPaise:{increment:order.chargedPaise}}});
  const updated=await tx.user.findUniqueOrThrow({where:{id:order.userId},select:{walletPaise:true}});
  await tx.order.update({where:{id:order.id},data:{status:'REFUNDED',providerStatus:'Provider rejected submission'}});
  await tx.walletLedger.create({data:{userId:order.userId,type:'ORDER_REFUND',amountPaise:order.chargedPaise,balanceAfterPaise:updated.walletPaise,orderId:order.id,idempotencyKey:key,note:'Automatic refund: provider rejected order'}});
 });
}

async function resolveService(serviceId:string){
 const requested=serviceId.trim();
 const direct=await db.service.findFirst({where:{id:requested,active:true,operatorDisabled:false}});
 if(direct)return direct;
 const providerServiceId=requested.startsWith('catalog-')?requested.slice('catalog-'.length):requested;
 if(!providerServiceId)return null;
 return db.service.findFirst({where:{provider:'primary',providerServiceId,active:true,operatorDisabled:false}});
}

export async function POST(req:NextRequest){
 const requestId=cleanText(req.headers.get('x-manglo-request-id')||randomToken(8),80);
 try{
  assertSameOrigin(req);
  const user=await getUser();
  if(!user)return json(requestId,{error:'Sign in required'},401);

  const recent=await db.order.count({where:{userId:user.id,createdAt:{gte:new Date(Date.now()-5*60*1000)}}});
  if(recent>=10)return json(requestId,{error:'Too many order attempts. Please wait a few minutes.'},429);

  const input=orderInput.parse(await req.json());
  const service=await resolveService(input.serviceId);
  if(!service)return json(requestId,{error:'This service is not currently available.'},404);
  if(!serviceIsFresh(service.lastSyncedAt))return json(requestId,{error:'Live supplier data for this service is being refreshed. Please try again after the catalog sync completes.',code:'CATALOG_STALE'},503);
  if(input.quantity<service.min||input.quantity>service.max)return json(requestId,{error:`Quantity must be between ${service.min.toLocaleString('en-IN')} and ${service.max.toLocaleString('en-IN')}.`},400);
  const destination=validateServiceDestination(service,input.link);
  if(!destination.ok)return json(requestId,{error:destination.error,code:'DESTINATION_MISMATCH'},400);

  const charge=BigInt(Math.ceil(Number(service.retailRatePaisePerThousand)*input.quantity/1000));
  if(input.expectedChargePaise!==undefined&&BigInt(input.expectedChargePaise)!==charge){
   return json(requestId,{error:'The live service price changed after your quote. Please review the updated price before ordering.',code:'QUOTE_CHANGED',currentChargePaise:Number(charge)},409);
  }
  const providerCost=BigInt(Math.ceil(Number(service.providerRatePaisePerThousand)*input.quantity/1000));
  const publicId=`MG${Date.now().toString(36).toUpperCase()}${randomToken(3).toUpperCase()}`;
  const draft=await db.orderDraft.findUnique({where:{userId:user.id},select:{id:true,serviceId:true,recoveryOpenedAt:true}}).catch(()=>null);
  const recoveredDraft=Boolean(draft?.recoveryOpenedAt&&draft.serviceId===service.id);
  let orderId='';

  await db.$transaction(async tx=>{
   const debited=await tx.user.updateMany({where:{id:user.id,walletPaise:{gte:charge}},data:{walletPaise:{decrement:charge}}});
   if(debited.count!==1)throw new Error('INSUFFICIENT');
   const updated=await tx.user.findUniqueOrThrow({where:{id:user.id},select:{walletPaise:true}});
   const order=await tx.order.create({data:{publicId,userId:user.id,serviceId:service.id,link:cleanText(input.link,1500),quantity:input.quantity,chargedPaise:charge,providerCostPaise:providerCost,status:'QUEUED',providerStatus:'Submitting'}});
   orderId=order.id;
   await tx.walletLedger.create({data:{userId:user.id,type:'ORDER_DEBIT',amountPaise:-charge,balanceAfterPaise:updated.walletPaise,orderId:order.id,idempotencyKey:`order:${order.id}:debit`,note:`Order ${publicId}`}});
  },{isolationLevel:'Serializable',maxWait:5_000,timeout:10_000});

  await db.orderDraft.deleteMany({where:{userId:user.id}}).catch(()=>undefined);
  await recordAnalytics({event:'ORDER_PLACED',userId:user.id,path:'/order',uniqueKey:`order:${orderId}:placed`,metadata:{publicId,serviceId:service.providerServiceId,platform:service.platform,quantity:input.quantity,chargedPaise:Number(charge)}});
  const recordRecovery=()=>recoveredDraft?recordAnalytics({event:'ORDER_RECOVERED',userId:user.id,path:'/order',uniqueKey:`order:${orderId}:recovered`,metadata:{publicId,serviceId:service.providerServiceId,platform:service.platform,quantity:input.quantity,chargedPaise:Number(charge)}}):Promise.resolve(false);

  try{
   const remote=await providerAdd(service.providerServiceId,destination.providerLink,input.quantity);
   await db.order.update({where:{id:orderId},data:{providerOrderId:remote.order,status:'PROCESSING',providerStatus:'Pending'}});
  }catch(error){
   const providerError=error instanceof ProviderError?error:new ProviderError('Provider is temporarily unavailable',true);
   if(providerError.retryable){
    await db.order.update({where:{id:orderId},data:{status:'QUEUED',providerStatus:'Submission uncertain — manual verification required'}}).catch(()=>undefined);
    await recordRecovery();
    console.error(`Provider submission uncertain [${requestId}]`,providerError.message);
    return json(requestId,{ok:true,publicId,status:'QUEUED',message:'Supplier confirmation was interrupted. Your order is safely held for verification and will not be submitted twice.'},202);
   }
   await refundDefinitiveProviderFailure(orderId);
   await refreshServiceHealth(service.id).catch(healthError=>console.error('[service-health]',healthError instanceof Error?healthError.message:'failed'));
   return json(requestId,{error:'The supplier rejected this order. Your wallet was restored automatically.'},502);
  }

  await recordRecovery();
  return json(requestId,{ok:true,publicId,status:'PROCESSING'});
 }catch(error){
  if((error as Error)?.message==='INSUFFICIENT')return json(requestId,{error:'Your wallet balance is too low for this order.'},402);
  if(error instanceof z.ZodError)return json(requestId,{error:'Please check the service, link and quantity.'},400);
  console.error(`Order creation failed [${requestId}]`,error instanceof Error?error.message:'unknown');
  return json(requestId,{error:'Unable to place the order right now.'},500);
 }
}
