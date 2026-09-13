import Link from 'next/link';
import {
 ArrowRight,BadgeCheck,CheckCircle2,Clock3,CreditCard,LockKeyhole,
 MessageSquareText,Search,ShieldCheck,Sparkles,Wallet
} from 'lucide-react';
import styles from './Home.module.css';

const platforms=['Instagram','YouTube','TikTok','Telegram','Facebook','X'];

export default function Home(){
 return <main className={styles.home}>
  <section className={styles.hero}>
   <div className={`container ${styles.heroGrid}`}>
    <div className={styles.heroCopy}>
     <div className={styles.eyebrow}><span/>MANGLO · SOCIAL GROWTH MARKETPLACE</div>
     <h1>Growth services,<br/><em>without the panel chaos.</em></h1>
     <p>Search a live catalog, compare the exact service terms, fund your wallet securely, and track every order from one clear account. Use MANGLO AI when you want help finding the right option faster.</p>
     <div className={styles.actions}>
      <Link className={styles.primary} href="/services">Explore live services <ArrowRight size={17}/></Link>
      <Link className={styles.secondary} href="/dashboard"><Sparkles size={16}/> Ask MANGLO AI</Link>
     </div>
     <div className={styles.assurance}>
      <span><ShieldCheck size={16}/>Server-validated checkout</span>
      <span><CreditCard size={16}/>Cashfree hosted payments</span>
      <span><BadgeCheck size={16}/>Order-linked support</span>
     </div>
    </div>

    <div className={styles.productFrame}>
     <div className={styles.frameTop}>
      <div><span className={styles.brandMark}>M</span><div><b>MANGLO</b><small>Live marketplace workspace</small></div></div>
      <span className={styles.live}><i/> LIVE CATALOG</span>
     </div>
     <div className={styles.frameBody}>
      <div className={styles.askCard}><MessageSquareText size={17}/><span>I need Instagram views with a low minimum.</span></div>
      <div className={styles.responseLine}><span className={styles.aiMark}>M</span><div><small>MANGLO AI</small><p>I found options from the live catalog. Compare the exact ID, rate, limits and listed timing before you order.</p></div></div>
      <div className={styles.serviceCard}>
       <div className={styles.serviceTop}><span className={styles.platformMark}>IG</span><div><b>Instagram Views</b><small>Live service details</small></div><BadgeCheck size={17}/></div>
       <div className={styles.metrics}><div><span>RATE / 1K</span><strong>Live</strong></div><div><span>LIMITS</span><strong>Visible</strong></div><div><span>TIMING</span><strong>Listed</strong></div></div>
       <div className={styles.quote}><div><Wallet size={16}/><span><small>Final wallet charge</small><b>Calculated before confirmation</b></span></div><ArrowRight size={16}/></div>
      </div>
     </div>
     <div className={styles.frameFoot}><LockKeyhole size={14}/><span>AI can help you choose. The order engine still rechecks the transaction.</span></div>
    </div>
   </div>
  </section>

  <section className={styles.proofStrip}>
   <div className={`container ${styles.proofGrid}`}>
    <article><Search size={18}/><div><b>Live service catalog</b><small>Search by platform, category or exact ID.</small></div></article>
    <article><Wallet size={18}/><div><b>Visible wallet ledger</b><small>Deposits, debits and eligible refunds stay recorded.</small></div></article>
    <article><Clock3 size={18}/><div><b>Order tracking</b><small>Follow supplier-linked status from your account.</small></div></article>
    <article><ShieldCheck size={18}/><div><b>Clear support context</b><small>Attach the relevant MANGLO order to a request.</small></div></article>
   </div>
  </section>

  <section className={styles.section}>
   <div className="container">
    <div className={styles.sectionHead}><div><span>HOW MANGLO WORKS</span><h2>Know what you are choosing before money moves.</h2></div><p>MANGLO separates discovery from transaction execution. You can compare naturally, but the live service record and server-side checks remain authoritative.</p></div>
    <div className={styles.steps}>
     <article><span>01</span><div className={styles.stepIcon}><Search size={20}/></div><h3>Find the right service</h3><p>Browse the marketplace or ask MANGLO AI to narrow down the live catalog based on what you need.</p></article>
     <article><span>02</span><div className={styles.stepIcon}><CheckCircle2 size={20}/></div><h3>Review the exact terms</h3><p>Check the current rate, minimum, maximum, listed timing, refill availability and destination before confirmation.</p></article>
     <article><span>03</span><div className={styles.stepIcon}><Wallet size={20}/></div><h3>Confirm from your wallet</h3><p>The server recalculates the charge and checks your balance again before the order can be submitted.</p></article>
     <article><span>04</span><div className={styles.stepIcon}><BadgeCheck size={20}/></div><h3>Track and get support</h3><p>Your order record stays in one account with status, wallet history and order-linked support when you need help.</p></article>
    </div>
   </div>
  </section>

  <section className={styles.marketSection}>
   <div className="container">
    <div className={styles.sectionHead}><div><span>LIVE MARKETPLACE</span><h2>Start with the platform you already know.</h2></div><p>No supplier-style maze. Pick a platform, search the catalog, compare the visible terms, and continue only when the service fits.</p></div>
    <div className={styles.platforms}>{platforms.map(name=><Link href={`/services?platform=${name}`} key={name}><span>{name.slice(0,2).toUpperCase()}</span><div><b>{name}</b><small>Browse live services</small></div><ArrowRight size={16}/></Link>)}</div>
    <div className={styles.marketAction}><Link href="/services">View the full marketplace <ArrowRight size={16}/></Link></div>
   </div>
  </section>

  <section className={styles.trustSection}>
   <div className={`container ${styles.trustGrid}`}>
    <div className={styles.trustCopy}><span>BUILT FOR ACCOUNTABILITY</span><h2>AI can recommend.<br/>It cannot move your money.</h2><p>MANGLO AI helps with discovery and comparison. Final service terms, wallet balance, pricing, and order submission are revalidated by MANGLO’s server-side transaction layer.</p><Link href="/trust">See how MANGLO protects the flow <ArrowRight size={16}/></Link></div>
    <div className={styles.trustCards}>
     <article><span><LockKeyhole size={18}/></span><div><b>Credentials stay private</b><p>Supplier keys and infrastructure remain server-side rather than being exposed to the browser.</p></div></article>
     <article><span><CreditCard size={18}/></span><div><b>Hosted payment flow</b><p>Wallet funding uses Cashfree hosted checkout. MANGLO does not store raw card numbers, CVV values or UPI PINs.</p></div></article>
     <article><span><ShieldCheck size={18}/></span><div><b>No impossible promises</b><p>Service outcomes depend on the selected listing and third-party platforms. MANGLO does not promise guaranteed virality or permanent results.</p></div></article>
    </div>
   </div>
  </section>

  <section className={`container ${styles.cta}`}>
   <div><span>READY WHEN YOU ARE</span><h2>Search first. Review clearly. Order when it makes sense.</h2></div>
   <div><Link className={styles.ctaPrimary} href="/services">Browse services <ArrowRight size={16}/></Link><Link className={styles.ctaSecondary} href="/auth">Create an account</Link></div>
  </section>
 </main>;
}
