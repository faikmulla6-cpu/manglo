import Link from 'next/link';
import {
  ArrowRight,
  BadgeIndianRupee,
  Bot,
  Check,
  CircleDollarSign,
  FileCheck2,
  Headphones,
  KeyRound,
  Link2,
  LockKeyhole,
  RefreshCcw,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react';
import {company} from '@/lib/company';
import TrustMotion from './TrustMotion';
import styles from './Trust.module.css';

export const metadata={
  title:'Trust & Safety',
  description:'How MANGLO protects wallet funding, validates orders, monitors supplier reliability, handles refunds and keeps sensitive credentials on the backend.',
};

const trustCards=[
  {
    Icon:CircleDollarSign,
    title:'Payments are confirmed server-side',
    text:'Cashfree hosts checkout, but MANGLO does not trust the browser alone. Wallet credit is created only after the server verifies the payment status and amount.',
  },
  {
    Icon:WalletCards,
    title:'Every wallet movement leaves a record',
    text:'Deposits, order debits and eligible refunds create separate wallet-ledger entries with the resulting balance so money movement stays traceable inside the account.',
  },
  {
    Icon:Link2,
    title:'Wrong destination types are blocked early',
    text:'MANGLO validates supported platform links before supplier submission—for example, follower services require profile or channel targets instead of content links.',
  },
  {
    Icon:ScanSearch,
    title:'Supplier quality is learned from real outcomes',
    text:'Completed, partial and failed orders feed a rolling service-health score. Repeatedly failing services can be automatically quarantined instead of remaining equally recommended.',
  },
  {
    Icon:RefreshCcw,
    title:'Eligible failures restore wallet value',
    text:'Definitive supplier rejection and provider-reported failed or cancelled outcomes trigger protected, idempotent wallet restoration. Partial delivery can produce a proportional refund.',
  },
  {
    Icon:KeyRound,
    title:'Sensitive credentials stay behind the server boundary',
    text:'Supplier API credentials and payment secrets are not intended for client-side use. Customer actions call MANGLO endpoints, while secret-bearing provider operations stay on the backend.',
  },
];

const flow=[
  ['01','Fresh service check','The order engine requires an active, operator-enabled service backed by recently synchronized supplier data.'],
  ['02','Price & quantity validation','MANGLO recalculates the live wallet charge and validates the quantity again before any debit is accepted.'],
  ['03','Destination validation','Supported platform URLs are checked against the service intent so obvious target mismatches are rejected before submission.'],
  ['04','Recorded wallet debit','The wallet debit and order record are created together, with an idempotent transaction entry tied to the order.'],
  ['05','Supplier-linked tracking','After submission, MANGLO reconciles provider status and converts it into customer-facing outcomes, refunds and service-health feedback.'],
];

const engineRows=[
  ['Completions improve confidence','Successful recent outcomes push a supplier service toward stronger recommendation quality.'],
  ['Partial outcomes count differently','Partial delivery is treated as a weaker outcome than a full completion and may trigger a proportional wallet refund for the undelivered portion.'],
  ['Repeated failures reduce trust','Provider cancellation, failure or rejection lowers the rolling health score rather than being ignored as a one-off customer problem.'],
  ['Quarantine removes bad options','Once the failure evidence crosses MANGLO’s conservative threshold, the service can be automatically paused and audited so customers stop seeing it as available.'],
];

const boundaries=[
  {Icon:LockKeyhole,title:'No browser-side payment authority',text:'A success screen by itself is not enough to create wallet credit; MANGLO verifies the payment from the backend.'},
  {Icon:FileCheck2,title:'No silent duplicate refunding',text:'Order refunds use idempotency keys so the same terminal provider result does not repeatedly credit the wallet.'},
  {Icon:ShieldCheck,title:'No blind retry on ambiguous submission',text:'If supplier confirmation is interrupted and the submission state is uncertain, MANGLO holds the order for verification instead of risking a duplicate submission.'},
  {Icon:Headphones,title:'Support is tied to real account context',text:'Signed-in customers can open order-linked support requests so the relevant MANGLO order can be checked rather than relying on screenshots alone.'},
];

export default function Trust(){
  return <main className={styles.page}>
    <TrustMotion/>

    <section className={styles.hero}>
      <div className={`${styles.shell} ${styles.heroGrid}`}>
        <div data-trust-reveal>
          <span className={styles.eyebrow}><span className={styles.eyebrowDot}/>TRUST & SAFETY</span>
          <h1>Trust should live in the <span className={styles.accent}>system</span>, not just the copy.</h1>
          <p className={styles.lead}>MANGLO is built so important decisions—payment confirmation, pricing, wallet debits, destination checks, supplier outcomes and eligible refunds—are validated by the backend rather than left to appearances on the screen.</p>
          <div className={styles.heroActions}>
            <Link href="/services" className={styles.primary}>Explore live services <ArrowRight size={15}/></Link>
            <Link href="/refund" className={styles.secondary}>Read refund policy</Link>
          </div>
        </div>

        <div className={styles.heroCard} data-trust-reveal>
          <div className={styles.heroTop}>
            <strong>Protected order path</strong>
            <span className={styles.liveBadge}><span/> backend-validated</span>
          </div>
          <div className={styles.protectFlow}>
            {[
              [BadgeIndianRupee,'Payment verified','Wallet top-ups require server-confirmed payment state.'],
              [FileCheck2,'Quote rechecked','Service price, quantity and availability are validated again.'],
              [Link2,'Destination checked','Supported target types are verified before supplier submission.'],
              [ScanSearch,'Outcome monitored','Supplier status feeds refunds and service-health scoring.'],
            ].map(([Icon,title,text])=>{
              const IconComponent=Icon as typeof ShieldCheck;
              return <div className={styles.protectStep} key={title as string}>
                <span className={styles.stepIcon}><IconComponent size={19}/></span>
                <div><strong>{title as string}</strong><small>{text as string}</small></div>
                <span className={styles.stepCheck}><Check size={13}/></span>
              </div>;
            })}
          </div>
          <span className={`${styles.micro} ${styles.microOne}`}>wallet ledger recorded</span>
          <span className={`${styles.micro} ${styles.microTwo}`}>supplier health monitored</span>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.sectionHead} data-trust-reveal>
          <span className={styles.sectionLabel}>BUILT-IN CONTROLS</span>
          <div><h2>Protection should happen before something goes wrong.</h2><p>These are operational controls already present in MANGLO’s live product flow—not generic security claims added after the fact.</p></div>
        </div>
        <div className={styles.trustGrid}>
          {trustCards.map(({Icon,title,text})=><article className={styles.trustCard} key={title} data-trust-reveal>
            <span className={styles.cardIcon}><Icon size={21}/></span>
            <h3>{title}</h3><p>{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.soft}`}>
      <div className={styles.shell}>
        <div className={styles.sectionHead} data-trust-reveal>
          <span className={styles.sectionLabel}>BEFORE MONEY MOVES</span>
          <div><h2>One order passes through multiple checks.</h2><p>MANGLO does not treat a button click as proof that an order is valid. The transaction path validates the current service state, live price, quantity, destination and wallet conditions before the supplier receives the order.</p></div>
        </div>
        <div className={styles.flow}>
          {flow.map(([n,title,text])=><article className={styles.flowCard} key={n} data-trust-reveal>
            <span className={styles.flowNumber}>{n}</span><strong>{title}</strong><p>{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.sectionHead} data-trust-reveal>
          <span className={styles.sectionLabel}>SUPPLIER RELIABILITY</span>
          <div><h2>Trust is earned by recent outcomes.</h2><p>MANGLO’s service-health system looks at recent completed, partial and failed provider outcomes so recommendation quality can change with evidence instead of leaving every supplier service on the same permanent score.</p></div>
        </div>
        <div className={styles.engine}>
          <div className={styles.scorePanel} data-trust-reveal>
            <small>ROLLING QUALITY SIGNAL</small>
            <h3>Every outcome should make the next recommendation smarter.</h3>
            <p>New services begin from a neutral baseline. Real delivery history then pushes the health score up or down. Repeatedly failing services can cross the quarantine threshold and be paused automatically.</p>
            <div className={styles.meter}><span/><span/><span/><span/><span/></div>
          </div>
          <div className={styles.engineList}>
            {engineRows.map(([title,text],index)=><article className={styles.engineRow} key={title} data-trust-reveal>
              <span>{String(index+1).padStart(2,'0')}</span><div><h4>{title}</h4><p>{text}</p></div>
            </article>)}
          </div>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.soft}`}>
      <div className={styles.shell}>
        <div className={styles.sectionHead} data-trust-reveal>
          <span className={styles.sectionLabel}>MONEY & OUTCOMES</span>
          <div><h2>Refund logic follows the actual provider outcome.</h2><p>The dashboard status is not decorative. MANGLO reconciles supplier status and applies the eligible wallet outcome according to what the provider actually reports.</p></div>
        </div>
        <div className={styles.refundGrid}>
          <div className={styles.refundMain} data-trust-reveal>
            <h3>What different outcomes mean</h3>
            <div className={styles.statusList}>
              <div className={`${styles.status} ${styles.statusGood}`}><b>Completed</b><p>The supplier reports full completion. No automatic refund is created for that completed order.</p></div>
              <div className={`${styles.status} ${styles.statusWarn}`}><b>Partial</b><p>If the supplier reports an undelivered remainder, MANGLO can calculate and return the corresponding proportional amount to the wallet.</p></div>
              <div className={`${styles.status} ${styles.statusGood}`}><b>Cancelled / Failed</b><p>Eligible provider-reported cancellation or failure results in protected wallet restoration and a recorded refund entry.</p></div>
              <div className={`${styles.status} ${styles.statusNeutral}`}><b>Submission uncertain</b><p>If supplier confirmation is interrupted, MANGLO avoids blind retry and blind refund until the actual provider state is verified.</p></div>
            </div>
          </div>
          <div className={styles.boundaries} data-trust-reveal>
            <h3>Important boundaries</h3>
            <div className={styles.boundaryList}>{boundaries.map(({Icon,title,text})=><div className={styles.boundary} key={title}><Icon size={17}/><div><strong>{title}</strong><p>{text}</p></div></div>)}</div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.aiBand} data-trust-reveal>
          <div><span className={styles.sectionLabel}>MANGLO AI</span><h3>AI can assist. The transaction engine still decides.</h3><p>MANGLO AI can help compare the catalog and explain options, but AI is not allowed to bypass service availability, live pricing, destination validation, wallet balance or supplier checks. Manual browsing and ordering remain available without AI.</p></div>
          <div className={styles.aiBox}>
            <div className={styles.aiLine}><span><Sparkles size={13}/></span> AI can help compare</div>
            <div className={styles.aiLine}><span><FileCheck2 size={13}/></span> Backend revalidates</div>
            <div className={styles.aiLine}><span><ShieldCheck size={13}/></span> Transaction rules win</div>
          </div>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.soft}`}>
      <div className={styles.shell}>
        <div className={styles.sectionHead} data-trust-reveal>
          <span className={styles.sectionLabel}>REALISTIC PROMISES</span>
          <div><h2>Clear expectations are part of safety.</h2><p>Social platforms and upstream providers remain outside MANGLO’s control, so trust also means being honest about what the product cannot guarantee.</p></div>
        </div>
        <div className={styles.promiseGrid}>
          <article className={styles.promise} data-trust-reveal><b>No virality guarantee</b><p>MANGLO does not promise that a service will make content viral, produce organic sales, or create a specific algorithmic outcome.</p></article>
          <article className={styles.promise} data-trust-reveal><b>No “ban-proof” promise</b><p>MANGLO does not claim that any social-growth service can override a platform’s moderation, eligibility or account rules.</p></article>
          <article className={styles.promise} data-trust-reveal><b>No permanent-result promise</b><p>Retention, refill availability and delivery characteristics depend on the exact listing and upstream provider conditions.</p></article>
        </div>
      </div>
    </section>

    <section className={styles.closing}>
      <div className={styles.shell}>
        <div className={styles.closingCard} data-trust-reveal>
          <div><h2>Something still doesn’t look right? Bring the exact order.</h2><p>Use order-linked support after signing in, or contact {company.legalName} at {company.supportEmail}. Support can review the MANGLO order context, provider status and relevant wallet history instead of guessing from a generic message.</p></div>
          <div className={styles.closingActions}><Link href="/contact" className={styles.orangeButton}>Contact support <ArrowRight size={14}/></Link><Link href="/dashboard?view=support" className={styles.ghostButton}>Order-linked support</Link></div>
        </div>
      </div>
    </section>
  </main>;
}
