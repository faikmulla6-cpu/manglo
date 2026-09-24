import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  Check,
  Code2,
  Gauge,
  Layers3,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import AgencyInquiryForm from '@/components/AgencyInquiryForm';

const services = [
  {
    icon: Layers3,
    eyebrow: 'FULL PRODUCT BUILD',
    title: 'Frontend + Backend',
    copy: 'A complete production website built end to end: interface, APIs, database, authentication, integrations, deployment and the details that make it usable in the real world.',
    points: ['Responsive UI/UX', 'Backend APIs & database', 'Auth, forms & integrations', 'Deployment-ready handoff'],
    value: 'full-stack',
  },
  {
    icon: MonitorSmartphone,
    eyebrow: 'FRONTEND DELIVERY',
    title: 'Frontend only',
    copy: 'Already have a backend or API? We turn your product into a polished, responsive interface with clear UX, reusable components and performance-conscious implementation.',
    points: ['Premium responsive UI', 'API-ready integration layer', 'Reusable component system', 'Accessibility & performance'],
    value: 'frontend',
  },
];

const capabilities = [
  ['Design that feels intentional', 'Clean hierarchy, responsive layouts and interactions designed around the action you want visitors to take.', Sparkles],
  ['Engineering, not a mockup', 'Real routing, forms, data flows, authentication and integrations when your project needs them.', Code2],
  ['Built for launch', 'SEO foundations, metadata, security-minded defaults, mobile QA and deployment preparation.', Rocket],
  ['Maintainable after launch', 'Reusable components and clear structure so the product can keep evolving instead of becoming a one-off page.', Blocks],
];

const process = [
  ['01', 'Tell us what you need', 'Choose full-stack, frontend-only or share the outcome you are trying to achieve.'],
  ['02', 'We shape the build', 'Scope, product flow, technical approach and the important edge cases are defined before implementation.'],
  ['03', 'Design + development', 'We build the actual experience, wire the required backend and test across real user flows.'],
  ['04', 'Launch with confidence', 'Final QA, production checks and handoff happen before the project is considered ready.'],
];

