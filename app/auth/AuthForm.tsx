'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useSearchParams,useRouter} from 'next/navigation';
import {useState} from 'react';
import {ArrowRight,CheckCircle2,Eye,EyeOff,Headphones,LayoutDashboard,LockKeyhole,Mail,PackageCheck,Search,ShieldCheck,WalletCards} from 'lucide-react';
import {trackAnalytics} from '@/components/AnalyticsProvider';
import styles from './AuthPage.module.css';

const BRAND_ICON='/manglo-icon.png?v=b7aa1a27';

export default function AuthForm({liveServices}:{liveServices:number|null}){
 const params=useSearchParams(),router=useRouter();
 const [signup,setSignup]=useState(params.get('mode')==='signup');
 const [message,setMessage]=useState('');
 const [messageKind,setMessageKind]=useState<'error'|'success'>('error');
 const [busy,setBusy]=useState(false);
 const [showPassword,setShowPassword]=useState(false);
 const requested=params.get('next')||'/dashboard';
 const destination=requested.startsWith('/')&&!requested.startsWith('//')?requested:'/dashboard';
 const projectIntent=destination.startsWith('/projects');

 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();setBusy(true);setMessage('');setMessageKind('error');
  try{
   const body=Object.fromEntries(new FormData(event.currentTarget).entries());
   const response=await fetch(`/api/auth/${signup?'register':'login'}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
   const result=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(result.error||'Something went wrong.');
   if(result.confirmationRequired){
    trackAnalytics('SIGNUP_SUBMITTED');
    setMessageKind('success');setMessage('Account created. Check your email to verify your address, then log in.');setBusy(false);return;
   }
   trackAnalytics('AUTH_SUCCESS',{mode:signup?'signup':'login'});
   router.replace(destination);router.refresh();
  }catch(error){setMessageKind('error');setMessage((error as Error).message);setBusy(false)}
 }

 function switchMode(next:boolean){setSignup(next);setMessage('');setMessageKind('error');setShowPassword(false)}
 const liveLabel=liveServices===null?'Live catalog':`${liveServices.toLocaleString('en-IN')} live services`;

 return <main className={styles.page}>
  <div className={styles.glowOne}/><div className={styles.glowTwo}/>
  <section className={`container ${styles.layout}`}>
   <div className={styles.story}>
    <span className={styles.eyebrow}>{projectIntent?'MANGLO CLIENT PORTAL':'MANGLO ACCOUNT'}</span>
    <h1>{projectIntent?(signup?'Start your website':'Welcome back to your'):(signup?'Start your':'Welcome back to')} <span>{projectIntent?'project.':'smarter growth.'}</span></h1>
    <p>{projectIntent?(signup?'Create your secure MANGLO account to complete website onboarding, upload business assets and track the project from one place.':'Continue to your website project, business information, private files and delivery progress.'):(signup?'Create one secure account for live services, wallet funding, order tracking and support.':'Manage your orders, wallet, and service tracking all in one place — clear, secure and easy to use.')}</p>

    <div className={styles.benefits}>
     <article><span><ShieldCheck/></span><div><b>Secure sign-in</b><small>Supabase-backed authentication and protected sessions.</small></div></article>
     <article><span><PackageCheck/></span><div><b>{projectIntent?'Save & continue later':'Real order tracking'}</b><small>{projectIntent?'Your website onboarding autosaves so you can finish it in your own time.':'Follow supplier-linked status from your account.'}</small></div></article>
     <article><span><WalletCards/></span><div><b>{projectIntent?'Private project files':'Wallet-based checkout'}</b><small>{projectIntent?'Logos, photos and documents stay attached to the correct project.':'Fund securely through Cashfree hosted checkout.'}</small></div></article>
     <article><span><Headphones/></span><div><b>{projectIntent?'Tracked delivery':'Human support'}</b><small>{projectIntent?'Follow Information Received → Build → Review → Launch from your portal.':'Open support with the right order context attached.'}</small></div></article>
    </div>

    <div className={styles.productPreview}>
     <div className={styles.previewRail}>
      <div className={styles.previewBrand}><Image src={BRAND_ICON} alt="" width={24} height={24}/><b>MANGLO</b></div>
      <span className={styles.previewActive}><LayoutDashboard size={13}/> {projectIntent?'My projects':'Dashboard'}</span>
      <span><PackageCheck size={13}/> {projectIntent?'Business info':'My orders'}</span>
      <span><WalletCards size={13}/> {projectIntent?'Project files':'Wallet'}</span>
      <span><Headphones size={13}/> {projectIntent?'Progress':'Support'}</span>
     </div>
     <div className={styles.previewMain}>
      <div className={styles.previewTop}><div><small>{projectIntent?'YOUR CLIENT PORTAL':'YOUR MARKETPLACE'}</small><strong>{projectIntent?'One project. Everything organised.':'Everything in one account.'}</strong></div><span><CheckCircle2 size={13}/> {projectIntent?'Private':'Live'}</span></div>
      {projectIntent?<Link href="/onboarding" className={styles.previewSearch}><PackageCheck size={14}/> Website onboarding → project dashboard</Link>:<Link href="/services" className={styles.previewSearch}><Search size={14}/> Search live services…</Link>}
      <div className={styles.previewCards}>
       {projectIntent?<><Link href="/onboarding"><b>Business</b><small>Core details</small></Link><Link href="/onboarding"><b>Services</b><small>What you offer</small></Link><Link href="/onboarding"><b>Brand</b><small>Photos & style</small></Link><Link href="/onboarding"><b>Review</b><small>Submit once</small></Link></>:<><Link href="/services?platform=Instagram"><b>Instagram</b><small>Browse services</small></Link><Link href="/services?platform=YouTube"><b>YouTube</b><small>Browse services</small></Link><Link href="/services?platform=TikTok"><b>TikTok</b><small>Browse services</small></Link><Link href="/services?platform=Telegram"><b>Telegram</b><small>Browse services</small></Link></>}
      </div>
      <div className={styles.previewStats}>{projectIntent?<><div><small>AUTOSAVE</small><strong>Continue later</strong></div><div><small>PROJECT STATUS</small><strong>Tracked</strong></div></>:<><div><small>LIVE CATALOG</small><strong>{liveServices===null?'Available now':liveServices.toLocaleString('en-IN')}</strong></div><div><small>CHECKOUT</small><strong>Cashfree hosted</strong></div></>}</div>
     </div>
     <div className={styles.successChip}><CheckCircle2 size={18}/><div><b>{projectIntent?'Ready for your website':'Built for clarity'}</b><small>{projectIntent?'No giant WhatsApp questionnaire.':'Review before you order.'}</small></div></div>
    </div>
   </div>

   <div className={styles.authSide}>
    <div className={styles.note}>{projectIntent?<>Your website.<br/>One organised portal.</>:<>Same marketplace.<br/>Smarter account.</>}</div>
    <div className={styles.liveBadge}><span>↗</span><div><b>{projectIntent?'Save & continue later':liveLabel}</b><small>{projectIntent?'Private onboarding + project tracking':'Fresh catalog available now'}</small></div></div>

    <section className={styles.card}>
     <div className={styles.cardTop}><span className={styles.mark}>M</span><button type="button" onClick={()=>switchMode(!signup)}>{signup?'Already a member?':'New here?'} <b>{signup?'Log in':'Create account'}</b></button></div>
     <h2>{signup?'Create your account':'Welcome back'}</h2>
     <p>{projectIntent?(signup?'Create your MANGLO account, verify your email, then continue directly into website onboarding.':'Sign in to continue your website project and client portal.'):(signup?'Set up your MANGLO account and verify your email to continue.':'Continue to your marketplace account, wallet and live order activity.')}</p>
     {message?<div className={`${styles.notice} ${messageKind==='success'?styles.success:styles.error}`}>{message}</div>:null}

     <form onSubmit={submit} className={styles.form}>
      <input type="hidden" name="next" value={destination}/>
      {signup?<div className={styles.twoCol}>
       <label><span>Full name</span><div className={styles.inputWrap}><input name="name" minLength={2} maxLength={80} autoComplete="name" placeholder="Your name" required/></div></label>
       <label><span>Mobile number</span><div className={styles.inputWrap}><input name="phone" inputMode="tel" pattern="[0-9]{10}" placeholder="10-digit mobile" autoComplete="tel" required/></div></label>
      </div>:null}
      <label><span>Email</span><div className={styles.inputWrap}><Mail size={18}/><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required/></div></label>
      <label><span>Password</span><div className={styles.inputWrap}><LockKeyhole size={17}/><input name="password" type={showPassword?'text':'password'} minLength={signup?12:1} maxLength={128} autoComplete={signup?'new-password':'current-password'} placeholder={signup?'Create a secure password':'Enter your password'} required/><button type="button" className={styles.eye} onClick={()=>setShowPassword(value=>!value)} aria-label={showPassword?'Hide password':'Show password'}>{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>
      {signup?<small className={styles.passwordHelp}>Use at least 12 characters. New passwords are screened against known breach data without sending the password itself.</small>:<Link href="/auth/forgot" className={styles.forgot}>Forgot password?</Link>}
      <button className={styles.primary} type="submit" disabled={busy}>{busy?'Please wait…':signup?'Create account':'Continue securely'} <ArrowRight size={17}/></button>
     </form>

     <div className={styles.divider}><span>Or</span></div>
     <button type="button" className={styles.secondary} onClick={()=>switchMode(!signup)}>{signup?'Back to log in':'Create your MANGLO account'}</button>
     <div className={styles.security}><LockKeyhole size={17}/><p>Authentication is handled by Supabase. Payment credentials are entered through Cashfree hosted checkout and are not stored by MANGLO.</p></div>
    </section>
   </div>
  </section>
 </main>;
}
