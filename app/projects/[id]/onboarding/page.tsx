import {notFound,redirect} from 'next/navigation';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {createClient} from '@/lib/supabase/server';
import {asObjectArray,asStringArray,WEBSITE_PROJECT_ASSET_BUCKET} from '@/lib/website-projects';
import ProjectOnboarding from './ProjectOnboarding';

export const metadata={title:'Website project onboarding',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';

type ServiceItem={id:string;name:string;description:string;price:string};
type Testimonial={id:string;quote:string;reviewer:string};

export default async function OnboardingPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const user=await getUser();
 if(!user)redirect('/auth?mode=signup&next='+encodeURIComponent('/projects/'+id+'/onboarding'));
 const project=await db.websiteProject.findFirst({where:{publicId:id,userId:user.id},include:{assets:{orderBy:{createdAt:'asc'}}}});
 if(!project)notFound();
 if(project.status!=='DRAFT')redirect('/projects/'+project.publicId);

 const supabase=await createClient();
 const assets=await Promise.all(project.assets.map(async asset=>{
  const {data}=await supabase.storage.from(WEBSITE_PROJECT_ASSET_BUCKET).createSignedUrl(asset.path,60*60);
  return {id:asset.id,kind:asset.kind,path:asset.path,originalName:asset.originalName,mimeType:asset.mimeType,sizeBytes:asset.sizeBytes,signedUrl:data?.signedUrl||null};
 }));

 const initialProject={
  businessName:project.businessName||'',
  contactPerson:project.contactPerson||'',
  category:project.category||'',
  description:project.description||'',
  phone:project.phone||'',
  whatsapp:project.whatsapp||'',
  businessEmail:project.businessEmail||'',
  existingWebsite:project.existingWebsite||'',
  instagram:project.instagram||'',
  facebook:project.facebook||'',
  socialLinks:asStringArray(project.socialLinks),
  address:project.address||'',
  city:project.city||'',
  region:project.region||'',
  country:project.country||'',
  mapsUrl:project.mapsUrl||'',
  noCustomerFacingLocation:project.noCustomerFacingLocation,
  openingDays:asStringArray(project.openingDays),
  openingTime:project.openingTime||'',
  closingTime:project.closingTime||'',
  services:asObjectArray<ServiceItem>(project.services).map(item=>({id:String(item.id||''),name:String(item.name||''),description:String(item.description||''),price:String(item.price||'')})),
  pricingNotes:project.pricingNotes||'',
  primaryCta:project.primaryCta||'',
  about:project.about||'',
  mustInclude:project.mustInclude||'',
  mustAvoid:project.mustAvoid||'',
  preferredColors:project.preferredColors||'',
  preferredStyle:project.preferredStyle||'',
  inspirationSites:asStringArray(project.inspirationSites),
  testimonials:asObjectArray<Testimonial>(project.testimonials).map(item=>({id:String(item.id||''),quote:String(item.quote||''),reviewer:String(item.reviewer||'')})),
  googleBusinessProfile:project.googleBusinessProfile||'',
  existingDomain:project.existingDomain||'',
  domainProvider:project.domainProvider||'',
  additionalInstructions:project.additionalInstructions||'',
  currentStep:project.currentStep,
 };

 return <ProjectOnboarding projectId={project.publicId} initialProject={initialProject} initialAssets={assets}/>;
}