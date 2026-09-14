import Link from 'next/link';
import {
 Activity,ArrowRight,Bot,Cookie,CreditCard,Database,EyeOff,FileCheck2,KeyRound,Link2,
 LockKeyhole,Mail,MessageSquareText,RefreshCcw,ShieldCheck,UserRoundCheck,
} from 'lucide-react';
import {company} from '@/lib/company';
import PublicInfoMotion from '@/components/PublicInfoMotion';
import styles from '../PublicInfo.module.css';

export const metadata={
 title:'Privacy Policy',
 description:'How MANGLO handles account data, order destinations, wallet and payment records, first-party analytics, referral attribution, optional AI conversations and support information.',
};

const dataCards=[
 {Icon:UserRoundCheck,title:'Account & authentication',text:'Name, email, phone number, authentication state and security/session records needed to operate and protect your account.'},
 {Icon:Link2,title:'Orders & destinations',text:'Selected service, public destination URL, quantity, order status and supplier-linked fulfilment information needed to execute and support an order.'},
 {Icon:CreditCard,title:'Wallet & payment records',text:'Wallet balance, ledger entries, Cashfree order references and payment-status information. Raw card numbers, CVV values and UPI PINs are not stored by MANGLO.'},
 {Icon:MessageSquareText,title:'Support & optional AI',text:'Support tickets and, when you choose to use MANGLO AI, conversation content plus relevant live MANGLO tool results needed to answer the request.'},
];

