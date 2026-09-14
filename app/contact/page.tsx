import Link from 'next/link';
import {
 ArrowRight,BadgeHelp,Clock3,FileText,Headphones,Instagram,LifeBuoy,Mail,MapPin,MessageCircle,
 Phone,ReceiptIndianRupee,ShieldAlert,ShieldCheck,
} from 'lucide-react';
import {company} from '@/lib/company';
import PublicInfoMotion from '@/components/PublicInfoMotion';
import styles from '../PublicInfo.module.css';

export const metadata={
 title:'Contact MANGLO',
 description:'Contact MANGLO for order, payment, account, privacy and general support, with signed-in order-linked support for customer issues.',
};

const INSTAGRAM='https://www.instagram.com/manglo.shop/';

export default function ContactPage(){
 return <main className={styles.page}>
  <PublicInfoMotion/>
  <section className={styles.hero}>
   <div className={`${styles.container} ${styles.heroGrid}`}>
    <div data-public-reveal>
     <span className={styles.kicker}><span className={styles.kickerDot}/>Contact MANGLO</span>
     <h1>Get help with the <span>right context.</span></h1>
     <p className={styles.lead}>Order problems are easiest to solve when support can see the exact MANGLO order. General questions can come by email, while signed-in customers can open an order-linked request directly from the dashboard.</p>
     <div className={styles.metaRow}>
      <span className={styles.metaPill}><Headphones/>Order-linked support</span>
      <span className={styles.metaPill}><Mail/>{company.supportEmail}</span>
      <span className={styles.metaPill}><Clock3/>{company.supportHours}</span>
     </div>
     <div className={styles.heroActions}>
      <Link className={styles.primary} href="/dashboard?view=support">Open account support <ArrowRight size={15}/></Link>
      <Link className={styles.secondary} href="/help">Visit Help Center</Link>
     </div>
    </div>
    <div className={styles.heroVisual} data-public-reveal>
     <div className={styles.orb}/>
     <div className={styles.glassPanel}>
      <div className={styles.glassTop}><div className={styles.brandMini}><span className={styles.brandMark}>M</span>MANGLO SUPPORT</div><span className={styles.statusPill}>Context first</span></div>
      <div className={styles.visualTitle}>One request. The right order. A clearer investigation.</div>
      <div className={styles.miniList}>
       <div className={styles.miniItem}><span className={styles.miniIcon}><FileText/></span><div><b>Select the order</b><small>Attach the relevant MANGLO order when possible.</small></div></div>
       <div className={styles.miniItem}><span className={styles.miniIcon}><MessageCircle/></span><div><b>Explain what happened</b><small>Use a clear subject and useful detail.</small></div></div>
       <div className={styles.miniItem}><span className={styles.miniIcon}><ShieldCheck/></span><div><b>Keep secrets private</b><small>Never send passwords, OTPs, CVV values or UPI PINs.</small></div></div>
      </div>
     </div>
     <span className={`${styles.floatChip} ${styles.chipOne}`}><BadgeHelp/> Order / payment / account</span>
     <span className={`${styles.floatChip} ${styles.chipTwo}`}><ShieldCheck/> Safe support habits</span>
    </div>
   </div>
  </section>

  <section className={styles.intro}>
   <div className={styles.container}>
    <div className={styles.sectionHead} data-public-reveal><div><span className={styles.eyebrow}>CHOOSE THE RIGHT PATH</span><h2>Support without the runaround.</h2></div><p>Use signed-in support for anything tied to an order, wallet or account. Use email for general, business or privacy enquiries that do not need an order attached.</p></div>
    <div className={styles.contactGrid}>
     <div className={styles.contactStack}>
      <article className={styles.contactCard} data-public-reveal><span><Headphones/></span><div><small>Best for customer issues</small><b>Dashboard support</b><p>Open a ticket for order not started, order stopped, partial delivery, refill, wrong link, payment or account issues. You can attach the exact order from your account.</p><Link href="/dashboard?view=support">Open support <ArrowRight size={13}/></Link></div></article>
      <article className={styles.contactCard} data-public-reveal><span><Mail/></span><div><small>General & privacy enquiries</small><a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a><p>Use email when the question is not tied to a specific signed-in order, or when you need to ask about account/privacy matters.</p></div></article>
      <article className={styles.contactCard} data-public-reveal><span><Instagram/></span><div><small>Official MANGLO Instagram</small><a href={INSTAGRAM} target="_blank" rel="noreferrer">@manglo.shop</a><p>Use the official account for brand updates. Do not send payment credentials or account secrets through social DMs.</p></div></article>
      {company.supportPhone&&<article className={styles.contactCard} data-public-reveal><span><Phone/></span><div><small>Customer care</small><a href={`tel:${company.supportPhone}`}>{company.supportPhone}</a><p>Available during published support hours.</p></div></article>}
      {company.address&&<article className={styles.contactCard} data-public-reveal><span><MapPin/></span><div><small>Business address</small><b>{company.address}</b><p>{company.legalName}</p></div></article>}
     </div>
     <aside className={styles.supportPanel} data-public-reveal><span>Before you contact us</span><h2>Bring the details that actually help.</h2><p>For an order issue, include the MANGLO order number and what you expected versus what you see now. For a payment issue, use the Cashfree/MANGLO payment reference if available. Screenshots can be useful, but remove unrelated personal or financial information first.</p><Link className={styles.primary} href="/faq">Check FAQs first <ArrowRight size={14}/></Link></aside>
    </div>
   </div>
  </section>

  <section className={styles.darkBand}>
   <div className={styles.container}>
    <div className={styles.sectionHead} data-public-reveal><div><span className={styles.eyebrow}>SUPPORT SAFETY</span><h2>What MANGLO support will never need.</h2></div><p>Support may ask for an order number, payment reference or a description of the issue. Authentication and payment secrets are different.</p></div>
    <div className={styles.cards3}>
     <article className={`${styles.card} ${styles.darkCard}`} data-public-reveal><span className={styles.cardIcon}><ShieldAlert/></span><h3>No passwords or OTPs</h3><p>Never send your password, email verification code, password-reset code or one-time password to anyone claiming to be support.</p></article>
     <article className={`${styles.card} ${styles.darkCard}`} data-public-reveal><span className={styles.cardIcon}><ReceiptIndianRupee/></span><h3>No card CVV or UPI PIN</h3><p>MANGLO uses Cashfree hosted checkout. Support does not need your CVV, UPI PIN, banking password or full card credentials.</p></article>
     <article className={`${styles.card} ${styles.darkCard}`} data-public-reveal><span className={styles.cardIcon}><ShieldCheck/></span><h3>Use official channels</h3><p>For account-specific problems, start from the signed-in dashboard. General email should go to the support address shown on this site.</p></article>
    </div>
   </div>
  </section>

  <section className={styles.flow}>
   <div className={styles.container}>
    <div className={styles.sectionHead} data-public-reveal><div><span className={styles.eyebrow}>HOW SUPPORT WORKS</span><h2>From issue to useful context.</h2></div><p>MANGLO support tickets are rate-limited and connected to your account so the queue stays useful and order-specific requests can be investigated safely.</p></div>
    <div className={styles.flowGrid}>
     <article className={styles.flowStep} data-public-reveal><span>01</span><h3>Identify the issue</h3><p>Choose order, refill, payment or account support.</p></article>
     <article className={styles.flowStep} data-public-reveal><span>02</span><h3>Attach the order</h3><p>Select the related MANGLO order when one exists.</p></article>
     <article className={styles.flowStep} data-public-reveal><span>03</span><h3>Explain clearly</h3><p>Describe what happened without sharing secrets.</p></article>
     <article className={styles.flowStep} data-public-reveal><span>04</span><h3>Track the request</h3><p>Your dashboard shows the support request and its status.</p></article>
    </div>
   </div>
  </section>

  <section className={styles.ctaWrap}>
   <div className={styles.container}><div className={styles.cta} data-public-reveal><div><h2>Not sure where to start?</h2><p>The Help Center explains ordering, wallet funding, refunds, supplier statuses, account access, referrals and MANGLO AI before you need to open a ticket.</p></div><div className={styles.ctaActions}><Link className={styles.primary} href="/help"><LifeBuoy size={14}/> Help Center</Link><Link className={styles.secondary} href="/faq">FAQ & Support</Link></div></div></div>
  </section>
 </main>;
}
