import Link from 'next/link';
import {
 ArrowRight,BadgeCheck,Braces,Cable,Check,Code2,Database,Gauge,
 LayoutDashboard,Layers3,LockKeyhole,MonitorSmartphone,Palette,Rocket,
 ShieldCheck,Sparkles,Workflow,Zap,
} from 'lucide-react';
import AgencyInquiryForm from '@/components/AgencyInquiryForm';
import AgencyMotion from '@/components/AgencyMotion';
import styles from './AgencyEditorial.module.css';

export const metadata={
 alternates:{canonical:'/'},
 title:{absolute:'MANGLO — Digital Product Design & Development'},
 description:'MANGLO designs and builds premium websites and web products for businesses that want serious design, engineering and production quality.',
 openGraph:{
  title:'MANGLO — Design that earns attention. Engineering that earns trust.',
  description:'Premium UI/UX, frontend engineering and full-stack product development from MANGLO.',
  url:'/',
  type:'website',
 },
};

const buildServices=[
 {
  no:'01',
  icon:Palette,
  title:'Product & UI/UX',
  copy:'Clear positioning, visual direction, responsive systems and interaction design built around the action your customer needs to take.',
 },
 {
  no:'02',
  icon:MonitorSmartphone,
  title:'Frontend engineering',
  copy:'Fast, responsive interfaces with reusable components, real states, accessibility and integrations that feel like one coherent product.',
 },
 {
  no:'03',
  icon:Layers3,
  title:'Full-stack development',
  copy:'Frontend, backend, database, authentication, integrations and production handoff designed as one system instead of disconnected pieces.',
 },
 {
  no:'04',
  icon:Workflow,
  title:'Product improvement',
  copy:'For products that already exist but need stronger UX, cleaner architecture, new flows, better performance or a more credible interface.',
 },
];

const architecture=[
 {icon:Code2,label:'INTERFACE',title:'Frontend',copy:'Responsive UI, states, accessibility and interaction quality.'},
 {icon:Braces,label:'APPLICATION',title:'APIs',copy:'Server logic and integrations with clear boundaries.'},
 {icon:LockKeyhole,label:'IDENTITY',title:'Authentication',copy:'Session, role and account flows built for the product.'},
 {icon:Database,label:'DATA',title:'Database',copy:'Structured persistence, validation and business logic.'},
 {icon:LayoutDashboard,label:'OPERATIONS',title:'Admin systems',copy:'The tools needed to actually run the product after launch.'},
 {icon:Rocket,label:'PRODUCTION',title:'Launch layer',copy:'Performance, deployment, observability and final QA.'},
];

const processSteps=[
 ['01','Understand','Business goal, users, constraints and the outcome the product needs to create.'],
 ['02','Shape','Information architecture, visual direction, flows and technical decisions before expensive rework.'],
 ['03','Build','Interface and required backend developed together with the real edge states included.'],
 ['04','Launch','Responsive QA, production checks, deployment preparation and a maintainable handoff.'],
];

const faqs=[
 ['Can MANGLO build both frontend and backend?','Yes. Full-stack projects can include UI/UX, frontend, server logic, database, authentication, integrations, admin tools and launch preparation.'],
 ['Can I hire MANGLO only for frontend?','Yes. If your backend or API already exists, we can focus on the complete customer-facing experience and the integration layer around it.'],
 ['What kind of products do you build?','Business websites, SaaS and MVP interfaces, dashboards, landing experiences, internal tools, redesigns and improvements to existing web products.'],
 ['How do you price a project?','Pricing depends on scope, complexity, integrations, content readiness and timeline. The project brief gives us enough context to discuss the right engagement.'],
];

