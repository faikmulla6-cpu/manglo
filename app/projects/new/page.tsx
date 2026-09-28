import {redirect} from 'next/navigation';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {createWebsiteProject} from '@/lib/website-projects';

export const dynamic='force-dynamic';

export default async function NewProjectPage({searchParams}:{searchParams:Promise<{fresh?:string}>}){
 const user=await getUser();
 if(!user)redirect('/auth?mode=signup&next=%2Fprojects%2Fnew');
 const params=await searchParams;
 if(params.fresh!=='1'){
  const draft=await db.websiteProject.findFirst({where:{userId:user.id,status:'DRAFT'},orderBy:{updatedAt:'desc'},select:{publicId:true}});
  if(draft)redirect('/projects/'+draft.publicId+'/onboarding');
 }
 const project=await createWebsiteProject(user.id);
 redirect('/projects/'+project.publicId+'/onboarding');
}