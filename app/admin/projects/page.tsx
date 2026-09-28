import Link from 'next/link';
import {ArrowLeft,ArrowRight} from 'lucide-react';
import {requireAdmin} from '@/lib/admin';
import {db} from '@/lib/db';
import {WEBSITE_PROJECT_STATUS_LABELS} from '@/lib/website-projects';
import WebsiteProjectStatusControl from './WebsiteProjectStatusControl';
import styles from './AdminProjects.module.css';

export const metadata={title:'Website projects',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';

export default async function AdminWebsiteProjects(){
 await requireAdmin();
 const projects=await db.websiteProject.findMany({
  include:{user:{select:{name:true,email:true}},_count:{select:{assets:true}}},
  orderBy:{updatedAt:'desc'},
  take:200,
 });
 const counts={
  new:projects.filter(project=>project.status==='INFORMATION_RECEIVED').length,
  building:projects.filter(project=>project.status==='DESIGN_DEVELOPMENT').length,
  review:projects.filter(project=>project.status==='CLIENT_REVIEW'||project.status==='FINAL_CHANGES').length,
  live:projects.filter(project=>project.status==='LIVE').length,
 };

 return <main className={styles.page}>
  <header className={styles.top}><div><span>PRIVATE OPERATIONS · WEBSITE DELIVERY</span><h1>Website projects</h1><p>Structured client onboarding, private assets and project progress.</p></div><Link className={styles.back} href="/admin"><ArrowLeft size={12}/> Operations</Link></header>
  <section className={styles.metrics}><article><span>INFO RECEIVED</span><b>{counts.new}</b></article><article><span>IN DEVELOPMENT</span><b>{counts.building}</b></article><article><span>REVIEW / CHANGES</span><b>{counts.review}</b></article><article><span>LIVE</span><b>{counts.live}</b></article></section>
  {projects.length?<section className={styles.grid}>{projects.map(project=><article className={styles.card} key={project.id}>
   <div className={styles.cardTop}><div><small>#{project.publicId}</small><h2>{project.businessName||'Onboarding draft'}</h2><p>{project.user.name} · {project.user.email}</p></div>{project.status==='DRAFT'?<span className={styles.meta}>Draft</span>:<WebsiteProjectStatusControl publicId={project.publicId} status={project.status}/>}</div>
   <div className={styles.meta}><span>{WEBSITE_PROJECT_STATUS_LABELS[project.status]}</span>{project.category?<span>{project.category}</span>:null}<span>{project._count.assets} files</span>{project.submittedAt?<span>Submitted {new Intl.DateTimeFormat('en-IN',{dateStyle:'medium'}).format(project.submittedAt)}</span>:null}</div>
   <Link className={styles.cardLink} href={'/admin/projects/'+project.publicId}>Open structured brief <ArrowRight size={12}/></Link>
  </article>)}</section>:<section className={styles.empty}><div><b>No website projects yet.</b><p>Submitted client onboarding projects will appear here.</p></div></section>}
 </main>;
}