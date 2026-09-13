import Link from 'next/link';
import {ArrowRight,BadgeCheck,Bot,Clock3,CreditCard,LockKeyhole,Search,ShieldCheck,Wallet} from 'lucide-react';
import styles from './CommerceHome.module.css';

export const metadata={alternates:{canonical:'/'}};

const platforms=['Instagram','YouTube','TikTok','Telegram','Facebook','X'];
const quickStarts=[
 {label:'LOWEST RATE',title:'Instagram views',copy:'Compare current rates, IDs and limits before ordering.',href:'/services?platform=Instagram&q=views&filter=Lowest%20rate'},
 {label:'REFILL',title:'Instagram followers',copy:'Find listings where refill support is currently shown.',href:'/services?platform=Instagram&q=followers&filter=Refill'},
 {label:'DISCOVERY',title:'YouTube subscribers',copy:'Compare subscriber listings by rate, minimum and timing.',href:'/services?platform=YouTube&q=subscribers'},
 {label:'EXACT MATCH',title:'Search by service ID',copy:'Already know the service ID? Jump straight to it.',href:'/services'},
];

export default function Home(){
 return <main className={styles.home}>
  <section className={styles.hero}><div className={`container ${styles.heroGrid}`}>
   <div className={styles.heroCopy}>
    <span className={styles.eyebrow}>JO CHAHIYE, MANGLO.</span>
    <h1>Growth services,<br/><span>made easy to choose.</span></h1>
    <p>Search the live catalog, compare exact service IDs, rates and limits, pay from your MANGLO Wallet, and track everything from one account.</p>
    <form className={styles.searchBox} action="/services" method="get"><Search size={18}/><input name="q" aria-label="Search services" placeholder="Search Instagram views, YouTube subscribers, service ID…"/><button type="submit">Search</button></form>
    <div className={styles.quickLinks}><Link href="/services?platform=Instagram">Instagram</Link><Link href="/services?platform=YouTube">YouTube</Link><Link href="/services?platform=TikTok">TikTok</Link><Link href="/services?filter=Lowest%20rate">Lowest rates</Link><Link href="/services?filter=Refill">Refill listings</Link></div>
    <div className={styles.assurance}><span><ShieldCheck size={14}/>Server-validated orders</span><span><CreditCard size={14}/>Cashfree hosted payments</span><span><BadgeCheck size={14}/>Order-linked support</span></div>
   </div>
   <div className={styles.preview} aria-label="Illustrative MANGLO marketplace preview">
    <div className={styles.previewTop}><div><span className={styles.previewMark}>M</span><div><b>MANGLO Marketplace</b><small>Live catalog discovery</small></div></div><span className={styles.live}>LIVE CATALOG</span></div>
    <div className={styles.previewBody}><div className={styles.previewSearch}><Search size={14}/>Search service, platform or ID…</div><div className={styles.previewService}><div className={styles.previewServiceHead}><span className={styles.platformMark}>IG</span><div><b>Instagram Views</b><small>Review service details before ordering</small></div><span className={styles.serviceId}>ID shown</span></div><div className={styles.metrics}><div><span>RATE / 1K</span><strong>Live</strong></div><div><span>MINIMUM</span><strong>Visible</strong></div><div><span>MAXIMUM</span><strong>Visible</strong></div><div><span>AVG.</span><strong>Listed</strong></div></div><div className={styles.orderSummary}><div><span>Wallet charge</span><strong>Calculated at review</strong></div><Link href="/services">Browse services</Link></div></div></div>
    <div className={styles.previewFoot}><LockKeyhole size={12}/>Pricing and limits are checked again before an order is submitted.</div>
   </div>
  </div></section>

  <section className={styles.proof}><div className={`container ${styles.proofGrid}`}>
   <article><span className={styles.proofIcon}><Search size={15}/></span><div><b>Find services quickly</b><small>Search by platform, phrase or exact ID.</small></div></article>
   <article><span className={styles.proofIcon}><Wallet size={15}/></span><div><b>Know the charge first</b><small>See quantity and wallet impact before submission.</small></div></article>
   <article><span className={styles.proofIcon}><Clock3 size={15}/></span><div><b>Track from one account</b><small>Order status stays attached to your account.</small></div></article>
   <article><span className={styles.proofIcon}><ShieldCheck size={15}/></span><div><b>Support with context</b><small>Attach the relevant order when you need help.</small></div></article>
  </div></section>

  <section className={styles.section}><div className="container"><div className={styles.sectionHead}><div><span>START WITH A PLATFORM</span><h2>Choose the channel you want to grow.</h2></div><p>Start broad, narrow by service type, then compare the terms that matter.</p></div><div className={styles.platforms}>{platforms.map(name=><Link href={`/services?platform=${name}`} key={name}><div className={styles.platformTop}><span className={styles.platformCode}>{name.slice(0,2).toUpperCase()}</span><ArrowRight size={14}/></div><div><b>{name}</b><small>Browse live services</small></div></Link>)}</div></div></section>

  <section className={styles.sectionAlt}><div className="container"><div className={styles.sectionHead}><div><span>QUICK STARTS</span><h2>Get to the right list faster.</h2></div><p>Open focused marketplace views without fake discounts or invented rankings.</p></div><div className={styles.quickStarts}>{quickStarts.map(item=><Link href={item.href} key={item.title}><span>{item.label}</span><h3>{item.title}</h3><p>{item.copy}</p><ArrowRight size={15}/></Link>)}</div></div></section>

  <section className={styles.section}><div className="container"><div className={styles.sectionHead}><div><span>HOW ORDERING WORKS</span><h2>A short path from discovery to tracking.</h2></div><p>You choose the service; MANGLO rechecks price, limits and wallet balance before submission.</p></div><div className={styles.steps}><article className={styles.step}><span>01 · DISCOVER</span><h3>Find a service</h3><p>Browse manually, filter the marketplace, or enter an exact service ID.</p></article><article className={styles.step}><span>02 · REVIEW</span><h3>Read the live terms</h3><p>Check rate, minimum, maximum, timing and refill listing.</p></article><article className={styles.step}><span>03 · CONFIRM</span><h3>Approve the wallet charge</h3><p>See the calculated charge before placing the order.</p></article><article className={styles.step}><span>04 · TRACK</span><h3>Follow the order</h3><p>Track processing, completion and wallet outcomes from your account.</p></article></div><div className={styles.aiAssist}><div><span><Bot size={17}/></span><div><b>Need help choosing?</b><small>MANGLO AI can help compare the live catalog.</small></div></div><Link href="/dashboard?view=ai">Ask MANGLO AI</Link></div></div></section>

  <section className={styles.sectionAlt}><div className={`container ${styles.trustGrid}`}><div className={styles.trustCopy}><span>TRUST BY DESIGN</span><h2>Know what happens before and after you pay.</h2><p>Discovery, wallet funding and order execution are kept clear so you can review each step.</p></div><div className={styles.trustCards}><article><span><CreditCard size={16}/></span><div><b>Cashfree hosted checkout</b><p>Wallet top-ups are completed through Cashfree hosted checkout.</p></div></article><article><span><LockKeyhole size={16}/></span><div><b>Protected infrastructure</b><p>Sensitive integration credentials remain on the server.</p></div></article><article><span><ShieldCheck size={16}/></span><div><b>Clear service terms</b><p>Provider-listed information is presented as listing data, not guaranteed outcomes.</p></div></article></div></div></section>

  <section className={styles.section}><div className={`container ${styles.faq}`}><div className={styles.faqIntro}><span className={styles.eyebrow}>BEFORE YOU ORDER</span><h2>Common questions, answered clearly.</h2><p>Know how pricing, funding, tracking and support work before placing an order.</p></div><div className={styles.faqList}><details><summary>How do I know what I will be charged?</summary><p>Every service shows its customer rate. The exact wallet charge is calculated from the selected quantity and checked again before submission.</p></details><details><summary>Where do I add money?</summary><p>Use MANGLO Wallet in your account. Funding is completed through Cashfree hosted checkout.</p></details><details><summary>How do I track an order?</summary><p>Your Orders section shows the current MANGLO status and supplier-linked updates.</p></details><details><summary>What if I need help with an order?</summary><p>Open Support from your account and attach the relevant order so the request includes the right context.</p></details></div></div></section>

  <section className={`container ${styles.cta}`}><div><span>READY TO START</span><h2>Search the live marketplace and review before you order.</h2></div><div className={styles.ctaActions}><Link className={styles.ctaPrimary} href="/services">Browse services <ArrowRight size={14}/></Link><Link className={styles.ctaSecondary} href="/auth?mode=signup">Create account</Link></div></section>
 </main>;
}
