import Link from 'next/link';
import {notFound,redirect} from 'next/navigation';
import {FileText,Globe2,MessageSquareText,PanelTop,ReceiptText,RefreshCcw,UploadCloud} from 'lucide-react';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {createClient} from '@/lib/supabase/server';
import {asObjectArray,asStringArray,WEBSITE_PROJECT_ASSET_BUCKET,WEBSITE_PROJECT_STATUS,WEBSITE_PROJECT_STATUS_LABELS} from '@/lib/website-projects';
import ProjectAssetUploader from './onboarding/ProjectAssetUploader';
import styles from './ProjectPortal.module.css';

export const metadata={title:'Website project',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';

type ServiceItem={id:string;name:string;description:string;price:string};
type Tab='overview'|'business'|'files'|'preview'|'revisions'|'payments'|'domain'|'messages';
const tabs:readonly [Tab,string][]=[
 ['overview','Overview'],['preview','Website Preview'],['business','Business Info'],['files','Files'],['revisions','Revisions'],['payments','Payments'],['domain','Domain'],['messages','Messages'],
];

export default async function ProjectPage({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{tab?:string}>}){
 const {id}=await params;
 const query=await searchParams;
 const user=await getUser();
 if(!user)redirect('/auth?next='+encodeURIComponent('/projects/'+id));
 const project=await db.websiteProject.findFirst({where:{publicId:id,userId:user.id},include:{assets:{orderBy:{createdAt:'asc'}}}});
 if(!project)notFound();
 if(project.status==='DRAFT')redirect('/projects/'+project.publicId+'/onboarding');

 const currentTab=(tabs.some(([key])=>key===query.tab)?query.tab:'overview') as Tab;
 const statusOrder=WEBSITE_PROJECT_STATUS.filter(status=>status!=='DRAFT');
 const currentIndex=statusOrder.indexOf(project.status);
 const services=asObjectArray<ServiceItem>(project.services);
 const openingDays=asStringArray(project.openingDays);

 const supabase=await createClient();
 const assets=await Promise.all(project.assets.map(async asset=>{
  const {data}=await supabase.storage.from(WEBSITE_PROJECT_ASSET_BUCKET).createSignedUrl(asset.path,60*60);
  return {id:asset.id,kind:asset.kind,path:asset.path,originalName:asset.originalName,mimeType:asset.mimeType,sizeBytes:asset.sizeBytes,signedUrl:data?.signedUrl||null};
 }));

 const title=project.businessName||'Website Project';
 const submitted=project.submittedAt?new Intl.DateTimeFormat('en-IN',{dateStyle:'medium'}).format(project.submittedAt):'—';

 return <main className={styles.page}><div className="container">
  <header className={styles.top}><div><span>MANGLO CLIENT PORTAL · {project.publicId}</span><h1>{title}</h1><p>Website Project · submitted {submitted}</p></div><span className={styles.statusPill}>{WEBSITE_PROJECT_STATUS_LABELS[project.status]}</span></header>

  {project.status==='INFORMATION_RECEIVED'?<div className={styles.banner}><PanelTop size={18}/><div><b>We have everything we need to begin.</b><p>Your project information has been submitted successfully. We’ll review the details and begin preparing your website. You can still upload project files from the Files tab.</p></div></div>:null}

  <section className={styles.timeline} aria-label="Project status">
   {statusOrder.map((status,index)=>{
    const className=index<currentIndex?styles.stageDone:index===currentIndex?styles.stageActive:styles.stage;
    return <div className={className} key={status}><i/><b>{WEBSITE_PROJECT_STATUS_LABELS[status]}</b></div>;
   })}
  </section>

  <nav className={styles.tabs} aria-label="Project sections">{tabs.map(([key,label])=><Link key={key} className={currentTab===key?styles.tabActive:styles.tab} href={'/projects/'+project.publicId+'?tab='+key}>{label}</Link>)}</nav>

  <section className={styles.panel}>
   {currentTab==='overview'?<><div className={styles.panelHead}><div><span>PROJECT OVERVIEW</span><h2>Everything important at a glance.</h2><p>Your project progresses through the stages above. When something needs your input, it will appear here.</p></div><Link className={[styles.button,styles.primary].join(' ')} href={'/projects/'+project.publicId+'?tab=files'}><UploadCloud size={13}/> Add files</Link></div>
    <div className={styles.overviewGrid}>
     <article className={styles.infoCard}><span>CURRENT STAGE</span><h3>{WEBSITE_PROJECT_STATUS_LABELS[project.status]}</h3><p>{project.status==='INFORMATION_RECEIVED'?'Our team is reviewing the information and assets you submitted.':project.status==='DESIGN_DEVELOPMENT'?'Design and development work is underway.':project.status==='CLIENT_REVIEW'?'Your project is ready for client review.':project.status==='FINAL_CHANGES'?'We are applying the agreed final revisions.':project.status==='READY_TO_LAUNCH'?'The website is prepared for launch and final domain checks.':'Your website is live.'}</p>
      <div className={styles.quickGrid}><div className={styles.quick}><span>PROJECT</span><b>{project.publicId}</b></div><div className={styles.quick}><span>FILES</span><b>{assets.length}</b></div><div className={styles.quick}><span>PRIMARY CTA</span><b>{project.primaryCta||'—'}</b></div><div className={styles.quick}><span>LAST UPDATED</span><b>{new Intl.DateTimeFormat('en-IN',{dateStyle:'medium'}).format(project.updatedAt)}</b></div></div>
     </article>
     <article className={styles.infoCard}><span>BUSINESS SNAPSHOT</span><h3>{project.businessName||'Business details'}</h3><p>{project.description||project.about||'Your submitted business information is available in the Business Info tab.'}</p>
      <div className={styles.quickGrid}><div className={styles.quick}><span>CATEGORY</span><b>{project.category||'—'}</b></div><div className={styles.quick}><span>CONTACT</span><b>{project.phone||project.whatsapp||'—'}</b></div></div>
     </article>
    </div>
   </>:null}

   {currentTab==='business'?<><div className={styles.panelHead}><div><span>BUSINESS INFO</span><h2>The source of truth for your website.</h2><p>This is the structured information submitted through onboarding.</p></div></div>
    <div className={styles.detailGrid}>
     <div className={styles.detail}><span>Business name</span><b>{project.businessName||'—'}</b></div><div className={styles.detail}><span>Contact person</span><b>{project.contactPerson||'—'}</b></div>
     <div className={styles.detail}><span>Category</span><b>{project.category||'—'}</b></div><div className={styles.detail}><span>Phone / WhatsApp</span><b>{[project.phone,project.whatsapp].filter(Boolean).join(' · ')||'—'}</b></div>
     <div className={[styles.detail,styles.wide].join(' ')}><span>About / description</span><p>{project.about||project.description||'—'}</p></div>
     <div className={[styles.detail,styles.wide].join(' ')}><span>Location</span><p>{project.noCustomerFacingLocation?'No customer-facing location':[project.address,project.city,project.region,project.country].filter(Boolean).join(', ')||'—'}</p></div>
     <div className={styles.detail}><span>Opening days</span><b>{openingDays.join(', ')||'—'}</b></div><div className={styles.detail}><span>Hours</span><b>{project.openingTime&&project.closingTime?project.openingTime+' – '+project.closingTime:'—'}</b></div>
     <div className={[styles.detail,styles.wide].join(' ')}><span>Main services / products</span><div className={styles.serviceList}>{services.length?services.map(service=><div className={styles.service} key={service.id}><b>{service.name}</b>{service.description?<small>{service.description}</small>:null}{service.price?<em>{service.price}</em>:null}</div>):<b>—</b>}</div></div>
     <div className={styles.detail}><span>Primary website action</span><b>{project.primaryCta||'—'}</b></div><div className={styles.detail}><span>Preferred style</span><b>{project.preferredStyle||'—'}</b></div>
     <div className={[styles.detail,styles.wide].join(' ')}><span>Definitely include</span><p>{project.mustInclude||'—'}</p></div><div className={[styles.detail,styles.wide].join(' ')}><span>Do not include</span><p>{project.mustAvoid||'—'}</p></div>
    </div>
   </>:null}

   {currentTab==='files'?<><div className={styles.panelHead}><div><span>PROJECT FILES</span><h2>Private assets for this website.</h2><p>Add logos, business photos, work/product images, menus, price lists or brochures at any stage.</p></div></div><ProjectAssetUploader projectId={project.publicId} initialAssets={assets}/></>:null}

   {currentTab==='preview'?<Placeholder icon={<Globe2/>} title="Website preview will appear here." copy="When the first client-review build is ready, this tab will become the direct preview area for your project."/>:null}
   {currentTab==='revisions'?<Placeholder icon={<RefreshCcw/>} title="Revision requests will live here." copy="During Client Review, this area will organise requested changes instead of scattering them across messages."/>:null}
   {currentTab==='payments'?<Placeholder icon={<ReceiptText/>} title="Project payments will be tracked here." copy="Advance/final payment status and invoices can be connected to this project as the workflow expands."/>:null}
   {currentTab==='domain'?<Placeholder icon={<Globe2/>} title="Domain and launch details." copy="Your domain, provider and launch readiness will be organised here when the project reaches the final stages."/>:null}
   {currentTab==='messages'?<Placeholder icon={<MessageSquareText/>} title="Project messages are coming here." copy="This will become the project-specific communication thread for decisions that should stay attached to the work."/>:null}
  </section>
 </div></main>;
}

function Placeholder({icon,title,copy}:{icon:React.ReactNode;title:string;copy:string}){
 return <div className={styles.placeholder}><div>{icon}<h3>{title}</h3><p>{copy}</p></div></div>;
}