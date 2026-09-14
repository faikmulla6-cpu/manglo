import Link from 'next/link';
import {
 ArrowRight,Activity,BadgeIndianRupee,Ban,Bot,CheckCircle2,Copyright,FileText,Gift,
 Gavel,Link2,LockKeyhole,Mail,RefreshCcw,Scale,ShieldCheck,Store,UserRoundCheck,WalletCards,
} from 'lucide-react';
import {company} from '@/lib/company';
import TermsMotion from './TermsMotion';
import styles from './Terms.module.css';

export const metadata={
 title:'Terms & Conditions',
 description:'The terms governing MANGLO accounts, live social-growth services, wallet funding, orders, supplier processing, refunds, referrals, AI assistance and acceptable use.',
};

const summaries=[
 {Icon:UserRoundCheck,title:'Your account, your responsibility',text:'Keep your credentials secure, provide accurate information and use MANGLO only for lawful purposes.'},
 {Icon:Store,title:'Live marketplace, changing supply',text:'Service prices, limits, speed, availability and refill status can change when upstream supply changes.'},
 {Icon:WalletCards,title:'Money movements stay traceable',text:'Wallet deposits, order debits and eligible refunds are recorded in your MANGLO account.'},
 {Icon:ShieldCheck,title:'Controls before and after an order',text:'MANGLO revalidates price, quantity and destination, then tracks provider outcomes and service health.'},
];

