import Link from 'next/link';
import {
 ArrowRight,BadgeHelp,Bot,CircleDollarSign,CreditCard,Gift,Headphones,KeyRound,LifeBuoy,
 Link2,PackageCheck,ReceiptIndianRupee,RefreshCcw,Search,ShieldCheck,ShoppingCart,UserRoundCheck,
 WalletCards,
} from 'lucide-react';
import {company} from '@/lib/company';
import PublicInfoMotion from '@/components/PublicInfoMotion';
import styles from '../PublicInfo.module.css';

export const metadata={
 title:'Help Center',
 description:'MANGLO Help Center for getting started, choosing services, placing and tracking orders, wallet funding, refunds, account access, referrals, AI and support.',
};

const topics=[
 {Icon:ShoppingCart,title:'Getting started',text:'Understand the live marketplace, service IDs, rates, limits and how to review an order before confirming.',href:'/services',action:'Browse services'},
 {Icon:Link2,title:'Choosing the right destination',text:'Profile, channel, post, Reel, Shorts or other public target—use the destination that matches the selected service.',href:'/faq#services',action:'Link & service FAQs'},
 {Icon:PackageCheck,title:'Orders & status',text:'Learn what Queued, Processing, Completed, Partial and Refunded mean and when a supplier-linked status can change.',href:'/faq#orders',action:'Order FAQs'},
 {Icon:WalletCards,title:'Wallet & payments',text:'Fund through Cashfree hosted checkout, understand server-side payment confirmation and review wallet transaction history.',href:'/faq#wallet',action:'Payment FAQs'},
 {Icon:RefreshCcw,title:'Refunds & partial delivery',text:'See how definitive supplier rejection, Canceled, Failed and Partial outcomes are handled by the MANGLO wallet flow.',href:'/refund',action:'Refund policy'},
 {Icon:KeyRound,title:'Account & security',text:'Email verification, password recovery, account sessions and the information you should never send to support.',href:'/faq#account',action:'Account FAQs'},
 {Icon:Bot,title:'MANGLO AI',text:'Use the optional assistant to compare live services and prepare quotes while the normal transaction engine keeps final control.',href:'/dashboard?view=ai',action:'Open MANGLO AI'},
 {Icon:Gift,title:'Invite & earn',text:'Learn how referral attribution and qualifying-order rewards work, including why promotional credits are wallet-based.',href:'/invite',action:'Invite & earn'},
];

