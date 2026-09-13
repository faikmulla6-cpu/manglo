import Link from 'next/link';
import {ArrowRight,BadgeCheck,Clock3,CreditCard,LockKeyhole,MessageSquareText,Search,ShieldCheck,Wallet} from 'lucide-react';
import styles from './Home.module.css';

const platforms=['Instagram','YouTube','TikTok','Telegram','Facebook','X'];

export default function Home(){
 return <main className={styles.home}>
  <section className={styles.hero}>
   <div className={`container ${styles.heroGrid}`}>
    <div className={styles.heroCopy}>
     <span className={styles.eyebrow}>AI-NATIVE GROWTH COMMERCE</span>
     <h1>Ask for growth.<br/><span>MANGLO finds the service.</span></h1>
     <p>Describe the outcome in normal language. MANGLO AI searches the live catalog, compares exact service IDs, checks the current terms, calculates the wallet impact, and prepares the order for final review.</p>
     <div className={styles.actions}><Link className={styles.primary} href="/dashboard">Open MANGLO AI <ArrowRight size={16}/></Link><Link className={styles.secondary} href="/services">Browse live services</Link></div>
     <div className={styles.assurance}><span><ShieldCheck size={14}/>Server-validated ordering</span><span><CreditCard size={14}/>Cashfree hosted checkout</span><span><BadgeCheck size={14}/>Supplier-linked tracking</span></div>
    </div>

    <div className={styles.aiFrame}>
     <div className={styles.aiTop}><div><span className={styles.aiMark}>M</span><div><b>MANGLO AI</b><small><i/>Groq reasoning · live catalog</small></div></div><span className={styles.walletPill}><Wallet size={12}/>Wallet aware</span></div>
     <div className={styles.aiBody}>
      <div className={styles.userPrompt}>Find me the cheapest Instagram views.</div>
      <div className={styles.aiReply}><span className={styles.replyMark}>M</span><p>The lowest live rate is Service ID 1348. I’ve shown the strongest matching options below.</p></div>
      <div className={styles.resultCard}><span className={styles.platformMark}>IG</span><div><div className={styles.resultTitle}><b>Instagram Views · No Support</b><span>ID 1348</span></div><small>Current catalog result</small><div className={styles.resultMeta}><span>₹0.62 / 1K</span><span>Min 100</span><span>Avg. 13 min</span></div></div><button>Use ID 1348</button></div>
      <div className={styles.quoteBar}><div><LockKeyhole size={14}/><span><small>TRANSACTION BOUNDARY</small><b>AI recommends. MANGLO verifies before wallet debit.</b></span></div></div>
     </div>
     <div className={styles.composerDemo}><span>Ask MANGLO about a service, quote or order…</span><i>↑</i></div>
    </div>
   </div>
  </section>

  <section className={styles.proofStrip}><div className={`container ${styles.proofGrid}`}>
   <article><Search size={17}/><div><b>Live catalog tools</b><small>Search by intent, platform, category or exact ID.</small></div></article>
   <article><Wallet size={17}/><div><b>Wallet-aware quotes</b><small>See the exact charge and remaining balance before review.</small></div></article>
   <article><Clock3 size={17}/><div><b>Supplier-linked status</b><small>Orders reconcile from processing through completion.</small></div></article>
   <article><ShieldCheck size={17}/><div><b>Deterministic checkout</b><small>The AI does not directly move customer money.</small></div></article>
  </div></section>

  <section className={styles.section}><div className="container">
   <div className={styles.sectionHead}><div><span>HOW IT WORKS</span><h2>Conversation on top.<br/>Transaction controls underneath.</h2></div><p>MANGLO gives customers an AI-native buying experience without making the model the source of truth for rates, limits, wallet balances or order execution.</p></div>
   <div className={styles.steps}>
    <article><span>01</span><MessageSquareText size={19}/><h3>Say what you want</h3><p>Ask for views, followers, subscribers, refill, the lowest rate, the fastest listed average, or an exact service ID.</p></article>
    <article><span>02</span><Search size={19}/><h3>AI checks the live catalog</h3><p>Groq decides which MANGLO tools to use. Catalog data, IDs, rates and limits come from MANGLO—not model memory.</p></article>
    <article><span>03</span><Wallet size={19}/><h3>Review the exact quote</h3><p>MANGLO calculates the current charge, checks your wallet, and shows the expected balance after the order.</p></article>
    <article><span>04</span><BadgeCheck size={19}/><h3>Confirm and track</h3><p>The server validates the transaction again, submits the order, and keeps the customer-facing status synchronized.</p></article>
   </div>
  </div></section>

  <section className={styles.marketSection}><div className="container">
   <div className={styles.sectionHead}><div><span>LIVE MARKETPLACE</span><h2>Prefer to browse? The catalog is still yours.</h2></div><p>AI is the fastest path, not the only path. Every live service remains searchable by platform, category and service ID.</p></div>
   <div className={styles.platforms}>{platforms.map(name=><Link href={`/services?platform=${name}`} key={name}><span>{name.slice(0,2).toUpperCase()}</span><div><b>{name}</b><small>Explore live services</small></div><ArrowRight size={14}/></Link>)}</div>
  </div></section>

  <section className={styles.trustSection}><div className={`container ${styles.trustGrid}`}>
   <div className={styles.trustCopy}><span>BUILT FOR TRUST</span><h2>AI convenience without handing AI the wallet.</h2><p>MANGLO separates recommendation from execution. The model can search, compare and prepare; the transaction engine rechecks the service, current rate, quantity, wallet balance and final charge.</p><Link href="/trust">See the trust architecture <ArrowRight size={15}/></Link></div>
   <div className={styles.trustCards}>
    <article><LockKeyhole size={18}/><div><b>Secrets remain server-side</b><p>Supplier API credentials, payment secrets and internal provider data are never exposed in the browser or AI conversation.</p></div></article>
    <article><CreditCard size={18}/><div><b>Cashfree hosted payment flow</b><p>Wallet funding happens through Cashfree hosted checkout. MANGLO does not store raw card numbers, CVV values or UPI PINs.</p></div></article>
    <article><ShieldCheck size={18}/><div><b>Clear limits on claims</b><p>Provider-listed descriptions are presented as listings—not guarantees of virality, permanence or outcomes controlled by social platforms.</p></div></article>
   </div>
  </div></section>

  <section className={`container ${styles.cta}`}><div><span>START WITH A SENTENCE</span><h2>Tell MANGLO what you want to grow.</h2></div><div><Link className={styles.ctaPrimary} href="/dashboard">Open MANGLO AI <ArrowRight size={15}/></Link><Link className={styles.ctaSecondary} href="/services">Browse services</Link></div></section>
 </main>;
}
