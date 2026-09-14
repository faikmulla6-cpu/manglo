import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight,Headphones} from 'lucide-react';
import {company} from '@/lib/company';
import styles from './Footer.module.css';

export default function Footer(){
 return <footer className={styles.footer}>
  <div className={`container ${styles.grid}`}>
   <div className={styles.lead}>
    <Link className={styles.brand} href="/"><Image src="/manglo-icon.png" alt="" width={34} height={34}/><span>MANGLO</span></Link>
    <h3>Jo chahiye, Manglo.</h3>
    <p>Live social growth services with clear pricing, wallet-based ordering, supplier-linked tracking and support connected to the order that needs it.</p>
   </div>

   <div className={styles.column}><b>MARKETPLACE</b><Link href="/services">All services</Link><Link href="/services?platform=Instagram">Instagram</Link><Link href="/services?platform=YouTube">YouTube</Link><Link href="/services?platform=TikTok">TikTok</Link><Link href="/services?platform=Telegram">Telegram</Link></div>
   <div className={styles.column}><b>COMPANY</b><Link href="/about">About us</Link><Link href="/trust">Trust & safety</Link><Link href="/invite">Invite & earn</Link><Link href="/refund">Refund policy</Link></div>
   <div className={styles.column}><b>SUPPORT</b><Link href="/contact">Help center</Link><a href={`mailto:${company.supportEmail}`}>Contact us</a><Link href="/#faq">FAQs</Link><Link href="/privacy">Privacy</Link></div>

   <div className={styles.helpCard}><span><Headphones size={18}/></span><div><b>Need help?</b><p>Open support and send the context your order needs.</p><Link href="/contact">Contact support <ArrowRight size={13}/></Link></div></div>
  </div>
  <div className={`container ${styles.bottom}`}><span>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</span><div><Link href="/terms">Terms of Service</Link><Link href="/privacy">Privacy Policy</Link><Link href="/refund">Refund Policy</Link></div><span className={styles.payment}><i className={styles.dot}/>Payments processed through Cashfree hosted checkout</span></div>
 </footer>;
}
