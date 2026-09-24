import Link from 'next/link';
import {
 ArrowRight,BadgeCheck,Blocks,Check,Code2,Gauge,Globe2,Layers3,
 MonitorSmartphone,Rocket,Search,ShieldCheck,Sparkles,Workflow,Zap,
} from 'lucide-react';
import AgencyInquiryForm from '@/components/AgencyInquiryForm';
import styles from './AgencyHome.module.css';

export const metadata={
 alternates:{canonical:'/'},
 title:{absolute:'MANGLO — Website Design & Development Agency'},
 description:'MANGLO builds professional websites and web products for businesses and founders, from premium frontend development to complete frontend + backend builds.',
 openGraph:{
  title:'MANGLO — Websites built to work',
  description:'Professional frontend and full-stack website development with product thinking, production-minded engineering and live work you can inspect.',
  url:'/',
  type:'website',
 },
};

const services=[
 {
  icon:Layers3,
  eyebrow:'FULL PRODUCT BUILD',
  title:'Frontend + Backend',
  copy:'A complete working website or web product: interface, application logic, database, authentication, integrations and launch preparation.',
  points:['Responsive product UI','Backend APIs & database','Auth, forms & integrations','Deployment-ready handoff'],
 },
 {
  icon:MonitorSmartphone,
  eyebrow:'FRONTEND DELIVERY',
  title:'Frontend only',
  copy:'Already have a backend or API? We build the professional customer-facing experience around it with strong UX, responsive implementation and reusable components.',
  points:['Premium responsive UI','API-ready integration layer','Reusable component system','Accessibility & performance'],
 },
];

const capabilities=[
 {icon:Sparkles,title:'Product-minded design',copy:'Clear hierarchy, useful flows and interactions built around what the visitor or user needs to do.'},
 {icon:Code2,title:'Real engineering',copy:'Routing, forms, states, APIs, auth, data and integrations—not just a screenshot made to look like software.'},
 {icon:Gauge,title:'Performance by design',copy:'Responsive assets, sensible rendering choices and implementation that considers real devices and networks.'},
 {icon:ShieldCheck,title:'Security-minded defaults',copy:'Server-side boundaries, input validation, secret separation and safer production patterns where the project needs them.'},
 {icon:Search,title:'Search-ready foundations',copy:'Metadata, structured content and technical foundations that help search engines understand the business.'},
 {icon:Blocks,title:'Built to evolve',copy:'Reusable components and maintainable structure so the next feature does not require rebuilding everything.'},
];

const processSteps=[
 ['01','Understand the outcome','We start with the business goal, users, current system and what success should look like.'],
 ['02','Shape the right scope','We turn the idea into flows, architecture and a build plan instead of jumping straight into random screens.'],
 ['03','Design + develop','The frontend is built, the required backend is wired, and important states and edge cases are handled.'],
 ['04','QA + launch handoff','Responsive checks, production checks and deployment preparation happen before the build is considered ready.'],
];

const faqs=[
 ['Can you build both frontend and backend?','Yes. Full-stack projects can include the user interface, server logic, database, authentication, integrations and launch preparation.'],
 ['Can I hire MANGLO only for frontend?','Yes. If your backend or API already exists, we can focus on the complete frontend experience and integration layer.'],
 ['Do you only build simple business websites?','No. The scope can include landing pages, business websites, dashboards, SaaS/MVP interfaces and existing product improvements.'],
 ['How do you price a project?','Pricing depends on scope, complexity, integrations, content readiness and timeline. The project brief collects enough context for a useful first discussion.'],
];

