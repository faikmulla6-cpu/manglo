import {NextRequest,NextResponse} from 'next/server';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {reconcileProviderOrder} from '@/lib/order-reconciliation';

export async function GET(req:NextRequest){
 const user=await getUser();
 if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});
 const publicId=req.nextUrl.searchParams.get('id');
 const order=await db.order.findFirst({where:{publicId:publicId||'',userId:user.id},select:{id:true,status:true,providerStatus:true,providerOrderId:true,startCount:true,remains:true}});
 if(!order)return NextResponse.json({error:'Not found'},{status:404});
 if(!order.providerOrderId)return NextResponse.json({status:order.status,providerStatus:order.providerStatus,startCount:order.startCount,remains:order.remains});
 try{
  const result=await reconcileProviderOrder(order.id);
  return NextResponse.json(result||{status:order.status,providerStatus:order.providerStatus});
 }catch(error){
  console.error('Provider status reconciliation failed',error instanceof Error?error.message:'unknown');
  return NextResponse.json({status:order.status,providerStatus:order.providerStatus,startCount:order.startCount,remains:order.remains});
 }
}
