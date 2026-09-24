import Image from 'next/image';
import Link from 'next/link';
import {company} from '@/lib/company';

export default function Footer(){
  return <footer className="footer agency-footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <Link className="brand" href="/"><Image src="/manglo-icon.png" alt="" width={36} height={36}/><span>MANGLO</span></Link>
        <h3>Websites built to be used, not just viewed.</h3>
        <p>Professional frontend and full-stack website development for founders, businesses and growing products.</p>
        <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>
      </div>
      <div><b>Agency</b><Link href="/#services">Services</Link><Link href="/#work">Our standard</Link><Link href="/#process">Process</Link><Link href="/#project">Start a project</Link></div>
      <div><b>Products</b><Link href="/services">Growth marketplace</Link><Link href="/auth">Marketplace login</Link><a href="https://clipkaroai.pro" target="_blank" rel="noreferrer">ClipKaro AI ↗</a></div>
      <div><b>Company</b><Link href="/contact">Support</Link><Link href="/trust">Trust & safety</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} {company.legalName}</span><span>Agency services + MANGLO Growth Marketplace</span></div>
  </footer>;
}
