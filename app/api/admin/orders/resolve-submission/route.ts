import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {db} from '@/lib/db';
import {requireAdminApi} from '@/lib/admin-ops';
import {reconcileProviderOrder} from '@/lib/order-reconciliation';

const Body=z.discriminatedUnion('action',[
 z.object({action:z.literal('attach'),publicId:z.string().min(1).max(80),providerOrderId:z.string().min(1).max(120)}),
 z.object({action:z.literal('refund'),publicId:z.string().min(1).max(80)}),
]);
const REVIEW_AGE_MS=2*60_000;

function reviewable(order:{status:string;providerOrderId:string|null;createdAt:Date}){
 return order.status==='QUEUED'&&!order.providerOrderId&&Date.now()-order.createdAt.getTime()>=REVIEW_AGE_MS;
}

export async function POST(req:NextRequest){
 try{
  const admin=await requireAdminApi(req);
  if(!admin)return NextResponse.json({error:'Not found'},{status:404});
  const input=Body.parse(await req.json());
  const publicId=input.publicId.trim();

  if(input.action==='attach'){
   const providerOrderId=input.providerOrderId.trim();
   const result=await db.$transaction(async tx=>{
    const order=await tx.order.findUnique({where:{publicId},select:{id:true,publicId:true,status:true,providerOrderId:true,providerStatus:true,createdAt:true}});
    if(!order)throw new Error('ORDER_NOT_FOUND');
    if(!reviewable(order))throw new Error('ORDER_NOT_REVIEWABLE');
    const duplicate=await tx.order.findFirst({where:{providerOrderId,NOT:{id:order.id}},select:{publicId:true}});
    if(duplicate)throw new Error('PROVIDER_ORDER_ALREADY_USED');
    await tx.order.update({where:{id:order.id},data:{providerOrderId,status:'PROCESSING',providerStatus:'Supplier order verified by operator'}});
    await tx.adminAuditLog.create({data:{adminEmail:admin.email.trim().toLowerCase(),action:'UNCERTAIN_ORDER_ATTACHED',entityType:'Order',entityId:order.publicId,before:{status:order.status,providerOrderId:null,providerStatus:order.providerStatus},after:{status:'PROCESSING',providerOrderId,providerStatus:'Supplier order verified by operator'}}});
    return {id:order.id};
   },{isolationLevel:'Serializable',maxWait:5_000,timeout:10_000});
   await reconcileProviderOrder(result.id).catch(error=>console.warn('[uncertain-order-reconcile]',error instanceof Error?error.message:'failed'));
   return NextResponse.json({ok:true,action:'attach'},{headers:{'Cache-Control':'no-store'}});
  }

  await db.$transaction(async tx=>{
   const order=await tx.order.findUnique({where:{publicId},select:{id:true,publicId:true,userId:true,status:true,providerOrderId:true,providerStatus:true,chargedPaise:true,createdAt:true}});
   if(!order)throw new Error('ORDER_NOT_FOUND');
   if(!reviewable(order))throw new Error('ORDER_NOT_REVIEWABLE');
   const key=`order:${order.id}:refund-uncertain-admin`;
   const existing=await tx.walletLedger.findUnique({where:{idempotencyKey:key}});
   if(existing)throw new Error('ORDER_ALREADY_RESOLVED');
   await tx.user.update({where:{id:order.userId},data:{walletPaise:{increment:order.chargedPaise}}});
   const user=await tx.user.findUniqueOrThrow({where:{id:order.userId},select:{walletPaise:true}});
   await tx.order.update({where:{id:order.id},data:{status:'REFUNDED',providerStatus:'Supplier submission could not be verified; operator refund issued'}});
   await tx.walletLedger.create({data:{userId:order.userId,type:'ORDER_REFUND',amountPaise:order.chargedPaise,balanceAfterPaise:user.walletPaise,orderId:order.id,idempotencyKey:key,note:'Operator refund: uncertain supplier submission'}});
   await tx.adminAuditLog.create({data:{adminEmail:admin.email.trim().toLowerCase(),action:'UNCERTAIN_ORDER_REFUNDED',entityType:'Order',entityId:order.publicId,before:{status:order.status,providerOrderId:null,providerStatus:order.providerStatus},after:{status:'REFUNDED',refundPaise:Number(order.chargedPaise)}}});
  },{isolationLevel:'Serializable',maxWait:5_000,timeout:10_000});
  return NextResponse.json({ok:true,action:'refund'},{headers:{'Cache-Control':'no-store'}});
 }catch(error:any){
  if(error?.issues)return NextResponse.json({error:'Invalid request'},{status:400});
  const message=error instanceof Error?error.message:'unknown';
  if(message==='ORDER_NOT_FOUND')return NextResponse.json({error:'Order not found'},{status:404});
  if(message==='ORDER_NOT_REVIEWABLE'||message==='ORDER_ALREADY_RESOLVED')return NextResponse.json({error:'This order has already moved to another state. Refresh before acting.'},{status:409});
  if(message==='PROVIDER_ORDER_ALREADY_USED')return NextResponse.json({error:'That supplier order ID is already attached to another MANGLO order.'},{status:409});
  console.error('[admin-uncertain-order]',message);
  return NextResponse.json({error:'Unable to resolve this submission safely.'},{status:500});
 }
}