const sections=[
 {
  title:'Agreement to these Terms',label:'The contract',
  body:<><p>These Terms & Conditions govern your use of MANGLO, operated by {company.legalName}. By accessing MANGLO, creating an account, funding a wallet, placing an order, using MANGLO AI, opening a support request or otherwise using the service, you agree to these Terms and the policies linked from this website.</p><p>If you do not agree, do not use MANGLO. You must be legally capable of entering this agreement under the law that applies to you, or use MANGLO with the authority required by that law.</p></>,
 },
 {
  title:'Accounts and account security',label:'Access',
  body:<><p>You are responsible for the activity performed through your account and for keeping your login credentials confidential. Use accurate account information and keep your email address accessible because account verification and password recovery depend on it.</p><p>If you believe your account has been accessed without permission, contact support promptly. MANGLO may limit or refuse access where reasonably necessary to protect customers, the service, payment integrity, supplier systems, or to comply with law.</p></>,
 },
 {
  title:'What MANGLO provides',label:'Marketplace',
  body:<><p>MANGLO is a marketplace and management layer for third-party digital social-growth services. Listings can include services for platforms such as Instagram, YouTube, TikTok, Telegram and X. The underlying delivery is dependent on third-party suppliers and the relevant social platform.</p><p>Service names, categories, estimated speed, minimums, maximums, refill labels and other provider-supplied information are descriptive marketplace information—not guarantees of a particular result. References to third-party platforms do not imply sponsorship, endorsement or affiliation.</p></>,
 },
 {
  title:'Live pricing, limits and availability',label:'Before checkout',
  body:<><p>Prices are shown in Indian rupees unless stated otherwise. Supplier rates, customer prices, quantity limits and availability may change as the live catalog changes. MANGLO checks the current service record before accepting an order.</p><p>If the live price changes after you viewed a quote, MANGLO can require you to review the updated amount before the order is accepted. A service that is stale, paused, quarantined or otherwise unavailable cannot be ordered through the normal transaction flow.</p></>,
 },
 {
  title:'Destination links and order instructions',label:'Your input',
  body:<><p>You must provide the correct public destination and quantity for the service you select. MANGLO validates obvious destination mismatches for supported platforms—for example, a follower service may require a profile or channel rather than a post.</p><p>Validation reduces avoidable mistakes but cannot prove that every destination is eligible for every upstream supplier. You remain responsible for confirming that the target is correct, public where required, and permitted under applicable law and the relevant platform rules.</p></>,
 },
 {
  title:'Order submission and supplier processing',label:'After confirmation',
  body:<><p>Once confirmed, an order may be submitted to the connected supplier immediately. MANGLO records its own public order ID and, where available, the supplier-linked order ID and status. Provider information is translated into simpler MANGLO states for your dashboard.</p><p>Once processing begins, changing the destination, quantity or service may not be technically possible. Do not place a duplicate replacement order merely because a supplier response is delayed. Where submission is uncertain, MANGLO can hold the order for verification rather than blindly submit it a second time.</p></>,
 },
 {
  title:'Service health and automatic quarantine',label:'Supplier quality',
  body:<><p>MANGLO may rank, lower, hide or pause supplier services using recent completed, partial, failed and refunded outcomes together with operator controls. Repeatedly failing services can be automatically quarantined from customer ordering.</p><p>A health score is an internal quality signal based on recent MANGLO history. It helps reduce exposure to poor supplier performance, but it does not guarantee future completion, speed, retention or availability.</p></>,
 },
 {
  title:'Cancellations, failures, partial delivery and refunds',label:'Order outcomes',
  body:<><p>Orders already processing may not be cancellable on request because the upstream work may have started. If a supplier definitively rejects a new submission, or later reports an eligible <strong>Canceled</strong> or <strong>Failed</strong> outcome, MANGLO can restore the eligible order debit to the MANGLO Wallet automatically.</p><p>If a supplier reports <strong>Partial</strong> delivery with a measurable undelivered quantity, MANGLO can calculate an eligible proportional wallet refund for that undelivered portion. Refund handling, payment reversals and exceptions are explained in the <Link href="/refund">Refund & Cancellation Policy</Link>.</p></>,
 },
 {
  title:'Refills and retention',label:'Service-specific',
  body:<><p>A refill is available only when the listing/provider supports it and the relevant refill conditions are satisfied. A refill label is not a promise of permanent retention, and a refill request is not the same as a cash refund.</p><p>Social platforms may remove accounts, posts, views, followers, likes or other activity for reasons outside MANGLO’s control. Platform-side changes can affect delivery and retention even after a supplier marks an order completed.</p></>,
 },
 {
  title:'Wallet and payments',label:'Money',
  body:<><p>The MANGLO Wallet is an account balance used for purchases on MANGLO. Wallet funding is credited only after server-side payment confirmation. MANGLO currently does not provide a general cash-withdrawal feature for wallet balances or promotional credits, except where a different outcome is required by applicable law.</p><p>Deposits, order debits and eligible order refunds are recorded as separate wallet entries. A bank, card or UPI reversal is different from a MANGLO Wallet refund. Payment-specific situations are covered in the <Link href="/refund">Refund & Cancellation Policy</Link>.</p></>,
 },
 {
  title:'Referral and promotional credits',label:'Promotions',
  body:<><p>MANGLO may offer referral or promotional wallet credits subject to the rules shown for that program. Referral attribution, qualifying-order requirements, reward limits and margin safeguards may apply. Rewards are generally MANGLO Wallet credits rather than cash.</p><p>Self-referrals, duplicate or coordinated accounts, fabricated activity, manipulation of attribution, or other attempts to obtain rewards dishonestly may be rejected, withheld or reversed where permitted by law.</p></>,
 },
 {
  title:'MANGLO AI',label:'Optional assistance',
  body:<><p>MANGLO AI is an optional assistant for navigating the live catalog, comparing services and preparing a quote or next step. AI output may be incomplete or wrong and is not a guarantee of supplier performance or platform outcome.</p><p>The normal transaction engine—not the AI response—controls final service availability, destination validation, price, quantity, wallet balance and order submission. You should review the actual service details before confirming an order.</p></>,
 },
 {
  title:'Acceptable use',label:'What is not allowed',
  body:<><p>You must use MANGLO lawfully and responsibly. You may not use the service for fraud, impersonation, harassment, illegal activity, infringement, attempts to compromise MANGLO or its suppliers, deceptive political activity, payment abuse, credential theft, automated abuse, or any activity that violates rights of others.</p><p>You must also respect the rules and restrictions of the social platform connected to the destination you submit. MANGLO may refuse orders or restrict access where use creates security, legal, fraud or abuse risk.</p></>,
 },
 {
  title:'Third-party platforms and suppliers',label:'Dependencies',
  body:<><p>MANGLO does not control social platforms, payment networks or upstream service providers. They may change APIs, pricing, eligibility, algorithms, policies, delivery capacity or availability without MANGLO’s control.</p><p>Accordingly, MANGLO does not guarantee virality, revenue, follower retention, permanent metrics, “ban-proof” results, a particular delivery time, platform eligibility or uninterrupted availability. Provider-reported timings are estimates unless a listing expressly says otherwise.</p></>,
 },
 {
  title:'MANGLO content and intellectual property',label:'Ownership',
  body:<><p>The MANGLO name, branding, website design, software, original interface elements and MANGLO-created content are protected by applicable intellectual-property laws. You may use the website for its intended customer purposes but may not copy, scrape, reverse engineer, resell access to, or misuse protected MANGLO materials except where law permits.</p><p>Third-party names, logos and trademarks belong to their respective owners and are used only to identify the relevant platform or service context.</p></>,
 },
 {
  title:'Availability, changes and maintenance',label:'Service operation',
  body:<><p>MANGLO may update, improve, remove or temporarily interrupt parts of the service for maintenance, supplier changes, security, fraud prevention, legal compliance or product development. We may also change which supplier services are available as quality data changes.</p><p>We aim to keep customer-facing information current, but no online service can be promised to operate without interruption or error at all times.</p></>,
 },
 {
  title:'Responsibility and liability boundaries',label:'Legal limits',
  body:<><p>You are responsible for the links, accounts, content and instructions you submit and for deciding whether a service is appropriate for your use. To the maximum extent permitted by applicable law, MANGLO is not responsible for indirect or consequential losses caused by third-party platform changes, supplier interruptions or results outside MANGLO’s reasonable control.</p><p>Nothing in these Terms excludes, restricts or overrides any liability, consumer right, refund right or remedy that applicable law does not allow to be excluded or restricted.</p></>,
 },
 {
  title:'Related policies and changes to these Terms',label:'Keep informed',
  body:<><p>These Terms should be read together with the <Link href="/privacy">Privacy Policy</Link>, <Link href="/refund">Refund & Cancellation Policy</Link> and <Link href="/trust">Trust & Safety</Link> page. If a specific promotion or feature publishes additional terms, those additional terms apply to that feature together with these Terms.</p><p>MANGLO may update these Terms when the product, law or operating model changes. Material updates will be published on this page with a revised effective date. Continued use after an update means the revised Terms apply from the point permitted by law.</p></>,
 },
 {
  title:'Questions, complaints and disputes',label:'Contact',
  body:<><p>If you have a question about these Terms or a problem with an order, start with MANGLO support so the correct account, payment or order context can be reviewed. Order-linked support is available from your dashboard.</p><p>You can also contact <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>. These Terms remain subject to applicable law and any mandatory consumer or dispute-resolution rights that apply to you.</p></>,
 },
];

