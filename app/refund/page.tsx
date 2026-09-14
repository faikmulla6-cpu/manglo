import Link from 'next/link';
import {Activity,ArrowRight,BadgeCheck,CircleCheckBig,CircleDollarSign,Clock3,CreditCard,Headphones,RefreshCcw,ShieldCheck,TriangleAlert,WalletCards} from 'lucide-react';
import {company} from '@/lib/company';
import RefundMotion from './RefundMotion';
import styles from './Refund.module.css';

export const metadata={
 title:'Refund & Cancellation Policy',
 description:'How MANGLO handles supplier rejection, cancelled or failed service orders, partial delivery, wallet refunds, payment issues and support.',
 alternates:{canonical:'/refund'},
 openGraph:{title:'Refund & Cancellation Policy | MANGLO',description:'A clear explanation of MANGLO wallet refunds, supplier failures, partial delivery and payment issues.',url:'/refund',type:'website'},
};

export default function Page(){
 return <main className={styles.page}>
  <RefundMotion/>

  <section className={styles.hero}>
   <div className={styles.shell}>
    <div className={styles.heroGrid}>
     <div data-refund-reveal>
      <span className={styles.eyebrow}>REFUND & CANCELLATION POLICY</span>
      <h1>If an eligible order fails, the money path should feel <span>clear.</span></h1>
      <p className={styles.heroLead}>MANGLO separates wallet funding from service-order refunds so each outcome can be traced. Supplier rejection, provider cancellation, provider failure and partial delivery are handled differently—and this page explains exactly how the current system responds.</p>
      <p className={styles.effective}>Effective {company.effectiveDate} · Operated by {company.legalName}</p>
      <div className={styles.heroActions}>
       <Link href="/dashboard?view=orders" className={styles.primary}>View your orders <ArrowRight size={16}/></Link>
       <Link href="/trust" className={styles.secondary}><ShieldCheck size={16}/> How MANGLO protects orders</Link>
      </div>
      <div className={styles.heroTrust}>
       <span>Automatic eligible wallet refunds</span><span>Idempotent wallet records</span><span>Cashfree-verified deposits</span><span>Order-linked support</span>
      </div>
     </div>

     <div className={styles.moneyScene} data-refund-reveal>
      <div className={styles.sceneCore}>
       <span className={styles.sceneBadge}><CircleDollarSign size={14}/> MANGLO MONEY FLOW</span>
       <div className={styles.moneyFlow}>
        <div className={styles.moneyStep}><span className={styles.moneyIcon}><WalletCards size={20}/></span><div><b>Wallet debit recorded</b><small>The exact order charge is recorded before supplier submission.</small></div><ArrowRight className={styles.moneyArrow} size={18}/></div>
        <div className={styles.moneyStep}><span className={styles.moneyIcon}><Activity size={20}/></span><div><b>Provider outcome reconciled</b><small>MANGLO reads the supplier-linked order status instead of guessing.</small></div><ArrowRight className={styles.moneyArrow} size={18}/></div>
        <div className={styles.moneyStep}><span className={styles.moneyIcon}><RefreshCcw size={20}/></span><div><b>Eligible amount restored</b><small>Full or proportional wallet credit is recorded when the outcome qualifies.</small></div></div>
       </div>
      </div>
      <div className={`${styles.floatingNote} ${styles.noteA}`}><BadgeCheck size={14}/> No duplicate refund entries</div>
      <div className={`${styles.floatingNote} ${styles.noteB}`}><ShieldCheck size={14}/> Provider status linked</div>
     </div>
    </div>
   </div>
  </section>

  <section className={`${styles.section} ${styles.sectionTint}`}>
   <div className={styles.shell}>
    <header className={styles.sectionHead} data-refund-reveal>
     <span className={styles.index}>01 / PLAIN LANGUAGE</span>
     <div><h2 className={styles.sectionTitle}>The short version.</h2><p className={styles.sectionCopy}>MANGLO does not treat every unsuccessful-looking situation as the same kind of refund. The provider outcome, order stage and amount actually left undelivered determine what happens next.</p></div>
    </header>
    <div className={styles.truthGrid}>
     <article className={styles.truthCard} data-refund-reveal><span className={styles.truthIcon}><RefreshCcw size={20}/></span><h3>Supplier rejects the new order</h3><p>If the supplier definitively rejects a newly submitted order, MANGLO restores the full order debit to your MANGLO Wallet automatically.</p></article>
     <article className={styles.truthCard} data-refund-reveal><span className={styles.truthIcon}><TriangleAlert size={20}/></span><h3>Provider reports Canceled or Failed</h3><p>If the linked provider later returns a canceled or failed terminal status, the full charged order amount is returned to your MANGLO Wallet.</p></article>
     <article className={styles.truthCard} data-refund-reveal><span className={styles.truthIcon}><CircleDollarSign size={20}/></span><h3>Provider reports Partial</h3><p>When the provider reports a partial order and an undelivered remainder, MANGLO credits a proportional wallet refund for that undelivered quantity.</p></article>
     <article className={styles.truthCard} data-refund-reveal><span className={styles.truthIcon}><CircleCheckBig size={20}/></span><h3>Processing or completed orders</h3><p>A customer request does not automatically cancel an upstream order. Once processing has started—or delivery is completed—editing, redirecting or cancellation may no longer be possible.</p></article>
    </div>
   </div>
  </section>

  <section className={styles.section}>
   <div className={styles.shell}>
    <header className={styles.sectionHead} data-refund-reveal>
     <span className={styles.index}>02 / ORDER LIFECYCLE</span>
     <div><h2 className={styles.sectionTitle}>How MANGLO decides what happens after you place an order.</h2><p className={styles.sectionCopy}>The refund path follows the recorded transaction and supplier response. It is designed to avoid accidental double delivery, duplicate credits and unsupported assumptions about an upstream order.</p></div>
    </header>
    <div className={styles.lifecycle}>
     <aside className={styles.darkPanel} data-refund-reveal>
      <span className={styles.darkBadge}><ShieldCheck size={14}/> AUDITABLE REFUND FLOW</span>
      <h3>One order. One debit. One traceable outcome.</h3>
      <p>Eligible refunds create their own wallet-ledger entry and are protected by an idempotency key so the same provider outcome cannot casually credit the wallet twice.</p>
      <div className={styles.ledgerViz} aria-hidden="true"><span>DEBIT</span><span>STATUS</span><span>REFUND</span></div>
     </aside>
     <div className={styles.steps}>
      <article className={styles.step} data-refund-reveal><span className={styles.stepNo}>01</span><div><h3>Price, quantity, balance and destination are validated</h3><p>MANGLO checks the live service, current customer price, allowed quantity, wallet balance and supported destination format before creating the order.</p></div></article>
      <article className={styles.step} data-refund-reveal><span className={styles.stepNo}>02</span><div><h3>The wallet debit is recorded</h3><p>When the order is created, the exact customer charge is deducted from the wallet and an order-linked debit entry is recorded.</p></div></article>
      <article className={styles.step} data-refund-reveal><span className={styles.stepNo}>03</span><div><h3>A definitive supplier rejection is refunded immediately</h3><p>If the supplier clearly rejects the submission, MANGLO marks the order refunded and restores the full order charge to the wallet automatically.</p></div></article>
      <article className={styles.step} data-refund-reveal><span className={styles.stepNo}>04</span><div><h3>An uncertain submission is held for verification</h3><p>If supplier confirmation is interrupted and MANGLO cannot safely tell whether the order was accepted, the order is held in a verification state. MANGLO deliberately avoids blindly submitting it again or issuing an immediate duplicate-risk refund until the provider result is checked.</p></div></article>
      <article className={styles.step} data-refund-reveal><span className={styles.stepNo}>05</span><div><h3>Provider status determines the automatic outcome</h3><p>Completed orders close normally. Canceled or failed provider outcomes receive a full eligible wallet refund. Partial orders receive a proportional wallet refund for the provider-reported undelivered remainder.</p></div></article>
     </div>
    </div>
   </div>
  </section>

  <section className={`${styles.section} ${styles.sectionTint}`}>
   <div className={styles.shell}>
    <header className={styles.sectionHead} data-refund-reveal>
     <span className={styles.index}>03 / ELIGIBILITY</span>
     <div><h2 className={styles.sectionTitle}>What is automatic, what needs review, and what is generally not reversible.</h2></div>
    </header>
    <div className={styles.eligibilityGrid}>
     <article className={styles.eligibilityCard} data-refund-reveal><span className={`${styles.statusPill} ${styles.green}`}><CircleCheckBig size={14}/> AUTOMATIC WHEN CONFIRMED</span><h3>Provider-linked refund events</h3><ul><li>Definitive supplier rejection before normal processing.</li><li>Provider status reported as Canceled.</li><li>Provider status reported as Failed or equivalent error state.</li><li>Provider-reported Partial status with an undelivered remainder, refunded proportionally.</li></ul></article>
     <article className={styles.eligibilityCard} data-refund-reveal><span className={styles.statusPill}><Headphones size={14}/> SUPPORT REVIEW</span><h3>Cases that may require verification</h3><ul><li>Supplier submission confirmation was interrupted or uncertain.</li><li>Your bank shows a debit but the Cashfree payment has not been confirmed as paid to MANGLO.</li><li>A payment appears duplicated or a wallet entry does not match the visible transaction history.</li><li>You need help understanding a provider status, partial result or refill condition.</li></ul></article>
     <article className={styles.eligibilityCard} data-refund-reveal><span className={`${styles.statusPill} ${styles.gray}`}><Clock3 size={14}/> GENERALLY NOT REVERSIBLE</span><h3>Orders already underway</h3><ul><li>Completed orders are not automatically refundable.</li><li>An upstream order already processing may not be cancellable simply because you changed your mind.</li><li>A valid order cannot generally be moved to a different destination after supplier processing begins.</li><li>A refill request is not the same thing as a cash or wallet refund.</li></ul></article>
    </div>
   </div>
  </section>

  <section className={styles.section}>
   <div className={styles.shell}>
    <header className={styles.sectionHead} data-refund-reveal>
     <span className={styles.index}>04 / WALLET & PAYMENTS</span>
     <div><h2 className={styles.sectionTitle}>Wallet funding and service-order refunds are two different flows.</h2><p className={styles.sectionCopy}>This distinction matters. A Cashfree payment funds your MANGLO Wallet only after server-side confirmation. A service-order refund restores eligible order value to that wallet.</p></div>
    </header>
    <div className={styles.paymentGrid}>
     <article className={styles.paymentCard} data-refund-reveal><span className={styles.paymentIcon}><CreditCard size={22}/></span><h3>Wallet top-ups</h3><p>MANGLO credits a wallet top-up only after Cashfree confirms the payment as paid and the confirmed amount and currency match the local payment record. Failed, abandoned, cancelled, void or unresolved payment attempts do not create wallet credit just because a bank screen shows an attempt.</p></article>
     <article className={styles.paymentCard} data-refund-reveal><span className={styles.paymentIcon}><WalletCards size={22}/></span><h3>Service-order refunds</h3><p>The current MANGLO refund engine returns eligible service-order amounts to your MANGLO Wallet and records the resulting balance. It does not automatically send each order refund back through UPI, card or bank rails as a separate payment reversal.</p></article>
     <article className={styles.paymentCard} data-refund-reveal><span className={styles.paymentIcon}><Clock3 size={22}/></span><h3>Bank debited, wallet not credited</h3><p>If your account was debited but Cashfree has not confirmed the order as paid, the payment can remain pending or may be reversed by the bank/payment provider. MANGLO does not control external bank reversal timelines. If the status remains unresolved, contact support with the Cashfree order reference.</p></article>
     <article className={styles.paymentCard} data-refund-reveal><span className={styles.paymentIcon}><ShieldCheck size={22}/></span><h3>Duplicate protection</h3><p>Deposits and eligible order refunds use unique transaction identifiers so repeated reconciliation or repeated provider status checks do not intentionally create duplicate wallet credits.</p></article>
    </div>
   </div>
  </section>

  <section className={`${styles.section} ${styles.sectionTint}`}>
   <div className={styles.shell}>
    <header className={styles.sectionHead} data-refund-reveal>
     <span className={styles.index}>05 / LINKS, QUANTITY & TARGET CHANGES</span>
     <div><h2 className={styles.sectionTitle}>Review the destination before the supplier starts.</h2><p className={styles.sectionCopy}>MANGLO now blocks obvious service/destination mismatches and revalidates the live price before submission, but you are still responsible for confirming that the public destination and quantity are the ones you intend to purchase for.</p></div>
    </header>
    <div className={styles.policyTable} data-refund-reveal>
     <div className={styles.policyRow}><strong>Wrong destination supplied</strong><p>If a syntactically valid destination is the wrong account, post, video or profile and the supplier has already started or completed delivery, the order generally cannot be redirected to another destination.</p></div>
     <div className={styles.policyRow}><strong>Wrong quantity confirmed</strong><p>Quantity is checked against the live service limits before submission. Once the upstream order begins, changing the quantity may not be technically available.</p></div>
     <div className={styles.policyRow}><strong>Price changed before checkout</strong><p>If the live price changes after your quote, MANGLO requires you to review the updated charge rather than silently placing the order at a different amount.</p></div>
     <div className={styles.policyRow}><strong>Target later becomes private, deleted or unavailable</strong><p>Refund eligibility follows the recorded provider outcome and applicable rights. Changing or removing the target after submission does not itself guarantee a refund.</p></div>
    </div>
   </div>
  </section>

  <section className={styles.section}>
   <div className={styles.shell}>
    <header className={styles.sectionHead} data-refund-reveal>
     <span className={styles.index}>06 / REFILLS</span>
     <div><h2 className={styles.sectionTitle}>A refill is a service remedy, not a refund.</h2></div>
    </header>
    <div className={styles.refillBox} data-refund-reveal><span className={styles.refillIcon}><RefreshCcw size={24}/></span><div><h3>Refill eligibility depends on the service listing.</h3><p>Refills apply only when the purchased service explicitly indicates refill availability and the request falls within the supplier&apos;s applicable refill conditions. A refill request can be opened through support with the related MANGLO order. Refill eligibility does not automatically create a cash or wallet refund.</p></div></div>
   </div>
  </section>

  <section className={`${styles.section} ${styles.sectionTint}`}>
   <div className={styles.shell}>
    <header className={styles.sectionHead} data-refund-reveal>
     <span className={styles.index}>07 / SUPPORT & RIGHTS</span>
     <div><h2 className={styles.sectionTitle}>If the recorded outcome does not look right, give support the order context.</h2></div>
    </header>
    <div className={styles.supportWrap}>
     <article className={styles.supportCard} data-refund-reveal><Headphones size={24}/><h3>Order-linked support</h3><p>For service-order issues, sign in and open support from your dashboard with the related MANGLO order number. For payment issues, include the Cashfree order reference and describe what your bank/payment app shows. This helps support compare the customer record, payment state and provider-linked order status.</p><div className={styles.supportMeta}><span>{company.supportHours}</span><span>{company.supportEmail}</span></div><div className={styles.supportActions}><Link href="/dashboard?view=support" className={styles.primary}>Open support <ArrowRight size={15}/></Link><Link href="/contact" className={styles.secondary}>Contact page</Link></div></article>
     <article className={styles.lawCard} data-refund-reveal><ShieldCheck size={24}/><h3>Applicable rights still apply</h3><p>This policy describes MANGLO&apos;s current operational refund and cancellation flow. It does not remove consumer or other rights that cannot lawfully be excluded. Where applicable law requires a different remedy, MANGLO will handle the case consistently with those requirements.</p><p>Material policy changes will be published on this page with an updated effective date.</p></article>
    </div>
   </div>
  </section>

  <section className={styles.closing}>
   <div className={styles.shell}>
    <div className={styles.closingCard} data-refund-reveal>
     <span className={styles.eyebrow}>MANGLO · MONEY MOVEMENT SHOULD BE TRACEABLE</span>
     <h2>See the order. See the status. See the wallet outcome.</h2>
     <p>Your dashboard keeps order status and wallet activity together so an eligible refund is not just a promise in a policy—it has a corresponding transaction record in the account.</p>
     <div className={styles.closingActions}><Link href="/dashboard?view=orders" className={styles.primary}>Review my orders <ArrowRight size={16}/></Link><Link href="/terms" className={styles.secondary}>Read Terms & Conditions</Link></div>
     <div className={styles.disclaimer}>Questions about this policy can be sent to <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>. MANGLO does not control third-party bank, payment-provider, social-platform or upstream-supplier processing timelines.</div>
    </div>
   </div>
  </section>
 </main>
}