export default function HelpPage(){
 return <main className={styles.page}>
  <PublicInfoMotion/>
  <section className={styles.hero}>
   <div className={`${styles.container} ${styles.heroGrid}`}>
    <div data-public-reveal>
     <span className={styles.kicker}><span className={styles.kickerDot}/>MANGLO Help Center</span>
     <h1>Start with the answer. <span>Escalate with context.</span></h1>
     <p className={styles.lead}>The Help Center connects every important customer path: choosing a service, using the right link, funding the wallet, tracking an order, understanding refunds, protecting your account and opening support when the issue is specific to you.</p>
     <div className={styles.metaRow}>
      <span className={styles.metaPill}><Search/>Self-service guidance</span>
      <span className={styles.metaPill}><ShieldCheck/>Real product rules</span>
      <span className={styles.metaPill}><Headphones/>Escalation when needed</span>
     </div>
     <div className={styles.heroActions}>
      <Link className={styles.primary} href="/faq">Browse FAQ <ArrowRight size={15}/></Link>
      <Link className={styles.secondary} href="/dashboard?view=support">Open support</Link>
     </div>
    </div>
    <div className={styles.heroVisual} data-public-reveal>
     <div className={styles.orb}/>
     <div className={styles.glassPanel}>
      <div className={styles.glassTop}><div className={styles.brandMini}><span className={styles.brandMark}>M</span>HELP CENTER</div><span className={styles.statusPill}>One hub</span></div>
      <div className={styles.visualTitle}>Find the topic, understand the rule, then act.</div>
      <div className={styles.miniList}>
       <div className={styles.miniItem}><span className={styles.miniIcon}><ShoppingCart/></span><div><b>Before ordering</b><small>Service, link, price and quantity guidance.</small></div></div>
       <div className={styles.miniItem}><span className={styles.miniIcon}><PackageCheck/></span><div><b>After ordering</b><small>Status, supplier outcome and repeat-order guidance.</small></div></div>
       <div className={styles.miniItem}><span className={styles.miniIcon}><Headphones/></span><div><b>When something is specific</b><small>Attach the exact order to a support request.</small></div></div>
      </div>
     </div>
     <span className={`${styles.floatChip} ${styles.chipOne}`}><LifeBuoy/> Help by topic</span>
     <span className={`${styles.floatChip} ${styles.chipTwo}`}><ShieldCheck/> No vague promises</span>
    </div>
   </div>
  </section>

  <section className={styles.intro}>
   <div className={styles.container}>
    <div className={styles.sectionHead} data-public-reveal><div><span className={styles.eyebrow}>HELP BY TOPIC</span><h2>Everything a customer needs before support.</h2></div><p>Each topic links to the page that owns the answer, so MANGLO’s help content stays consistent with the same rules used by checkout, wallet reconciliation and supplier tracking.</p></div>
    <div className={styles.cards4}>{topics.map(({Icon,title,text,href,action})=><article className={styles.card} key={title} data-public-reveal><span className={styles.cardIcon}><Icon/></span><h3>{title}</h3><p>{text}</p><Link href={href}>{action} <ArrowRight size={12}/></Link></article>)}</div>
   </div>
  </section>

  <section className={styles.darkBand}>
   <div className={styles.container}>
    <div className={styles.sectionHead} data-public-reveal><div><span className={styles.eyebrow}>FASTEST PATH BY PROBLEM</span><h2>Use the right page first.</h2></div><p>Some questions are informational. Others need the exact account, payment or order record. These paths keep the difference clear.</p></div>
    <div className={styles.cards4}>
     <article className={`${styles.card} ${styles.darkCard}`} data-public-reveal><span className={styles.cardIcon}><CreditCard/></span><h3>Payment debited, wallet missing</h3><p>Do not retry repeatedly. Review payment FAQs, then open account support with the payment reference if it remains unresolved.</p><Link href="/faq#wallet">Payment help</Link></article>
     <article className={`${styles.card} ${styles.darkCard}`} data-public-reveal><span className={styles.cardIcon}><PackageCheck/></span><h3>Order stuck or stopped</h3><p>Check the current dashboard status. If the order needs investigation, open a ticket and attach that exact order.</p><Link href="/dashboard?view=support">Order support</Link></article>
     <article className={`${styles.card} ${styles.darkCard}`} data-public-reveal><span className={styles.cardIcon}><RefreshCcw/></span><h3>Canceled, failed or partial</h3><p>Read how automatic full and proportional wallet refunds are determined from provider outcomes.</p><Link href="/refund">Refund handling</Link></article>
     <article className={`${styles.card} ${styles.darkCard}`} data-public-reveal><span className={styles.cardIcon}><KeyRound/></span><h3>Cannot access account</h3><p>Use the email-based password recovery path. Never send a reset code or password to anyone claiming to be support.</p><Link href="/auth/forgot">Recover access</Link></article>
    </div>
   </div>
  </section>

  <section className={styles.flow}>
   <div className={styles.container}>
    <div className={styles.sectionHead} data-public-reveal><div><span className={styles.eyebrow}>A MANGLO CUSTOMER JOURNEY</span><h2>Help follows the product lifecycle.</h2></div><p>The same order has different questions before payment, after supplier submission and after a terminal outcome. The Help Center mirrors those stages.</p></div>
    <div className={styles.flowGrid}>
     <article className={styles.flowStep} data-public-reveal><span>01</span><h3>Discover</h3><p>Compare live services, price, limits, timing and refill listing.</p></article>
     <article className={styles.flowStep} data-public-reveal><span>02</span><h3>Validate</h3><p>Confirm the right destination, quantity, live charge and wallet balance.</p></article>
     <article className={styles.flowStep} data-public-reveal><span>03</span><h3>Track</h3><p>Follow supplier-linked processing and refresh active order status.</p></article>
     <article className={styles.flowStep} data-public-reveal><span>04</span><h3>Resolve</h3><p>Use automatic refund logic or order-linked support when needed.</p></article>
    </div>
   </div>
  </section>

  <section className={styles.intro}>
   <div className={styles.container}>
    <div className={styles.sectionHead} data-public-reveal><div><span className={styles.eyebrow}>IMPORTANT REFERENCES</span><h2>Policies that explain the system behind the help.</h2></div><p>These pages are written around the same transaction and support behaviour customers see in the product.</p></div>
    <div className={styles.cards3}>
     <article className={styles.card} data-public-reveal><span className={styles.cardIcon}><ShieldCheck/></span><h3>Trust & Safety</h3><p>Payment verification, wallet records, backend-only credentials, destination validation, supplier health and support safeguards.</p><Link href="/trust">Read Trust & Safety <ArrowRight size={12}/></Link></article>
     <article className={styles.card} data-public-reveal><span className={styles.cardIcon}><ReceiptIndianRupee/></span><h3>Refund Policy</h3><p>Automatic wallet restoration, canceled/failed orders, partial delivery, uncertain submission and payment-reversal distinctions.</p><Link href="/refund">Read Refund Policy <ArrowRight size={12}/></Link></article>
     <article className={styles.card} data-public-reveal><span className={styles.cardIcon}><UserRoundCheck/></span><h3>Privacy</h3><p>What information MANGLO processes across accounts, orders, payments, analytics, referrals, support and optional AI.</p><Link href="/privacy">Read Privacy Policy <ArrowRight size={12}/></Link></article>
    </div>
   </div>
  </section>

  <section className={styles.ctaWrap}>
   <div className={styles.container}><div className={styles.cta} data-public-reveal><div><h2>Need support tied to your account?</h2><p>Sign in and open a support request so MANGLO can connect the issue to the correct order, payment or account context. General enquiries can go to {company.supportEmail}.</p></div><div className={styles.ctaActions}><Link className={styles.primary} href="/dashboard?view=support"><Headphones size={14}/> Open support</Link><Link className={styles.secondary} href="/contact"><BadgeHelp size={14}/> Contact MANGLO</Link></div></div></div>
  </section>
 </main>;
}
