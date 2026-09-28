import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {requireAdmin} from '@/lib/admin';
import {db} from '@/lib/db';
import {assertSameOrigin} from '@/lib/security';

export const runtime='nodejs';

const schema=z.object({
 publicId:z.string().min(8).max(80),
 status:z.enum(['INFORMATION_RECEIVED','DESIGN_DEVELOPMENT','CLIENT_REVIEW','FINAL_CHANGES','READY_TO_LAUNCH','LIVE']),
});

function response(body:unknown,status=200){return NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}})}

export async function PATCH(req:NextRequest){
 try{assertSameOrigin(req)}catch{return response({error:'Invalid request origin.'},403)}
 const admin=await requireAdmin();
 const parsed=schema.safeParse(await req.json().catch(()=>null));
 if(!parsed.success)return response({error:'Invalid project status.'},400);

 const current=await db.websiteProject.findUnique({where:{publicId:parsed.data.publicId},select:{id:true,status:true}});
 if(!current)return response({error:'Project not found.'},404);
 if(current.status==='DRAFT')return response({error:'Draft onboarding must be submitted by the client first.'},409);

 const updated=await db.$transaction(async tx=>{
  const project=await tx.websiteProject.update({where:{id:current.id},data:{status:parsed.data.status},select:{publicId:true,status:true}});
  await tx.adminAuditLog.create({data:{
   adminEmail:admin.email,
   action:'WEBSITE_PROJECT_STATUS_UPDATE',
   entityType:'WebsiteProject',
   entityId:current.id,
   before:{status:current.status},
   after:{status:parsed.data.status,publicId:parsed.data.publicId},
  }});
  return project;
 });
 return response({ok:true,project:updated});
}
