import Link from 'next/link';
import {ArrowRight,CheckCircle2,CreditCard,MessageSquareText,Search,ShieldCheck,Wallet} from 'lucide-react';
import styles from './Home.module.css';

const platforms=['Instagram','YouTube','TikTok','Telegram','Facebook','X'];

export default function Home(){
 return <main className={styles.home}>
  <section className={styles.hero}><div className={`container ${styles.heroGrid}`}>
   <div className={styles.heroCopy}>
    <span className={styles.eyebrow}>MANGLO AI · SOCIAL GROWTH COMMERCE</span>
    <h1>Tell MANGLO what you want to grow.</h1>
    <p>Instead of searching thousands of listings, describe the outcome in your own words. MANGLO AI uses the live catalog to find exact service IDs, compare rates and limits, prepare a wallet quote, and hand the final order to MANGLO’s transaction engine.</p>
    <div className={styles.actions}><Link className={styles.primary} href="/dashboard">Open MANGLO AI <ArrowRight size={16}/></Link><Link className={styles.ghost} href="/services">Browse services</Link></div>
    <div className={styles.trustLine}><span><ShieldCheck size={14}/>Live data is server-verified</span><span><CreditCard size={14}/>Cashfree hosted checkout</span><span><Wallet size={14}/>Explicit wallet confirmation</span></div>
   </div>

   <div className={styles.aiPreview}>
    <div className={styles.aiTop}><div><span className={styles.aiMark}>M</span><div><b>MANGLO AI</b><small>Grok-powered · live tools</small></div></div><span className={styles.live}>LIVE</span></div>
    <div className={styles.chat}>
     <div className={styles.userBubble}>I need the cheapest Instagram views. Show me good options.</div>
     <div className={styles.aiRow}><span className={styles.miniMark}>M</span><div><p>I’ll compare the live Instagram views catalog by rate and show the exact IDs, minimums and provider-reported timing.</p><div className={styles.resultCard}><div><b>Instagram Views</b><span>Exact service ID</span></div><div className={styles.resultMeta}><span>Live rate / 1K</span><span>Min & max</span><span>Avg. time</span></div></div></div></div>
    </div>
    <div className={styles.composer}><MessageSquareText size={17}/><span>Ask MANGLO anything about the live catalog…</span><i><ArrowRight size={14}/></i></div>
    <div className={styles.promptRow}><span>Cheapest views</span><span>Followers with refill</span><span>Track my order</span></div>
   </div>
  </div></section>

  <section className={styles.controlStrip}><div className={`container ${styles.controlGrid}`}>
   <article><span><Search size={16}/></span><div><b>AI discovery</b><small>Grok searches MANGLO’s live service data instead of guessing.</small></div></article>
   <article><span><ShieldCheck size={16}/></span><div><b>Deterministic checkout</b><small>Service, limits, price and wallet balance are revalidated before money moves.</small></div></article>
   <article><span><CreditCard size={16}/></span><div><b>Cashfree funding</b><small>Wallet top-ups complete on Cashfree hosted checkout.</small></div></article>
  </div></section>

  <section className={styles.section}><div className="container">
   <div className={styles.sectionHead}><div><span>HOW IT WORKS</span><h2>Conversation for discovery. Infrastructure for execution.</h2></div><p>The AI makes the catalog easy to use. The transaction engine remains authoritative for pricing, wallet debits, supplier submission and tracking.</p></div>
   <div className={styles.flow}>
    <article><em>01</em><h3>Ask naturally</h3><p>“I need 1,000 Instagram views, cheapest available.” No category hunting or supplier-style dropdowns.</p></article>
    <article><em>02</em><h3>Compare live services</h3><p>MANGLO AI returns exact IDs, current customer rates, minimums, maximums, timing and refill data.</p></article>
    <article><em>03</em><h3>Review the wallet quote</h3><p>Quantity and destination are validated, then MANGLO calculates the exact charge and remaining balance.</p></article>
    <article><em>04</em><h3>Confirm & track</h3><p>The final order goes through MANGLO’s deterministic order engine and appears in Orders with supplier-linked status.</p></article>
   </div>
  </div></section>

  <section className={styles.dark}><div className={`container ${styles.darkGrid}`}>
   <div><span className={styles.eyebrow}>BUILT FOR TRUST</span><h2>AI never becomes the source of truth for your money.</h2><p>Recommendations come from Grok, but every sensitive fact is pulled from MANGLO’s live systems. The AI cannot invent a wallet balance, silently change an approved quote, or bypass the server-side order checks.</p><Link href="/trust" className={styles.darkLink}>Trust & safety <ArrowRight size={15}/></Link></div>
   <div className={styles.controls}><div><CheckCircle2/><span><b>Quote protection</b><small>If the live rate changes after an AI quote, checkout refuses the old amount and asks for a fresh review.</small></span></div><div><CheckCircle2/><span><b>Supplier credentials stay private</b><small>Provider keys and supplier calls remain server-side.</small></span></div><div><CheckCircle2/><span><b>Auditable wallet records</b><small>Debits, deposits and eligible refunds are recorded in the MANGLO wallet ledger.</small></span></div></div>
  </div></section>

  <section className={styles.platformSection}><div className="container"><div className={styles.sectionHead}><div><span>LIVE MARKETPLACE</span><h2>AI-first does not remove choice.</h2></div><p>Power users can still browse the complete marketplace, search by service ID, save favorites and place orders manually.</p></div><div className={styles.platforms}>{platforms.map(name=><Link href={`/services?platform=${name}`} key={name}><span>{name.slice(0,2).toUpperCase()}</span><b>{name}</b><ArrowRight size={14}/></Link>)}</div></div></section>

  <section className={`container ${styles.cta}`}><div><span>MANGLO AI</span><h2>Say what you need. Start from there.</h2></div><Link href="/dashboard">Open MANGLO AI <ArrowRight size={15}/></Link></section>
 </main>;
}
