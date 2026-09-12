import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {assertSameOrigin,cleanText,randomToken} from '@/lib/security';
import {providerAdd,ProviderError} from '@/lib/provider';

const orderInput=z.object({serviceId:z.string().min(1).max(100),link:z.string().url().max(1500),quantity:z.number().int().positive().max(100_000_000)});

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

export async function POST(req:NextRequest){
 try{
  assertSameOrigin(req);
  const user=await getUser();
  if(!user)return NextResponse.json({error:'Sign in required'},{status:401});

  const recent=await db.order.count({where:{userId:user.id,createdAt:{gte:new Date(Date.now()-5*60*1000)}}});
  if(recent>=10)return NextResponse.json({error:'Too many order attempts. Please wait a few minutes.'},{status:429});

  const input=orderInput.parse(await req.json());
  const service=await db.service.findFirst({where:{id:input.serviceId,active:true}});
  if(!service)return NextResponse.json({error:'This service is not currently available.'},{status:404});
  if(input.quantity<service.min||input.quantity>service.max)return NextResponse.json({error:`Quantity must be between ${service.min.toLocaleString('en-IN')} and ${service.max.toLocaleString('en-IN')}.`},{status:400});

  const charge=BigInt(Math.ceil(Number(service.retailRatePaisePerThousand)*input.quantity/1000));
  const providerCost=BigInt(Math.ceil(Number(service.providerRatePaisePerThousand)*input.quantity/1000));
  const publicId=`MG${Date.now().toString(36).toUpperCase()}${randomToken(3).toUpperCase()}`;
  let orderId='';

  await db.$transaction(async tx=>{
   const debited=await tx.user.updateMany({where:{id:user.id,walletPaise:{gte:charge}},data:{walletPaise:{decrement:charge}}});
   if(debited.count!==1)throw new Error('INSUFFICIENT');
   const updated=await tx.user.findUniqueOrThrow({where:{id:user.id},select:{walletPaise:true}});
   const order=await tx.order.create({data:{publicId,userId:user.id,serviceId:service.id,link:cleanText(input.link,1500),quantity:input.quantity,chargedPaise:charge,providerCostPaise:providerCost,status:'QUEUED',providerStatus:'Submitting'}});
   orderId=order.id;
   await tx.walletLedger.create({data:{userId:user.id,type:'ORDER_DEBIT',amountPaise:-charge,balanceAfterPaise:updated.walletPaise,orderId:order.id,idempotencyKey:`order:${order.id}:debit`,note:`Order ${publicId}`}});
  },{isolationLevel:'Serializable',maxWait:5_000,timeout:10_000});

  try{
   const remote=await providerAdd(service.providerServiceId,input.link,input.quantity);
   await db.order.update({where:{id:orderId},data:{providerOrderId:remote.order,status:'PROCESSING',providerStatus:'Pending'}});
  }catch(error){
   const providerError=error instanceof ProviderError?error:new ProviderError('Provider is temporarily unavailable',true);
   if(providerError.retryable){
    await db.order.update({where:{id:orderId},data:{status:'QUEUED',providerStatus:'Submission confirmation pending'}}).catch(()=>undefined);
    console.error('Provider submission uncertain',providerError.message);
    return NextResponse.json({ok:true,publicId,status:'QUEUED',message:'Your order is being reviewed because the supplier confirmation was delayed. Your wallet has not been charged twice.'},{status:202});
   }
   await refundDefinitiveProviderFailure(orderId);
   return NextResponse.json({error:'The supplier rejected this order. Your wallet was restored automatically.'},{status:502});
  }

  return NextResponse.json({ok:true,publicId,status:'PROCESSING'});
 }catch(error){
  if((error as Error)?.message==='INSUFFICIENT')return NextResponse.json({error:'Your wallet balance is too low for this order.'},{status:402});
  if(error instanceof z.ZodError)return NextResponse.json({error:'Please check the service, link and quantity.'},{status:400});
  console.error('Order creation failed',error instanceof Error?error.message:'unknown');
  return NextResponse.json({error:'Unable to place the order right now.'},{status:500});
 }
}
