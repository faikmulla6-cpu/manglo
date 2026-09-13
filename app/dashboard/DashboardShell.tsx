'use client';

import Link from 'next/link';
import {useState} from 'react';
import {
 BadgeHelp,ChevronRight,ClipboardList,CreditCard,Gift,Heart,Home,LogOut,
 Plus,RefreshCw,ShieldCheck,UserRound,Wallet,Zap
} from 'lucide-react';
import OrderForm from './OrderForm';
import PaymentButton from './PaymentButton';
import styles from './PremiumAccount.module.css';

type User={name:string;email:string;phone:string;walletPaise:number;createdAt:string};
type Order={id:string;service:string;platform:string;status:string;quantity:number;chargedPaise:number;remains:number|null;createdAt:string};
type Ledger={id:string;type:string;amountPaise:number;balanceAfterPaise:number;note:string|null;createdAt:string};
type Favorite={id:string;name:string;platform:string;pricePaise:number};
type Ticket={id:string;category:string;subject:string;status:string;createdAt:string};

const money=(p:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(p/100);
const date=(x:string)=>new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(x));
const labels:Record<string,string>={
 QUEUED:'Queued',PROCESSING:'Processing',COMPLETED:'Completed',PARTIAL:'Needs review',
 CANCELED:'Cancelled',FAILED:'Needs review',REFUNDED:'Refunded',ORDER_DEBIT:'Order payment',
 ORDER_REFUND:'Order refund',DEPOSIT:'Wallet top-up',ADJUSTMENT:'Adjustment'
};

function statusClass(status:string){
 if(status==='PROCESSING'||status==='QUEUED')return `${styles.status} ${styles.statusProcessing}`;
 if(status==='COMPLETED')return `${styles.status} ${styles.statusCompleted}`;
 if(status==='REFUNDED')return `${styles.status} ${styles.statusRefunded}`;
 if(['PARTIAL','CANCELED','FAILED'].includes(status))return `${styles.status} ${styles.statusAttention}`;
 return styles.status;
}

