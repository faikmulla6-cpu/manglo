import Link from 'next/link';
import {ArrowRight,BadgeCheck,Clock3,CreditCard,Search,ShieldCheck,Sparkles,Zap} from 'lucide-react';
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
    <span className={styles.eyebrow}><Sparkles size={14}/> JO CHAHIYE, MANGLO.</span>
    <h1>Growth services, without the panel chaos.<span>✦</span></h1>
    <p>MANGLO turns a complex supplier catalog into a clear marketplace: discover a service, see the exact rate and limits, pay through your wallet, and track fulfilment from one account.</p>
    <div className={styles.actions}><Link className={styles.primary} href="/services">Explore marketplace <ArrowRight size={16}/></Link><Link className={styles.ghost} href="/auth?mode=signup">Create account</Link></div>
    <div className={styles.trustChips}><span><ShieldCheck size={13}/>Server-validated orders</span><span><CreditCard size={13}/>Cashfree hosted payments</span><span><Clock3 size={13}/>Live order status</span></div>
   </div>

   <div className={styles.preview}>
    <span className={styles.previewGlow}/><div className={styles.previewTop}><div><span>MANGLO SERVICE EXPLORER</span><b>Choose with clarity</b></div><span className={styles.live}>LIVE CATALOG</span></div>
    <div className={styles.searchBar}><Search size={16}/><span>Search platform, service, or ID…</span><kbd>⌘ K</kbd></div>
    <div className={styles.filters}><span>Recommended</span><span>Fastest</span><span>Lowest rate</span><span>Refill</span><span>Low minimum</span></div>
    <div className={styles.serviceCard}><span className={styles.mark}>IG</span><div><b>Instagram Followers · 365-day refill</b><small>Service ID shown · Live limits · Provider-reported timing</small><div className={styles.meta}><span>₹ rate / 1K</span><span>Min visible</span><span>Avg. time</span></div></div><button className={styles.select}>Select</button></div>
    <div className={styles.previewFoot}><div><span>Wallet</span><b>Auditable balance</b></div><div><span>Status</span><b>Supplier-linked</b></div><div><span>Support</span><b>Order-linked</b></div></div>
   </div>
  </div></section>

  <section className={styles.strip}><div className={`container ${styles.stripGrid}`}>
   <div className={styles.stripItem}><span className={styles.stripIcon}><BadgeCheck size={17}/></span><div><b>Live catalog details</b><small>Rates, limits and service IDs sync from the connected provider.</small></div></div>
   <div className={styles.stripItem}><span className={styles.stripIcon}><CreditCard size={17}/></span><div><b>Cashfree hosted checkout</b><small>Wallet funding happens on Cashfree; MANGLO does not store payment credentials.</small></div></div>
   <div className={styles.stripItem}><span className={styles.stripIcon}><ShieldCheck size={17}/></span><div><b>Tracked wallet outcomes</b><small>Order debits and eligible refunds are written to the wallet ledger.</small></div></div>
  </div></section>

  <section className={styles.section}><div className="container">
   <div className={styles.sectionHead}><div><span>PICK A PLATFORM</span><h2>One marketplace. Clear choices.</h2></div><p>Start with the platform you care about, then filter the live catalog by rate, timing, refill availability or minimum quantity.</p></div>
   <div className={styles.platformGrid}>{platforms.map(platform=><Link href={`/services?platform=${platform.name}`} className={styles.platform} key={platform.name}><span className={`${styles.platformMark} ${styles[platform.tone]}`}>{platform.mark}</span><div><b>{platform.name}</b><small>{platform.items}</small></div><ArrowRight size={16}/></Link>)}</div>
  </div></section>

  <section className={styles.darkSection}><div className={`container ${styles.darkGrid}`}>
   <div><span className={styles.eyebrow}>HOW MANGLO WORKS</span><h2>Simple on the surface. Serious underneath.</h2><p>The customer experience stays clean while the backend handles wallet accounting, provider order mapping and status reconciliation.</p><Link className={styles.ghost} href="/services">Browse live services <ArrowRight size={15}/></Link></div>
   <div className={styles.steps}>
    <div className={styles.step}><span>01</span><div><h3>Discover</h3><p>Search the curated marketplace instead of scrolling through raw supplier-style dropdowns.</p></div></div>
    <div className={styles.step}><span>02</span><div><h3>Review</h3><p>See the original service ID, rate, limits, timing and refill listing before confirmation.</p></div></div>
    <div className={styles.step}><span>03</span><div><h3>Order</h3><p>MANGLO validates the service, quantity and wallet balance again on the server.</p></div></div>
    <div className={styles.step}><span>04</span><div><h3>Track</h3><p>Supplier status is reconciled into simple MANGLO states such as Growing, Completed and Refunded.</p></div></div>
   </div>
  </div></section>

  <section className={styles.section}><div className="container">
   <div className={styles.sectionHead}><div><span>BUILT FOR TRUST</span><h2>A product, not a raw panel.</h2></div><p>MANGLO is designed to expose the information customers need while keeping infrastructure complexity and supplier credentials server-side.</p></div>
   <div className={styles.promiseGrid}>
    <article className={styles.promise}><span className={styles.promiseIcon}><ShieldCheck size={19}/></span><h3>Server-side controls</h3><p>Provider keys, payment secrets and supplier calls stay on the server. Order values are validated again before money moves.</p></article>
    <article className={styles.promise}><span className={styles.promiseIcon}><CreditCard size={19}/></span><h3>Cashfree payment flow</h3><p>Customers complete wallet top-ups on Cashfree hosted checkout. MANGLO does not collect card numbers, CVV, UPI PINs or banking credentials.</p></article>
    <article className={styles.promise}><span className={styles.promiseIcon}><Zap size={19}/></span><h3>Live fulfilment states</h3><p>Orders are linked to supplier order IDs and reconciled in the background so the dashboard can move from Growing to Completed automatically.</p></article>
   </div>
  </div></section>

  <section className={`container ${styles.cta}`}><div><span>READY WHEN YOU ARE</span><h2>What are we growing today?</h2></div><Link href="/services">Explore live services <ArrowRight size={15}/></Link></section>
 </main>;
}