export default function Home(){
 const origin=process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop';
 const schema={
  '@context':'https://schema.org',
  '@graph':[
   {'@type':'ProfessionalService','@id':origin+'/#agency',name:'MANGLO',url:origin,description:'Digital product design and development studio offering UI/UX, frontend and full-stack web development.'},
   {'@type':'Service',name:'UI/UX and frontend development',provider:{'@id':origin+'/#agency'},areaServed:'IN'},
   {'@type':'Service',name:'Full-stack web product development',provider:{'@id':origin+'/#agency'},areaServed:'IN'},
   {'@type':'FAQPage',mainEntity:faqs.map(([question,answer])=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))},
  ],
 };

 return <main className={styles.page} data-agency-home>
  <AgencyMotion/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>

  <section className={styles.hero} data-hero-interactive>
   <div className={['container',styles.heroGrid].join(' ')}>
    <div className={styles.heroCopy} data-reveal>
     <span className={styles.kicker}><Sparkles size={13}/> DIGITAL PRODUCT STUDIO</span>
     <h1>We design digital products people <em>take seriously.</em></h1>
     <p className={styles.heroLead}>MANGLO combines premium UI/UX with production-minded engineering. Bring us the complete product or only the frontend—we build the experience around the outcome your business needs.</p>
     <div className={styles.heroActions}>
      <a className={styles.primaryCta} href="#project" data-magnetic>Start a project <ArrowRight size={15}/></a>
      <a className={styles.secondaryCta} href="#work" data-magnetic>See selected work <ArrowRight size={15}/></a>
     </div>
     <div className={styles.heroSignals}>
      <span><ShieldCheck/>Production-minded</span>
      <span><Gauge/>Performance-conscious</span>
      <span><MonitorSmartphone/>Responsive by default</span>
     </div>
    </div>

    <div className={styles.heroVisual} data-tilt data-reveal>
     <div className={styles.browser}>
      <div className={styles.browserBar}><i/><i/><i/><span>manglo.shop / product-build</span></div>
      <div className={styles.browserCanvas}>
       <span className={styles.productLabel}><BadgeCheck size={13}/> MANGLO PRODUCT SYSTEM</span>
       <h2 className={styles.productHeadline}>Beautiful on the surface. Serious underneath.</h2>
       <div className={styles.miniUi}>
        <div className={styles.miniPanelTall}>
         <b>Production dashboard</b>
         <small>Designed states, real data and an operational layer—not a static mockup.</small>
         <div className={styles.metricLine} aria-hidden="true">
          {[32,55,40,72,58,88,65,94,74,82,61,90].map((height,index)=><i key={index} style={{height:`${height}%`}}/> )}
         </div>
        </div>
        <div className={styles.miniPanel}><b>Customer experience</b><small>Responsive flows with clear hierarchy.</small></div>
        <div className={styles.miniPanel}><b>Backend systems</b><small>Auth, APIs, data and integrations.</small></div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </section>

  <section className={styles.proofStrip} data-reveal>
   <div className="container">
    <span>LIVE PRODUCT PROOF</span>
    <div><strong>ClipKaro AI</strong><p>A functioning product from our own portfolio—not a concept made only for a case-study image.</p></div>
    <a href="https://clipkaroai.pro" target="_blank" rel="noreferrer">Open live product <ArrowRight size={14}/></a>
   </div>
  </section>

  <div className={styles.ribbon} aria-hidden="true">
   <div className={styles.ribbonTrack}><span>Strategy</span><i/><span>UI/UX</span><i/><span>Frontend</span><i/><span>Backend</span><i/><span>QA</span><i/><span>Launch</span><i/><span>Scale</span></div>
  </div>

  <section className={styles.section} id="work" data-reveal>
   <div className="container">
    <div className={styles.sectionHeader}>
     <div><span className={styles.eyebrow}>SELECTED WORK</span><h2>Proof should be bigger than the claim.</h2></div>
     <p>Our own products are the first standard we hold ourselves to. We show real systems because production work reveals more than a polished screenshot ever can.</p>
    </div>

    <article className={styles.caseStudy} data-reveal>
     <div className={styles.caseCopy}>
      <span>LIVE PRODUCT · CLIPKARO AI</span>
      <h3>An AI-first creator workflow built as a real business product.</h3>
      <p>Product UX, customer flows, frontend implementation and backend systems working together in production. Inspect it directly and judge the standard yourself.</p>
      <div className={styles.caseMeta}><span>Product UX</span><span>Frontend</span><span>Backend</span><span>Production</span></div>
      <a className={styles.lightCta} href="https://clipkaroai.pro" target="_blank" rel="noreferrer">Visit ClipKaro AI <ArrowRight size={14}/></a>
     </div>

     <div className={styles.caseVisual} aria-hidden="true">
      <div className={styles.caseVisualTop}><i/><i/><i/><span>clipkaroai.pro</span></div>
      <div className={styles.caseVisualBody}>
       <div className={styles.caseVisualTitle}><b>Creator workspace</b><span className={styles.livePill}>LIVE PRODUCT</span></div>
       <div className={styles.caseGrid}>
        <div className={styles.caseLarge}><span>WORKFLOW</span><b>From source to publish-ready output</b><div className={styles.waveBars}>{[35,52,42,72,58,87,68,95,78,62,84,70,90,56].map((height,index)=><i key={index} style={{height:`${height}%`}}/>)}</div></div>
        <div className={styles.caseSmall}><span>EXPERIENCE</span><b>Focused creator UI</b></div>
        <div className={styles.caseSmall}><span>SYSTEM</span><b>Production workflows</b></div>
       </div>
      </div>
     </div>
    </article>
   </div>
  </section>

  <section className={styles.buildSection} id="services" data-reveal>
   <div className={['container',styles.editorialGrid].join(' ')}>
    <div className={styles.editorialIntro}>
     <span className={styles.eyebrow}>WHAT WE BUILD</span>
     <h2>Different needs. One product standard.</h2>
     <p>We do not force every project into the same package. The engagement changes; the expectation around design quality, engineering and maintainability does not.</p>
    </div>

    <div className={styles.serviceList}>
     {buildServices.map(({no,icon:Icon,title,copy})=><article className={styles.serviceRow} key={no} data-reveal>
      <span className={styles.serviceNo}>{no}</span>
      <div><h3>{title}</h3><p>{copy}</p></div>
      <Icon size={22}/>
     </article>)}
    </div>
   </div>
  </section>

  <section className={styles.techSection} id="engineering" data-reveal>
   <div className="container">
    <div className={styles.techHeader}>
     <div className={styles.techIntro}>
      <span className={styles.eyebrow}>THE PART USERS SHOULD NEVER HAVE TO THINK ABOUT</span>
      <h2>Serious underneath.</h2>
      <p>A premium interface means little if the product behind it is fragile. We design the visible experience and the systems that make it reliable as one product.</p>
     </div>
     <p className={styles.techNote}>The exact architecture changes by project. The principle does not: clear boundaries, useful operational tooling, secure defaults and implementation that can keep evolving after launch.</p>
    </div>

    <div className={styles.architecture}>
     {architecture.map(({icon:Icon,label,title,copy})=><article className={styles.archNode} key={title} data-reveal>
      <Icon size={21}/><span>{label}</span><b>{title}</b><p>{copy}</p>
     </article>)}
     <article className={styles.archCore} data-reveal>
      <div><span>ONE PRODUCT SYSTEM</span><h3>Design → interface → logic → data → operations</h3></div>
      <div className={styles.stackFlow} aria-label="Product delivery flow"><i>UI/UX</i><i>Frontend</i><i>API</i><i>Data</i><i>Launch</i></div>
     </article>
    </div>
   </div>
  </section>

  <section className={styles.processSection} id="process" data-reveal>
   <div className="container">
    <div className={styles.sectionHeader}>
     <div><span className={styles.eyebrow}>OUR PROCESS</span><h2>Less theatre. More clarity.</h2></div>
     <p>The process exists to reduce expensive surprises—not to make a simple project feel complicated.</p>
    </div>
    <div className={styles.processGrid}>
     {processSteps.map(([no,title,copy])=><article className={styles.processItem} key={no} data-reveal><span>{no}</span><h3>{title}</h3><p>{copy}</p></article>)}
    </div>
   </div>
  </section>

  <section className={styles.engagement} data-reveal>
   <div className="container">
    <div className={styles.sectionHeader}>
     <div><span className={styles.eyebrow}>WAYS TO WORK WITH MANGLO</span><h2>Bring the whole product—or just the interface.</h2></div>
     <p>Two clear starting points. The final scope is shaped around what already exists and what the product needs to achieve.</p>
    </div>
    <div className={styles.engagementGrid}>
     <article className={[styles.engagementCard,styles.engagementCardFeatured].join(' ')}>
      <span>FULL PRODUCT BUILD</span><h3>Frontend + backend</h3><p>For businesses that want one team to own the product experience and the systems behind it.</p>
      <ul><li><Check/>UI/UX system</li><li><Check/>Responsive frontend</li><li><Check/>Backend & database</li><li><Check/>Auth & integrations</li><li><Check/>Admin/operations</li><li><Check/>Launch preparation</li></ul>
     </article>
     <article className={styles.engagementCard}>
      <span>FRONTEND DELIVERY</span><h3>Frontend only</h3><p>For products with an existing API/backend that need a stronger customer experience and implementation layer.</p>
      <ul><li><Check/>Premium UI direction</li><li><Check/>Responsive frontend</li><li><Check/>API integration</li><li><Check/>Reusable components</li><li><Check/>Accessibility</li><li><Check/>Performance QA</li></ul>
     </article>
    </div>
   </div>
  </section>

  <section className={styles.briefSection} id="project" data-reveal>
   <div className={['container',styles.briefGrid].join(' ')}>
    <div className={styles.briefCopy}>
     <span className={styles.eyebrow}>START A PROJECT</span>
     <h2>Tell us what should exist when we’re done.</h2>
     <p>You do not need a finished technical specification. Tell us the business, what already exists, who the product is for and what a successful result should make possible.</p>
     <div className={styles.briefPoints}><span><Check/>Full-stack websites & web products</span><span><Check/>Frontend-only builds</span><span><Check/>Landing experiences & redesigns</span><span><Check/>Existing product improvements</span></div>
    </div>
    <AgencyInquiryForm/>
   </div>
  </section>

  <section className={styles.faqSection} data-reveal>
   <div className={['container',styles.faqGrid].join(' ')}>
    <div className={styles.faqIntro}><span className={styles.eyebrow}>GOOD QUESTIONS</span><h2>Clear answers before the build.</h2></div>
    <div className={styles.faqList}>
     {faqs.map(([question,answer])=><details key={question}><summary>{question}<Zap size={15}/></summary><p>{answer}</p></details>)}
    </div>
   </div>
  </section>

  <section className={styles.finalSection} data-reveal>
   <div className={['container',styles.finalCta].join(' ')}>
    <div>
     <span className={styles.eyebrow}>YOUR NEXT PRODUCT</span>
     <h2>Build something worth remembering.</h2>
     <p>If MANGLO is going to build for other businesses, our own work has to prove the standard first. That is the bar we design against.</p>
     <a className={styles.darkCta} href="#project" data-magnetic>Start your project <ArrowRight size={15}/></a>
    </div>
   </div>
  </section>
 </main>;
}
