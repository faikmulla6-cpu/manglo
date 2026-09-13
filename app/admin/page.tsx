import Link from 'next/link';
import {AlertTriangle,ArrowUpRight,CreditCard,Headphones,RefreshCcw,ShieldCheck,ShoppingBag,Users,Wallet} from 'lucide-react';
import {requireAdmin} from '@/lib/admin';
import {db} from '@/lib/db';
import {providerBalance} from '@/lib/provider';
import styles from './Ops.module.css';

export const dynamic='force-dynamic';
export const metadata={title:'Operations',robots:{index:false,follow:false}};

const money=(paise:number|bigint|null|undefined)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(Number(paise??0)/100);
const rupees=(value:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(value);
const dateTime=(value:Date)=>new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(value);

async function safe<T>(label:string,run:()=>Promise<T>,fallback:T):Promise<T>{
 try{return await run()}catch(error){console.error(`[operations:${label}]`,error);return fallback}
}

async function supplierSnapshot(){
 try{
  const raw=await providerBalance() as Record<string,unknown>;
  const balance=Number(raw?.balance);
  if(!Number.isFinite(balance))throw new Error('Invalid supplier balance response');
  return{ok:true,balance,currency:String(raw?.currency||'INR').toUpperCase(),error:''};
 }catch(error){
  console.error('[operations:supplier]',error);
  return{ok:false,balance:0,currency:'INR',error:'Supplier balance unavailable'};
 }
}

function tone(status:string){
 if(status==='COMPLETED')return styles.good;
 if(status==='QUEUED'||status==='PROCESSING')return styles.warn;
 if(status==='REFUNDED')return styles.neutral;
 return styles.bad;
}

export default async function Operations(){
 const admin=await requireAdmin();
 const dayAgo=new Date(Date.now()-86_400_000);
 const thirtyMinutesAgo=new Date(Date.now()-30*60_000);

 const users=await safe('users',()=>db.user.count(),0);
 const totalOrders=await safe('orders-total',()=>db.order.count(),0);
 const activeOrders=await safe('orders-active',()=>db.order.count({where:{status:{in:['QUEUED','PROCESSING']}}}),0);
 const completedOrders=await safe('orders-completed',()=>db.order.count({where:{status:'COMPLETED'}}),0);
 const activeServices=await safe('services-active',()=>db.service.count({where:{active:true}}),0);
 const openTickets=await safe('support-open',()=>db.supportTicket.count({where:{status:{in:['OPEN','IN_REVIEW']}}}),0);
 const staleActive=await safe('orders-stale',()=>db.order.count({where:{status:{in:['QUEUED','PROCESSING']},createdAt:{lt:dayAgo}}}),0);
 const stalePayments=await safe('payments-stale',()=>db.payment.count({where:{status:'PENDING',createdAt:{lt:thirtyMinutesAgo}}}),0);

 const walletAgg=await safe('wallet-liability',()=>db.user.aggregate({_sum:{walletPaise:true}}),{_sum:{walletPaise:null}});
 const paidAgg=await safe('paid-topups',()=>db.payment.aggregate({where:{status:'PAID'},_sum:{amountPaise:true}}),{_sum:{amountPaise:null}});
 const economics=await safe('economics',()=>db.order.aggregate({where:{status:'COMPLETED'},_sum:{chargedPaise:true,providerCostPaise:true}}),{_sum:{chargedPaise:null,providerCostPaise:null}});
 const newestSync=await safe('catalog-sync',()=>db.service.findFirst({where:{active:true},orderBy:{lastSyncedAt:'desc'},select:{lastSyncedAt:true}}),null);
 const recentOrders=await safe('recent-orders',()=>db.order.findMany({include:{user:{select:{name:true,email:true}},service:{select:{providerServiceId:true,platform:true,name:true}}},orderBy:{createdAt:'desc'},take:12}),[]);
 const recentPayments=await safe('recent-payments',()=>db.payment.findMany({include:{user:{select:{name:true,email:true}}},orderBy:{createdAt:'desc'},take:8}),[]);
 const recentTickets=await safe('recent-tickets',()=>db.supportTicket.findMany({where:{status:{in:['OPEN','IN_REVIEW']}},include:{user:{select:{name:true,email:true}}},orderBy:{createdAt:'asc'},take:8}),[]);
 const supplier=await supplierSnapshot();

 const completedGross=Number(economics._sum.chargedPaise??0);
 const supplierCost=Number(economics._sum.providerCostPaise??0);
 const grossMargin=completedGross-supplierCost;
 const marginPct=completedGross>0?grossMargin/completedGross*100:0;
 const syncHours=newestSync?.lastSyncedAt?Math.max(0,(Date.now()-newestSync.lastSyncedAt.getTime())/3_600_000):null;
 const lowBalance=Number(process.env.SMM_LOW_BALANCE_THRESHOLD_INR||0);

 const alerts:{title:string;detail:string;kind:'bad'|'warn'|'info'}[]=[];
 if(!supplier.ok)alerts.push({kind:'bad',title:'Supplier balance unavailable',detail:'Provider status could not be read. Customer ordering is not changed by this dashboard error.'});
 if(supplier.ok&&lowBalance>0&&supplier.balance<lowBalance)alerts.push({kind:'bad',title:'Supplier balance below threshold',detail:`${rupees(supplier.balance)} available · threshold ${rupees(lowBalance)}`});
 if(staleActive>0)alerts.push({kind:'warn',title:`${staleActive} active order${staleActive===1?'':'s'} older than 24 hours`,detail:'Review supplier status before customers need support.'});
 if(stalePayments>0)alerts.push({kind:'warn',title:`${stalePayments} payment${stalePayments===1?'':'s'} pending over 30 minutes`,detail:'Check Cashfree status before any manual action.'});
 if(syncHours!==null&&syncHours>24)alerts.push({kind:'warn',title:'Catalog sync is stale',detail:`Newest active-service sync is ${syncHours.toFixed(1)} hours old.`});
 if(openTickets>0)alerts.push({kind:'info',title:`${openTickets} support request${openTickets===1?'':'s'} waiting`,detail:'Open requests are listed below.'});

 return <main className={`${styles.ops} ops-shell`}>
  <aside className={styles.side}>
   <Link href="/admin" className={styles.brand}><span>M</span><div><b>MANGLO</b><small>Operations</small></div></Link>
   <nav><a href="#overview">Overview</a><a href="#alerts">Alerts</a><a href="#orders">Orders</a><a href="#payments">Payments</a><a href="#support">Support</a></nav>
   <div className={styles.sideFoot}><ShieldCheck size={14}/><div><b>Read-only console</b><small>Customer money and supplier orders cannot be changed here.</small></div></div>
   <Link href="/dashboard" className={styles.back}>Customer account <ArrowUpRight size={12}/></Link>
  </aside>

  <section className={styles.main}>
   <header className={styles.top}><div><span>PRIVATE OPERATIONS</span><h1>Business control center</h1><p>Live operational visibility for {admin.email}.</p></div><div className={styles.topActions}><Link href="/api/health" target="_blank">Health <ArrowUpRight size={12}/></Link><Link href="/services" target="_blank">Marketplace <ArrowUpRight size={12}/></Link></div></header>

   <section id="overview" className={styles.metrics}>
    <Metric icon={<Users/>} label="Customers" value={users.toLocaleString('en-IN')} detail={`${totalOrders.toLocaleString('en-IN')} lifetime orders`}/>
    <Metric icon={<ShoppingBag/>} label="Active orders" value={activeOrders.toLocaleString('en-IN')} detail={`${completedOrders.toLocaleString('en-IN')} completed`}/>
    <Metric icon={<Wallet/>} label="Wallet liability" value={money(walletAgg._sum.walletPaise)} detail="Current customer stored balance"/>
    <Metric icon={<CreditCard/>} label="Paid deposits" value={money(paidAgg._sum.amountPaise)} detail="Cashfree-confirmed top-ups"/>
    <Metric icon={<ShoppingBag/>} label="Completed order value" value={money(completedGross)} detail="Customer charges on completed orders"/>
    <Metric icon={<RefreshCcw/>} label="Recorded supplier cost" value={money(supplierCost)} detail="Completed-order provider cost"/>
    <Metric icon={<Wallet/>} label="Recorded gross margin" value={money(grossMargin)} detail={`${marginPct.toFixed(1)}% before gateway/support costs`}/>
    <Metric icon={<RefreshCcw/>} label="Supplier balance" value={supplier.ok?rupees(supplier.balance):'Unavailable'} detail={supplier.ok?`${supplier.currency} · live provider API`:supplier.error} danger={!supplier.ok}/>
   </section>

   <section id="alerts" className={styles.panel}><div className={styles.panelHead}><div><span>OPERATIONS</span><h2>Needs attention</h2></div><b>{alerts.length}</b></div>{alerts.length?<div className={styles.alerts}>{alerts.map((alert,index)=><article key={index} className={styles[alert.kind]}><AlertTriangle size={15}/><div><b>{alert.title}</b><p>{alert.detail}</p></div></article>)}</div>:<div className={styles.allGood}><ShieldCheck/><b>No operational warnings</b><p>Current checks are within configured thresholds.</p></div>}</section>

   <section className={styles.systemStrip}><article><span>ACTIVE SERVICES</span><b>{activeServices.toLocaleString('en-IN')}</b><small>Customer-visible catalog</small></article><article><span>CATALOG FRESHNESS</span><b>{syncHours===null?'Unknown':`${syncHours.toFixed(1)}h`}</b><small>Since newest sync</small></article><article><span>OPEN SUPPORT</span><b>{openTickets}</b><small>Open + in review</small></article><article><span>ADMIN MODE</span><b>Read only</b><small>Safe observability</small></article></section>

   <section id="orders" className={styles.panel}><div className={styles.panelHead}><div><span>FULFILMENT</span><h2>Recent orders</h2></div><small>Latest {recentOrders.length}</small></div><div className={styles.tableWrap}><table><thead><tr><th>Order</th><th>Customer</th><th>Service</th><th>Status</th><th>Charge</th><th>Supplier cost</th><th>Created</th></tr></thead><tbody>{recentOrders.map(order=><tr key={order.id}><td><b>#{order.publicId}</b><small>{order.providerOrderId?`Provider ${order.providerOrderId}`:'No provider ID'}</small></td><td><b>{order.user.name}</b><small>{order.user.email}</small></td><td><b>{order.service.name}</b><small>{order.service.platform} · ID {order.service.providerServiceId}</small></td><td><span className={`${styles.state} ${tone(order.status)}`}>{order.status}</span></td><td>{money(order.chargedPaise)}</td><td>{order.providerCostPaise===null?'—':money(order.providerCostPaise)}</td><td>{dateTime(order.createdAt)}</td></tr>)}</tbody></table></div></section>

   <div className={styles.gridTwo}>
    <section id="payments" className={styles.panel}><div className={styles.panelHead}><div><span>CASHFLOW</span><h2>Recent payments</h2></div><small>Latest {recentPayments.length}</small></div>{recentPayments.length?<div className={styles.list}>{recentPayments.map(payment=><article key={payment.id}><span className={`${styles.iconBox} ${payment.status==='PAID'?styles.iconGood:''}`}><CreditCard size={14}/></span><div><b>{money(payment.amountPaise)} · {payment.status}</b><small>{payment.user.name} · {payment.cfOrderId}</small></div><time>{dateTime(payment.createdAt)}</time></article>)}</div>:<div className={styles.empty}><CreditCard/><b>No payment records</b></div>}</section>
    <section id="support" className={styles.panel}><div className={styles.panelHead}><div><span>CUSTOMER CARE</span><h2>Support queue</h2></div><small>{openTickets} waiting</small></div>{recentTickets.length?<div className={styles.list}>{recentTickets.map(ticket=><article key={ticket.id}><span className={styles.iconBox}><Headphones size={14}/></span><div><b>{ticket.subject}</b><small>{ticket.user.email} · {ticket.category} · #{ticket.publicId}</small></div><time>{dateTime(ticket.createdAt)}</time></article>)}</div>:<div className={styles.empty}><Headphones/><b>Queue is clear</b><p>No open or in-review tickets.</p></div>}</section>
   </div>

   <footer className={styles.foot}>Live database reads are isolated so a secondary metric cannot take down this console.</footer>
  </section>
 </main>;
}

function Metric({icon,label,value,detail,danger=false}:{icon:React.ReactNode;label:string;value:string;detail:string;danger?:boolean}){
 return <article className={`${styles.metric} ${danger?styles.metricDanger:''}`}><span className={styles.metricIcon}>{icon}</span><div><small>{label}</small><strong>{value}</strong><p>{detail}</p></div></article>;
}
