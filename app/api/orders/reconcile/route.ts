import {NextRequest,NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {reconcileProviderOrder} from '@/lib/order-reconciliation';
import {cronAuthorized} from '@/lib/cron';

export const dynamic='force-dynamic';

export async function POST(req:NextRequest){
 if(!cronAuthorized(req)){
  return NextResponse.json({error:'Unauthorized'},{status:401,headers:{'Cache-Control':'no-store'}});
 }

 const orders=await db.order.findMany({
  where:{status:{in:['QUEUED','PROCESSING']},providerOrderId:{not:null}},
  select:{id:true},orderBy:{updatedAt:'asc'},take:100,
 });
 let reconciled=0,failed=0;
 for(let i=0;i<orders.length;i+=10){
  const batch=orders.slice(i,i+10);
  const results=await Promise.allSettled(batch.map(order=>reconcileProviderOrder(order.id)));
  for(const result of results){
   if(result.status==='fulfilled')reconciled++;
   else failed++;
  }
 }
 return NextResponse.json({ok:failed===0,checked:orders.length,reconciled,failed},{status:failed===0?200:207,headers:{'Cache-Control':'no-store'}});
}
