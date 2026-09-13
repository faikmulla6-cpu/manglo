import Image from 'next/image';
import Link from 'next/link';
import {company} from '@/lib/company';
import styles from './Footer.module.css';

export default function Footer(){
 return <footer className={styles.footer}>
  <div className={`container ${styles.grid}`}>
   <div className={styles.lead}><Link className={styles.brand} href="/"><Image src="/manglo-icon.png" alt="" width={36} height={36}/><span>MANGLO</span></Link><h3>Jo chahiye, Manglo.</h3><p>Clear services, visible wallet records, live order tracking and support connected to the order that needs it.</p><a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a></div>
   <div className={styles.column}><b>MARKETPLACE</b><Link href="/services?platform=Instagram">Instagram</Link><Link href="/services?platform=YouTube">YouTube</Link><Link href="/services?platform=TikTok">TikTok</Link><Link href="/services?platform=Telegram">Telegram</Link></div>
   <div className={styles.column}><b>COMPANY</b><Link href="/about">About</Link><Link href="/trust">Trust & safety</Link><Link href="/contact">Contact</Link><Link href="/refund">Refund policy</Link></div>
   <div className={styles.column}><b>LEGAL</b><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link></div>
  </div>
  <div className={`container ${styles.bottom}`}><span>© {new Date().getFullYear()} {company.legalName}</span><span className={styles.payment}><i className={styles.dot}/>Payments processed securely through Cashfree hosted checkout</span></div>
 </footer>;
}
