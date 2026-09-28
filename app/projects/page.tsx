import Link from 'next/link';
import {ArrowRight,BriefcaseBusiness,Plus} from 'lucide-react';
import {redirect} from 'next/navigation';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {WEBSITE_PROJECT_STATUS_LABELS,websiteProjectCompletion} from '@/lib/website-projects';
import styles from './Projects.module.css';

export const metadata={title:'My website projects',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';

export default async function ProjectsPage(){
 const user=await getUser();
 if(!user)redirect('/auth?mode=signup&next=%2Fprojects');
 const projects=await db.websiteProject.findMany({where:{userId:user.id},orderBy:{createdAt:'desc'}});

 return <main className={styles.page}><div className="container">
  <header className={styles.hero}><div><span>MANGLO CLIENT PORTAL</span><h1>My website projects</h1><p>Your business information, files and project progress stay organised here instead of being scattered across messages.</p></div><Link className={styles.primary} href="/projects/new?fresh=1"><Plus size={15}/> New website project</Link></header>
  {projects.length?<section className={styles.grid}>{projects.map(project=>{
   const completion=websiteProjectCompletion(project);
   const title=project.businessName?.trim()||'New website project';
   const href=project.status==='DRAFT'?'/projects/'+project.publicId+'/onboarding':'/projects/'+project.publicId;
   return <article className={styles.card} key={project.id}>
    <div className={styles.cardTop}><div><small>{project.publicId}</small><h2>{title}</h2></div><span className={styles.status}>{WEBSITE_PROJECT_STATUS_LABELS[project.status]}</span></div>
    <div className={styles.meta}><div><span>PROJECT TYPE</span><b>Website Project</b></div><div><span>LAST UPDATED</span><b>{new Intl.DateTimeFormat('en-IN',{dateStyle:'medium'}).format(project.updatedAt)}</b></div></div>
    {project.status==='DRAFT'?<div className={styles.progress} aria-label={completion+'% onboarding complete'}><i style={{width:completion+'%'}}/></div>:null}
    <div className={styles.actions}><Link href={href}>{project.status==='DRAFT'?'Continue onboarding':'Open project'} <ArrowRight size={13}/></Link>{project.status!=='DRAFT'?<Link href={'/projects/'+project.publicId+'?tab=files'}>Files</Link>:null}</div>
   </article>;
  })}</section>:<section className={styles.empty}><div><BriefcaseBusiness size={32}/><h2>Your client portal starts here.</h2><p>Create your first Website Project, add the business information at your own pace, upload the assets and submit when you are ready.</p><Link className={styles.primary} href="/projects/new"><Plus size={15}/> Start website onboarding</Link></div></section>}
 </div></main>;
}