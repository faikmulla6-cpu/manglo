import Image from 'next/image';
import Link from 'next/link';
import {getUser} from '@/lib/auth';
import {isAdminEmail} from '@/lib/admin';
import {Gauge,LayoutDashboard,Menu,Search,UserRound} from 'lucide-react';
import styles from './Header.module.css';

export default async function Header(){
 const user=await getUser().catch(()=>null);
 const admin=isAdminEmail(user?.email);
 return <header className={styles.header}><div className={`container ${styles.inner}`}>
  <Link className={styles.brand} href="/"><Image src="/manglo-icon.png" alt="" width={38} height={38}/><span>MANGLO</span></Link>
  <nav className={styles.links}><Link href="/services">Services</Link><Link href="/about">About</Link><Link href="/trust">Trust & safety</Link><Link href="/contact">Support</Link>{admin?<Link href="/admin">Operations</Link>:null}</nav>
  <div className={styles.actions}>
   <Link className={styles.search} href="/services" aria-label="Search services"><Search size={18}/></Link>
   {user?<><Link className={styles.primary} href="/dashboard"><LayoutDashboard size={16}/> My account</Link>{admin?<Link className={styles.search} href="/admin" aria-label="Open operations"><Gauge size={17}/></Link>:null}</>:<><Link className={styles.login} href="/auth"><UserRound size={16}/> Log in</Link><Link className={styles.primary} href="/auth?mode=signup">Get started</Link></>}
   <details className={styles.mobile}><summary aria-label="Open menu"><Menu size={19}/></summary><div className={styles.menu}><Link href="/services">Services</Link><Link href="/about">About</Link><Link href="/trust">Trust & safety</Link><Link href="/contact">Support</Link>{admin?<Link href="/admin">Operations</Link>:null}<Link href={user?'/dashboard':'/auth'}>{user?'My account':'Log in'}</Link></div></details>
  </div>
 </div></header>;
}
