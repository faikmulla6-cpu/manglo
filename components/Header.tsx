import Image from 'next/image';
import Link from 'next/link';
import {getUser} from '@/lib/auth';
import {LayoutDashboard, Menu, UserRound} from 'lucide-react';

export default async function Header(){
  const user=await getUser().catch(()=>null);
  return <header className="nav agency-nav">
    <div className="container nav-inner">
      <Link className="brand" href="/"><Image src="/manglo-icon.png" alt="" width={38} height={38}/><span>MANGLO</span></Link>
      <nav className="nav-links agency-nav-links">
        <Link href="/#services">Services</Link>
        <Link href="/#work">Our standard</Link>
        <Link href="/#process">Process</Link>
        <Link href="/services">Growth marketplace</Link>
      </nav>
      <div className="nav-actions">
        {user
          ? <Link className="agency-account-link" href="/dashboard"><LayoutDashboard size={17}/> Marketplace dashboard</Link>
          : <Link className="agency-account-link" href="/auth"><UserRound size={17}/> Marketplace login</Link>}
        <Link className="btn btn-primary" href="/#project">Start a project</Link>
        <details className="mobile-menu">
          <summary aria-label="Open menu"><Menu/></summary>
          <div>
            <Link href="/#services">Services</Link><Link href="/#work">Our standard</Link><Link href="/#process">Process</Link>
            <Link href="/services">Growth marketplace</Link><Link href={user?'/dashboard':'/auth'}>{user?'Marketplace dashboard':'Marketplace login'}</Link>
            <Link href="/#project">Start a project</Link>
          </div>
        </details>
      </div>
    </div>
  </header>;
}
