import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,ArrowRight,BadgeCheck,Clock3,CreditCard,Info,ShieldCheck} from 'lucide-react';
import {db} from '@/lib/db';
import {trustworthyServiceName} from '@/lib/catalog';
import {catalogFreshAfter} from '@/lib/catalog-freshness';
import RememberViewed from './RememberViewed';
import styles from './ServiceDetail.module.css';

export const dynamic='force-dynamic';

async function getService(id:string){return db.service.findFirst({where:{active:true,operatorDisabled:false,lastSyncedAt:{gte:catalogFreshAfter()},OR:[{providerServiceId:id},{id}]}}).catch(()=>null)}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const service=await getService(id);if(!service)return{title:'Service unavailable',robots:{index:false,follow:true}};
 const name=trustworthyServiceName(service.name);const canonical=`/services/${service.providerServiceId}`;
 return{title:name,description:`Review MANGLO service ${service.providerServiceId}: current customer rate, quantity limits and provider-reported timing before ordering.`,alternates:{canonical},openGraph:{title:`${name} | MANGLO`,description:`Service ID ${service.providerServiceId}. Review the current customer rate, limits and provider-reported timing before ordering.`,url:canonical,type:'website'},robots:{index:true,follow:true}};
}

export default async function ServiceDetail({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const service=await getService(id);if(!service)notFound();
 const name=trustworthyServiceName(service.name);const rate=Number(service.retailRatePaisePerThousand);const related=await db.service.findMany({where:{active:true,operatorDisabled:false,lastSyncedAt:{gte:catalogFreshAfter()},platform:service.platform,id:{not:service.id}},orderBy:[{score:'desc'}],take:4}).catch(()=>[]);
 return <main className={styles.page}><RememberViewed serviceId={service.id}/><div className="container">
  <div className={styles.crumbs}><Link href="/services"><ArrowLeft size={12}/> Services</Link><span>/</span><span>{service.platform}</span><span>/</span><span>#{service.providerServiceId}</span></div>
  <div className={styles.layout}>
   <article className={styles.main}>
    <div className={styles.serviceTop}><span className={styles.mark}>{service.platform.slice(0,2).toUpperCase()}</span><div><span className={styles.eyebrow}>{service.platform} · SERVICE ID {service.providerServiceId}</span><h1>{name}</h1><p className={styles.description}>{service.description||'Review the live customer rate, accepted quantity limits and provider-reported service details before ordering.'}</p></div></div>
    <div className={styles.badges}><span className={styles.badge}><Clock3 size={11}/>{service.averageTime?`Provider avg. ${service.averageTime}`:'Average not published'}</span>{service.refill?<span className={`${styles.badge} ${styles.refill}`}><BadgeCheck size={11}/>Refill listed</span>:null}</div>
    <div className={styles.specGrid}><div className={styles.spec}><span>CUSTOMER RATE / 1K</span><strong>₹{(rate/100).toFixed(2)}</strong></div><div className={styles.spec}><span>MINIMUM</span><strong>{service.min.toLocaleString('en-IN')}</strong></div><div className={styles.spec}><span>MAXIMUM</span><strong>{service.max.toLocaleString('en-IN')}</strong></div><div className={styles.spec}><span>SERVICE ID</span><strong>#{service.providerServiceId}</strong></div></div>
    <section className={styles.section}><h2>Before you order</h2><ul><li>Use only the public profile or content link requested by the selected service.</li><li>Final wallet charge depends on the quantity you enter and is shown before confirmation.</li><li>Provider-reported timing is an estimate, not a guaranteed completion time.</li><li>Platform behavior and third-party changes can affect fulfilment outcomes.</li></ul></section>
    <div className={styles.note}><span><Info size={14}/></span><div><b>Provider-listed information</b><p>Terms such as refill, quality, speed or drop behavior originate from the service listing. MANGLO presents those terms clearly but does not convert them into guarantees.</p></div></div>
   </article>
   <aside className={styles.side}><h2>Review this service</h2><div className={styles.priceBlock}><span>Current customer rate</span><strong>₹{(rate/100).toFixed(2)}</strong><small>per 1,000 units</small></div><div className={styles.summary}><div className={styles.row}><span>Platform</span><b>{service.platform}</b></div><div className={styles.row}><span>Minimum</span><b>{service.min.toLocaleString('en-IN')}</b></div><div className={styles.row}><span>Maximum</span><b>{service.max.toLocaleString('en-IN')}</b></div><div className={styles.row}><span>Refill</span><b>{service.refill?'Listed':'Not listed'}</b></div></div><Link href={`/order?service=${encodeURIComponent(service.id)}`} className={styles.primary}>Review quantity & price <ArrowRight size={13}/></Link><Link href="/services" className={styles.secondary}>Continue browsing</Link><div className={styles.secure}><div className={styles.secureItem}><span><ShieldCheck size={13}/></span><div><b>Server-validated order</b><small>Rate, limits and wallet balance are checked again before submission.</small></div></div><div className={styles.secureItem}><span><CreditCard size={13}/></span><div><b>Cashfree wallet funding</b><small>Payment credentials are entered on Cashfree hosted checkout.</small></div></div></div></aside>
  </div>
  {related.length?<section className={styles.related}><h2>More from {service.platform}</h2><div className={styles.relatedGrid}>{related.map(item=><Link href={`/services/${item.providerServiceId}`} className={styles.relatedCard} key={item.id}><small>ID {item.providerServiceId}</small><b>{trustworthyServiceName(item.name)}</b><strong>₹{(Number(item.retailRatePaisePerThousand)/100).toFixed(2)} / 1K</strong><span>View details →</span></Link>)}</div></section>:null}
 </div></main>;
}
