import {NextRequest,NextResponse} from 'next/server';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {reconcileCashfreePayment} from '@/lib/payments';

export async function GET(req:NextRequest){
 const user=await getUser();if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});
 const orderId=req.nextUrl.searchParams.get('order_id');if(!orderId)return NextResponse.json({error:'Missing order_id'},{status:400});
 const payment=await db.payment.findFirst({where:{cfOrderId:orderId,userId:user.id},select:{id:true}});if(!payment)return NextResponse.json({error:'Payment not found'},{status:404});
 try{const result=await reconcileCashfreePayment(orderId);return NextResponse.json(result)}catch{return NextResponse.json({error:'Payment verification is temporarily unavailable.'},{status:502})}
}
