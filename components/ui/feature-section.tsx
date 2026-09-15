import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  CreditCard,
  Headphones,
  Link2,
  PackageCheck,
  RefreshCcw,
  ShieldCheck,
} from 'lucide-react';
import styles from './FeatureSection.module.css';

const workflowItems=[
  {
    title:'Fresh service discovery',
    subtitle:'Current customer pricing, limits and provider-listed terms.',
    label:'Catalog',
    Icon:BadgeCheck,
  },
  {
    title:'Destination validation',
    subtitle:'Profile, post, channel or video targets are checked before submission.',
    label:'Pre-check',
    Icon:Link2,
  },
  {
    title:'Verified wallet funding',
    subtitle:'Cashfree-hosted top-ups are credited only after payment confirmation.',
    label:'Payment',
    Icon:CreditCard,
  },
  {
    title:'Supplier-health monitoring',
    subtitle:'Recent outcomes influence service health and repeated failures can be quarantined.',
    label:'Health',
    Icon:ShieldCheck,
  },
  {
    title:'Supplier-linked tracking',
    subtitle:'Order progress stays attached to the MANGLO order in your account.',
    label:'Tracking',
    Icon:PackageCheck,
  },
  {
    title:'Outcome-aware refunds',
    subtitle:'Eligible failed, canceled and partial outcomes are handled through the wallet flow.',
    label:'Recovery',
    Icon:RefreshCcw,
  },
  {
    title:'Order-linked support',
    subtitle:'Support can start with the exact order context instead of a blank ticket.',
    label:'Support',
    Icon:Headphones,
  },
] as const;

export default function FeatureSection(){
  return <section className={styles.section} aria-labelledby="manglo-system-heading">
    <div className={`container ${styles.grid}`}>
      <div className={styles.visualWrap} aria-label="MANGLO order workflow capabilities">
        <div className={styles.visualTop}>
          <div><span>ORDER SYSTEM</span><b>What MANGLO handles around every order</b></div>
          <span className={styles.live}><i/> Active workflow</span>
        </div>

        <div className={styles.window}>
          <div className={styles.track}>
            {[...workflowItems,...workflowItems].map((item,index)=>{
              const Icon=item.Icon;
              return <div className={styles.row} key={`${item.title}-${index}`} aria-hidden={index>=workflowItems.length}>
                <span className={styles.icon}><Icon size={17}/></span>
                <div className={styles.rowCopy}><b>{item.title}</b><small>{item.subtitle}</small></div>
                <span className={styles.label}>{item.label}</span>
              </div>;
            })}
          </div>
          <div className={styles.fadeTop}/>
          <div className={styles.fadeBottom}/>
        </div>
      </div>

      <div className={styles.copy}>
        <span className={styles.eyebrow}>ONE CONTROLLED FLOW</span>
        <h2 id="manglo-system-heading">The complicated parts stay <em>behind the interface.</em></h2>
        <p>Finding a service is only the visible first step. MANGLO connects fresh catalog data, wallet funding, destination checks, supplier monitoring, order tracking, eligible refund handling and support into one customer workflow.</p>

        <div className={styles.points}>
          <span><ShieldCheck size={15}/> Server-side order validation</span>
          <span><CircleDollarSign size={15}/> Wallet-based recovery</span>
          <span><PackageCheck size={15}/> Supplier outcome monitoring</span>
        </div>

        <div className={styles.actions}>
          <Link className={styles.primary} href="/services">Explore live services <ArrowRight size={14}/></Link>
          <Link className={styles.secondary} href="/trust">How MANGLO protects orders</Link>
        </div>
      </div>
    </div>
  </section>;
}