export default function DashboardShell({user,orders,ledger,favorites,tickets}:{user:User;orders:Order[];ledger:Ledger[];favorites:Favorite[];tickets:Ticket[]}){
 const [tab,setTab]=useState('overview');
 const active=orders.filter(order=>['QUEUED','PROCESSING'].includes(order.status)).length;
 const completed=orders.filter(order=>order.status==='COMPLETED').length;
 const nav=[
  ['overview','Overview',Home],['new','New order',Plus],['orders','My orders',ClipboardList],
  ['wallet','Wallet',Wallet],['favorites','Favorites',Heart],['support','Support',BadgeHelp],
  ['rewards','Rewards',Gift],['profile','Profile',UserRound]
 ] as const;

 return <main className={styles.shell}>
  <aside className={styles.sidebar}>
   <div className={styles.userCard}>
    <span className={styles.avatar}>{user.name.slice(0,1).toUpperCase()}</span>
    <div className={styles.userMeta}><b>{user.name}</b><small>{user.email}</small></div>
    <span className={styles.liveDot} aria-label="Account active"/>
   </div>
   <nav className={styles.nav}>{nav.map(([id,label,Icon])=><button type="button" onClick={()=>setTab(id)} className={`${styles.navButton} ${tab===id?styles.navButtonActive:''}`} key={id}><Icon size={17}/>{label}{id==='orders'&&active>0?<em className={styles.navBadge}>{active}</em>:null}</button>)}</nav>
   <div className={styles.sidebarTrust}><ShieldCheck size={17}/><strong>Operational safeguards</strong><p>Supplier-linked tracking, auditable wallet records and Cashfree-hosted checkout.</p></div>
   <form action="/api/auth/logout" method="post"><button className={styles.logout}><LogOut size={17}/> Log out</button></form>
  </aside>

  <section className={styles.content}>
   <div className={styles.mobileNav}><select aria-label="Account section" value={tab} onChange={event=>setTab(event.target.value)}>{nav.map(([id,label])=><option value={id} key={id}>{label}</option>)}</select></div>

   {tab==='overview'&&<>
    <div className={styles.heading}>
     <div><span className={styles.eyebrow}>ACCOUNT OVERVIEW</span><h1>Overview</h1><p>Signed in as {user.name}. Monitor wallet, orders and fulfilment from one place.</p></div>
     <button type="button" onClick={()=>setTab('new')} className={styles.primaryButton}><Plus size={17}/> New order</button>
    </div>
    <div className={styles.stats}>
     <article className={`${styles.statCard} ${styles.walletCard}`}><span>AVAILABLE BALANCE</span><strong>{money(user.walletPaise)}</strong><button type="button" onClick={()=>setTab('wallet')}>Fund wallet <ChevronRight size={14}/></button></article>
     <article className={styles.statCard}><span>ACTIVE ORDERS</span><strong>{active}</strong><small>{active?'Supplier status reconciliation is active':'No active orders'}</small></article>
     <article className={styles.statCard}><span>COMPLETED</span><strong>{completed}</strong><small>Completed fulfilment records</small></article>
     <article className={styles.statCard}><span>TOTAL ORDERS</span><strong>{orders.length}</strong><small>All account order records</small></article>
    </div>
    <div className={styles.overviewGrid}>
     <section className={styles.panel}><div className={styles.panelHeader}><h2>Recent order activity</h2><button type="button" className={styles.textButton} onClick={()=>setTab('orders')}>View all orders</button></div><OrderList orders={orders.slice(0,5)}/></section>
     <section className={styles.panel}><div className={styles.panelHeader}><h2>Account actions</h2></div><div className={styles.quickList}>
      <button type="button" className={styles.quickButton} onClick={()=>setTab('new')}><span className={styles.quickIcon}><Zap size={17}/></span><div><b>Create order</b><small>Search the live service catalog</small></div><ChevronRight size={17}/></button>
      <button type="button" className={styles.quickButton} onClick={()=>setTab('wallet')}><span className={styles.quickIcon}><CreditCard size={17}/></span><div><b>Fund wallet</b><small>Cashfree hosted checkout</small></div><ChevronRight size={17}/></button>
      <button type="button" className={styles.quickButton} onClick={()=>setTab('support')}><span className={styles.quickIcon}><BadgeHelp size={17}/></span><div><b>Contact support</b><small>Open an order-linked request</small></div><ChevronRight size={17}/></button>
     </div></section>
    </div>
   </>}

   {tab==='new'&&<Page title="New order" subtitle="Select a live service, review the commercial terms and submit once." eyebrow="SERVICE MARKETPLACE"><OrderForm walletPaise={user.walletPaise}/></Page>}
   {tab==='orders'&&<Page title="My orders" subtitle="Supplier-linked status updates with clear wallet outcomes." eyebrow="ORDER ACTIVITY"><div className={styles.panel}><OrderList orders={orders} full/></div></Page>}
   {tab==='wallet'&&<Page title="Wallet" subtitle="Fund your account and review every recorded wallet movement." eyebrow="WALLET & PAYMENTS"><div className={styles.walletLayout}><PaymentButton/><div className={styles.panel}><div className={styles.panelHeader}><h2>Transaction history</h2></div>{ledger.length?ledger.map(item=><div className={styles.transaction} key={item.id}><span className={`${styles.transactionSign} ${item.amountPaise>=0?styles.transactionCredit:''}`}>{item.amountPaise>=0?'+':'−'}</span><div><b>{labels[item.type]||item.type}</b><small>{item.note||date(item.createdAt)} · Balance {money(item.balanceAfterPaise)}</small></div><strong className={item.amountPaise>=0?styles.positive:''}>{item.amountPaise>=0?'+':''}{money(item.amountPaise)}</strong></div>):<Empty text="No wallet transactions yet."/>}</div></div></Page>}
   {tab==='favorites'&&<Page title="Favorites" subtitle="Saved services for faster repeat ordering." eyebrow="SAVED SERVICES"><div className={styles.panel}>{favorites.length?favorites.map(item=><div className={styles.favoriteRow} key={item.id}><div><small>{item.platform}</small><b>{item.name}</b><span>{money(item.pricePaise)} / 1K</span></div><button type="button" onClick={()=>setTab('new')} className={styles.secondaryButton}>Order again</button></div>):<Empty text="Save a marketplace service to find it here." action="Browse marketplace"/>}</div></Page>}
   {tab==='support'&&<Page title="Support" subtitle="Open a request with the relevant order context attached." eyebrow="ACCOUNT SUPPORT"><Support tickets={tickets} orders={orders}/></Page>}
   {tab==='rewards'&&<Page title="Rewards" subtitle="Eligibility and benefits are shown only when they are actually available." eyebrow="REWARD ELIGIBILITY"><div className={styles.rewardsCard}><span className={styles.tier}><Gift size={13}/> STARTER</span><h2>Current tier: Starter</h2><p>Eligible rewards and referral credits will appear here when a real promotion is active. MANGLO does not display invented points, fake savings or unavailable benefits.</p><div className={styles.rewardTrack}><span style={{width:`${Math.min(100,completed*10)}%`}}/></div><small>{Math.max(0,10-completed)} more completed orders toward the next eligibility milestone.</small></div></Page>}
   {tab==='profile'&&<Page title="Profile & security" subtitle="Manage account details and review how your session and payment flow are protected." eyebrow="ACCOUNT SECURITY"><Profile user={user}/></Page>}
  </section>
 </main>;
}

