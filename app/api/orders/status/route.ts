import {NextRequest,NextResponse} from 'next/server';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {reconcileProviderOrder} from '@/lib/order-reconciliation';

const ACTIVE=new Set(['QUEUED','PROCESSING']);
const MIN_RECONCILE_INTERVAL_MS=15_000;
function response(body:unknown,status=200){return NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}})}

export async function GET(req:NextRequest){
 const user=await getUser();
 if(!user)return response({error:'Unauthorized'},401);
 const publicId=req.nextUrl.searchParams.get('id')?.trim()||'';
 if(!publicId||publicId.length>80)return response({error:'Not found'},404);
 const order=await db.order.findFirst({where:{publicId,userId:user.id},select:{id:true,status:true,providerStatus:true,providerOrderId:true,startCount:true,remains:true,updatedAt:true}});
 if(!order)return response({error:'Not found'},404);
 const local={status:order.status,providerStatus:order.providerStatus,startCount:order.startCount,remains:order.remains};
 if(!order.providerOrderId||!ACTIVE.has(order.status))return response(local);
 if(Date.now()-order.updatedAt.getTime()<MIN_RECONCILE_INTERVAL_MS)return response(local);
 try{
  const result=await reconcileProviderOrder(order.id);
  return response(result||local);
 }catch(error){
  console.error('Provider status reconciliation failed',error instanceof Error?error.message:'unknown');
  return response(local);
 }
}