export default function PrivacyPage(){
 return <main className={styles.page}>
  <PublicInfoMotion/>
  <section className={styles.hero}>
   <div className={`${styles.container} ${styles.heroGrid}`}>
    <div data-public-reveal>
     <span className={styles.kicker}><span className={styles.kickerDot}/>Privacy at MANGLO</span>
     <h1>Your data should have a <span>clear job.</span></h1>
     <p className={styles.lead}>MANGLO processes information to run your account, fund and protect your wallet, execute supplier-linked orders, recover unfinished work, provide support, improve the product and power optional AI assistance. This page explains what that means without hiding the important parts.</p>
     <div className={styles.metaRow}>
      <span className={styles.metaPill}><LockKeyhole/>Secure account sessions</span>
      <span className={styles.metaPill}><EyeOff/>Order destinations kept out of analytics</span>
      <span className={styles.metaPill}><CreditCard/>Hosted payment entry</span>
     </div>
     <div className={styles.heroActions}>
      <Link className={styles.primary} href="/trust">See Trust & Safety <ArrowRight size={15}/></Link>
      <Link className={styles.secondary} href="/contact">Privacy question</Link>
     </div>
    </div>
    <div className={styles.heroVisual} data-public-reveal>
     <div className={styles.orb}/>
     <div className={styles.glassPanel}>
      <div className={styles.glassTop}><div className={styles.brandMini}><span className={styles.brandMark}>M</span>MANGLO PRIVACY</div><span className={styles.statusPill}>Purpose limited</span></div>
      <div className={styles.visualTitle}>Information moves only where the product needs it.</div>
      <div className={styles.miniList}>
       <div className={styles.miniItem}><span className={styles.miniIcon}><KeyRound/></span><div><b>Account</b><small>Authentication and account protection.</small></div></div>
       <div className={styles.miniItem}><span className={styles.miniIcon}><FileCheck2/></span><div><b>Order</b><small>Destination and quantity for fulfilment.</small></div></div>
       <div className={styles.miniItem}><span className={styles.miniIcon}><Activity/></span><div><b>Analytics</b><small>Limited first-party product events, not your order link.</small></div></div>
      </div>
     </div>
     <span className={`${styles.floatChip} ${styles.chipOne}`}><ShieldCheck/> Server-side controls</span>
     <span className={`${styles.floatChip} ${styles.chipTwo}`}><EyeOff/> No CVV / UPI PIN storage</span>
    </div>
   </div>
  </section>

  <section className={styles.intro}>
   <div className={styles.container}>
    <div className={styles.sectionHead} data-public-reveal><div><span className={styles.eyebrow}>WHAT MANGLO PROCESSES</span><h2>Data connected to a real product action.</h2></div><p>MANGLO does not need every piece of information about you. The main categories below are tied to account access, transactions, fulfilment, support or product operation.</p></div>
    <div className={styles.cards4}>{dataCards.map(({Icon,title,text})=><article className={styles.card} key={title} data-public-reveal><span className={styles.cardIcon}><Icon/></span><h3>{title}</h3><p>{text}</p></article>)}</div>
   </div>
  </section>

  <section className={styles.body}>
   <div className={`${styles.container} ${styles.bodyGrid}`}>
    <aside className={styles.side} data-public-reveal>
     <div className={styles.sideCard}><span>Privacy map</span><h2>Follow the information.</h2><p>Account → marketplace → wallet/payment → order → support/analytics.</p></div>
     <div className={styles.sideCard}><div className={styles.linkList}>
      <a href="#collection">Information we process <Database/></a>
      <a href="#analytics">Analytics <Activity/></a>
      <a href="#orders">Orders & suppliers <Link2/></a>
      <a href="#ai">MANGLO AI <Bot/></a>
      <a href="#choices">Your choices <UserRoundCheck/></a>
     </div></div>
    </aside>

    <div className={styles.content}>
     <article id="collection" className={styles.policySection} data-public-reveal>
      <span className={styles.sectionLabel}><Database/>Information we process</span><h2>Information needed to operate MANGLO</h2>
      <p>Depending on how you use MANGLO, we can process your name, email address, phone number, authentication and session information, profile information, saved favourites, public social-media destinations you submit for an order, selected service and quantity, order history, wallet and transaction records, payment references and statuses, referral attribution, temporary order drafts, support messages, optional AI conversations, and limited first-party product-usage events.</p>
      <p>We also maintain operational and security records needed to investigate abuse, protect accounts, reconcile money movement, troubleshoot supplier submissions and maintain the reliability of the service.</p>
     </article>

     <article className={styles.policySection} data-public-reveal>
      <span className={styles.sectionLabel}><FileCheck2/>How it is used</span><h2>Why MANGLO uses this information</h2>
      <p>Information is used to create and protect accounts, authenticate customers, operate the live marketplace, prepare quotes, validate destinations, fund and reconcile the wallet, submit and track orders, recover unfinished orders, calculate eligible referral rewards, answer support requests, prevent abuse, understand product performance and meet applicable legal or financial-record obligations.</p>
      <p>MANGLO also uses real order outcomes to maintain supplier-service health scores. Those scores are service-performance signals; they do not require exposing one customer’s order destination to another customer.</p>
     </article>

     <article id="analytics" className={styles.policySection} data-public-reveal>
      <span className={styles.sectionLabel}><Activity/>First-party analytics</span><h2>Product analytics are intentionally limited</h2>
      <p>MANGLO records first-party events such as page visits, marketplace searches, service views, order-review steps, recovery interactions, referral milestones and confirmed transaction milestones. Campaign information such as UTM source, medium, campaign, content or term can also be recorded, together with the referring website hostname.</p>
      <p>Analytics is designed not to store the public destination URL you enter for an order, raw payment credentials, full external referrer URLs, or marketplace search text that looks like a URL or account handle. URL- or handle-like search text is redacted before analytics storage.</p>
      <div className={styles.notice}><EyeOff/><div><b>Your order target is not an advertising event.</b><p>The destination needed to fulfil an order is kept in the order flow rather than copied into first-party marketing analytics.</p></div></div>
     </article>

     <article className={styles.policySection} data-public-reveal>
      <span className={styles.sectionLabel}><Cookie/>Referral attribution</span><h2>Invite links use a limited attribution cookie</h2>
      <p>When you open a valid MANGLO referral link, MANGLO can store the referral code in a secure HTTP-only cookie for up to 30 days. If a genuinely new customer creates an account during that period, the inviting account can be recorded as the referrer subject to the referral rules.</p>
      <p>The referrer is not given the referred customer’s email address, phone number or order destination. Reward eligibility is checked server-side and eligible rewards are recorded through the wallet ledger.</p>
     </article>

     <article className={styles.policySection} data-public-reveal>
      <span className={styles.sectionLabel}><RefreshCcw/>Unfinished order recovery</span><h2>Prepared orders can be saved privately</h2>
      <p>For signed-in customers, MANGLO can save a meaningful prepared order after a live service, valid public destination and valid quantity have been entered. A prepared draft becomes recoverable after at least 30 minutes of inactivity and can remain restorable for up to 14 days.</p>
      <p>The destination is not placed in the recovery URL or analytics event. Drafts are removed after placement, manual discard, scheduled expiry cleanup or later relevant account/order activity.</p>
     </article>

     <article id="orders" className={styles.policySection} data-public-reveal>
      <span className={styles.sectionLabel}><Link2/>Orders, payments & suppliers</span><h2>Some information must leave MANGLO to complete a transaction</h2>
      <p><strong>Payments:</strong> Cashfree hosts payment entry and processes checkout information. MANGLO receives the payment/order information needed to verify status and reconcile your wallet. MANGLO does not store raw card numbers, CVV values or UPI PINs.</p>
      <p><strong>Supplier fulfilment:</strong> the applicable upstream supplier receives information required to fulfil the selected service, such as the supplier service ID, public destination link and quantity. MANGLO keeps the supplier identity and internal credentials on the backend.</p>
      <p><strong>Authentication:</strong> account authentication is handled through Supabase Auth. MANGLO uses secure server-side session handling rather than exposing authentication secrets to customer-facing pages.</p>
     </article>

     <article id="ai" className={styles.policySection} data-public-reveal>
      <span className={styles.sectionLabel}><Bot/>Optional MANGLO AI</span><h2>AI is optional, and live transaction checks stay in MANGLO</h2>
      <p>MANGLO AI currently uses Groq as an external inference provider. When you choose to use MANGLO AI, the message you send and relevant live MANGLO tool results needed to answer the request can be sent to Groq for processing.</p>
      <p>Do not enter passwords, OTPs, card numbers, CVV values, UPI PINs, banking credentials or other secrets into AI chat. AI output is not the transaction authority: MANGLO’s own server rechecks live service availability, quantity, destination, price and wallet balance before an order can be submitted.</p>
     </article>

     <article className={styles.policySection} data-public-reveal>
      <span className={styles.sectionLabel}><LockKeyhole/>Security & storage</span><h2>Security is layered, not promised as absolute</h2>
      <p>MANGLO uses secure authentication, HTTP-only session cookies, server-side authorization, encrypted transport, restricted secret storage, rate limits and transaction-side checks to reduce common account, payment and ordering risks. Sensitive supplier and payment credentials are not sent to the browser.</p>
      <p>No online service can promise absolute security. If you believe your account or information has been compromised, contact support promptly and change credentials where appropriate.</p>
     </article>

     <article className={styles.policySection} data-public-reveal>
      <span className={styles.sectionLabel}><Database/>Retention</span><h2>Different records have different reasons to exist</h2>
      <p>Temporary order drafts have the expiry behaviour described above. Other records—such as account, order, wallet, payment, fraud-prevention, support and security records—can be retained for as long as reasonably needed to operate MANGLO, reconcile transactions, resolve disputes, protect the service or meet applicable legal obligations.</p>
      <p>Deletion of eligible profile or conversation information does not necessarily require deletion of transaction, security or legal records that MANGLO must or reasonably needs to retain.</p>
     </article>

     <article id="choices" className={styles.policySection} data-public-reveal>
      <span className={styles.sectionLabel}><UserRoundCheck/>Your choices</span><h2>Questions, access, correction or deletion requests</h2>
      <p>You may contact MANGLO to ask about your personal information or request access, correction or deletion of eligible data. The result of a request can depend on account ownership verification and on records MANGLO needs to retain for financial, fraud-prevention, security, dispute or legal reasons.</p>
      <p>For account-specific requests, use signed-in support when possible so the request can be connected to the correct account. You can also email <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>.</p>
     </article>

     <article className={styles.policySection} data-public-reveal>
      <span className={styles.sectionLabel}><ShieldCheck/>Policy relationship</span><h2>Privacy works together with the rest of MANGLO</h2>
      <p>This Privacy Policy should be read together with the <Link href="/terms">Terms & Conditions</Link>, <Link href="/refund">Refund & Cancellation Policy</Link> and <Link href="/trust">Trust & Safety</Link> page. If MANGLO materially changes how a feature handles customer information, the public policy will be revised to reflect that operating model.</p>
     </article>
    </div>
   </div>
  </section>

  <section className={styles.ctaWrap}>
   <div className={styles.container}><div className={styles.cta} data-public-reveal><div><h2>Privacy question about your account?</h2><p>Use signed-in support for account-specific requests, or contact MANGLO directly without sharing passwords, OTPs or payment secrets.</p></div><div className={styles.ctaActions}><Link className={styles.primary} href="/dashboard?view=support">Account support <ArrowRight size={14}/></Link><a className={styles.secondary} href={`mailto:${company.supportEmail}`}><Mail size={14}/> Email</a></div></div></div>
  </section>
 </main>;
}
