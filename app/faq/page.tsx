import Link from 'next/link';
import {
 ArrowRight,BadgeHelp,Bot,CircleDollarSign,CircleHelp,Clock3,CreditCard,FileCheck2,Gift,Headphones,
 Link2,PackageCheck,RefreshCcw,ShieldCheck,ShoppingCart,UserRoundCheck,WalletCards,
} from 'lucide-react';
import {company} from '@/lib/company';
import PublicInfoMotion from '@/components/PublicInfoMotion';
import styles from '../PublicInfo.module.css';

export const metadata={
 title:'FAQ & Support',
 description:'Answers to common MANGLO questions about services, links, orders, wallet funding, refunds, refills, supplier statuses, referrals, AI and account support.',
};

function Q({question,children}:{question:string;children:React.ReactNode}){
 return <details className={styles.details}><summary>{question}</summary><div className={styles.detailsBody}>{children}</div></details>;
}

export default function FAQPage(){
 return <main className={styles.page}>
  <PublicInfoMotion/>
  <section className={styles.hero}>
   <div className={`${styles.container} ${styles.heroGrid}`}>
    <div data-public-reveal>
     <span className={styles.kicker}><span className={styles.kickerDot}/>FAQ & Support</span>
     <h1>Answers before you need to <span>open a ticket.</span></h1>
     <p className={styles.lead}>Understand how MANGLO services, wallet funding, supplier-linked orders, refunds, refills, referrals and optional AI actually work. If the answer depends on your specific order, signed-in support can attach the exact context.</p>
     <div className={styles.metaRow}>
      <span className={styles.metaPill}><ShoppingCart/>Live service marketplace</span>
      <span className={styles.metaPill}><WalletCards/>Wallet-based ordering</span>
      <span className={styles.metaPill}><Headphones/>Order-linked support</span>
     </div>
     <div className={styles.heroActions}>
      <Link className={styles.primary} href="/dashboard?view=support">Open support <ArrowRight size={15}/></Link>
      <Link className={styles.secondary} href="/help">Browse Help Center</Link>
     </div>
    </div>
    <div className={styles.heroVisual} data-public-reveal>
     <div className={styles.orb}/>
     <div className={styles.glassPanel}>
      <div className={styles.glassTop}><div className={styles.brandMini}><span className={styles.brandMark}>?</span>MANGLO FAQ</div><span className={styles.statusPill}>Quick answers</span></div>
      <div className={styles.visualTitle}>Most questions fall into four simple paths.</div>
      <div className={styles.miniList}>
       <div className={styles.miniItem}><span className={styles.miniIcon}><Link2/></span><div><b>Service & link</b><small>Choose the right target for the selected service.</small></div></div>
       <div className={styles.miniItem}><span className={styles.miniIcon}><CreditCard/></span><div><b>Wallet & payment</b><small>Cashfree confirmation before wallet credit.</small></div></div>
       <div className={styles.miniItem}><span className={styles.miniIcon}><PackageCheck/></span><div><b>Order outcome</b><small>Processing, completed, partial or refunded.</small></div></div>
      </div>
     </div>
     <span className={`${styles.floatChip} ${styles.chipOne}`}><RefreshCcw/> Refund logic explained</span>
     <span className={`${styles.floatChip} ${styles.chipTwo}`}><Bot/> AI stays optional</span>
    </div>
   </div>
  </section>

  <section className={styles.intro}>
   <div className={styles.container}>
    <div className={styles.sectionHead} data-public-reveal><div><span className={styles.eyebrow}>START BY TOPIC</span><h2>Find the right answer faster.</h2></div><p>If your question is account-specific or order-specific, the FAQ gives the rule and signed-in support handles the individual case.</p></div>
    <div className={styles.cards4}>
     <a className={styles.card} href="#orders" data-public-reveal><span className={styles.cardIcon}><PackageCheck/></span><h3>Orders & delivery</h3><p>Statuses, processing, partial delivery, cancellations and supplier-linked fulfilment.</p></a>
     <a className={styles.card} href="#wallet" data-public-reveal><span className={styles.cardIcon}><CircleDollarSign/></span><h3>Wallet & payments</h3><p>Cashfree checkout, wallet credit, payment verification and transaction history.</p></a>
     <a className={styles.card} href="#services" data-public-reveal><span className={styles.cardIcon}><Link2/></span><h3>Services & links</h3><p>Live catalog, pricing, destination validation, refills and service availability.</p></a>
     <a className={styles.card} href="#account" data-public-reveal><span className={styles.cardIcon}><UserRoundCheck/></span><h3>Account & support</h3><p>Login, password recovery, tickets, referrals and MANGLO AI.</p></a>
    </div>
   </div>
  </section>

  <section className={styles.body}>
   <div className={`${styles.container} ${styles.bodyGrid}`}>
    <aside className={styles.side} data-public-reveal>
     <div className={styles.sideCard}><span>Need a human review?</span><h2>Use the order-linked path.</h2><p>Open signed-in support and attach the exact order when the issue is specific to one transaction.</p></div>
     <div className={styles.sideCard}><div className={styles.linkList}>
      <a href="#services">Services & links <Link2/></a>
      <a href="#orders">Orders & delivery <PackageCheck/></a>
      <a href="#wallet">Wallet & payments <WalletCards/></a>
      <a href="#account">Account & support <BadgeHelp/></a>
     </div></div>
    </aside>

    <div className={styles.content}>
     <section id="services" className={styles.faqGroup} data-public-reveal>
      <span className={styles.sectionLabel}><Link2/>Services & links</span><h2>Marketplace, pricing and destination questions</h2><p className={styles.faqIntro}>MANGLO uses a live catalog, so availability and pricing can change as upstream supply changes.</p>
      <div className={styles.faqGrid}>
       <Q question="What is MANGLO?"><p>MANGLO is a marketplace and management layer for third-party social-growth services. You can browse live services, review customer pricing and limits, fund a wallet, place an order and track supplier-linked status from one account.</p></Q>
       <Q question="Why did a service disappear or become unavailable?"><p>A service can become unavailable when supplier data is stale, the upstream supplier removes it, MANGLO pauses it, or the supplier-health system quarantines it after repeated poor outcomes. MANGLO blocks unavailable services rather than continuing to accept orders against them.</p></Q>
       <Q question="Why did the price change after I viewed a service?"><p>Prices are based on the current live service record. Before an order is accepted, MANGLO recalculates the charge. If the live price changed after your quote, the transaction flow can stop and ask you to review the updated amount instead of silently charging a different price.</p></Q>
       <Q question="What kind of link should I enter?"><p>Use the public destination that matches the service. For example, Instagram follower services generally need a profile URL, YouTube subscriber services need a channel URL, and post/video engagement services need the relevant content URL. MANGLO validates obvious mismatches for supported platforms before supplier submission.</p></Q>
       <Q question="Can MANGLO guarantee a service will complete?"><p>No. MANGLO ranks and filters services using live catalog data and recent order outcomes, but suppliers and social platforms remain third parties. MANGLO does not guarantee virality, permanent retention, a fixed completion time or platform eligibility.</p></Q>
       <Q question="What does refill mean?"><p>A refill is available only where the listing/provider supports it and the provider’s refill conditions are met. It is not a promise of permanent retention and it is not the same as a cash refund. See the <Link href="/refund">Refund & Cancellation Policy</Link>.</p></Q>
      </div>
     </section>

     <section id="orders" className={styles.faqGroup} data-public-reveal>
      <span className={styles.sectionLabel}><PackageCheck/>Orders & delivery</span><h2>What happens after an order is placed</h2>
      <div className={styles.faqGrid}>
       <Q question="What happens after I confirm an order?"><p>MANGLO debits the verified wallet charge, creates a MANGLO order record and submits the selected service, destination and quantity to the connected supplier. When the supplier returns an order ID, MANGLO stores it on the backend and begins tracking status.</p></Q>
       <Q question="Why is my order still Processing?"><p>Processing means the supplier has not yet reported a terminal result. Supplier speed varies by service and platform. If the order is active, you can refresh its status from your dashboard. Avoid placing a duplicate replacement order while the original is still being verified or processed.</p></Q>
       <Q question="What does 'submission uncertain' mean?"><p>It means MANGLO debited the wallet and attempted supplier submission, but confirmation was interrupted in a way where blindly resubmitting could create a duplicate order. MANGLO keeps that order for verification instead of automatically submitting it twice.</p></Q>
       <Q question="What happens if the supplier cancels or fails my order?"><p>When the provider reports an eligible Canceled or Failed outcome, MANGLO’s reconciliation flow restores the eligible order amount to the MANGLO Wallet and records the refund in wallet history.</p></Q>
       <Q question="What happens with Partial delivery?"><p>If the provider reports Partial delivery and a measurable undelivered quantity, MANGLO can calculate a proportional wallet refund for that undelivered portion. The exact handling is explained in the <Link href="/refund">Refund & Cancellation Policy</Link>.</p></Q>
       <Q question="Can I cancel an order after placing it?"><p>Not necessarily. Orders can be submitted upstream immediately, and once processing starts the supplier may not allow cancellation or editing. Contact support if something is wrong, but do not assume an in-progress order can be reversed.</p></Q>
       <Q question="Can I change the link or quantity after submission?"><p>Generally no once the supplier has accepted/started the order. Confirm the destination and quantity before placing the order. If you entered the wrong target, open support with the MANGLO order number so the current supplier state can be reviewed.</p></Q>
      </div>
     </section>

     <section id="wallet" className={styles.faqGroup} data-public-reveal>
      <span className={styles.sectionLabel}><WalletCards/>Wallet & payments</span><h2>Funding, balances and refunds</h2>
      <div className={styles.faqGrid}>
       <Q question="How do I add money to my MANGLO Wallet?"><p>Open Wallet in your dashboard and start a Cashfree hosted checkout. MANGLO credits the wallet only after the payment is verified server-side as paid.</p></Q>
       <Q question="My bank/UPI was debited but my wallet is not credited. What should I do?"><p>Do not pay repeatedly. Payment networks can show a debit before final settlement. MANGLO reconciliation checks Cashfree status and credits only confirmed paid orders. If it remains unresolved, open support and include the MANGLO/Cashfree payment reference if available.</p></Q>
       <Q question="Are my card or UPI credentials stored by MANGLO?"><p>MANGLO uses Cashfree hosted checkout and does not store raw card numbers, CVV values or UPI PINs. Never send those details to support.</p></Q>
       <Q question="Where do order refunds go?"><p>Eligible service-order refunds are credited to the MANGLO Wallet and appear as separate wallet-ledger entries. A MANGLO Wallet refund is different from a bank/card/UPI payment reversal.</p></Q>
       <Q question="Can I withdraw my wallet balance to cash?"><p>MANGLO does not currently provide a general wallet cash-withdrawal feature or cash withdrawal for promotional/referral credits, except where a different outcome is required by applicable law.</p></Q>
      </div>
     </section>

     <section id="account" className={styles.faqGroup} data-public-reveal>
      <span className={styles.sectionLabel}><UserRoundCheck/>Account, referrals, AI & support</span><h2>Account and assistance questions</h2>
      <div className={styles.faqGrid}>
       <Q question="I forgot my password. How do I recover my account?"><p>Use <Link href="/auth/forgot">Forgot password</Link>. MANGLO uses email-based recovery through the authentication system. Never share a password-reset token or verification code with support or another person.</p></Q>
       <Q question="How do referrals work?"><p>A valid invite can attribute a genuinely new account through a secure referral cookie. Reward eligibility is checked after the qualifying customer completes the required order, and rewards are wallet credits subject to the program’s eligibility and margin safeguards. Self-referrals and duplicate-account abuse can be rejected.</p></Q>
       <Q question="Is MANGLO AI required to place an order?"><p>No. MANGLO AI is optional. You can browse and order manually. AI can search the live catalog and prepare a quote, but the transaction engine still performs the final availability, destination, quantity, price and wallet checks.</p></Q>
       <Q question="Why can an AI quote change before checkout?"><p>The live catalog can change. The AI quote is informational until the normal transaction path revalidates the current service and exact charge. If the price or availability changed, the final transaction check wins.</p></Q>
       <Q question="How do I open a support request?"><p>Sign in, open <Link href="/dashboard?view=support">Dashboard → Support</Link>, choose the issue category, select the related order when relevant, and describe what happened. Your account also shows previously opened requests and their status.</p></Q>
       <Q question="What information should I never send to support?"><p>Never send passwords, OTPs, password-reset codes, CVV values, UPI PINs, banking passwords or full card credentials. For support, an order number, payment reference and a clear description are usually the useful pieces.</p></Q>
       <Q question="How quickly will support reply?"><p>MANGLO publishes support availability as {company.supportHours}. Resolution time depends on the issue and whether supplier or payment verification is required. Avoid opening duplicate tickets for the same issue because that can slow investigation.</p></Q>
      </div>
     </section>
    </div>
   </div>
  </section>

  <section className={styles.ctaWrap}>
   <div className={styles.container}><div className={styles.cta} data-public-reveal><div><h2>Still not solved?</h2><p>Use account support for a specific order, payment or account issue. For general questions, contact MANGLO without sharing passwords or payment secrets.</p></div><div className={styles.ctaActions}><Link className={styles.primary} href="/dashboard?view=support"><Headphones size={14}/> Open support</Link><Link className={styles.secondary} href="/contact"><CircleHelp size={14}/> Contact options</Link></div></div></div>
  </section>
 </main>;
}
