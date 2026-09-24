'use client';

import Link from 'next/link';
import {ArrowUpRight,BadgeCheck,Layers3,LockKeyhole,Sparkles} from 'lucide-react';
import {useState} from 'react';
import styles from '@/app/AgencyHome.module.css';

const projects=[
 {
  id:'clipkaro',
  eyebrow:'LIVE PRODUCT',
  name:'ClipKaro AI',
  title:'An AI-first creator workflow built as a real product.',
  copy:'A live product from our own portfolio that demonstrates product UX, frontend craft, backend flows and production thinking beyond static mockups.',
  tags:['Product UX','Full-stack','Creator workflow','Live'],
  href:'https://clipkaroai.pro',
  external:true,
  action:'Open live product',
  icon:Sparkles,
  visual:'creator',
 },
 {
  id:'growth',
  eyebrow:'LIVE MANGLO PRODUCT',
  name:'Growth Marketplace',
  title:'Discovery, wallet, ordering and fulfilment in one flow.',
  copy:'The marketplace side of MANGLO is a functioning product with service discovery, account flows, order tracking and operational safeguards.',
  tags:['Marketplace','Wallet','Orders','Service discovery'],
  href:'/services',
  external:false,
  action:'Explore marketplace',
  icon:Layers3,
  visual:'marketplace',
 },
 {
  id:'ops',
  eyebrow:'PRIVATE OPERATIONS',
  name:'MANGLO Operations',
  title:'The systems behind a serious customer experience.',
  copy:'Lead handling, support, service controls, audit trails and reliability workflows give the public product an operational backbone.',
  tags:['Admin UX','Lead pipeline','Audit trail','Support'],
  href:'/trust',
  external:false,
  action:'See our trust approach',
  icon:LockKeyhole,
  visual:'operations',
 },
] as const;

export default function SelectedWork(){
 const [active,setActive]=useState<(typeof projects)[number]['id']>('clipkaro');
 const current=projects.find(project=>project.id===active)??projects[0];

 return <section className={styles.workSection} id="work" data-reveal>
  <div className="container">
   <div className={styles.workHeader}>
    <div><span>SELECTED SYSTEMS</span><h2>We build the proof before we sell the promise.</h2></div>
    <p>Explore real products and systems from the MANGLO ecosystem. The goal is simple: you should be able to judge our product taste from our own work.</p>
   </div>

   <div className={styles.workGrid}>
    <div className={styles.workNav} role="tablist" aria-label="Selected MANGLO work">
     {projects.map(project=>{
      const ActiveIcon=project.icon;
      const selected=project.id===active;
      return <button
       type="button"
       key={project.id}
       role="tab"
       aria-selected={selected}
       aria-controls="manglo-work-panel"
       className={selected?[styles.workTab,styles.workTabActive].join(' '):styles.workTab}
       onClick={()=>setActive(project.id)}
      >
       <span className={styles.workTabIcon}><ActiveIcon size={17}/></span>
       <span><small>{project.eyebrow}</small><b>{project.name}</b></span>
       <ArrowUpRight size={15}/>
      </button>;
     })}
    </div>

    <div className={styles.workStage}>
     <article id="manglo-work-panel" key={current.id} className={styles.workPreview} role="tabpanel">
      <div className={styles.workCopy}>
       <span className={styles.workLive}><BadgeCheck size={13}/>{current.eyebrow}</span>
       <h3>{current.title}</h3>
       <p>{current.copy}</p>
       <div className={styles.workTags}>{current.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
       {current.external?
        <a className={styles.workCta} href={current.href} target="_blank" rel="noreferrer">{current.action}<ArrowUpRight size={15}/></a>:
        <Link className={styles.workCta} href={current.href}>{current.action}<ArrowUpRight size={15}/></Link>}
      </div>

      <div className={styles.workBrowser} aria-hidden="true">
       <div className={styles.workBrowserBar}><i/><i/><i/><span>{current.name.toLowerCase().replaceAll(' ','-')}.manglo</span></div>
       <div className={styles.workCanvas} data-visual={current.visual}>
        <div className={styles.workCanvasTop}>
         <span>{current.name}</span>
         <b>{current.visual==='creator'?'Create faster':current.visual==='marketplace'?'Find. Order. Track.':'Operate with clarity.'}</b>
         <small>{current.visual==='creator'?'AI-assisted workflow':current.visual==='marketplace'?'Live service marketplace':'Private operations console'}</small>
        </div>
        <div className={styles.workCanvasGrid}>
         <div className={styles.workMiniCard}><span/><b>{current.visual==='creator'?'Smart workflow':current.visual==='marketplace'?'Service catalog':'Lead queue'}</b><small>Structured and responsive</small></div>
         <div className={styles.workMiniCard}><span/><b>{current.visual==='creator'?'Production output':current.visual==='marketplace'?'Order flow':'Support ops'}</b><small>Real product states</small></div>
         <div className={styles.workMiniCard}><span/><b>{current.visual==='creator'?'Creator UX':current.visual==='marketplace'?'Account layer':'Audit trail'}</b><small>Designed for confidence</small></div>
        </div>
        <div className={styles.workStats}>
         <span><b>01</b>Clear hierarchy</span><span><b>02</b>Useful states</span><span><b>03</b>Production logic</span>
        </div>
       </div>
      </div>
     </article>
    </div>
   </div>
  </div>
 </section>;
}