export default function Home(){
 const origin=process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop';
 const schema={
  '@context':'https://schema.org',
  '@graph':[
   {'@type':'ProfessionalService','@id':origin+'/#agency',name:'MANGLO',url:origin,description:'Website design and development agency offering frontend and full-stack web development.'},
   {'@type':'Service',name:'Full-stack website development',provider:{'@id':origin+'/#agency'},areaServed:'IN'},
   {'@type':'Service',name:'Frontend development',provider:{'@id':origin+'/#agency'},areaServed:'IN'},
   {'@type':'FAQPage',mainEntity:faqs.map(([question,answer])=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))},
  ],
 };
 return <main className={styles.page}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  <section className={styles.hero}>
   <div className={['container',styles.heroGrid].join(' ')}>
    <div className={styles.heroCopy}>
     <span className={styles.eyebrow}><Sparkles size={14}/> WEBSITE DESIGN & DEVELOPMENT</span>
     <h1>Premium websites for businesses that want to <em>look world-class.</em></h1>
     <p>From refined frontend experiences to complete frontend + backend products, MANGLO turns your idea into a polished, responsive website built for real customers.</p>
     <div className={styles.heroActions}>
      <a className={styles.primaryButton} href="#project">Start your project <ArrowRight size={16}/></a>
      <a className={styles.secondaryButton} href="https://clipkaroai.pro" target="_blank" rel="noreferrer">See live work <Globe2 size={15}/></a>
     </div>
     <div className={styles.trustRow}>
      <span><ShieldCheck/>Production-minded</span>
      <span><Gauge/>Performance-conscious</span>
      <span><MonitorSmartphone/>Responsive by default</span>
     </div>
    </div>
    <div className={styles.consoleCard}>
     <div className={styles.consoleTop}><div><small>PROJECT DELIVERY</small><b>From idea to working product</b></div><span>Accepting briefs</span></div>
     <div className={styles.window}>
      <div className={styles.windowBar}><i/><i/><i/><span>manglo.shop / your-project</span></div>
      <div className={styles.windowBody}>
       <div><small>BUILD SYSTEM</small><strong>Strategy → UI → Code → Launch</strong><p>One clear workflow for the visible experience and the systems behind it.</p></div>
       <ul>
        <li><Check/>Responsive interface</li>
        <li><Check/>Backend & database</li>
        <li><Check/>Integrations & auth</li>
        <li><Check/>QA & handoff</li>
       </ul>
      </div>
     </div>
     <div className={styles.deliveryRow}>
      <span><Workflow/>Plan</span><ArrowRight/><span><Code2/>Build</span><ArrowRight/><span><BadgeCheck/>QA</span><ArrowRight/><span><Rocket/>Launch</span>
     </div>
    </div>
   </div>
  </section>

  <section className={styles.proofBar}>
   <div className="container">
    <span>LIVE PRODUCT PROOF</span>
    <div><b>ClipKaro AI</b><p>A product from our own business portfolio—not only a concept mockup.</p></div>
    <a href="https://clipkaroai.pro" target="_blank" rel="noreferrer">Open ClipKaroAI.pro <ArrowRight size={14}/></a>
   </div>
  </section>
  <section className={styles.section} id="services">
   <div className="container">
    <div className={styles.sectionHead}><div><span>WHAT DO YOU WANT TO MAKE?</span><h2>Choose the build that fits your business.</h2></div><p>Two focused engagement paths, both designed with the same premium UI/UX standard and production mindset.</p></div>
    <div className={styles.serviceGrid}>
     {services.map(({icon:Icon,eyebrow,title,copy,points})=><article className={styles.serviceCard} key={title}>
      <div className={styles.serviceIcon}><Icon/></div><span>{eyebrow}</span><h3>{title}</h3><p>{copy}</p>
      <ul>{points.map(point=><li key={point}><Check/>{point}</li>)}</ul>
      <a href="#project">Discuss this build <ArrowRight size={15}/></a>
     </article>)}
    </div>
   </div>
  </section>

  <section className={styles.standard} id="work">
   <div className={['container',styles.standardGrid].join(' ')}>
    <div className={styles.standardIntro}>
     <span>WHY MANGLO FEELS DIFFERENT</span>
     <h2>Beautiful outside. Engineered properly underneath.</h2>
     <p>A serious website also needs the invisible parts: useful states, mobile behavior, validation, secure boundaries, search foundations and a structure that can keep growing.</p>
     <a href="#project" className={styles.darkButton}>Tell us your idea <ArrowRight size={15}/></a>
    </div>
    <div className={styles.capabilityGrid}>
     {capabilities.map(({icon:Icon,title,copy})=><article key={title}><Icon/><div><h3>{title}</h3><p>{copy}</p></div></article>)}
    </div>
   </div>
  </section>

  <section className={styles.caseSection}>
   <div className={['container',styles.caseCard].join(' ')}>
    <div className={styles.caseCopy}>
     <span>LIVE BUSINESS PROOF</span><h2>ClipKaro AI</h2>
     <p>We use a live product from our own portfolio as proof because production work is different from a static portfolio shot. You can inspect the product directly and judge the standard for yourself.</p>
     <div className={styles.caseTags}><span>Live product</span><span>Product UX</span><span>Frontend + backend</span><span>Production workflow</span></div>
     <a href="https://clipkaroai.pro" target="_blank" rel="noreferrer">Visit live product <ArrowRight size={15}/></a>
    </div>
    <div className={styles.caseVisual}>
     <div className={styles.caseWindow}><div><i/><i/><i/><span>clipkaroai.pro</span></div><section><span>CLIPKARO AI</span><strong>Live work is stronger proof than a mockup.</strong><small>Open the product and inspect it yourself.</small></section></div>
    </div>
   </div>
  </section>

  <section className={styles.section} id="process">
   <div className="container">
    <div className={styles.sectionHead}><div><span>OUR PROCESS</span><h2>From your idea to a polished live experience.</h2></div><p>A focused workflow keeps design, development and launch quality moving together instead of becoming separate disconnected steps.</p></div>
    <div className={styles.processGrid}>{processSteps.map(([n,title,copy])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
   </div>
  </section>

  <section className={styles.marketplace}>
   <div className="container"><div><span>MANGLO GROWTH MARKETPLACE</span><h2>Our social growth marketplace is still here.</h2><p>The marketplace, wallet, order tracking, MANGLO AI, referrals and account support remain available as a separate MANGLO product.</p></div><Link href="/services">Open growth marketplace <ArrowRight size={15}/></Link></div>
  </section>

  <section className={styles.inquiry} id="project">
   <div className={['container',styles.inquiryGrid].join(' ')}>
    <div className={styles.inquiryCopy}>
     <span>START A PROJECT</span><h2>Tell us what you want to build.</h2>
     <p>The brief is designed to collect enough context for a useful first conversation. You do not need a finished technical specification.</p>
     <div className={styles.inquiryPoints}><span><Check/>Full-stack websites & web products</span><span><Check/>Frontend-only projects</span><span><Check/>Landing pages & redesigns</span><span><Check/>Existing product improvements</span></div>
    </div>
    <AgencyInquiryForm/>
   </div>
  </section>

  <section className={styles.faq}>
   <div className="container"><div className={styles.sectionHead}><div><span>COMMON QUESTIONS</span><h2>Know what you are hiring us for.</h2></div></div>
    <div className={styles.faqList}>{faqs.map(([question,answer])=><details key={question}><summary>{question}<Zap size={15}/></summary><p>{answer}</p></details>)}</div>
   </div>
  </section>
 </main>;
}
