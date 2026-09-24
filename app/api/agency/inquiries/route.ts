import {randomUUID} from 'node:crypto';
import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {db} from '@/lib/db';

export const runtime='nodejs';

const schema=z.object({
 name:z.string().trim().min(2).max(80),
 email:z.string().trim().email().max(160),
 phone:z.string().trim().max(30).optional().default(''),
 company:z.string().trim().max(120).optional().default(''),
 website:z.string().trim().max(240).optional().default(''),
 service:z.enum(['full-stack','frontend','landing-page','redesign','product-improvement','not-sure']),
 budget:z.enum(['','under-25k','25k-75k','75k-2l','2l-plus']).optional().default(''),
 timeline:z.enum(['','asap','2-4-weeks','1-2-months','2m-plus']).optional().default(''),
 projectType:z.enum(['','business-site','saas-mvp','ecommerce','dashboard','creator-brand','other']).optional().default(''),
 message:z.string().trim().min(20).max(3000),
 middleName:z.string().max(100).optional().default(''),
});

const WINDOW_MS=15*60*1000;
const MAX_ATTEMPTS=5;
const attempts=new Map<string,{count:number;resetAt:number}>();

function clientKey(request:NextRequest){
 return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  ||request.headers.get('x-real-ip')
  ||'unknown';
}

function rateLimited(key:string){
 const now=Date.now();
 const current=attempts.get(key);
 if(!current||current.resetAt<=now){
  attempts.set(key,{count:1,resetAt:now+WINDOW_MS});
  return false;
 }
 current.count+=1;
 attempts.set(key,current);
 return current.count>MAX_ATTEMPTS;
}
function sameOrigin(request:NextRequest){
 const origin=request.headers.get('origin');
 if(!origin)return true;
 try{return new URL(origin).host===request.headers.get('host')}catch{return false}
}

export async function POST(request:NextRequest){
 if(!sameOrigin(request))return NextResponse.json({error:'Request origin was not accepted.'},{status:403});
 if(!request.headers.get('content-type')?.toLowerCase().includes('application/json')){
  return NextResponse.json({error:'Invalid request format.'},{status:415});
 }
 if(rateLimited(clientKey(request))){
  return NextResponse.json({error:'Too many submissions. Please try again later.'},{status:429});
 }

 const raw=await request.json().catch(()=>null);
 const parsed=schema.safeParse(raw);
 if(!parsed.success){
  return NextResponse.json({error:'Please check the required fields and try again.'},{status:400});
 }
 if(parsed.data.middleName){
  return NextResponse.json({ok:true,reference:'RECEIVED'});
 }

 const normalizedEmail=parsed.data.email.toLowerCase();
 const recentEmailSubmissions=await db.agencyInquiry.count({
  where:{email:normalizedEmail,createdAt:{gte:new Date(Date.now()-24*60*60*1000)}},
 }).catch(()=>0);
 if(recentEmailSubmissions>=3){
  return NextResponse.json({error:'Too many briefs from this email today. Please use the contact page for follow-up.'},{status:429});
 }

 const {middleName:_,...data}=parsed.data;
 const reference=`MG-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0,4).toUpperCase()}`;

 try{
  await db.agencyInquiry.create({data:{
   reference,
   name:data.name,
   email:normalizedEmail,
   phone:data.phone||null,
   company:data.company||null,
   website:data.website||null,
   service:data.service,
   budget:data.budget||null,
   timeline:data.timeline||null,
   projectType:data.projectType||null,
   message:data.message,
   source:'website',
  }});
  return NextResponse.json({ok:true,reference},{status:201});
 }catch(error){
  console.error('[agency-inquiry]',error instanceof Error?error.message:'save failed');
  return NextResponse.json({error:'We could not save your brief right now. Please use the contact page instead.'},{status:503});
 }
}
