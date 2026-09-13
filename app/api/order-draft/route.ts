import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {recordAnalytics} from '@/lib/analytics';
import {assertSameOrigin,cleanText} from '@/lib/security';

const DraftInput=z.object({
 serviceId:z.string().min(1).max(100),
 quantity:z.number().int().positive().max(100_000_000),
 link:z.string().url().max(1500).refine(value=>{try{const url=new URL(value);return url.protocol==='http:'||url.protocol==='https:'}catch{return false}},'Use a public http(s) URL'),
});
const TTL_MS=14*24*60*60*1000;
const ABANDONED_MS=30*60*1000;

async function cleanupExpired(userId:string){
 await db.orderDraft.deleteMany({where:{userId,expiresAt:{lte:new Date()}}}).catch(()=>undefined);
}

export async function GET(){
 const user=await getUser();
 if(!user)return NextResponse.json({error:'Sign in required'},{status:401,headers:{'Cache-Control':'no-store'}});
 await cleanupExpired(user.id);
 const draft=await db.orderDraft.findUnique({where:{userId:user.id},include:{service:{select:{id:true,name:true,platform:true,active:true,operatorDisabled:true}}}});
 if(!draft||!draft.service.active||draft.service.operatorDisabled){
  if(draft)await db.orderDraft.delete({where:{id:draft.id}}).catch(()=>undefined);
  return NextResponse.json({draft:null},{headers:{'Cache-Control':'no-store'}});
 }
 const abandoned=Date.now()-draft.updatedAt.getTime()>=ABANDONED_MS;
 return NextResponse.json({draft:{serviceId:draft.serviceId,service:draft.service.name,platform:draft.service.platform,quantity:draft.quantity,updatedAt:draft.updatedAt.toISOString(),expiresAt:draft.expiresAt.toISOString(),abandoned}},{headers:{'Cache-Control':'no-store'}});
}

export async function POST(req:NextRequest){
 try{
  assertSameOrigin(req);
  const user=await getUser();if(!user)return NextResponse.json({error:'Sign in required'},{status:401});
  const input=DraftInput.parse(await req.json());
  const service=await db.service.findFirst({where:{id:input.serviceId,active:true,operatorDisabled:false}});
  if(!service)return NextResponse.json({error:'This service is no longer available.'},{status:404});
  if(input.quantity<service.min||input.quantity>service.max)return NextResponse.json({error:'Quantity is outside the live service limits.'},{status:400});
  await cleanupExpired(user.id);
  const existing=await db.orderDraft.findUnique({where:{userId:user.id},select:{id:true,serviceId:true}});
  const changedIntent=Boolean(existing&&existing.serviceId!==service.id);
  const draft=await db.orderDraft.upsert({
   where:{userId:user.id},
   create:{userId:user.id,serviceId:service.id,quantity:input.quantity,link:cleanText(input.link,1500),expiresAt:new Date(Date.now()+TTL_MS)},
   update:{serviceId:service.id,quantity:input.quantity,link:cleanText(input.link,1500),expiresAt:new Date(Date.now()+TTL_MS),...(changedIntent?{recoveryOpenedAt:null}:{})},
   select:{id:true},
  });
  if(!existing||changedIntent)await recordAnalytics({event:'ORDER_DRAFT_READY',userId:user.id,path:'/order',uniqueKey:`draft:${draft.id}:${service.id}:ready`,metadata:{serviceId:service.providerServiceId,platform:service.platform,quantity:input.quantity}});
  return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
 }catch(error:any){
  if(error?.issues)return NextResponse.json({error:'Check the service, destination and quantity.'},{status:400});
  return NextResponse.json({error:'Unable to save this order draft.'},{status:400});
 }
}

export async function DELETE(req:NextRequest){
 try{
  assertSameOrigin(req);
  const user=await getUser();if(!user)return NextResponse.json({error:'Sign in required'},{status:401});
  await db.orderDraft.deleteMany({where:{userId:user.id}});
  return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Unable to discard this draft.'},{status:400})}
}
