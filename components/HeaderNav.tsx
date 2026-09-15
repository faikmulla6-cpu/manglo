'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {
 ArrowRight,ChevronRight,Gift,Gauge,LayoutDashboard,Menu,Search,UserRound,X,
} from 'lucide-react';
import styles from './Header.module.css';

const BRAND_ICON='/manglo-icon.png?v=b7aa1a27';
const COLLAPSE_AFTER=150;
const EXPAND_DISTANCE=80;

const primaryLinks=[
 {href:'/services',label:'Services'},
 {href:'/about',label:'About'},
 {href:'/trust',label:'Trust & Safety'},
 {href:'/help',label:'Help'},
] as const;

function isActive(pathname:string,href:string){
 if(href==='/services')return pathname==='/services'||pathname.startsWith('/services/');
 if(href==='/help')return pathname==='/help'||pathname==='/faq'||pathname==='/contact';
 return pathname===href||pathname.startsWith(`${href}/`);
}

export default function HeaderNav({signedIn,admin}:{signedIn:boolean;admin:boolean}){
 const pathname=usePathname();
 const [mobileOpen,setMobileOpen]=useState(false);
 const [compact,setCompact]=useState(false);
 const compactRef=useRef(false);
 const lastScrollY=useRef(0);
 const collapsedAt=useRef(0);

 function updateCompact(value:boolean){
  compactRef.current=value;
  setCompact(value);
 }

 useEffect(()=>{
  setMobileOpen(false);
  updateCompact(false);
  lastScrollY.current=window.scrollY;
 },[pathname]);

 useEffect(()=>{
  function onKey(event:KeyboardEvent){if(event.key==='Escape')setMobileOpen(false)}
  window.addEventListener('keydown',onKey);
  return()=>window.removeEventListener('keydown',onKey);
 },[]);

 useEffect(()=>{
  const desktop=window.matchMedia('(min-width: 921px)');
  function onBreakpoint(event:MediaQueryListEvent){
   if(!event.matches){updateCompact(false);setMobileOpen(false)}
  }
  desktop.addEventListener('change',onBreakpoint);
  return()=>desktop.removeEventListener('change',onBreakpoint);
 },[]);

 useEffect(()=>{
  let ticking=false;
  function readScroll(){
   const latest=window.scrollY;
   const previous=lastScrollY.current;
   const desktop=window.innerWidth>920;

   if(desktop&&!mobileOpen){
    if(!compactRef.current&&latest>previous&&latest>COLLAPSE_AFTER){
     collapsedAt.current=latest;
     updateCompact(true);
    }else if(compactRef.current&&latest<previous&&collapsedAt.current-latest>EXPAND_DISTANCE){
     updateCompact(false);
    }
    if(latest<48&&compactRef.current)updateCompact(false);
   }

   lastScrollY.current=latest;
   ticking=false;
  }
  function onScroll(){
   if(ticking)return;
   ticking=true;
   window.requestAnimationFrame(readScroll);
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  return()=>window.removeEventListener('scroll',onScroll);
 },[mobileOpen]);

 useEffect(()=>{
  if(!mobileOpen)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=previous};
 },[mobileOpen]);

 const inviteHref=signedIn?'/invite':'/auth?mode=signup&next=%2Finvite';
 const accountHref=signedIn?'/dashboard':'/auth';

 return <header className={styles.headerShell}>
  <div className={`${styles.navFrame} ${compact?styles.navCompact:''}`}>
   <div className={styles.navContent} aria-hidden={compact}>
    <Link className={styles.brand} href="/" aria-label="MANGLO home" tabIndex={compact?-1:undefined}>
     <span className={styles.brandIcon}><Image src={BRAND_ICON} alt="" width={31} height={31} priority/></span>
     <span className={styles.brandName}>MANGLO</span>
    </Link>

    <nav className={styles.links} aria-label="Primary navigation">
     {primaryLinks.map(link=>{
      const active=isActive(pathname,link.href);
      return <Link key={link.href} href={link.href} className={active?styles.activeLink:undefined} aria-current={pathname===link.href?'page':undefined} tabIndex={compact?-1:undefined}>{link.label}</Link>;
     })}
    </nav>

    <div className={styles.actions}>
     <Link className={styles.utilityButton} href={inviteHref} aria-label="Invite and earn" title="Invite & earn" tabIndex={compact?-1:undefined}><Gift size={15}/></Link>
     <Link className={styles.utilityButton} href="/services" aria-label="Search services" title="Search services" tabIndex={compact?-1:undefined}><Search size={15}/></Link>
     {admin?<Link className={styles.utilityButton} href="/admin" aria-label="Open operations" title="Operations" tabIndex={compact?-1:undefined}><Gauge size={15}/></Link>:null}
     {signedIn?
      <Link className={styles.accountButton} href="/dashboard" tabIndex={compact?-1:undefined}><LayoutDashboard size={14}/> Dashboard</Link>:
      <><Link className={styles.login} href="/auth" tabIndex={compact?-1:undefined}>Log in</Link><Link className={styles.primary} href="/services" tabIndex={compact?-1:undefined}>Explore services <ArrowRight size={13}/></Link></>}
     <button type="button" className={styles.mobileTrigger} onClick={()=>{updateCompact(false);setMobileOpen(value=>!value)}} aria-expanded={mobileOpen} aria-controls="manglo-mobile-nav" aria-label={mobileOpen?'Close navigation':'Open navigation'} tabIndex={compact?-1:undefined}>{mobileOpen?<X size={19}/>:<Menu size={19}/>}</button>
    </div>
   </div>

   <button type="button" className={styles.compactTrigger} onClick={()=>updateCompact(false)} aria-label="Expand MANGLO navigation" aria-hidden={!compact} tabIndex={compact?0:-1}><Menu size={19}/></button>
  </div>

  {mobileOpen?<button type="button" className={styles.backdrop} aria-label="Close navigation" onClick={()=>setMobileOpen(false)}/>:null}
  <aside id="manglo-mobile-nav" className={`${styles.mobilePanel} ${mobileOpen?styles.mobilePanelOpen:''}`} aria-hidden={!mobileOpen}>
   <div className={styles.mobileHeader}>
    <div className={styles.mobileBrand}><Image src={BRAND_ICON} alt="" width={28} height={28}/><span>MANGLO</span></div>
    <button type="button" onClick={()=>setMobileOpen(false)} aria-label="Close navigation"><X size={18}/></button>
   </div>
   <nav className={styles.mobileLinks} aria-label="Mobile navigation">
    {primaryLinks.map(link=><Link key={link.href} href={link.href} className={isActive(pathname,link.href)?styles.mobileActive:undefined}><span>{link.label}</span><ChevronRight size={15}/></Link>)}
    <Link href={inviteHref} className={isActive(pathname,'/invite')?styles.mobileActive:undefined}><span>Invite & earn</span><Gift size={15}/></Link>
   </nav>
   <div className={styles.mobileMeta}>
    <Link href="/faq">FAQ & Support</Link>
    <Link href="/contact">Contact</Link>
    <Link href="/privacy">Privacy</Link>
   </div>
   <div className={styles.mobileActions}>
    <Link className={styles.mobileAccount} href={accountHref}>{signedIn?<LayoutDashboard size={15}/>:<UserRound size={15}/>} {signedIn?'Dashboard':'Log in'}</Link>
    {!signedIn?<Link className={styles.mobilePrimary} href="/services">Explore services <ArrowRight size={13}/></Link>:null}
    {admin?<Link className={styles.mobileAdmin} href="/admin"><Gauge size={15}/> Operations</Link>:null}
   </div>
  </aside>
 </header>;
}
