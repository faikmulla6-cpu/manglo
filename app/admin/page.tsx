import Link from 'next/link';
import {AlertTriangle,ArrowUpRight,BarChart3,CreditCard,Headphones,RefreshCcw,ScrollText,ShieldCheck,ShoppingBag,Users,Wallet} from 'lucide-react';
import {requireAdmin} from '@/lib/admin';
import {db} from '@/lib/db';
import {providerBalance} from '@/lib/provider';
import {getOperationsAnalytics} from '@/lib/operations-analytics';
import {ServiceControls,TicketStatusControl} from './AdminControls';
import GrowthPanel from './GrowthPanel';
import styles from './Ops.module.css';

export const dynamic='force-dynamic';
export const metadata={title:'Operations',robots:{index:false,follow:false}};

const money=(paise:number|bigint|null|undefined)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(Number(paise??0)/100);
const rupees=(value:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(value);
const dateTime=(value:Date)=>new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(value);

async function safe<T>(label:string,run:()=>Promise<T>,fallback:T):Promise<T>{try{return await run()}catch(error){console.error(`[operations:${label}]`,error);return fallback}}
async function supplierSnapshot(){try{const raw=await providerBalance() as Record<string,unknown>;const balance=Number(raw?.balance);if(!Number.isFinite(balance))throw new Error('Invalid supplier balance response');return{ok:true,balance,currency:String(raw?.currency||'INR').toUpperCase(),error:''}}catch(error){console.error('[operations:supplier]',error);return{ok:false,balance:0,currency:'INR',error:'Supplier balance unavailable'}}}
function tone(status:string){if(status==='COMPLETED')return styles.good;if(status==='QUEUED'||status==='PROCESSING'||status==='IN_REVIEW')return styles.warn;if(status==='REFUNDED'||status==='RESOLVED'||status==='CLOSED')return styles.neutral;return styles.bad}

export default async function Operations(){
 const admin=await requireAdmin();
 const dayAgo=new Date(Date.now()-86_400_000);const thirtyMinutesAgo=new Date(Date.now()-30*60_000);
 const users=await safe('users',()=>db.user.count(),0);
 const totalOrders=await safe('orders-total',()=>db.order.count(),0);
 const activeOrders=await safe('orders-active',()=>db.order.count({where:{status:{in:['QUEUED','PROCESSING']}}}),0);
 const completedOrders=await safe('orders-completed',()=>db.order.count({where:{status:'COMPLETED'}}),0);
 const activeServices=await safe('services-active',()=>db.service.count({where:{active:true}}),0);
 const pausedServices=await safe('services-paused',()=>db.service.count({where:{operatorDisabled:true}}),0);
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
 const auditLogs=await safe('audit-log',()=>db.adminAuditLog.findMany({orderBy:{createdAt:'desc'},take:12}),[]);
 const analytics=await safe('analytics',()=>getOperationsAnalytics(30),null);
 const supplier=await supplierSnapshot();

 const completedGross=Number(economics._sum.chargedPaise??0);const supplierCost=Number(economics._sum.providerCostPaise??0);const grossMargin=completedGross-supplierCost;const marginPct=completedGross>0?grossMargin/completedGross*100:0;
 const syncHours=newestSync?.lastSyncedAt?Math.max(0,(Date.now()-newestSync.lastSyncedAt.getTime())/3_600_000):null;const lowBalance=Number(process.env.SMM_LOW_BALANCE_THRESHOLD_INR||0);
 const alerts:{title:string;detail:string;kind:'bad'|'warn'|'info'}[]=[];
 if(!supplier.ok)alerts.push({kind:'bad',title:'Supplier balance unavailable',detail:'Provider status could not be read. Customer ordering is not changed by this dashboard error.'});
 if(supplier.ok&&lowBalance>0&&supplier.balance<lowBalance)alerts.push({kind:'bad',title:'Supplier balance below threshold',detail:`${rupees(supplier.balance)} available · threshold ${rupees(lowBalance)}`});
 if(staleActive>0)alerts.push({kind:'warn',title:`${staleActive} active order${staleActive===1?'':'s'} older than 24 hours`,detail:'Review supplier status before customers need support.'});
 if(stalePayments>0)alerts.push({kind:'warn',title:`${stalePayments} payment${stalePayments===1?'':'s'} pending over 30 minutes`,detail:'Cashfree reconciliation should resolve terminal attempts automatically.'});
 if(syncHours!==null&&syncHours>24)alerts.push({kind:'warn',title:'Catalog sync is stale',detail:`Newest active-service sync is ${syncHours.toFixed(1)} hours old.`});
 if(openTickets>0)alerts.push({kind:'info',title:`${openTickets} support request${openTickets===1?'':'s'} waiting`,detail:'Open requests are listed below.'});

 return <main className={`${styles.ops} ops-shell`}>
  <aside className={styles.side}><Link href="/admin" className={styles.brand}><span>M</span><div><b>MANGLO</b><small>Operations</small></div></Link><nav><a href="#overview">Overview</a><a href="#alerts">Alerts</a><a href="#growth">Growth</a><a href="#analytics">Economics</a><a href="#orders">Orders</a><a href="#services">Services</a><a href="#payments">Payments</a><a href="#support">Support</a><a href="#audit">Audit</a></nav><div className={styles.sideFoot}><ShieldCheck size={14}/><div><b>Controlled operations</b><small>Service availability and support workflow only. Money remains system-owned.</small></div></div><Link href="/dashboard" className={styles.back}>Customer account <ArrowUpRight size={12}/></Link></aside>

  <section className={styles.main}>
   <header className={styles.top}><div><span>PRIVATE OPERATIONS</span><h1>Business control center</h1><p>Operational visibility and audited controls for {admin.email}.</p></div><div className={styles.topActions}><Link href="/api/health" target="_blank">Health <ArrowUpRight size={12}/></Link><Link href="/services" target="_blank">Marketplace <ArrowUpRight size={12}/></Link></div></header>

   <section id="overview" className={styles.metrics}><Metric icon={<Users/>} label="Customers" value={users.toLocaleString('en-IN')} detail={`${totalOrders.toLocaleString('en-IN')} lifetime orders`}/><Metric icon={<ShoppingBag/>} label="Active orders" value={activeOrders.toLocaleString('en-IN')} detail={`${completedOrders.toLocaleString('en-IN')} completed`}/><Metric icon={<Wallet/>} label="Wallet liability" value={money(walletAgg._sum.walletPaise)} detail="Current customer stored balance"/><Metric icon={<CreditCard/>} label="Paid deposits" value={money(paidAgg._sum.amountPaise)} detail="Cashfree-confirmed top-ups"/><Metric icon={<ShoppingBag/>} label="Completed order value" value={money(completedGross)} detail="Customer charges on completed orders"/><Metric icon={<RefreshCcw/>} label="Recorded supplier cost" value={money(supplierCost)} detail="Completed-order provider cost"/><Metric icon={<Wallet/>} label="Recorded gross margin" value={money(grossMargin)} detail={`${marginPct.toFixed(1)}% before gateway/support costs`}/><Metric icon={<RefreshCcw/>} label="Supplier balance" value={supplier.ok?rupees(supplier.balance):'Unavailable'} detail={supplier.ok?`${supplier.currency} · live provider API`:supplier.error} danger={!supplier.ok}/></section>

   <section id="alerts" className={styles.panel}><div className={styles.panelHead}><div><span>OPERATIONS</span><h2>Needs attention</h2></div><b>{alerts.length}</b></div>{alerts.length?<div className={styles.alerts}>{alerts.map((alert,index)=><article key={index} className={styles[alert.kind]}><AlertTriangle size={15}/><div><b>{alert.title}</b><p>{alert.detail}</p></div></article>)}</div>:<div className={styles.allGood}><ShieldCheck/><b>No operational warnings</b><p>Current checks are within configured thresholds.</p></div>}</section>

   <section className={styles.systemStrip}><article><span>ACTIVE SERVICES</span><b>{activeServices.toLocaleString('en-IN')}</b><small>{pausedServices} operator-paused</small></article><article><span>CATALOG FRESHNESS</span><b>{syncHours===null?'Unknown':`${syncHours.toFixed(1)}h`}</b><small>Since newest sync</small></article><article><span>OPEN SUPPORT</span><b>{openTickets}</b><small>Open + in review</small></article><article><span>ADMIN MODE</span><b>Audited</b><small>Controlled writes only</small></article></section>

   <GrowthPanel/>

   <section id="analytics" className={styles.panel}><div className={styles.panelHead}><div><span>BUSINESS ANALYTICS · 30 DAYS</span><h2>Profitability and customer behaviour</h2></div><BarChart3 size={16}/></div>{analytics?<><div className={styles.systemStrip}><article><span>ORDER VALUE</span><b>{money(analytics.gross)}</b><small>{analytics.completed} completed orders</small></article><article><span>GROSS MARGIN</span><b>{money(analytics.margin)}</b><small>{analytics.marginPct.toFixed(1)}% before gateway/support</small></article><article><span>REFUND RATE</span><b>{analytics.refundRate.toFixed(1)}%</b><small>{analytics.refunded} refunded of {analytics.totalOrders}</small></article><article><span>REPEAT CUSTOMERS</span><b>{analytics.repeatCustomers}</b><small>2+ orders in the period</small></article></div><div className={styles.gridTwo}><div><div className={styles.panelHead}><div><span>PLATFORM ECONOMICS</span><h2>Where margin comes from</h2></div></div><div className={styles.tableWrap}><table><thead><tr><th>Platform</th><th>Orders</th><th>Value</th><th>Margin</th><th>Margin %</th></tr></thead><tbody>{analytics.platforms.map(item=><tr key={item.platform}><td><b>{item.platform}</b></td><td>{item.orders}</td><td>{money(item.gross)}</td><td>{money(item.margin)}</td><td>{item.marginPct.toFixed(1)}%</td></tr>)}</tbody></table></div></div><div><div className={styles.panelHead}><div><span>TOP SERVICES</span><h2>By completed order value</h2></div></div><div className={styles.list}>{analytics.topServices.slice(0,6).map(item=><article key={item.providerServiceId}><span className={styles.iconBox}><ShoppingBag size={14}/></span><div><b>{item.name}</b><small>{item.platform} · ID {item.providerServiceId} · {item.orders} orders · margin {money(item.margin)}</small></div><time>{money(item.gross)}</time></article>)}</div></div></div>{analytics.sampled&&<p className={styles.foot}>Analytics are capped to the latest 5,000 orders in the 30-day window.</p>}</>:<div className={styles.empty}><BarChart3/><b>Analytics unavailable</b><p>Core operations remain available.</p></div>}</section>

   <section id="orders" className={styles.panel}><div className={styles.panelHead}><div><span>FULFILMENT</span><h2>Recent orders</h2></div><small>Latest {recentOrders.length}</small></div><div className={styles.tableWrap}><table><thead><tr><th>Order</th><th>Customer</th><th>Service</th><th>Status</th><th>Charge</th><th>Supplier cost</th><th>Created</th></tr></thead><tbody>{recentOrders.map(order=><tr key={order.id}><td><b>#{order.publicId}</b><small>{order.providerOrderId?`Provider ${order.providerOrderId}`:'No provider ID'}</small></td><td><b>{order.user.name}</b><small>{order.user.email}</small></td><td><b>{order.service.name}</b><small>{order.service.platform} · ID {order.service.providerServiceId}</small></td><td><span className={`${styles.state} ${tone(order.status)}`}>{order.status}</span></td><td>{money(order.chargedPaise)}</td><td>{order.providerCostPaise===null?'—':money(order.providerCostPaise)}</td><td>{dateTime(order.createdAt)}</td></tr>)}</tbody></table></div></section>

   <section id="services" className={styles.panel}><div className={styles.panelHead}><div><span>CATALOG CONTROL</span><h2>Service availability</h2></div><small>{pausedServices} paused</small></div><ServiceControls/></section>

   <div className={styles.gridTwo}>
    <section id="payments" className={styles.panel}><div className={styles.panelHead}><div><span>CASHFLOW</span><h2>Recent payments</h2></div><small>Latest {recentPayments.length}</small></div>{recentPayments.length?<div className={styles.list}>{recentPayments.map(payment=><article key={payment.id}><span className={`${styles.iconBox} ${payment.status==='PAID'?styles.iconGood:''}`}><CreditCard size={14}/></span><div><b>{money(payment.amountPaise)} · {payment.status}</b><small>{payment.user.name} · {payment.cfOrderId}</small></div><time>{dateTime(payment.createdAt)}</time></article>)}</div>:<div className={styles.empty}><CreditCard/><b>No payment records</b></div>}</section>
    <section id="support" className={styles.panel}><div className={styles.panelHead}><div><span>CUSTOMER CARE</span><h2>Support queue</h2></div><small>{openTickets} waiting</small></div>{recentTickets.length?<div className={styles.list}>{recentTickets.map(ticket=><article key={ticket.id}><span className={styles.iconBox}><Headphones size={14}/></span><div><b>{ticket.subject}</b><small>{ticket.user.email} · {ticket.category} · #{ticket.publicId}</small><small>{ticket.message.slice(0,160)}</small><TicketStatusControl publicId={ticket.publicId} status={ticket.status}/></div><time>{dateTime(ticket.createdAt)}</time></article>)}</div>:<div className={styles.empty}><Headphones/><b>Queue is clear</b><p>No open or in-review tickets.</p></div>}</section>
   </div>

   <section id="audit" className={styles.panel}><div className={styles.panelHead}><div><span>ADMIN AUDIT</span><h2>Recent operator actions</h2></div><ScrollText size={16}/></div>{auditLogs.length?<div className={styles.tableWrap}><table><thead><tr><th>Time</th><th>Admin</th><th>Action</th><th>Entity</th></tr></thead><tbody>{auditLogs.map(log=><tr key={log.id}><td>{dateTime(log.createdAt)}</td><td>{log.adminEmail}</td><td><b>{log.action.replaceAll('_',' ')}</b></td><td>{log.entityType} · {log.entityId}</td></tr>)}</tbody></table></div>:<div className={styles.empty}><ScrollText/><b>No operator actions yet</b><p>Controlled changes will appear here.</p></div>}</section>

   <footer className={styles.foot}>Money movement, payment verification and supplier order fulfilment remain system-owned. Admin writes are limited and audited.</footer>
  </section>
 </main>;
}

function Metric({icon,label,value,detail,danger=false}:{icon:React.ReactNode;label:string;value:string;detail:string;danger?:boolean}){return <article className={`${styles.metric} ${danger?styles.metricDanger:''}`}><span className={styles.metricIcon}>{icon}</span><div><small>{label}</small><strong>{value}</strong><p>{detail}</p></div></article>}
