import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight,Headphones} from 'lucide-react';
import {company} from '@/lib/company';
import styles from './Footer.module.css';

const BRAND_ICON='/manglo-icon.png?v=b7aa1a27';

export default function Footer(){
 return <footer className={styles.footer}>
  <div className={['container',styles.grid].join(' ')}>
   <div className={styles.lead}>
    <Link className={styles.brand} href="/"><Image src={BRAND_ICON} alt="" width={34} height={34}/><span>MANGLO</span></Link>
    <h3>Websites built to be used, not just viewed.</h3>
    <p>Professional frontend and full-stack website development, with the MANGLO Growth Marketplace continuing as a separate product.</p>
   </div>

   <div className={styles.column}><b>AGENCY</b><Link href="/#services">Development services</Link><Link href="/#work">Our standard</Link><Link href="/#process">Process</Link><Link href="/#project">Start a project</Link></div>
   <div className={styles.column}><b>GROWTH MARKETPLACE</b><Link href="/services">All services</Link><Link href="/services?platform=Instagram">Instagram</Link><Link href="/services?platform=YouTube">YouTube</Link><Link href="/invite">Invite & earn</Link></div>
   <div className={styles.column}><b>COMPANY & SUPPORT</b><Link href="/about">About us</Link><Link href="/trust">Trust & safety</Link><Link href="/help">Help center</Link><Link href="/contact">Contact</Link></div>

   <div className={styles.helpCard}><span><Headphones size={18}/></span><div><b>Need marketplace help?</b><p>Use the Help Center or signed-in support for anything tied to an order, wallet or account.</p><Link href="/help">Open Help Center <ArrowRight size={13}/></Link></div></div>
  </div>
  <div className={['container',styles.bottom].join(' ')}><span>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</span><div><Link href="/terms">Terms of Service</Link><Link href="/privacy">Privacy Policy</Link><Link href="/refund">Refund Policy</Link></div><span className={styles.payment}><i className={styles.dot}/>Marketplace payments processed through Cashfree hosted checkout</span></div>
 </footer>;
}
