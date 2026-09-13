import {randomUUID} from 'crypto';
import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {createCashfreeOrder,cashfreeMode} from '@/lib/cashfree';
import {assertSameOrigin} from '@/lib/security';
import {recordAnalytics} from '@/lib/analytics';

const Schema=z.object({amount:z.number().finite().min(10).max(50000)});

export async function POST(req:NextRequest){
 try{
  assertSameOrigin(req);
  const user=await getUser();
  if(!user)return NextResponse.json({error:'Sign in required'},{status:401});
  if(!user.phone)return NextResponse.json({error:'Add a phone number first'},{status:400});

  const {amount}=Schema.parse(await req.json());
  const amountPaise=Math.round(amount*100);
  if(Math.abs(amount*100-amountPaise)>0.000001){
   return NextResponse.json({error:'Use at most two decimal places.'},{status:400});
  }

  const since=new Date(Date.now()-10*60*1000);
  const recentAttempts=await db.payment.count({where:{userId:user.id,createdAt:{gte:since}}});
  if(recentAttempts>=8){
   return NextResponse.json({error:'Too many payment attempts. Please wait a few minutes and try again.'},{status:429});
  }

  const pendingAttempts=await db.payment.count({where:{userId:user.id,status:{in:['CREATED','PENDING']},createdAt:{gte:new Date(Date.now()-30*60*1000)}}});
  if(pendingAttempts>=4){
   return NextResponse.json({error:'You already have several pending payment attempts. Please complete or wait for them to expire.'},{status:429});
  }

  const orderId=`MGW_${Date.now()}_${randomUUID().replace(/-/g,'').slice(0,8)}`;
  await db.payment.create({data:{userId:user.id,cfOrderId:orderId,amountPaise:BigInt(amountPaise),status:'CREATED'}});

  try{
   const cf=await createCashfreeOrder({
    orderId,
    amountPaise,
    userId:user.id,
    name:user.name,
    email:user.email,
    phone:user.phone,
   });
   await db.payment.update({where:{cfOrderId:orderId},data:{status:'PENDING',rawStatus:String(cf?.order_status||'ACTIVE')}});
   await recordAnalytics({event:'WALLET_TOPUP_STARTED',userId:user.id,path:'/dashboard',uniqueKey:`payment:${orderId}:started`,metadata:{amountPaise}});
   return NextResponse.json({paymentSessionId:cf.payment_session_id,orderId,mode:cashfreeMode});
  }catch(error){
   await db.payment.update({where:{cfOrderId:orderId},data:{status:'FAILED',rawStatus:'CREATE_ORDER_FAILED'}}).catch(()=>undefined);
   console.error('Cashfree create order error',error instanceof Error?error.message:'unknown');
   return NextResponse.json({error:'Unable to start secure payment right now. Please try again shortly.'},{status:502});
  }
 }catch(error){
  if(error instanceof z.ZodError)return NextResponse.json({error:'Invalid top-up amount.'},{status:400});
  console.error('Payment create request error',error instanceof Error?error.message:'unknown');
  return NextResponse.json({error:'Unable to start payment.'},{status:400});
 }
}
