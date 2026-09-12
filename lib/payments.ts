import {db} from './db';
import {getCashfreeOrder} from './cashfree';

export async function reconcileCashfreePayment(orderId:string){
 const local=await db.payment.findUnique({where:{cfOrderId:orderId}});
 if(!local)return null;

 // Once a deposit has been atomically credited, repeated returns/webhooks are a no-op.
 if(local.status==='PAID')return {status:'PAID' as const,remoteStatus:local.rawStatus||'PAID'};

 const remote=await getCashfreeOrder(orderId);
 const remoteStatus=String(remote?.order_status||'UNKNOWN');
 const remoteCurrency=String(remote?.order_currency||'');
 const remoteAmount=Number(remote?.order_amount);
 if(!Number.isFinite(remoteAmount))throw new Error('Cashfree returned an invalid order amount');
 const remotePaise=BigInt(Math.round(remoteAmount*100));

 if(remoteStatus==='PAID'&&(remoteCurrency!=='INR'||remotePaise!==local.amountPaise)){
  throw new Error('Payment verification mismatch');
 }

 if(remoteStatus!=='PAID'){
  const status=remoteStatus==='ACTIVE'?'PENDING':'FAILED';
  await db.payment.updateMany({
   where:{id:local.id,status:{not:'PAID'}},
   data:{status,rawStatus:remoteStatus},
  });
  return {status,remoteStatus};
 }

 await db.$transaction(async tx=>{
  // Claim the payment exactly once before touching the wallet. Concurrent webhook/return
  // requests will see count=0 after the first transaction commits.
  const claimed=await tx.payment.updateMany({
   where:{id:local.id,status:{not:'PAID'}},
   data:{status:'PAID',rawStatus:'PAID'},
  });
  if(claimed.count===0)return;

  const user=await tx.user.update({
   where:{id:local.userId},
   data:{walletPaise:{increment:local.amountPaise}},
   select:{walletPaise:true},
  });

  await tx.walletLedger.create({
   data:{
    userId:local.userId,
    type:'DEPOSIT',
    amountPaise:local.amountPaise,
    balanceAfterPaise:user.walletPaise,
    paymentId:local.id,
    idempotencyKey:`cashfree:${local.cfOrderId}:deposit`,
    note:'Cashfree wallet top-up',
   },
  });
 });

 return {status:'PAID' as const,remoteStatus};
}
