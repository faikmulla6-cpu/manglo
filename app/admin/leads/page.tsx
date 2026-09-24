import Link from 'next/link';
import {ArrowLeft,ExternalLink,Mail,Phone} from 'lucide-react';
import {requireAdmin} from '@/lib/admin';
import {db} from '@/lib/db';
import AgencyLeadStatusControl from './AgencyLeadStatusControl';
import styles from './AgencyLeads.module.css';

export const dynamic='force-dynamic';
export const metadata={title:'Agency leads',robots:{index:false,follow:false}};

const dateTime=(value:Date)=>new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeStyle:'short'}).format(value);
const labels:Record<string,string>={
 'full-stack':'Frontend + backend',
 'frontend':'Frontend only',
 'landing-page':'Landing page',
 'redesign':'Redesign',
 'product-improvement':'Product improvement',
 'not-sure':'Scope discovery',
};

function externalUrl(value:string|null){
 if(!value)return null;
 try{
  const url=new URL(value);
  return url.protocol==='http:'||url.protocol==='https:'?url.toString():null;
 }catch{return null}
}

export default async function AgencyLeads(){
 await requireAdmin();
 const leads=await db.agencyInquiry.findMany({orderBy:{createdAt:'desc'},take:150});
 const counts=await db.agencyInquiry.groupBy({by:['status'],_count:{_all:true}}).catch(()=>[]);
 const count=(status:string)=>counts.find(item=>item.status===status)?._count._all||0;

 return <main className={styles.page}>
  <header className={styles.top}>
   <div><span>PRIVATE OPERATIONS · AGENCY</span><h1>Project leads</h1><p>Website and product briefs submitted from the public MANGLO agency page.</p></div>
   <Link href="/admin" className={styles.back}><ArrowLeft size={13}/> Operations</Link>
  </header>

  <section className={styles.metrics}>
   <article><span>NEW</span><b>{count('NEW')}</b></article>
   <article><span>CONTACTED</span><b>{count('CONTACTED')}</b></article>
   <article><span>QUALIFIED</span><b>{count('QUALIFIED')}</b></article>
   <article><span>WON</span><b>{count('WON')}</b></article>
  </section>

  <section className={styles.panel}>
   {leads.length?<div className={styles.grid}>{leads.map(lead=>{
    const website=externalUrl(lead.website);
    return <article className={styles.card} key={lead.id}>
     <div className={styles.cardTop}><div><span>#{lead.reference}</span><h2>{lead.name}</h2><p>{lead.company||'No company supplied'}</p></div><AgencyLeadStatusControl reference={lead.reference} status={lead.status}/></div>
     <div className={styles.meta}><span>{labels[lead.service]||lead.service}</span>{lead.projectType?<span>{lead.projectType.replaceAll('-',' ')}</span>:null}{lead.budget?<span>{lead.budget}</span>:null}{lead.timeline?<span>{lead.timeline}</span>:null}</div>
     <p className={styles.message}>{lead.message}</p>
     <div className={styles.contact}>
      <a href={'mailto:'+lead.email}><Mail size={13}/>{lead.email}</a>
      {lead.phone?<a href={'tel:'+lead.phone}><Phone size={13}/>{lead.phone}</a>:null}
      {website?<a href={website} target="_blank" rel="noreferrer"><ExternalLink size={13}/>Current website</a>:null}
     </div>
     <time>{dateTime(lead.createdAt)}</time>
    </article>;
   })}</div>:<div className={styles.empty}><b>No agency leads yet.</b><p>New website briefs will appear here after submission.</p></div>}
  </section>
 </main>;
}
