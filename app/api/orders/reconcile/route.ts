import {NextRequest,NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {reconcileProviderOrder} from '@/lib/order-reconciliation';

export const dynamic='force-dynamic';

export async function POST(req:NextRequest){
 if(req.headers.get('authorization')!==`Bearer ${process.env.CRON_SECRET}`){
  return NextResponse.json({error:'Unauthorized'},{status:401});
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
 return NextResponse.json({ok:true,checked:orders.length,reconciled,failed},{headers:{'Cache-Control':'no-store'}});
}
