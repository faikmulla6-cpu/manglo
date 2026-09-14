import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {assertSameOrigin,cleanText,randomToken} from '@/lib/security';

const S=z.object({orderId:z.string().max(40).optional(),category:z.enum(['Order not started','Order stopped','Partial delivery','Refill request','Wrong link','Payment issue','Account issue']),subject:z.string().min(4).max(120),message:z.string().min(10).max(3000)});

export async function POST(req:NextRequest){
 try{
  assertSameOrigin(req);
  const user=await getUser();if(!user)return NextResponse.json({error:'Sign in required'},{status:401});
  const x=S.parse(await req.json());
  const [recent,open]=await Promise.all([
   db.supportTicket.count({where:{userId:user.id,createdAt:{gte:new Date(Date.now()-30*60_000)}}}),
   db.supportTicket.count({where:{userId:user.id,status:{in:['OPEN','IN_REVIEW']}}}),
  ]);
  if(recent>=5||open>=10)return NextResponse.json({error:'You already have several recent support requests. Please wait for the current queue to be reviewed.'},{status:429});
  if(x.orderId){
   const order=await db.order.findFirst({where:{publicId:x.orderId,userId:user.id},select:{id:true}});
   if(!order)return NextResponse.json({error:'Order number not found in your account'},{status:400});
  }
  const publicId=`MGS${Date.now().toString(36).toUpperCase()}${randomToken(3).toUpperCase()}`;
  await db.supportTicket.create({data:{publicId,userId:user.id,orderId:x.orderId||null,category:x.category,subject:cleanText(x.subject,120),message:cleanText(x.message,3000)}});
  return NextResponse.json({ok:true,publicId},{headers:{'Cache-Control':'no-store'}});
 }catch(e:any){
  return NextResponse.json({error:e?.issues?'Please check the form':'Unable to open support request'},{status:400});
 }
}
