import {db} from './db';
import {providerStatus} from './provider';
import {rewardReferralForCompletedOrder} from './referrals';

const terminalLocalStatuses=new Set(['COMPLETED','PARTIAL','REFUNDED','CANCELED','FAILED']);

function mappedStatus(raw:string){
 const s=raw.toLowerCase();
 if(s.includes('complete'))return 'COMPLETED' as const;
 if(s.includes('partial'))return 'PARTIAL' as const;
 if(s.includes('cancel'))return 'CANCELED' as const;
 if(s.includes('fail')||s.includes('error'))return 'FAILED' as const;
 if(s.includes('process')||s.includes('progress')||s.includes('pending')||s.includes('queue'))return 'PROCESSING' as const;
 return 'PROCESSING' as const;
}

async function refundOrder(orderId:string,amount:bigint,keySuffix:string,note:string){
 if(amount<=0n)return;
 await db.$transaction(async tx=>{
  const order=await tx.order.findUniqueOrThrow({where:{id:orderId}});
  const key=`order:${order.id}:${keySuffix}`;
  const existing=await tx.walletLedger.findUnique({where:{idempotencyKey:key}});
  if(existing)return;
  const refund=amount>order.chargedPaise?order.chargedPaise:amount;
  await tx.user.update({where:{id:order.userId},data:{walletPaise:{increment:refund}}});
  const user=await tx.user.findUniqueOrThrow({where:{id:order.userId},select:{walletPaise:true}});
  await tx.walletLedger.create({data:{userId:order.userId,type:'ORDER_REFUND',amountPaise:refund,balanceAfterPaise:user.walletPaise,orderId:order.id,idempotencyKey:key,note}});
 });
}

export async function reconcileProviderOrder(orderId:string){
 const order=await db.order.findUnique({where:{id:orderId}});
 if(!order)return null;
 if(terminalLocalStatuses.has(order.status)){
  if(order.status==='COMPLETED')await rewardReferralForCompletedOrder(order.id).catch(error=>console.error('[referral-reward]',error instanceof Error?error.message:'failed'));
  return {status:order.status,providerStatus:order.providerStatus,startCount:order.startCount,remains:order.remains};
 }
 if(!order.providerOrderId)return {status:order.status,providerStatus:order.providerStatus,startCount:order.startCount,remains:order.remains};

 const remote=await providerStatus(order.providerOrderId);
 const rawStatus=String(remote?.status||'').trim();
 if(!rawStatus)throw new Error('Provider status response is missing a status');
 const status=mappedStatus(rawStatus);
 const remainsValue=Number(remote?.remains);
 const remains=Number.isFinite(remainsValue)?Math.max(0,Math.min(order.quantity,Math.trunc(remainsValue))):undefined;
 const startCount=remote?.start_count!==undefined&&remote?.start_count!==null?String(remote.start_count):undefined;

 if(status==='CANCELED'||status==='FAILED'){
  await refundOrder(order.id,order.chargedPaise,`refund-${status.toLowerCase()}`,`Automatic refund: provider ${status.toLowerCase()}`);
  await db.order.update({where:{id:order.id},data:{status:'REFUNDED',providerStatus:rawStatus,startCount,remains}});
  return {status:'REFUNDED' as const,providerStatus:rawStatus,startCount,remains};
 }

 if(status==='PARTIAL'&&remains!==undefined&&remains>0){
  const numerator=order.chargedPaise*BigInt(remains);
  const refund=(numerator+BigInt(order.quantity)-1n)/BigInt(order.quantity);
  await refundOrder(order.id,refund,'refund-partial',`Automatic partial refund: ${remains.toLocaleString('en-IN')} undelivered`);
 }

 await db.order.update({where:{id:order.id},data:{status,providerStatus:rawStatus,startCount,remains}});
 if(status==='COMPLETED')await rewardReferralForCompletedOrder(order.id).catch(error=>console.error('[referral-reward]',error instanceof Error?error.message:'failed'));
 return {status,providerStatus:rawStatus,startCount,remains};
}