export default function Home() {
  return (
    <main className="agency-home">
      <section className="agency-hero">
        <div className="container agency-hero-grid">
          <div className="agency-hero-copy">
            <span className="agency-eyebrow"><Sparkles size={15}/> WEBSITE DESIGN & DEVELOPMENT STUDIO</span>
            <h1>We build websites that look serious <em>and work seriously.</em></h1>
            <p>From a premium frontend to a complete frontend + backend product, MANGLO helps founders and businesses go from idea to a professional working website.</p>
            <div className="agency-actions">
              <a className="btn btn-primary btn-lg" href="#project">Start your project <ArrowRight size={18}/></a>
              <a className="agency-secondary-link" href="https://clipkaroai.pro" target="_blank" rel="noreferrer">See live work <ArrowRight size={17}/></a>
            </div>
            <div className="agency-trust-row">
              <span><ShieldCheck size={17}/> Production-minded build</span>
              <span><Gauge size={17}/> Performance-conscious</span>
              <span><MonitorSmartphone size={17}/> Responsive by default</span>
            </div>
          </div>

          <div className="agency-product-card" aria-label="MANGLO project delivery preview">
            <div className="agency-card-top">
              <div><span>PROJECT DELIVERY</span><strong>From brief to live product.</strong></div>
              <span className="agency-live-dot">Accepting briefs</span>
            </div>
            <div className="agency-browser">
              <div className="agency-browser-bar"><i/><i/><i/><span>manglo.shop / your-project</span></div>
              <div className="agency-browser-body">
                <div className="agency-browser-copy"><small>BUILT FOR YOUR BUSINESS</small><b>Premium interface.<br/>Real functionality.</b><span>Frontend · Backend · Database · APIs</span></div>
                <div className="agency-browser-panel">
                  <span><Check size={15}/> Responsive UI</span>
                  <span><Check size={15}/> Secure data flow</span>
                  <span><Check size={15}/> Launch-ready</span>
                </div>
              </div>
            </div>
            <div className="agency-delivery-strip">
              <span><Workflow size={17}/><b>Plan</b></span><ArrowRight size={15}/>
              <span><Code2 size={17}/><b>Build</b></span><ArrowRight size={15}/>
              <span><BadgeCheck size={17}/><b>QA</b></span><ArrowRight size={15}/>
              <span><Rocket size={17}/><b>Launch</b></span>
            </div>
          </div>
        </div>
      </section>

      <section className="agency-proof-bar">
        <div className="container">
          <span>OUR LIVE PRODUCT PROOF</span>
          <div><b>ClipKaro AI</b><p>A real, running product from our own ecosystem—not a template screenshot.</p></div>
          <a href="https://clipkaroai.pro" target="_blank" rel="noreferrer">Visit ClipKaroAI.pro <ArrowRight size={16}/></a>
        </div>
      </section>

      <section className="agency-section" id="services">
        <div className="container">
          <div className="agency-section-head">
            <div><span className="agency-kicker">CHOOSE WHAT YOU NEED</span><h2>One agency. Two clear ways to build.</h2></div>
            <p>No confusing package maze. Bring the full product, or bring your backend and let us own the frontend experience.</p>
          </div>
          <div className="agency-service-grid">
            {services.map(({icon:Icon,eyebrow,title,copy,points}) => (
              <article className="agency-service-card" key={title}>
                <div className="agency-service-icon"><Icon/></div>
                <span>{eyebrow}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <ul>{points.map(point => <li key={point}><Check size={16}/>{point}</li>)}</ul>
                <a href="#project">Discuss this build <ArrowRight size={17}/></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-capability-section" id="work">
        <div className="container agency-capability-grid">
          <div className="agency-capability-intro">
            <span className="agency-kicker">WHAT “PROFESSIONAL” MEANS HERE</span>
            <h2>Not just a beautiful first screen.</h2>
            <p>A serious website needs the invisible parts too: sensible structure, mobile behavior, loading states, error handling, search visibility, secure boundaries and a path to maintain it later.</p>
            <a href="#project" className="btn btn-dark">Tell us your idea <ArrowRight size={17}/></a>
          </div>
          <div className="agency-capability-list">
            {capabilities.map(([title,copy,Icon]) => {
              const CapabilityIcon = Icon as typeof Sparkles;
              return <article key={String(title)}><CapabilityIcon/><div><h3>{String(title)}</h3><p>{String(copy)}</p></div></article>;
            })}
          </div>
        </div>
      </section>

      <section className="agency-case-section">
        <div className="container agency-case-card">
          <div className="agency-case-copy">
            <span className="agency-kicker">LIVE BUSINESS PROOF</span>
            <h2>ClipKaro AI</h2>
            <p>When you hire us, you are not hiring someone who only designs portfolio concepts. ClipKaro AI is a live product from our own business ecosystem and demonstrates the kind of product thinking we bring to client builds.</p>
            <div className="agency-case-tags"><span>Live product</span><span>Frontend + backend</span><span>Real users</span><span>Production workflow</span></div>
            <a href="https://clipkaroai.pro" className="btn btn-white" target="_blank" rel="noreferrer">Open live product <ArrowRight size={17}/></a>
          </div>
          <div className="agency-case-visual">
            <div className="agency-case-window">
              <div><i/><i/><i/><span>clipkaroai.pro</span></div>
              <section><span>CLIPKARO AI</span><strong>A running product,<br/>not a portfolio render.</strong><small>Open the live business and judge the work directly.</small></section>
            </div>
          </div>
        </div>
      </section>

      <section className="agency-section" id="process">
        <div className="container">
          <div className="agency-section-head compact"><div><span className="agency-kicker">HOW WE WORK</span><h2>A clear route from idea to launch.</h2></div></div>
          <div className="agency-process-grid">
            {process.map(([n,title,copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="agency-marketplace-callout">
        <div className="container">
          <div><span>ALREADY A MANGLO GROWTH CUSTOMER?</span><h2>The social growth marketplace is still here.</h2><p>We made the agency the primary MANGLO experience, but the existing growth marketplace, wallet, orders and dashboard remain available as a separate product.</p></div>
          <Link className="btn btn-white" href="/services">Open growth marketplace <ArrowRight size={17}/></Link>
        </div>
      </section>

      <section className="agency-inquiry-section" id="project">
        <div className="container agency-inquiry-grid">
          <div className="agency-inquiry-copy">
            <span className="agency-kicker">START A PROJECT</span>
            <h2>Tell us what you want to build.</h2>
            <p>Share the goal, current situation and what you need from us. The form is designed to collect enough context for a useful first conversation—not to force you through a sales funnel.</p>
            <div className="agency-inquiry-points">
              <span><Check/>Full-stack builds</span>
              <span><Check/>Frontend-only projects</span>
              <span><Check/>Landing pages & redesigns</span>
              <span><Check/>Existing product improvements</span>
            </div>
          </div>
          <AgencyInquiryForm/>
        </div>
      </section>
    </main>
  );
}
