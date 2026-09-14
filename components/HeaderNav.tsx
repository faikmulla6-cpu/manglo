'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import {
 ArrowRight,BookOpen,ChevronRight,Gift,Gauge,LayoutDashboard,LockKeyhole,Menu,Search,ShieldCheck,UserRound,X,
} from 'lucide-react';
import styles from './Header.module.css';

const BRAND_ICON='/manglo-icon.png?v=b7aa1a27';

const primaryLinks=[
 {href:'/services',label:'Services'},
 {href:'/about',label:'About'},
 {href:'/trust',label:'Trust & safety'},
 {href:'/help',label:'Help center'},
] as const;

function isActive(pathname:string,href:string){
 if(href==='/services')return pathname==='/services'||pathname.startsWith('/services/');
 if(href==='/help')return pathname==='/help'||pathname==='/faq'||pathname==='/contact';
 return pathname===href||pathname.startsWith(`${href}/`);
}

export default function HeaderNav({signedIn,admin}:{signedIn:boolean;admin:boolean}){
 const pathname=usePathname();
 const [open,setOpen]=useState(false);

 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{
  function onKey(event:KeyboardEvent){if(event.key==='Escape')setOpen(false)}
  window.addEventListener('keydown',onKey);
  return()=>window.removeEventListener('keydown',onKey);
 },[]);
 useEffect(()=>{
  const media=window.matchMedia('(max-width: 920px)');
  function onChange(event:MediaQueryListEvent){if(!event.matches)setOpen(false)}
  media.addEventListener('change',onChange);
  return()=>media.removeEventListener('change',onChange);
 },[]);
 useEffect(()=>{
  if(!open)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=previous};
 },[open]);

 const inviteHref=signedIn?'/invite':'/auth?mode=signup&next=%2Finvite';
 const accountHref=signedIn?'/dashboard':'/auth';
 const accountLabel=signedIn?'Dashboard':'Log in';

 return <header className={styles.header}>
  <div className={styles.accent}/>
  <div className={`container ${styles.inner}`}>
   <Link className={styles.brand} href="/" aria-label="MANGLO home">
    <span className={styles.brandIcon}><Image src={BRAND_ICON} alt="" width={35} height={35} priority/></span>
    <span className={styles.brandCopy}><b>MANGLO</b><small>Jo chahiye, Manglo.</small></span>
   </Link>

   <nav className={styles.links} aria-label="Primary navigation">
    {primaryLinks.map(link=>{
     const active=isActive(pathname,link.href);
     return <Link key={link.href} href={link.href} className={active?styles.activeLink:undefined} aria-current={pathname===link.href?'page':undefined}>{link.label}</Link>;
    })}
    <Link href={inviteHref} className={isActive(pathname,'/invite')?styles.activeLink:undefined} aria-current={pathname==='/invite'?'page':undefined}>Invite & earn</Link>
   </nav>

   <div className={styles.actions}>
    <span className={styles.trustBadge} title="Order pricing and wallet balance are revalidated server-side before submission"><ShieldCheck size={14}/> Protected ordering</span>
    <Link className={styles.iconButton} href="/services" aria-label="Search services" title="Search services"><Search size={17}/></Link>
    {signedIn?
     <>
      {admin?<Link className={styles.iconButton} href="/admin" aria-label="Open operations" title="Operations"><Gauge size={16}/></Link>:null}
      <Link className={styles.accountButton} href="/dashboard"><LayoutDashboard size={15}/><span>Dashboard</span></Link>
     </>:
     <>
      <Link className={styles.login} href="/auth"><UserRound size={15}/> Log in</Link>
      <Link className={styles.primary} href="/services">Browse services <ArrowRight size={14}/></Link>
     </>}

    <button type="button" className={styles.mobileTrigger} onClick={()=>setOpen(value=>!value)} aria-expanded={open} aria-controls="manglo-mobile-nav" aria-label={open?'Close navigation':'Open navigation'}>{open?<X size={20}/>:<Menu size={20}/>}</button>
   </div>
  </div>

  {open?<button type="button" className={styles.backdrop} aria-label="Close navigation" onClick={()=>setOpen(false)}/>:null}
  <div id="manglo-mobile-nav" className={`${styles.mobilePanel} ${open?styles.mobilePanelOpen:''}`} aria-hidden={!open}>
   <div className={styles.mobileTop}>
    <div><span>Navigation</span><b>Find what you need</b></div>
    <span className={styles.mobileSecure}><LockKeyhole size={13}/> Protected ordering</span>
   </div>
   <nav className={styles.mobileLinks} aria-label="Mobile navigation">
    {primaryLinks.map(link=><Link key={link.href} href={link.href} className={isActive(pathname,link.href)?styles.mobileActive:undefined}><span>{link.label}<small>{link.href==='/services'?'Browse the live marketplace':link.href==='/about'?'Meet MANGLO and its founder':link.href==='/trust'?'How MANGLO protects orders':'Guides, payments, orders and support'}</small></span><ChevronRight size={16}/></Link>)}
    <Link href={inviteHref} className={isActive(pathname,'/invite')?styles.mobileActive:undefined}><span>Invite & earn<small>Share MANGLO and view referral rewards</small></span><Gift size={16}/></Link>
   </nav>
   <div className={styles.mobileSupportLinks}><Link href="/faq"><BookOpen size={14}/> FAQ & support</Link><Link href="/contact">Contact MANGLO</Link></div>
   <div className={styles.mobileTrust}><ShieldCheck size={18}/><div><b>Clear checks before an order leaves MANGLO.</b><p>Live service details, quantity, price and wallet balance are validated again by the transaction engine before submission.</p></div></div>
   <div className={styles.mobileActions}>
    <Link className={styles.mobileAccount} href={accountHref}>{signedIn?<LayoutDashboard size={16}/>:<UserRound size={16}/>} {accountLabel}</Link>
    {!signedIn?<Link className={styles.mobilePrimary} href="/services">Browse services <ArrowRight size={14}/></Link>:null}
    {admin?<Link className={styles.mobileAdmin} href="/admin"><Gauge size={15}/> Operations</Link>:null}
   </div>
  </div>
 </header>;
}
