import crypto from 'crypto';
import {db} from './db';

export * from './website-project-constants';

export function makeWebsiteProjectPublicId(){
 return `WP-${new Date().getFullYear()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

export async function createWebsiteProject(userId:string){
 const account=await db.user.findUnique({where:{id:userId},select:{name:true,email:true,phone:true}});
 if(!account)throw new Error('Account profile not found.');
 const lead=await db.agencyInquiry.findFirst({
  where:{email:account.email,status:{not:'CLOSED'}},
  orderBy:{createdAt:'desc'},
  select:{name:true,phone:true,company:true,website:true,message:true},
 }).catch(()=>null);
 const seed={
  userId,
  contactPerson:lead?.name||account.name,
  phone:lead?.phone||account.phone,
  businessName:lead?.company||null,
  existingWebsite:lead?.website||null,
  additionalInstructions:lead?.message||null,
 };
 for(let attempt=0;attempt<4;attempt++){
  try{
   return await db.websiteProject.create({data:{...seed,publicId:makeWebsiteProjectPublicId()}});
  }catch(error){
   if(attempt===3)throw error;
  }
 }
 throw new Error('Could not create website project.');
}

export async function ensureWebsiteProjectTeamAccess(userId:string){
 return db.websiteProjectTeamAccess.upsert({
  where:{userId},
  update:{},
  create:{userId},
 });
}

export function asStringArray(value:unknown){
 return Array.isArray(value)?value.filter((item):item is string=>typeof item==='string'):[] as string[];
}

export function asObjectArray<T extends object>(value:unknown){
 return Array.isArray(value)?value.filter((item):item is T=>Boolean(item)&&typeof item==='object'&&!Array.isArray(item)):[];
}

export function websiteProjectCompletion(project:{
 businessName:string|null;
 contactPerson:string|null;
 category:string|null;
 phone:string|null;
 whatsapp:string|null;
 services:unknown;
 primaryCta:string|null;
 currentStep:number;
 status:string;
}){
 if(project.status!=='DRAFT')return 100;
 const checks=[
  Boolean(project.businessName?.trim()),
  Boolean(project.contactPerson?.trim()),
  Boolean(project.category?.trim()),
  Boolean(project.phone?.trim()||project.whatsapp?.trim()),
  asObjectArray<{name?:string}>(project.services).some(item=>Boolean(item.name?.trim())),
  Boolean(project.primaryCta?.trim()),
 ];
 const required=Math.round((checks.filter(Boolean).length/checks.length)*84);
 const progress=Math.min(16,Math.max(0,(project.currentStep-1)*4));
 return Math.min(99,required+progress);
}
