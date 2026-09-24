import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';
import {db} from '@/lib/db';

const inquirySchema=z.object({
  name:z.string().trim().min(2).max(80),
  email:z.string().trim().email().max(160),
  phone:z.string().trim().max(30).optional().default(''),
  company:z.string().trim().max(120).optional().default(''),
  currentWebsite:z.string().trim().max(240).optional().default(''),
  service:z.enum(['full-stack','frontend','landing-redesign','existing-product','not-sure']),
  budget:z.string().trim().max(40).optional().default(''),
  timeline:z.string().trim().max(40).optional().default(''),
  message:z.string().trim().min(20).max(3000),
  middleName:z.string().max(100).optional().default(''),
});

const WINDOW_MS=15*60*1000;
const MAX_ATTEMPTS=5;
const attempts=new Map<string,{count:number;resetAt:number}>();

function clientKey(request:NextRequest){
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}
function limited(key:string){
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

export async function POST(request:NextRequest){
  if(!request.headers.get('content-type')?.toLowerCase().includes('application/json')){
    return NextResponse.json({error:'Invalid request format.'},{status:415});
  }

  const key=clientKey(request);
  if(limited(key)){
    return NextResponse.json({error:'Too many submissions. Please try again later.'},{status:429});
  }

  const raw=await request.json().catch(()=>null);
  const parsed=inquirySchema.safeParse(raw);
  if(!parsed.success){
    return NextResponse.json({error:'Please check the required fields and try again.'},{status:400});
  }

  if(parsed.data.middleName){
    return NextResponse.json({ok:true,reference:'RECEIVED'});
  }
  const {middleName:_,...data}=parsed.data;

  try{
    const row=await db.agencyInquiry.create({
      data:{
        name:data.name,
        email:data.email.toLowerCase(),
        phone:data.phone||null,
        company:data.company||null,
        currentWebsite:data.currentWebsite||null,
        service:data.service,
        budget:data.budget||null,
        timeline:data.timeline||null,
        message:data.message,
        source:'website',
      },
      select:{id:true},
    });
    return NextResponse.json({ok:true,reference:row.id.slice(-6).toUpperCase()},{status:201});
  }catch{
    return NextResponse.json({error:'We could not save your brief right now. Please use the contact details on our support page.'},{status:503});
  }
}
