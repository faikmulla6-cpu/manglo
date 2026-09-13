import Image from 'next/image';
import Link from 'next/link';
import {getUser} from '@/lib/auth';
import {LayoutDashboard,Menu,Search,UserRound} from 'lucide-react';
import styles from './Header.module.css';

export default async function Header(){
 const user=await getUser().catch(()=>null);
 return <header className={styles.header}><div className={`container ${styles.inner}`}>
  <Link className={styles.brand} href="/"><Image src="/manglo-icon.png" alt="" width={38} height={38}/><span>MANGLO</span></Link>
  <nav className={styles.links}><Link href="/services">Marketplace</Link><Link href="/about">About</Link><Link href="/trust">Trust & safety</Link><Link href="/contact">Support</Link></nav>
  <div className={styles.actions}>
   <Link className={styles.search} href="/services" aria-label="Search marketplace"><Search size={18}/></Link>
   {user?<Link className={styles.primary} href="/dashboard"><LayoutDashboard size={16}/> Dashboard</Link>:<><Link className={styles.login} href="/auth"><UserRound size={16}/> Log in</Link><Link className={styles.primary} href="/auth?mode=signup">Get started</Link></>}
   <details className={styles.mobile}><summary aria-label="Open menu"><Menu size={19}/></summary><div className={styles.menu}><Link href="/services">Marketplace</Link><Link href="/about">About</Link><Link href="/trust">Trust & safety</Link><Link href="/contact">Support</Link><Link href={user?'/dashboard':'/auth'}>{user?'Dashboard':'Log in'}</Link></div></details>
  </div>
 </div></header>;
}
