import Link from 'next/link';
import {ArrowLeft,FileText} from 'lucide-react';
import {notFound} from 'next/navigation';
import {requireAdmin} from '@/lib/admin';
import {db} from '@/lib/db';
import {createClient} from '@/lib/supabase/server';
import {asObjectArray,asStringArray,ensureWebsiteProjectTeamAccess,WEBSITE_PROJECT_ASSET_BUCKET,WEBSITE_PROJECT_STATUS_LABELS} from '@/lib/website-projects';
import WebsiteProjectStatusControl from '../WebsiteProjectStatusControl';
import styles from '../AdminProjects.module.css';

export const metadata={title:'Website project brief',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';

type ServiceItem={id:string;name:string;description:string;price:string};
type Testimonial={id:string;quote:string;reviewer:string};

export default async function AdminWebsiteProjectDetail({params}:{params:Promise<{id:string}>}){
 const admin=await requireAdmin();
 const {id}=await params;
 await ensureWebsiteProjectTeamAccess(admin.id);
 const project=await db.websiteProject.findUnique({where:{publicId:id},include:{user:{select:{name:true,email:true,phone:true}},assets:{orderBy:{createdAt:'asc'}}}});
 if(!project)notFound();

 const supabase=await createClient();
 const assets=await Promise.all(project.assets.map(async asset=>{
  const {data}=await supabase.storage.from(WEBSITE_PROJECT_ASSET_BUCKET).createSignedUrl(asset.path,60*60);
  return {...asset,signedUrl:data?.signedUrl||null};
 }));
 const services=asObjectArray<ServiceItem>(project.services);
 const testimonials=asObjectArray<Testimonial>(project.testimonials);
 const days=asStringArray(project.openingDays);
 const social=asStringArray(project.socialLinks);
 const inspiration=asStringArray(project.inspirationSites);

 return <main className={styles.page}>
  <header className={styles.top}><div><span>WEBSITE PROJECT · {project.publicId}</span><h1>{project.businessName||'Onboarding draft'}</h1><p>{project.user.name} · {project.user.email}</p></div><Link className={styles.back} href="/admin/projects"><ArrowLeft size={12}/> Website projects</Link></header>

  <div className={styles.detailWrap}>
   <section className={styles.panel}>
    <div className={styles.section}><span>BUSINESS</span><h2>Core business details</h2><div className={styles.details}>
     <Detail label="Business name" value={project.businessName}/><Detail label="Contact person" value={project.contactPerson}/><Detail label="Category" value={project.category}/><Detail label="Business email" value={project.businessEmail}/>
     <Detail label="Phone" value={project.phone}/><Detail label="WhatsApp" value={project.whatsapp}/><Detail label="Existing website" value={project.existingWebsite}/><Detail label="Primary CTA" value={project.primaryCta}/>
     <Detail wide label="Short description" value={project.description}/><Detail wide label="About business" value={project.about}/>
     <Detail label="Instagram" value={project.instagram}/><Detail label="Facebook" value={project.facebook}/><Detail wide label="Other social links" value={social.join('\n')}/>
    </div></div>

    <div className={styles.section}><span>LOCATION & HOURS</span><h2>Where customers find them</h2><div className={styles.details}>
     <Detail wide label="Address" value={project.noCustomerFacingLocation?'No customer-facing location':[project.address,project.city,project.region,project.country].filter(Boolean).join(', ')}/><Detail label="Google Maps" value={project.mapsUrl}/><Detail label="Opening days" value={days.join(', ')}/><Detail label="Opening time" value={project.openingTime}/><Detail label="Closing time" value={project.closingTime}/>
    </div></div>

    <div className={styles.section}><span>SERVICES & WEBSITE CONTENT</span><h2>What the website needs to sell</h2><div className={styles.services}>{services.length?services.map(service=><article className={styles.service} key={service.id}><b>{service.name||'Unnamed service'}</b>{service.description?<p>{service.description}</p>:null}{service.price?<em>{service.price}</em>:null}</article>):<p>No services submitted yet.</p>}</div><div className={styles.details} style={{marginTop:10}}><Detail wide label="Pricing notes" value={project.pricingNotes}/><Detail wide label="Definitely include" value={project.mustInclude}/><Detail wide label="Do not include" value={project.mustAvoid}/></div></div>

    <div className={styles.section}><span>BRAND & MEDIA</span><h2>Visual direction and files</h2><div className={styles.details}><Detail label="Preferred colours" value={project.preferredColors}/><Detail label="Preferred style" value={project.preferredStyle}/><Detail wide label="Inspiration websites" value={inspiration.join('\n')}/></div>
     <div className={styles.assets} style={{marginTop:10}}>{assets.map(asset=><article className={styles.asset} key={asset.id}>{['image/jpeg','image/png','image/webp'].includes(asset.mimeType)&&asset.signedUrl?<img src={asset.signedUrl} alt=""/>:<div className={styles.assetFile}><FileText size={22}/></div>}<div><b>{asset.originalName}</b>{asset.signedUrl?<a href={asset.signedUrl} target="_blank" rel="noreferrer">Open file</a>:null}</div></article>)}</div>
    </div>

    <div className={styles.section}><span>TRUST & FINAL DETAILS</span><h2>Launch context</h2><div className={styles.details}><Detail label="Google Business Profile" value={project.googleBusinessProfile}/><Detail label="Existing domain" value={project.existingDomain}/><Detail label="Domain provider" value={project.domainProvider}/><Detail wide label="Additional instructions" value={project.additionalInstructions}/></div>
     {testimonials.length?<div className={styles.services} style={{marginTop:10}}>{testimonials.map(item=><article className={styles.service} key={item.id}><p>“{item.quote}”</p>{item.reviewer?<em>{item.reviewer}</em>:null}</article>)}</div>:null}
    </div>
   </section>

   <aside className={styles.aside}>
    <h3>Project controls</h3>
    <div className={styles.asideBlock}><span>STATUS</span>{project.status==='DRAFT'?<b>ONBOARDING DRAFT</b>:<WebsiteProjectStatusControl publicId={project.publicId} status={project.status}/>}</div>
    <div className={styles.asideBlock}><span>CLIENT</span><b>{project.user.name}</b><a href={'mailto:'+project.user.email}>{project.user.email}</a>{project.user.phone?<a href={'tel:'+project.user.phone}>{project.user.phone}</a>:null}</div>
    <div className={styles.asideBlock}><span>SUBMITTED</span><b>{project.submittedAt?new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeStyle:'short'}).format(project.submittedAt):'Not submitted yet'}</b></div>
    <div className={styles.asideBlock}><span>FILES</span><b>{assets.length} private assets</b></div>
    <div className={styles.asideBlock}><span>LAST UPDATED</span><b>{new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeStyle:'short'}).format(project.updatedAt)}</b></div>
    <div className={styles.asideBlock}><span>CURRENT STAGE</span><b>{WEBSITE_PROJECT_STATUS_LABELS[project.status]}</b></div>
   </aside>
  </div>
 </main>;
}

function Detail({label,value,wide=false}:{label:string;value:string|null|undefined;wide?:boolean}){
 return <div className={[styles.detail,wide?styles.wide:''].filter(Boolean).join(' ')}><span>{label}</span>{value?<p>{value}</p>:<b>—</b>}</div>;
}