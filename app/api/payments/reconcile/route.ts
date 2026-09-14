import {NextRequest,NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {reconcileCashfreePayment} from '@/lib/payments';
import {cronAuthorized} from '@/lib/cron';

export const dynamic='force-dynamic';

export async function POST(req:NextRequest){
 if(!cronAuthorized(req)){
  return NextResponse.json({error:'Unauthorized'},{status:401,headers:{'Cache-Control':'no-store'}});
 }

 const cutoffMinutes=Math.max(2,Math.min(120,Number(process.env.PAYMENT_RECONCILE_MIN_AGE_MINUTES||5)));
 const cutoff=new Date(Date.now()-cutoffMinutes*60_000);
 const pending=await db.payment.findMany({
  where:{status:{in:['CREATED','PENDING']},createdAt:{lt:cutoff}},
  select:{cfOrderId:true,status:true,createdAt:true},
  orderBy:{createdAt:'asc'},
  take:50,
 });

 let paid=0,stillPending=0,failed=0,errors=0;
 const samples:{orderId:string;before:string;after:string;remoteStatus:string}[]=[];

 for(let i=0;i<pending.length;i+=5){
  const batch=pending.slice(i,i+5);
  const results=await Promise.allSettled(batch.map(async payment=>{
   const result=await reconcileCashfreePayment(payment.cfOrderId);
   return {payment,result};
  }));

  for(const result of results){
   if(result.status==='rejected'){
    errors++;
    console.error('[payment-reconcile]',result.reason instanceof Error?result.reason.message:'unknown');
    continue;
   }
   const {payment,result:state}=result.value;
   if(!state)continue;
   if(state.status==='PAID')paid++;
   else if(state.status==='PENDING')stillPending++;
   else failed++;
   if(samples.length<10){
    samples.push({orderId:payment.cfOrderId,before:payment.status,after:state.status,remoteStatus:state.remoteStatus});
   }
  }
 }

 return NextResponse.json({
  ok:errors===0,
  checked:pending.length,
  cutoffMinutes,
  paid,
  pending:stillPending,
  failed,
  errors,
  samples,
 },{status:errors===0?200:207,headers:{'Cache-Control':'no-store'}});
}
