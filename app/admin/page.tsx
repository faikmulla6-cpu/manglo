import Link from 'next/link';
import {AlertTriangle,ArrowUpRight,BadgeIndianRupee,Clock3,CreditCard,Database,Headphones,PackageCheck,RefreshCcw,ShieldCheck,ShoppingBag,Users,Wallet} from 'lucide-react';
import {requireAdmin} from '@/lib/admin';
import {db} from '@/lib/db';
import {providerBalance} from '@/lib/provider';
import {trustworthyServiceName} from '@/lib/catalog';
import styles from './Ops.module.css';

export const dynamic='force-dynamic';
export const metadata={title:'Operations',robots:{index:false,follow:false}};

const money=(paise:number|bigint|null|undefined)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(Number(paise||0)/100);
const rupees=(value:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(value);
const dateTime=(value:Date)=>new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(value);
const compact=(value:number)=>new Intl.NumberFormat('en-IN',{notation:'compact',maximumFractionDigits:1}).format(value);

async function supplierSnapshot(){
 try{
  const raw=await providerBalance() as Record<string,unknown>;
  const balance=Number(raw.balance);
  if(!Number.isFinite(balance))throw new Error('Invalid supplier balance');
  return{ok:true as const,balance,currency:String(raw.currency||'INR').toUpperCase(),error:''};
 }catch(error){
  return{ok:false as const,balance:0,currency:'INR',error:error instanceof Error?error.message:'Supplier unavailable'};
 }
}

function ageHours(value:Date|null|undefined){return value?Math.max(0,(Date.now()-value.getTime())/3_600_000):Number.POSITIVE_INFINITY}
function orderTone(status:string){if(status==='COMPLETED')return styles.good;if(status==='PROCESSING'||status==='QUEUED')return styles.warn;if(status==='REFUNDED')return styles.neutral;return styles.bad}

export default async function Operations(){
 const admin=await requireAdmin();
 const now=Date.now();
 const dayAgo=new Date(now-86_400_000);
 const weekAgo=new Date(now-7*86_400_000);
 const thirtyMinutesAgo=new Date(now-30*60_000);

 const [
  users,activeServices,inactiveServices,totalOrders,activeOrders,completedOrders,issueOrders,openTickets,
  paidTopups,walletLiability,completedEconomics,recentOrders,recentPayments,recentTickets,newestSync,
  staleActiveOrders,stalePendingPayments,supplier,weekOrders
 ]=await Promise.all([
  db.user.count(),
  db.service.count({where:{active:true}}),
  db.service.count({where:{active:false}}),
  db.order.count(),
  db.order.count({where:{status:{in:['QUEUED','PROCESSING']}}}),
  db.order.count({where:{status:'COMPLETED'}}),
  db.order.count({where:{status:{in:['PARTIAL','CANCELED','FAILED','REFUNDED']},updatedAt:{gte:dayAgo}}}),
  db.supportTicket.count({where:{status:{in:['OPEN','IN_REVIEW']}}}),
  db.payment.aggregate({where:{status:'PAID'},_sum:{amountPaise:true}}),
  db.user.aggregate({_sum:{walletPaise:true}}),
  db.order.aggregate({where:{status:'COMPLETED'},_sum:{chargedPaise:true,providerCostPaise:true}}),
  db.order.findMany({include:{user:{select:{name:true,email:true}},service:{select:{providerServiceId:true,platform:true,name:true}}},orderBy:{createdAt:'desc'},take:18}),
  db.payment.findMany({include:{user:{select:{name:true,email:true}}},orderBy:{createdAt:'desc'},take:10}),
  db.supportTicket.findMany({where:{status:{in:['OPEN','IN_REVIEW']}},include:{user:{select:{name:true,email:true}}},orderBy:{createdAt:'asc'},take:10}),
  db.service.findFirst({where:{active:true},orderBy:{lastSyncedAt:'desc'},select:{lastSyncedAt:true}}),
  db.order.count({where:{status:{in:['QUEUED','PROCESSING']},createdAt:{lt:dayAgo}}}),
  db.payment.count({where:{status:'PENDING',createdAt:{lt:thirtyMinutesAgo}}}),
  supplierSnapshot(),
  db.order.findMany({where:{createdAt:{gte:weekAgo}},select:{createdAt:true,chargedPaise:true,status:true},orderBy:{createdAt:'asc'}})
 ]);

 const completedGross=Number(completedEconomics._sum.chargedPaise||0);
 const supplierCost=Number(completedEconomics._sum.providerCostPaise||0);
 const grossMargin=Math.max(0,completedGross-supplierCost);
 const marginPct=completedGross>0?grossMargin/completedGross*100:0;
 const syncAge=ageHours(newestSync?.lastSyncedAt);
 const lowBalanceThreshold=Number(process.env.SMM_LOW_BALANCE_THRESHOLD_INR||0);

 const alerts:{tone:'bad'|'warn'|'info';title:string;detail:string}[]=[];
 if(!supplier.ok)alerts.push({tone:'bad',title:'Supplier API needs attention',detail:supplier.error});
 if(supplier.ok&&lowBalanceThreshold>0&&supplier.balance<lowBalanceThreshold)alerts.push({tone:'bad',title:'Supplier balance is below your threshold',detail:`${rupees(supplier.balance)} available · threshold ${rupees(lowBalanceThreshold)}`});
 if(staleActiveOrders>0)alerts.push({tone:'warn',title:`${staleActiveOrders} active order${staleActiveOrders===1?'':'s'} older than 24 hours`,detail:'Review provider state before customers need to contact support.'});
 if(stalePendingPayments>0)alerts.push({tone:'warn',title:`${stalePendingPayments} payment${stalePendingPayments===1?'':'s'} pending for more than 30 minutes`,detail:'Check Cashfree state before taking any manual wallet action.'});
 if(syncAge>24)alerts.push({tone:'warn',title:'Catalog sync looks stale',detail:newestSync?`Latest active-service sync was ${syncAge.toFixed(1)} hours ago.`:'No active-service sync timestamp was found.'});
 if(openTickets>0)alerts.push({tone:'info',title:`${openTickets} support request${openTickets===1?'':'s'} waiting`,detail:'Oldest open requests are listed below.'});
 if(issueOrders>0)alerts.push({tone:'info',title:`${issueOrders} exception order${issueOrders===1?'':'s'} updated in the last 24 hours`,detail:'Includes partial, cancelled, failed and refunded statuses.'});

 const days=Array.from({length:7},(_,index)=>{
  const start=new Date();start.setHours(0,0,0,0);start.setDate(start.getDate()-(6-index));
  const end=new Date(start);end.setDate(end.getDate()+1);
  const rows=weekOrders.filter(order=>order.createdAt>=start&&order.createdAt<end);
  return{label:new Intl.DateTimeFormat('en-IN',{weekday:'short'}).format(start),orders:rows.length,value:rows.reduce((sum,row)=>sum+Number(row.chargedPaise),0)};
 });
 const maxDaily=Math.max(1,...days.map(day=>day.orders));

 return <main className={`${styles.ops} ops-shell`}>
  <aside className={styles.side}>
   <Link href="/" className={styles.brand}><span>M</span><div><b>MANGLO</b><small>Operations</small></div></Link>
   <nav><a href="#overview">Overview</a><a href="#alerts">Alerts</a><a href="#orders">Orders</a><a href="#payments">Payments</a><a href="#support">Support</a></nav>
   <div className={styles.sideFoot}><ShieldCheck size={14}/><div><b>Read-only console</b><small>No money or service state can be changed here.</small></div></div>
   <Link href="/dashboard" className={styles.back}>Customer account <ArrowUpRight size={12}/></Link>
  </aside>

  <section className={styles.main}>
   <header className={styles.top}><div><span>PRIVATE OPERATIONS</span><h1>Business control center</h1><p>Live commerce, supplier, payment and support signals for {admin.email}.</p></div><div className={styles.topActions}><Link href="/api/health" target="_blank">Health endpoint <ArrowUpRight size={12}/></Link><Link href="/services" target="_blank">Marketplace <ArrowUpRight size={12}/></Link></div></header>

   <section id="overview" className={styles.metrics}>
    <Metric icon={<Users/>} label="Customers" value={compact(users)} detail={`${compact(totalOrders)} lifetime orders`}/>
    <Metric icon={<ShoppingBag/>} label="Active orders" value={compact(activeOrders)} detail={`${compact(completedOrders)} completed`}/>
    <Metric icon={<Wallet/>} label="Wallet liability" value={money(walletLiability._sum.walletPaise)} detail="Customer stored balance"/>
    <Metric icon={<CreditCard/>} label="Paid deposits" value={money(paidTopups._sum.amountPaise)} detail="Cashfree-confirmed top-ups"/>
    <Metric icon={<BadgeIndianRupee/>} label="Completed order value" value={money(completedGross)} detail="Gross customer charge on completed orders"/>
    <Metric icon={<Database/>} label="Recorded supplier cost" value={money(supplierCost)} detail="Completed orders with recorded provider cost"/>
    <Metric icon={<PackageCheck/>} label="Recorded gross margin" value={money(grossMargin)} detail={`${marginPct.toFixed(1)}% before payment/support costs`}/>
    <Metric icon={<RefreshCcw/>} label="Supplier balance" value={supplier.ok?rupees(supplier.balance):'Unavailable'} detail={supplier.ok?`${supplier.currency} · live provider API`:supplier.error} danger={!supplier.ok}/>
   </section>

   <div className={styles.grid}>
    <section id="alerts" className={`${styles.panel} ${styles.alertPanel}`}><div className={styles.panelHead}><div><span>OPERATIONS</span><h2>Needs attention</h2></div><b>{alerts.length}</b></div>{alerts.length?<div className={styles.alerts}>{alerts.map((alert,index)=><article className={styles[alert.tone]} key={`${alert.title}-${index}`}><AlertTriangle size={15}/><div><b>{alert.title}</b><p>{alert.detail}</p></div></article>)}</div>:<div className={styles.allGood}><ShieldCheck/><b>No operational warnings right now</b><p>Core checks are within the current thresholds.</p></div>}</section>

    <section className={styles.panel}><div className={styles.panelHead}><div><span>LAST 7 DAYS</span><h2>Order activity</h2></div><small>{weekOrders.length} orders</small></div><div className={styles.chart}>{days.map(day=><div className={styles.barCol} key={day.label}><div className={styles.barTrack}><i style={{height:`${Math.max(5,day.orders/maxDaily*100)}%`}}/></div><b>{day.orders}</b><span>{day.label}</span></div>)}</div><div className={styles.chartFoot}><span>7-day order value</span><b>{money(days.reduce((sum,day)=>sum+day.value,0))}</b></div></section>
   </div>

   <section className={styles.systemStrip}><article><span>ACTIVE SERVICES</span><b>{activeServices.toLocaleString('en-IN')}</b><small>{inactiveServices} inactive</small></article><article><span>CATALOG FRESHNESS</span><b>{Number.isFinite(syncAge)?`${syncAge.toFixed(1)}h`:'Unknown'}</b><small>Since newest active-service sync</small></article><article><span>OPEN SUPPORT</span><b>{openTickets}</b><small>Open + in review</small></article><article><span>24H EXCEPTIONS</span><b>{issueOrders}</b><small>Partial/cancelled/failed/refunded</small></article></section>

   <section id="orders" className={styles.panel}><div className={styles.panelHead}><div><span>FULFILMENT</span><h2>Recent orders</h2></div><small>Latest 18</small></div><div className={styles.tableWrap}><table><thead><tr><th>Order</th><th>Customer</th><th>Service</th><th>Status</th><th>Charge</th><th>Supplier cost</th><th>Created</th></tr></thead><tbody>{recentOrders.map(order=><tr key={order.id}><td><b>#{order.publicId}</b><small>{order.providerOrderId?`Provider ${order.providerOrderId}`:'No provider ID'}</small></td><td><b>{order.user.name}</b><small>{order.user.email}</small></td><td><b>{trustworthyServiceName(order.service.name)}</b><small>{order.service.platform} · ID {order.service.providerServiceId}</small></td><td><span className={`${styles.state} ${orderTone(order.status)}`}>{order.status}</span></td><td>{money(order.chargedPaise)}</td><td>{order.providerCostPaise===null?'—':money(order.providerCostPaise)}</td><td>{dateTime(order.createdAt)}</td></tr>)}</tbody></table></div></section>

   <div className={styles.gridTwo}>
    <section id="payments" className={styles.panel}><div className={styles.panelHead}><div><span>CASHFLOW</span><h2>Recent payments</h2></div><small>Latest 10</small></div><div className={styles.list}>{recentPayments.map(payment=><article key={payment.id}><span className={`${styles.iconBox} ${payment.status==='PAID'?styles.iconGood:''}`}><CreditCard size={14}/></span><div><b>{money(payment.amountPaise)} · {payment.status}</b><small>{payment.user.name} · {payment.cfOrderId}</small></div><time>{dateTime(payment.createdAt)}</time></article>)}</div></section>

    <section id="support" className={styles.panel}><div className={styles.panelHead}><div><span>CUSTOMER CARE</span><h2>Support queue</h2></div><small>{openTickets} waiting</small></div>{recentTickets.length?<div className={styles.list}>{recentTickets.map(ticket=><article key={ticket.id}><span className={styles.iconBox}><Headphones size={14}/></span><div><b>{ticket.subject}</b><small>{ticket.user.email} · {ticket.category} · #{ticket.publicId}</small></div><time>{dateTime(ticket.createdAt)}</time></article>)}</div>:<div className={styles.empty}><Headphones/><b>Queue is clear</b><p>No open or in-review tickets.</p></div>}</section>
   </div>

   <footer className={styles.foot}><Clock3 size={12}/> Generated from live MANGLO database state. Supplier balance is requested directly from the provider API when this page loads.</footer>
  </section>
 </main>;
}

function Metric({icon,label,value,detail,danger=false}:{icon:React.ReactNode;label:string;value:string;detail:string;danger?:boolean}){return <article className={`${styles.metric} ${danger?styles.metricDanger:''}`}><span className={styles.metricIcon}>{icon}</span><div><small>{label}</small><strong>{value}</strong><p>{detail}</p></div></article>}
