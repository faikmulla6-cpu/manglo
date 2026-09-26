import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {company} from '@/lib/company';
import styles from './Footer.module.css';

const BRAND_ICON='/manglo-icon.png?v=b7aa1a27';

export default function Footer(){
 return <footer className={styles.footer}>
  <div className={['container',styles.top].join(' ')}>
   <div className={styles.statement}>
    <Link className={styles.brand} href="/"><Image src={BRAND_ICON} alt="" width={34} height={34}/><span>MANGLO</span></Link>
    <h2>Design that earns attention.<br/>Engineering that earns trust.</h2>
    <Link className={styles.projectLink} href="/#project">Start a project <ArrowUpRight size={15}/></Link>
   </div>

   <div className={styles.links}>
    <div><b>STUDIO</b><Link href="/#work">Selected work</Link><Link href="/#services">What we build</Link><Link href="/#process">Process</Link><Link href="/about">About</Link></div>
    <div><b>PRODUCTS</b><Link href="/services">Growth marketplace</Link><Link href="/invite">Invite & earn</Link><Link href="/dashboard">Dashboard</Link></div>
    <div><b>SUPPORT</b><Link href="/help">Help center</Link><Link href="/contact">Contact</Link><Link href="/trust">Trust & safety</Link></div>
   </div>
  </div>

  <div className={['container',styles.wordmark].join(' ')} aria-hidden="true">MANGLO</div>

  <div className={['container',styles.bottom].join(' ')}>
   <span>© {new Date().getFullYear()} {company.legalName}</span>
   <div><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/refund">Refunds</Link></div>
   <span className={styles.status}><i/> MANGLO Growth payments via Cashfree hosted checkout</span>
  </div>
 </footer>;
}
