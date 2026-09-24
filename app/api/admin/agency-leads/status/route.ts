import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {getUser} from '@/lib/auth';
import {isAdminEmail} from '@/lib/admin';
import {db} from '@/lib/db';

export const runtime='nodejs';

const schema=z.object({
 reference:z.string().min(6).max(80),
 status:z.enum(['NEW','CONTACTED','QUALIFIED','WON','CLOSED']),
});

function sameOrigin(request:NextRequest){
 const origin=request.headers.get('origin');
 if(!origin)return true;
 try{return new URL(origin).host===request.headers.get('host')}catch{return false}
}

export async function PATCH(request:NextRequest){
 if(!sameOrigin(request))return NextResponse.json({error:'Invalid request origin.'},{status:403});
 const user=await getUser().catch(()=>null);
 if(!user)return NextResponse.json({error:'Authentication required.'},{status:401});
 if(!isAdminEmail(user.email))return NextResponse.json({error:'Not allowed.'},{status:403});

 const body=schema.safeParse(await request.json().catch(()=>null));
 if(!body.success)return NextResponse.json({error:'Invalid lead update.'},{status:400});

 const current=await db.agencyInquiry.findUnique({where:{reference:body.data.reference},select:{id:true,status:true}});
 if(!current)return NextResponse.json({error:'Lead not found.'},{status:404});

 const updated=await db.$transaction(async tx=>{
  const lead=await tx.agencyInquiry.update({where:{reference:body.data.reference},data:{status:body.data.status},select:{reference:true,status:true}});
  await tx.adminAuditLog.create({data:{
   adminEmail:user.email,
   action:'AGENCY_LEAD_STATUS_UPDATE',
   entityType:'AgencyInquiry',
   entityId:current.id,
   before:{status:current.status},
   after:{status:body.data.status,reference:body.data.reference},
  }});
  return lead;
 });

 return NextResponse.json({ok:true,lead:updated});
}
