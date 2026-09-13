import Link from 'next/link';
import {ArrowRight,BadgeCheck,Clock3,CreditCard,Search,ShieldCheck} from 'lucide-react';
import styles from './Home.module.css';

const platforms=[
 {name:'Instagram',mark:'IG',tone:'instagram',items:'Followers · Reel views · Likes'},
 {name:'YouTube',mark:'YT',tone:'youtube',items:'Views · Subscribers · Shorts'},
 {name:'TikTok',mark:'TT',tone:'tiktok',items:'Views · Followers · Shares'},
 {name:'Telegram',mark:'TG',tone:'telegram',items:'Members · Views · Reactions'},
 {name:'Facebook',mark:'FB',tone:'facebook',items:'Followers · Likes · Views'},
 {name:'X',mark:'X',tone:'x',items:'Followers · Likes · Reposts'},
];

export default function Home(){
 return <main className={styles.home}>
  <section className={styles.hero}><div className={`container ${styles.heroGrid}`}>
   <div className={styles.heroCopy}>
    <span className={styles.eyebrow}>MANGLO SERVICE MARKETPLACE</span>
    <h1>Structured access to social growth services.</h1>
    <p>Discover live services, review exact rates and order limits, fund your account through Cashfree hosted checkout, and track supplier-linked fulfilment from one operating layer.</p>
    <div className={styles.actions}><Link className={styles.primary} href="/services">View marketplace <ArrowRight size={16}/></Link><Link className={styles.ghost} href="/auth?mode=signup">Create account</Link></div>
    <div className={styles.trustChips}><span><ShieldCheck size={13}/>Server-validated orders</span><span><CreditCard size={13}/>Cashfree hosted checkout</span><span><Clock3 size={13}/>Supplier-linked status</span></div>
   </div>

   <div className={styles.preview}>
    <div className={styles.previewTop}><div><span>SERVICE EXPLORER</span><b>Review before submission</b></div><span className={styles.live}>LIVE CATALOG</span></div>
    <div className={styles.searchBar}><Search size={16}/><span>Search platform, service, or ID…</span><kbd>Ctrl K</kbd></div>
    <div className={styles.filters}><span>Recommended</span><span>Fastest</span><span>Lowest rate</span><span>Refill</span><span>Low minimum</span></div>
    <div className={styles.serviceCard}><span className={styles.mark}>IG</span><div><b>Instagram Followers · 365-day refill</b><small>Service ID · Live limits · Provider-reported timing</small><div className={styles.meta}><span>₹ rate / 1K</span><span>Minimum</span><span>Average time</span></div></div><button className={styles.select}>Select</button></div>
    <div className={styles.previewFoot}><div><span>Wallet</span><b>Auditable</b></div><div><span>Status</span><b>Supplier-linked</b></div><div><span>Support</span><b>Order-linked</b></div></div>
   </div>
  </div></section>

  <section className={styles.strip}><div className={`container ${styles.stripGrid}`}>
   <div className={styles.stripItem}><span className={styles.stripIcon}><BadgeCheck size={17}/></span><div><b>Live catalog data</b><small>Rates, limits and service IDs sync from the connected supplier.</small></div></div>
   <div className={styles.stripItem}><span className={styles.stripIcon}><CreditCard size={17}/></span><div><b>Hosted payment flow</b><small>Wallet funding is completed on Cashfree hosted checkout.</small></div></div>
   <div className={styles.stripItem}><span className={styles.stripIcon}><ShieldCheck size={17}/></span><div><b>Recorded wallet outcomes</b><small>Order debits and eligible refunds are written to the wallet ledger.</small></div></div>
  </div></section>

  <section className={styles.section}><div className="container">
   <div className={styles.sectionHead}><div><span>PLATFORM COVERAGE</span><h2>One marketplace across major platforms.</h2></div><p>Start with a platform, then filter the live catalog by price, timing, refill availability or minimum quantity.</p></div>
   <div className={styles.platformGrid}>{platforms.map(platform=><Link href={`/services?platform=${platform.name}`} className={styles.platform} key={platform.name}><span className={`${styles.platformMark} ${styles[platform.tone]}`}>{platform.mark}</span><div><b>{platform.name}</b><small>{platform.items}</small></div><ArrowRight size={16}/></Link>)}</div>
  </div></section>

  <section className={styles.darkSection}><div className={`container ${styles.darkGrid}`}>
   <div><span className={styles.eyebrow}>OPERATING MODEL</span><h2>One transaction path from discovery to fulfilment.</h2><p>The customer interface stays clear while the backend handles wallet accounting, supplier order mapping and status reconciliation.</p><Link className={styles.ghost} href="/services">Review live services <ArrowRight size={15}/></Link></div>
   <div className={styles.steps}>
    <div className={styles.step}><span>01</span><div><h3>Discover</h3><p>Search a curated marketplace instead of navigating a raw supplier catalog.</p></div></div>
    <div className={styles.step}><span>02</span><div><h3>Review</h3><p>See the service ID, rate, limits, timing and refill listing before confirmation.</p></div></div>
    <div className={styles.step}><span>03</span><div><h3>Submit</h3><p>MANGLO validates the service, quantity and wallet balance again on the server.</p></div></div>
    <div className={styles.step}><span>04</span><div><h3>Reconcile</h3><p>Supplier status is reconciled into account states such as Processing, Completed and Refunded.</p></div></div>
   </div>
  </div></section>

  <section className={styles.section}><div className="container">
   <div className={styles.sectionHead}><div><span>TRANSACTION CONTROLS</span><h2>Controls are built into the order path.</h2></div><p>MANGLO exposes the information customers need while keeping supplier credentials and payment secrets server-side.</p></div>
   <div className={styles.promiseGrid}>
    <article className={styles.promise}><span className={styles.promiseIcon}><ShieldCheck size={19}/></span><h3>Server-side validation</h3><p>Provider keys, payment secrets and supplier calls stay on the server. Order values are validated again before money moves.</p></article>
    <article className={styles.promise}><span className={styles.promiseIcon}><CreditCard size={19}/></span><h3>Cashfree hosted checkout</h3><p>Wallet top-ups are completed on Cashfree hosted checkout. MANGLO does not collect card numbers, CVV, UPI PINs or banking credentials.</p></article>
    <article className={styles.promise}><span className={styles.promiseIcon}><Clock3 size={19}/></span><h3>Background reconciliation</h3><p>Orders are mapped to supplier order IDs and reconciled in the background so account status remains current.</p></article>
   </div>
  </div></section>

  <section className={`container ${styles.cta}`}><div><span>LIVE MARKETPLACE</span><h2>Review current services and commercial terms.</h2></div><Link href="/services">Open marketplace <ArrowRight size={15}/></Link></section>
 </main>;
}