function Page({title,subtitle,eyebrow,children}:{title:string;subtitle:string;eyebrow:string;children:React.ReactNode}){
 return <><div className={styles.heading}><div><span className={styles.eyebrow}>{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div></div>{children}</>;
}

function OrderList({orders,full=false}:{orders:Order[];full?:boolean}){
 async function refresh(id:string){await fetch(`/api/orders/status?id=${encodeURIComponent(id)}`);location.reload()}
 return orders.length?<div className={styles.orderList}>{orders.map(order=><div className={styles.orderRow} key={order.id}>
  <span className={styles.orderMark}>{order.platform.slice(0,2).toUpperCase()}</span>
  <div className={styles.orderMain}><b>{order.service}</b><small>#{order.id} · {date(order.createdAt)} · {order.quantity.toLocaleString('en-IN')}</small></div>
  <span className={statusClass(order.status)}>{labels[order.status]||order.status}</span>
  <strong>{money(order.chargedPaise)}</strong>
  {full?<button type="button" aria-label="Refresh order status" className={styles.refreshButton} onClick={()=>refresh(order.id)}><RefreshCw size={14}/></button>:<span/>}
 </div>)}</div>:<Empty text="No orders yet. Your first order will appear here." action="Browse services"/>;
}

function Empty({text,action}:{text:string;action?:string}){
 return <div className={styles.empty}><ClipboardList size={28}/><p>{text}</p>{action&&<Link href="/services">{action}</Link>}</div>;
}

function Support({tickets,orders}:{tickets:Ticket[];orders:Order[]}){
 const [msg,setMsg]=useState('');
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();const form=event.currentTarget;
  const response=await fetch('/api/support',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))});
  const result=await response.json();setMsg(response.ok?`Request ${result.publicId} opened. Our team will review it.`:result.error);if(response.ok)form.reset();
 }
 return <div className={styles.supportGrid}>
  <form className={`${styles.panel} ${styles.formStack}`} onSubmit={submit}><div className={styles.panelHeader}><h2>Open a request</h2></div>
   <div className={styles.simpleField}><label>What can we help with?</label><select name="category" required>{['Order not started','Order stopped','Partial delivery','Refill request','Wrong link','Payment issue','Account issue'].map(item=><option key={item}>{item}</option>)}</select></div>
   <div className={styles.simpleField}><label>Related order (optional)</label><select name="orderId"><option value="">No order</option>{orders.map(order=><option value={order.id} key={order.id}>#{order.id} — {order.service}</option>)}</select></div>
   <div className={styles.simpleField}><label>Subject</label><input name="subject" minLength={4} maxLength={120} required/></div>
   <div className={styles.simpleField}><label>Tell us what happened</label><textarea name="message" rows={5} minLength={10} maxLength={3000} required/></div>
   {msg&&<div className={styles.orderMessage}>{msg}</div>}<button className={styles.primaryButton}>Send request</button>
  </form>
  <div className={styles.panel}><div className={styles.panelHeader}><h2>Your requests</h2></div>{tickets.length?tickets.map(ticket=><div className={styles.ticket} key={ticket.id}><div><b>{ticket.subject}</b><small>#{ticket.id} · {ticket.category} · {date(ticket.createdAt)}</small></div><span className={styles.status}>{ticket.status.replace('_',' ')}</span></div>):<Empty text="You have no support requests."/>}</div>
 </div>;
}

function Profile({user}:{user:User}){
 const [msg,setMsg]=useState('');
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();
  const response=await fetch('/api/profile',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(event.currentTarget).entries()))});
  const result=await response.json();setMsg(response.ok?'Profile updated successfully.':result.error);if(response.ok)setTimeout(()=>location.reload(),500);
 }
 return <div className={styles.profileGrid}>
  <form className={`${styles.panel} ${styles.formStack}`} onSubmit={submit}><div className={styles.panelHeader}><h2>Personal details</h2></div>
   <div className={styles.simpleField}><label>Full name</label><input name="name" defaultValue={user.name} required/></div>
   <div className={styles.simpleField}><label>Email</label><input value={user.email} disabled/><small>Email changes require support verification.</small></div>
   <div className={styles.simpleField}><label>Mobile number</label><input name="phone" defaultValue={user.phone} pattern="[0-9]{10}" required/></div>
   {msg&&<div className={styles.orderMessage}>{msg}</div>}<button className={styles.primaryButton}>Save changes</button>
  </form>
  <div className={`${styles.panel} ${styles.securityCard}`}><span className={styles.securityIcon}><ShieldCheck size={26}/></span><h2>Account protection</h2><p>Your password is managed by Supabase Auth, sessions use secure HTTP-only cookies, and payment credentials are entered on Cashfree hosted checkout rather than stored by MANGLO.</p><small>Member since {date(user.createdAt)}</small></div>
 </div>;
}
