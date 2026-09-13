import {db} from './db';
import {getCashfreeOrder,getCashfreeOrderPayments} from './cashfree';
import {recordAnalytics} from './analytics';

const terminalAttempts=new Set(['FAILED','USER_DROPPED','VOID','CANCELLED']);
const nonTerminalAttempts=new Set(['PENDING','NOT_ATTEMPTED','FLAGGED']);

function attemptTime(attempt:Record<string,unknown>){
 const raw=String(attempt.payment_completion_time||attempt.payment_time||'');
 const value=Date.parse(raw);
 return Number.isFinite(value)?value:0;
}

async function classifyActiveOrder(orderId:string){
 try{
  const attempts=await getCashfreeOrderPayments(orderId);
  if(attempts.length===0)return {status:'PENDING' as const,rawStatus:'ACTIVE'};

  const statuses=attempts.map(attempt=>String(attempt.payment_status||'UNKNOWN').toUpperCase());
  if(statuses.includes('SUCCESS')){
   return {status:'PENDING' as const,rawStatus:'PAYMENT_SUCCESS_WAITING_ORDER'};
  }
  if(statuses.some(status=>nonTerminalAttempts.has(status))){
   return {status:'PENDING' as const,rawStatus:'PAYMENT_PENDING'};
  }

  const latest=[...attempts].sort((a,b)=>attemptTime(b)-attemptTime(a))[0];
  const latestStatus=String(latest?.payment_status||'ACTIVE').toUpperCase();
  if(terminalAttempts.has(latestStatus))return {status:'FAILED' as const,rawStatus:latestStatus};
  return {status:'PENDING' as const,rawStatus:'ACTIVE'};
 }catch(error){
  console.warn('[cashfree-attempts]',error instanceof Error?error.message:'unknown');
  return {status:'PENDING' as const,rawStatus:'ACTIVE'};
 }
}

export async function reconcileCashfreePayment(orderId:string){
 const local=await db.payment.findUnique({where:{cfOrderId:orderId}});
 if(!local)return null;

 if(local.status==='PAID')return {status:'PAID' as const,remoteStatus:local.rawStatus||'PAID'};

 const remote=await getCashfreeOrder(orderId);
 const remoteStatus=String(remote?.order_status||'UNKNOWN').toUpperCase();
 const remoteCurrency=String(remote?.order_currency||'');
 const remoteAmount=Number(remote?.order_amount);
 if(!Number.isFinite(remoteAmount))throw new Error('Cashfree returned an invalid order amount');
 const remotePaise=BigInt(Math.round(remoteAmount*100));

 if(remoteStatus==='PAID'&&(remoteCurrency!=='INR'||remotePaise!==local.amountPaise)){
  throw new Error('Payment verification mismatch');
 }

 if(remoteStatus!=='PAID'){
  let status:'PENDING'|'FAILED'=remoteStatus==='ACTIVE'?'PENDING':'FAILED';
  let rawStatus=remoteStatus;
  if(remoteStatus==='ACTIVE'){
   const classified=await classifyActiveOrder(orderId);
   status=classified.status;
   rawStatus=classified.rawStatus;
  }
  await db.payment.updateMany({where:{id:local.id,status:{not:'PAID'}},data:{status,rawStatus}});
  return {status,remoteStatus:rawStatus};
 }

 let credited=false;
 await db.$transaction(async tx=>{
  const claimed=await tx.payment.updateMany({where:{id:local.id,status:{not:'PAID'}},data:{status:'PAID',rawStatus:'PAID'}});
  if(claimed.count===0)return;
  credited=true;

  const user=await tx.user.update({where:{id:local.userId},data:{walletPaise:{increment:local.amountPaise}},select:{walletPaise:true}});
  await tx.walletLedger.create({data:{userId:local.userId,type:'DEPOSIT',amountPaise:local.amountPaise,balanceAfterPaise:user.walletPaise,paymentId:local.id,idempotencyKey:`cashfree:${local.cfOrderId}:deposit`,note:'Cashfree wallet top-up'}});
 });

 if(credited)await recordAnalytics({event:'WALLET_TOPUP_PAID',userId:local.userId,path:'/dashboard',uniqueKey:`payment:${local.cfOrderId}:paid`,metadata:{amountPaise:Number(local.amountPaise)}});
 return {status:'PAID' as const,remoteStatus};
}
