'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
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

function NavTooltip({label,children}:{label:string;children:React.ReactElement}){
 return <Tooltip.Root>
  <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
  <Tooltip.Portal>
   <Tooltip.Content className={styles.tooltip} sideOffset={8} collisionPadding={10}>
    {label}<Tooltip.Arrow className={styles.tooltipArrow}/>
   </Tooltip.Content>
  </Tooltip.Portal>
 </Tooltip.Root>;
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

 const inviteHref=signedIn?'/invite':'/auth?mode=signup&next=%2Finvite';
 const accountHref=signedIn?'/dashboard':'/auth';

 return <Tooltip.Provider delayDuration={220} skipDelayDuration={80}>
  <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
   <header className={styles.headerShell}>
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
       <NavTooltip label="Invite & earn"><Link className={styles.utilityButton} href={inviteHref} aria-label="Invite and earn" tabIndex={compact?-1:undefined}><Gift size={15}/></Link></NavTooltip>
       <NavTooltip label="Search services"><Link className={styles.utilityButton} href="/services" aria-label="Search services" tabIndex={compact?-1:undefined}><Search size={15}/></Link></NavTooltip>
       {admin?<NavTooltip label="Operations"><Link className={styles.utilityButton} href="/admin" aria-label="Open operations" tabIndex={compact?-1:undefined}><Gauge size={15}/></Link></NavTooltip>:null}
       {signedIn?
        <Link className={styles.accountButton} href="/dashboard" tabIndex={compact?-1:undefined}><LayoutDashboard size={14}/> Dashboard</Link>:
        <><Link className={styles.login} href="/auth" tabIndex={compact?-1:undefined}>Log in</Link><Link className={styles.primary} href="/services" tabIndex={compact?-1:undefined}>Explore services <ArrowRight size={13}/></Link></>}
       <Dialog.Trigger asChild>
        <button type="button" className={styles.mobileTrigger} onClick={()=>updateCompact(false)} aria-label="Open navigation" tabIndex={compact?-1:undefined}><Menu size={19}/></button>
       </Dialog.Trigger>
      </div>
     </div>

     <button type="button" className={styles.compactTrigger} onClick={()=>updateCompact(false)} aria-label="Expand MANGLO navigation" aria-hidden={!compact} tabIndex={compact?0:-1}><Menu size={19}/></button>
    </div>
   </header>

   <Dialog.Portal>
    <Dialog.Overlay className={styles.backdrop}/>
    <Dialog.Content asChild onOpenAutoFocus={()=>updateCompact(false)}>
     <aside id="manglo-mobile-nav" className={`${styles.mobilePanel} ${styles.mobilePanelOpen}`}>
      <Dialog.Title className={styles.srOnly}>MANGLO navigation</Dialog.Title>
      <Dialog.Description className={styles.srOnly}>Navigate MANGLO services, information, support and account areas.</Dialog.Description>
      <div className={styles.mobileHeader}>
       <div className={styles.mobileBrand}><Image src={BRAND_ICON} alt="" width={28} height={28}/><span>MANGLO</span></div>
       <Dialog.Close asChild><button type="button" aria-label="Close navigation"><X size={18}/></button></Dialog.Close>
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
    </Dialog.Content>
   </Dialog.Portal>
  </Dialog.Root>
 </Tooltip.Provider>;
}
