import {db} from './db';
import {getCashfreeOrder} from './cashfree';

export async function reconcileCashfreePayment(orderId:string){
 const local=await db.payment.findUnique({where:{cfOrderId:orderId}});
 if(!local)return null;
 const remote=await getCashfreeOrder(orderId);
 const remoteStatus=String(remote?.order_status||'UNKNOWN');
 const remoteCurrency=String(remote?.order_currency||'');
 const remotePaise=BigInt(Math.round(Number(remote?.order_amount||0)*100));
 if(remoteStatus==='PAID'&&(remoteCurrency!=='INR'||remotePaise!==local.amountPaise))throw new Error('Payment verification mismatch');
 if(remoteStatus!=='PAID'){
  const status=remoteStatus==='ACTIVE'?'PENDING':'FAILED';
  await db.payment.update({where:{id:local.id},data:{status,rawStatus:remoteStatus}});
  return {status,remoteStatus};
 }
 await db.$transaction(async tx=>{
  const payment=await tx.payment.findUniqueOrThrow({where:{id:local.id}});
  if(payment.status==='PAID')return;
  await tx.user.update({where:{id:payment.userId},data:{walletPaise:{increment:payment.amountPaise}}});
  const user=await tx.user.findUniqueOrThrow({where:{id:payment.userId},select:{walletPaise:true}});
  await tx.payment.update({where:{id:payment.id},data:{status:'PAID',rawStatus:'PAID'}});
  await tx.walletLedger.create({data:{userId:payment.userId,type:'DEPOSIT',amountPaise:payment.amountPaise,balanceAfterPaise:user.walletPaise,paymentId:payment.id,idempotencyKey:`cashfree:${payment.cfOrderId}:deposit`,note:'Cashfree wallet top-up'}});
 });
 return {status:'PAID' as const,remoteStatus};
}
