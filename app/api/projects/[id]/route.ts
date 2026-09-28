import {NextRequest,NextResponse} from 'next/server';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {assertSameOrigin} from '@/lib/security';
import {WebsiteProjectDraftSchema} from '@/lib/website-project-input';

export const runtime='nodejs';

function response(body:unknown,status=200){
 return NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}});
}

export async function GET(_req:NextRequest,{params}:{params:Promise<{id:string}>}){
 const user=await getUser();
 if(!user)return response({error:'Authentication required.'},401);
 const {id}=await params;
 const project=await db.websiteProject.findFirst({where:{publicId:id,userId:user.id},include:{assets:{orderBy:{createdAt:'asc'}}}});
 if(!project)return response({error:'Project not found.'},404);
 return response({project});
}

export async function PATCH(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 try{assertSameOrigin(req)}catch{return response({error:'Invalid request origin.'},403)}
 const user=await getUser();
 if(!user)return response({error:'Authentication required.'},401);
 const {id}=await params;
 const parsed=WebsiteProjectDraftSchema.safeParse(await req.json().catch(()=>null));
 if(!parsed.success)return response({error:'Some project details are invalid. Please review the highlighted step.'},400);

 const project=await db.websiteProject.findFirst({where:{publicId:id,userId:user.id},select:{id:true,status:true}});
 if(!project)return response({error:'Project not found.'},404);
 if(project.status!=='DRAFT')return response({error:'Submitted project details are locked. Use the project portal for follow-up.'},409);

 const updated=await db.websiteProject.update({
  where:{id:project.id},
  data:parsed.data,
  select:{publicId:true,currentStep:true,updatedAt:true},
 });
 return response({ok:true,project:{...updated,updatedAt:updated.updatedAt.toISOString()}});
}
