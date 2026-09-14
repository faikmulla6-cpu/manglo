import Image from 'next/image';
import Link from 'next/link';
import {getUser} from '@/lib/auth';
import {isAdminEmail} from '@/lib/admin';
import {ArrowRight,Gauge,Gift,LayoutDashboard,Menu,Search,UserRound} from 'lucide-react';
import styles from './Header.module.css';

const BRAND_ICON='/manglo-icon.png?v=b7aa1a27';

export default async function Header(){
 const user=await getUser().catch(()=>null);
 const admin=isAdminEmail(user?.email);
 return <header className={styles.header}><div className={`container ${styles.inner}`}>
  <Link className={styles.brand} href="/"><Image src={BRAND_ICON} alt="" width={34} height={34} priority/><span>MANGLO</span></Link>
  <nav className={styles.links}><Link href="/services">Services</Link>{user?<Link href="/invite">Invite & earn</Link>:<Link href="/auth?mode=signup&next=%2Finvite">Invite & earn</Link>}<Link href="/trust">Trust & safety</Link><Link href="/contact">Support</Link></nav>
  <div className={styles.actions}>
   <Link className={styles.iconButton} href="/services" aria-label="Search services"><Search size={17}/></Link>
   {user?<><Link className={styles.login} href="/dashboard"><LayoutDashboard size={15}/> My account</Link><Link className={styles.iconButton} href="/invite" aria-label="Invite and earn"><Gift size={16}/></Link>{admin?<Link className={styles.iconButton} href="/admin" aria-label="Open operations"><Gauge size={16}/></Link>:null}</>:<><Link className={styles.login} href="/auth"><UserRound size={15}/> Log in</Link><Link className={styles.primary} href="/services">Browse services <ArrowRight size={14}/></Link></>}
   <details className={styles.mobile}><summary aria-label="Open menu"><Menu size={19}/></summary><div className={styles.menu}><Link href="/services">Services</Link><Link href={user?'/invite':'/auth?mode=signup&next=%2Finvite'}>Invite & earn</Link><Link href="/trust">Trust & safety</Link><Link href="/contact">Support</Link>{admin?<Link href="/admin">Operations</Link>:null}<Link href={user?'/dashboard':'/auth'}>{user?'My account':'Log in'}</Link></div></details>
  </div>
 </div></header>;
}
