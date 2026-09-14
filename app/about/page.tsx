import Link from 'next/link';
import {Activity,ArrowRight,BadgeCheck,CircleCheckBig,ExternalLink,Eye,HeartHandshake,Instagram,Layers3,LockKeyhole,Search,ShieldCheck,Sparkles,WalletCards} from 'lucide-react';
import {company} from '@/lib/company';
import AboutMotion from './AboutMotion';
import styles from './About.module.css';

export const metadata={
 title:'About MANGLO',
 description:'Why MANGLO exists, how its marketplace and supplier-health systems work, and the story of founder Faik Hameed Mulla.',
 alternates:{canonical:'/about'},
 openGraph:{title:'About MANGLO',description:'The story, principles and founder behind MANGLO.',url:'/about',type:'website'},
};

const founderInstagram='https://www.instagram.com/myself.fm?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==';
const mangloInstagram='https://www.instagram.com/manglo.shop?stkn=MXZ2Zjdhc3NvN2h2dQ==';
const founderX='https://x.com/faikmulla';

export default function Page(){
 return <main className={styles.page}>
  <AboutMotion/>

  <section className={styles.hero}>
   <div className={styles.shell}>
    <div className={styles.heroGrid}>
     <div data-about-reveal>
      <span className={styles.eyebrow}>ABOUT MANGLO</span>
      <h1>Growth services should feel <span>clear, not chaotic.</span></h1>
      <p className={styles.heroLead}>MANGLO is a digital-growth marketplace built to turn confusing supplier panels into a simpler customer experience: understandable services, visible pricing, server-validated orders, protected wallet flows and support that stays connected to the order.</p>
      <div className={styles.heroActions}>
       <Link href="/services" className={styles.primary}>Explore live services <ArrowRight size={16}/></Link>
       <a href={mangloInstagram} target="_blank" rel="noreferrer" className={styles.secondary}><Instagram size={16}/> Follow @manglo.shop</a>
      </div>
      <div className={styles.heroTrust}>
       <span>Live synchronized catalog</span><span>Wallet-first checkout</span><span>Supplier-health learning</span><span>Order-linked support</span>
      </div>
     </div>

     <div className={styles.crystalScene} data-about-reveal>
      <div className={styles.crystalCore}>
       <div className={styles.brandOrb}><img src="/manglo-icon.png?v=about-20260915" alt="MANGLO icon"/></div>
      </div>
      <div className={`${styles.floatCard} ${styles.f1}`}><Search size={15}/> Find the right service</div>
      <div className={`${styles.floatCard} ${styles.f2}`}><ShieldCheck size={15}/> Validate before order</div>
      <div className={`${styles.floatCard} ${styles.f3}`}><Activity size={15}/> Learn from outcomes</div>
      <div className={`${styles.floatCard} ${styles.f4}`}><WalletCards size={15}/> Protect the wallet</div>
     </div>
    </div>
   </div>
  </section>

  <section className={`${styles.section} ${styles.sectionTint}`}>
   <div className={styles.shell}>
    <header className={styles.sectionHead} data-about-reveal>
     <span className={styles.index}>01 / WHY</span>
     <div><h2 className={styles.sectionTitle}>Buying a simple service should not require learning someone else&apos;s panel.</h2><p className={styles.sectionCopy}>The category is full of dense lists, supplier language, unclear pricing and services that look interchangeable even when their real performance is not. MANGLO exists to put the decision-making layer in front of that complexity.</p></div>
    </header>
    <div className={styles.originGrid}>
     <article className={styles.storyCard} data-about-reveal><span className={styles.cardNo}>THE OBSERVATION</span><h3>The choice was harder than the purchase.</h3><p>Customers could find hundreds of listings but still struggle to understand which service matched the platform, destination and outcome they actually wanted.</p></article>
     <article className={`${styles.storyCard} ${styles.delay1}`} data-about-reveal><span className={styles.cardNo}>THE PRODUCT QUESTION</span><h3>What if the marketplace did more of the thinking?</h3><p>Instead of exposing supplier complexity directly, MANGLO can organize the catalog, validate orders and increasingly rank services using real fulfilment outcomes.</p></article>
     <article className={`${styles.storyCard} ${styles.delay2}`} data-about-reveal><span className={styles.cardNo}>THE STANDARD</span><h3>Simple in front. Accountable behind it.</h3><p>A polished interface is useful only when pricing, wallet debits, provider status, refunds and support remain consistent underneath it.</p></article>
    </div>
   </div>
  </section>

  <section className={styles.section}>
   <div className={styles.shell}>
    <header className={styles.sectionHead} data-about-reveal>
     <span className={styles.index}>02 / ONE ORDER</span>
     <div><h2 className={styles.sectionTitle}>What happens behind one customer decision.</h2><p className={styles.sectionCopy}>The customer sees a straightforward order flow. Behind that flow, MANGLO performs several checks so the service, price, destination and provider state stay connected.</p></div>
    </header>
    <div className={styles.orderFlow}>
     <article className={styles.flowItem} data-about-reveal><span className={styles.flowIcon}><Search size={18}/></span><small>01</small><b>Choose a live service</b><p>Browse the synchronized marketplace by platform, category, price and provider-reported details.</p></article>
     <article className={`${styles.flowItem} ${styles.delay1}`} data-about-reveal><span className={styles.flowIcon}><CircleCheckBig size={18}/></span><small>02</small><b>Validate the order</b><p>Quantity, destination format, current rate and catalog freshness are checked again before submission.</p></article>
     <article className={`${styles.flowItem} ${styles.delay2}`} data-about-reveal><span className={styles.flowIcon}><WalletCards size={18}/></span><small>03</small><b>Protect the wallet</b><p>The wallet debit is recorded through an auditable ledger before the supplier transaction is reconciled.</p></article>
     <article className={`${styles.flowItem} ${styles.delay3}`} data-about-reveal><span className={styles.flowIcon}><Activity size={18}/></span><small>04</small><b>Track fulfilment</b><p>MANGLO reconciles provider status into customer-friendly order states and handles eligible refunds idempotently.</p></article>
     <article className={styles.flowItem} data-about-reveal><span className={styles.flowIcon}><BadgeCheck size={18}/></span><small>05</small><b>Learn from the outcome</b><p>Completed and failed outcomes feed the supplier-health layer so repeated failures can be pushed down or quarantined.</p></article>
    </div>
   </div>
  </section>

  <section className={`${styles.section} ${styles.sectionTint}`}>
   <div className={styles.shell}>
    <header className={styles.sectionHead} data-about-reveal>
     <span className={styles.index}>03 / RELIABILITY</span>
     <div><h2 className={styles.sectionTitle}>Trust has to exist in the system, not just the copy.</h2><p className={styles.sectionCopy}>MANGLO is being built around the less glamorous work that makes a marketplace dependable: fresh supplier data, safe money movement, explicit failure handling and evidence-based service ranking.</p></div>
    </header>
    <div className={styles.engine}>
     <div className={styles.engineVisual} data-about-reveal>
      <span className={styles.engineBadge}><Sparkles size={14}/> MANGLO SUPPLIER HEALTH</span>
      <h3>Every outcome should make the next recommendation smarter.</h3>
      <p>Successful fulfilment strengthens a service&apos;s standing. Repeated cancellations and failures lower confidence and can automatically remove a service from customer ordering.</p>
      <div className={styles.signal} aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
     </div>
     <div className={styles.engineList}>
      <article className={styles.engineItem} data-about-reveal><span><Layers3 size={20}/></span><div><h4>Fresh synchronized catalog</h4><p>Customer-facing services come from the current supplier catalog and stale catalog data can fail closed instead of silently drifting.</p></div></article>
      <article className={styles.engineItem} data-about-reveal><span><LockKeyhole size={20}/></span><div><h4>Server-side provider credentials</h4><p>Supplier credentials and provider integrations stay on the server instead of being exposed in the customer browser.</p></div></article>
      <article className={styles.engineItem} data-about-reveal><span><WalletCards size={20}/></span><div><h4>Audited wallet movement</h4><p>Order debits, deposits and refunds are recorded with idempotency controls so repeated requests cannot casually duplicate money movement.</p></div></article>
      <article className={styles.engineItem} data-about-reveal><span><Activity size={20}/></span><div><h4>Outcome-based service ranking</h4><p>Real completed, partial and failed orders feed a health score so “Recommended” can increasingly reflect actual MANGLO experience rather than a static label.</p></div></article>
     </div>
    </div>
   </div>
  </section>

  <section className={styles.section}>
   <div className={styles.shell}>
    <header className={styles.sectionHead} data-about-reveal>
     <span className={styles.index}>04 / PRINCIPLES</span>
     <div><h2 className={styles.sectionTitle}>How we decide what belongs in MANGLO.</h2></div>
    </header>
    <div className={styles.principlesGrid}>
     <article className={styles.principle} data-about-reveal><span className={styles.cardNo}>01</span><h3>Clarity before checkout.</h3><p>Customers should understand the current price, limits and service context before spending wallet balance.</p></article>
     <article className={styles.principle} data-about-reveal><span className={styles.cardNo}>02</span><h3>Reliability is a feature.</h3><p>Beautiful screens matter less than dependable ordering, reconciliation and refunds.</p></article>
     <article className={styles.principle} data-about-reveal><span className={styles.cardNo}>03</span><h3>Evidence beats labels.</h3><p>Supplier wording is not the same as proof. MANGLO should learn from its own fulfilment outcomes.</p></article>
     <article className={styles.principle} data-about-reveal><span className={styles.cardNo}>04</span><h3>Complexity stays behind the product.</h3><p>The customer should not need to understand supplier APIs, reconciliation jobs or ledger mechanics.</p></article>
     <article className={styles.principle} data-about-reveal><span className={styles.cardNo}>05</span><h3>No impossible promises.</h3><p>MANGLO does not promise virality, permanent results or immunity from third-party platform rules.</p></article>
    </div>
   </div>
  </section>

  <section className={`${styles.section} ${styles.sectionTint}`}>
   <div className={styles.shell}>
    <div className={styles.founderWrap}>
     <div className={styles.portraitShell} data-about-reveal>
      <div className={styles.portraitFrame}><img src="/founder_owner.jpg?v=20260915" alt="Faik Hameed Mulla, Founder of MANGLO"/></div>
      <span className={styles.founderTag}>Founder / Owner</span>
     </div>
     <div className={styles.founderCopy} data-about-reveal>
      <span className={styles.role}>05 / FOUNDER · FAIK HAMEED MULLA</span>
      <h2>Building internet products that make difficult workflows feel simpler.</h2>
      <p><strong>Faik Hameed Mulla</strong> is the Founder of MANGLO and an entrepreneur and product builder focused on turning complex internet workflows into practical businesses and products people can actually use.</p>
      <p>He has built and operates <strong>ClipKaro</strong>, a live AI-powered creator platform, and <strong>Fazzcart</strong>, a live e-commerce business selling physical products, alongside MANGLO. ClipKaro and Fazzcart are active, revenue-generating businesses. Across them, his focus is consistent: combine product design, software, automation, commerce and execution to create useful experiences that feel much simpler than the systems behind them.</p>
      <p>While pursuing Artificial Intelligence and Machine Learning, Faik continues building across AI products, e-commerce and workflow automation. MANGLO reflects that approach: customer simplicity in front, serious operational controls behind it, and constant iteration from real usage.</p>
      <div className={styles.ventureChips}><span>MANGLO</span><span>ClipKaro</span><span>Fazzcart</span><span>AI / ML products</span><span>Internet businesses</span></div>
      <div className={styles.socials}>
       <a className={styles.socialButton} href={founderInstagram} target="_blank" rel="noreferrer"><Instagram size={15}/> Founder Instagram <ExternalLink size={13}/></a>
       <a className={styles.socialButton} href={founderX} target="_blank" rel="noreferrer">X / Twitter · @faikmulla <ExternalLink size={13}/></a>
       <a className={styles.socialButton} href={mangloInstagram} target="_blank" rel="noreferrer"><Instagram size={15}/> MANGLO Instagram <ExternalLink size={13}/></a>
      </div>
     </div>
    </div>
   </div>
  </section>

  <section className={styles.section}>
   <div className={styles.shell}>
    <header className={styles.sectionHead} data-about-reveal>
     <span className={styles.index}>06 / WHAT COMES NEXT</span>
     <div><h2 className={styles.sectionTitle}>The future is not a bigger list of services. It is a better decision layer.</h2><p className={styles.sectionCopy}>MANGLO is moving toward a marketplace where catalog intelligence, supplier performance, customer history and automation work together so customers spend less time comparing noise and more time making confident decisions.</p></div>
    </header>
    <div className={styles.futureGrid}>
     <article className={styles.futureCard} data-about-reveal><small>01</small><h3>Understand intent</h3><p>Help customers reach the right service for the platform, destination and outcome they actually mean.</p></article>
     <article className={styles.futureCard} data-about-reveal><small>02</small><h3>Prefer proven reliability</h3><p>Use real fulfilment history to make recommendations increasingly evidence-led instead of static.</p></article>
     <article className={styles.futureCard} data-about-reveal><small>03</small><h3>Make growth operations calmer</h3><p>Keep ordering, wallet management, tracking, support and AI assistance connected in one account.</p></article>
    </div>
   </div>
  </section>

  <section className={styles.closing}>
   <div className={styles.shell}>
    <div className={styles.closingCard} data-about-reveal>
     <span className={styles.eyebrow}>MANGLO · BUILT TO KEEP GETTING SMARTER</span>
     <h2>Jo chahiye, Manglo.</h2>
     <p>MANGLO is operated by {company.legalName}. Explore the live marketplace, review the service details yourself and order only when the current price, destination and terms make sense for you.</p>
     <div className={styles.closingActions}><Link href="/services" className={styles.primary}>Explore MANGLO <ArrowRight size={16}/></Link><Link href="/trust" className={styles.secondary}>How orders & payments work <ShieldCheck size={15}/></Link></div>
     <div className={styles.signature}>Built with ambition in India. Designed around trust, clarity and continuous improvement.</div>
    </div>
   </div>
  </section>
 </main>
}