export default function TermsPage(){
 return <main className={styles.page}>
  <TermsMotion/>
  <section className={styles.hero}>
   <div className={`${styles.container} ${styles.heroGrid}`}>
    <div data-terms-reveal>
     <span className={styles.kicker}><span className={styles.kickerDot}/>Terms & Conditions</span>
     <h1>Clear rules for a <span>real marketplace.</span></h1>
     <p className={styles.lead}>These Terms explain the agreement behind your MANGLO account, wallet, live services, supplier-linked orders, refunds, referrals and optional AI assistance—without hiding the important parts behind vague legal language.</p>
     <div className={styles.metaRow}>
      <span className={styles.metaPill}><FileText/>Effective {company.effectiveDate}</span>
      <span className={styles.metaPill}><BadgeIndianRupee/>Wallet in INR</span>
      <span className={styles.metaPill}><LockKeyhole/>Server-validated orders</span>
     </div>
     <div className={styles.heroActions}>
      <Link className={styles.primary} href="/services">Explore services <ArrowRight size={15}/></Link>
      <Link className={styles.secondary} href="/contact">Ask a question</Link>
     </div>
    </div>
    <div className={styles.heroVisual} data-terms-reveal>
     <div className={styles.orb}/>
     <div className={styles.document}>
      <div className={styles.docTop}><div className={styles.docLogo}><span>M</span><span>MANGLO</span></div><span className={styles.docBadge}>Clear terms</span></div>
      <div className={styles.docTitle}>Terms built around how the product actually works.</div>
      <div className={styles.docLine}/><div className={styles.docLine}/><div className={styles.docLine}/>
      <div className={styles.docRule}><span className={styles.docRuleIcon}><CheckCircle2/></span><div><b>Price and destination rechecked</b><small>Before the transaction engine accepts an order.</small></div></div>
      <div className={styles.docRule}><span className={styles.docRuleIcon}><Activity/></span><div><b>Supplier outcomes matter</b><small>Recent completions and failures influence service health.</small></div></div>
     </div>
     <span className={`${styles.floatChip} ${styles.chipOne}`}><Scale/> Rights stay clear</span>
     <span className={`${styles.floatChip} ${styles.chipTwo}`}><ShieldCheck/> No fake guarantees</span>
    </div>
   </div>
  </section>

  <section className={styles.summary}>
   <div className={styles.container}>
    <div className={styles.summaryGrid}>{summaries.map(({Icon,title,text})=><article className={styles.summaryCard} key={title} data-terms-reveal><span className={styles.summaryIcon}><Icon/></span><b>{title}</b><p>{text}</p></article>)}</div>
    <div className={styles.notice} data-terms-reveal><b>Plain-language note:</b> the cards and visual summaries make these Terms easier to understand, but the complete numbered sections below are the agreement that governs your use of MANGLO.</div>
   </div>
  </section>

  <section className={styles.body}>
   <div className={`${styles.container} ${styles.bodyGrid}`}>
    <aside className={styles.side} data-terms-reveal>
     <div className={styles.sideCard}><span>Agreement map</span><h2>Everything connected.</h2><p>Account → live catalog → wallet → supplier-linked order → status/refund → support.</p></div>
     <div className={styles.sideCard}>
      <div className={styles.sideLinks}>
       <Link href="/refund">Refund policy <RefreshCcw/></Link>
       <Link href="/privacy">Privacy policy <LockKeyhole/></Link>
       <Link href="/trust">Trust & Safety <ShieldCheck/></Link>
       <Link href="/contact">Contact <Mail/></Link>
      </div>
     </div>
    </aside>
    <div className={styles.sections}>
     {sections.map((section,index)=><article className={styles.section} key={section.title} data-terms-reveal>
      <div className={styles.sectionHead}><span className={styles.number}>{String(index+1).padStart(2,'0')}</span><div><h2>{section.title}</h2><p>{section.label}</p></div></div>
      <div className={styles.sectionBody}>{section.body}</div>
     </article>)}
    </div>
   </div>

   <div className={styles.container}>
    <section className={styles.flow} data-terms-reveal>
     <div className={styles.flowHeader}><div><span>One order, four responsibilities</span><h2>The agreement follows the transaction.</h2></div><p>The Terms are designed around the same stages the product uses, so the legal page and the transaction engine tell the same story.</p></div>
     <div className={styles.flowGrid}>
      <article className={styles.flowStep}><span>01</span><b>You choose carefully</b><p>Select the correct live service, destination and quantity.</p></article>
      <article className={styles.flowStep}><span>02</span><b>MANGLO validates</b><p>Current service state, price, limits, destination and wallet balance are checked.</p></article>
      <article className={styles.flowStep}><span>03</span><b>Supplier processes</b><p>Delivery and status depend on the connected upstream service.</p></article>
      <article className={styles.flowStep}><span>04</span><b>MANGLO records the outcome</b><p>Status, eligible refund activity and service-health learning remain tied to the order.</p></article>
     </div>
    </section>
   </div>
  </section>

  <section className={styles.final}>
   <div className={styles.container}>
    <div className={styles.finalCard} data-terms-reveal>
     <div><h2>Need clarification before ordering?</h2><p>Ask first. MANGLO support can help with how the marketplace, wallet, order states and policies work. Support cannot guarantee an outcome controlled by a third-party platform or supplier.</p></div>
     <div className={styles.finalActions}><Link className={styles.secondary} href="/refund">Refund policy</Link><Link className={styles.primary} href="/contact">Contact support <ArrowRight size={15}/></Link></div>
    </div>
   </div>
  </section>
 </main>;
}
