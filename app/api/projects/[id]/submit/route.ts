import {NextRequest,NextResponse} from 'next/server';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {assertSameOrigin} from '@/lib/security';
import {assertWebsiteProjectReady} from '@/lib/website-project-input';

export const runtime='nodejs';

function response(body:unknown,status=200){
 return NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}});
}

export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 try{assertSameOrigin(req)}catch{return response({error:'Invalid request origin.'},403)}
 const user=await getUser();
 if(!user)return response({error:'Authentication required.'},401);
 const {id}=await params;

 const project=await db.websiteProject.findFirst({where:{publicId:id,userId:user.id}});
 if(!project)return response({error:'Project not found.'},404);
 if(project.status!=='DRAFT')return response({ok:true,project:{publicId:project.publicId,status:project.status}});

 const missing=assertWebsiteProjectReady(project);
 if(missing.length)return response({error:'Please complete the required project details first.',missing},400);

 const submitted=await db.websiteProject.update({
  where:{id:project.id},
  data:{status:'INFORMATION_RECEIVED',currentStep:6,submittedAt:new Date()},
  select:{publicId:true,status:true,submittedAt:true},
 });
 await db.analyticsEvent.create({data:{
  userId:user.id,
  event:'WEBSITE_PROJECT_SUBMITTED',
  path:'/projects/'+project.publicId,
  metadata:{projectId:project.publicId},
 }}).catch(()=>null);

 return response({ok:true,project:{...submitted,submittedAt:submitted.submittedAt?.toISOString()||null}});
}
