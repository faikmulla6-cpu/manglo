'use client';

import Link from 'next/link';
import {useMemo,useState} from 'react';
import {ArrowRight,BadgeCheck,Clock3,CreditCard,Heart,Search,ShieldCheck,SlidersHorizontal} from 'lucide-react';
import styles from './Marketplace.module.css';

type Service={id:string;providerServiceId:string;platform:string;category:string;name:string;description:string|null;averageTime:string|null;retailRatePaisePerThousand:number;min:number;max:number;refill:boolean;score:number};
const preferred=['All','Instagram','YouTube','TikTok','Telegram','Facebook','X'];
const marks:Record<string,string>={Instagram:'IG',YouTube:'YT',TikTok:'TT',Telegram:'TG',Facebook:'FB',X:'X'};
const toneClass:Record<string,string>={Instagram:'instagram',YouTube:'youtube',TikTok:'tiktok',Telegram:'telegram',Facebook:'facebook',X:'x'};

type Filter='Recommended'|'Lowest rate'|'Fastest'|'Refill';
function averageMinutes(value:string|null){
 if(!value)return Number.POSITIVE_INFINITY;
 const text=value.toLowerCase();let total=0;
 const h=text.match(/([\d.]+)\s*h(?:our|ours|r)?/);const m=text.match(/([\d.]+)\s*m(?:in|ins|inute|inutes)?/);
 if(h)total+=Number(h[1])*60;if(m)total+=Number(m[1]);if(total>0)return total;
 const first=text.match(/[\d.]+/);return first?Number(first[0]):Number.POSITIVE_INFINITY;
}

export default function ServicesBrowser({services,initialPlatform='All'}:{services:Service[];initialPlatform?:string}){
 const validInitial=initialPlatform==='All'||services.some(service=>service.platform.toLowerCase()===initialPlatform.toLowerCase())?initialPlatform:'All';
 const [platform,setPlatform]=useState(validInitial);
 const [query,setQuery]=useState('');
 const [filter,setFilter]=useState<Filter>('Recommended');
 const [limit,setLimit]=useState(90);
 const [saved,setSaved]=useState<Set<string>>(new Set());
 const [notice,setNotice]=useState('');

 const platforms=useMemo(()=>{
  const found=[...new Set(services.map(service=>service.platform))];
  return [...preferred,...found.filter(item=>!preferred.includes(item)).sort()].filter((item,index,all)=>all.indexOf(item)===index);
 },[services]);

 const shown=useMemo(()=>{
  const term=query.trim().toLowerCase();
  let rows=services.filter(service=>(platform==='All'||service.platform.toLowerCase()===platform.toLowerCase())&&(!term||`${service.providerServiceId} ${service.platform} ${service.name} ${service.category}`.toLowerCase().includes(term))&&(filter!=='Refill'||service.refill));
  if(filter==='Lowest rate')rows=rows.sort((a,b)=>a.retailRatePaisePerThousand-b.retailRatePaisePerThousand);
  else if(filter==='Fastest')rows=rows.sort((a,b)=>averageMinutes(a.averageTime)-averageMinutes(b.averageTime));
  else rows=rows.sort((a,b)=>b.score-a.score);
  return rows;
 },[services,platform,query,filter]);

 async function favorite(id:string){
  setNotice('');
  try{
   const response=await fetch('/api/favorites',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({serviceId:id})});
   if(response.status===401){location.href=`/auth?next=${encodeURIComponent('/services')}`;return}
   const result=await response.json();
   if(!response.ok)throw new Error(result.error||'Could not update favorite.');
   setSaved(old=>{const next=new Set(old);result.saved?next.add(id):next.delete(id);return next});
  }catch(error){setNotice((error as Error).message)}
 }
 function choosePlatform(value:string){setPlatform(value);setLimit(90)}

 return <main className={styles.marketplace}>
  <section className={styles.hero}>
   <div className={`container ${styles.heroInner}`}>
    <div><span className={styles.eyebrow}>MANGLO SERVICE MARKETPLACE</span><h1>Search live services by platform, category or ID.</h1><p>Review the current rate, minimum, maximum and provider-reported timing before submitting an order.</p>
     <div className={styles.searchWrap}><Search size={18}/><input aria-label="Search services" value={query} onChange={event=>{setQuery(event.target.value);setLimit(90)}} placeholder="Search service, category or service ID…"/><button type="button" onClick={()=>setLimit(90)}>Search</button></div>
    </div>
    <aside className={styles.trustCard}><strong>Commercial terms before submission</strong><p>Service IDs and order limits remain visible. Supplier credentials and infrastructure stay server-side.</p><div className={styles.trustRow}><span className={styles.trustIcon}><ShieldCheck size={15}/></span>Wallet funding uses Cashfree hosted checkout.</div></aside>
   </div>
  </section>

  <section className={`container ${styles.body}`}>
   {notice?<div className={styles.notice}>{notice}</div>:null}
   <div className={styles.platformTabs}>{platforms.map(item=><button type="button" className={platform===item?styles.active:''} onClick={()=>choosePlatform(item)} key={item}>{item!=='All'?<span className={`${styles.mark} ${styles[toneClass[item]||'']||''}`}>{marks[item]||item.slice(0,2).toUpperCase()}</span>:null}{item}</button>)}</div>

   <div className={styles.catalogHead}><div><h2>{platform==='All'?'Live services':platform}</h2><span>{shown.length.toLocaleString('en-IN')} matching services</span></div><div className={styles.filterGroup}><SlidersHorizontal size={15}/>{(['Recommended','Lowest rate','Fastest','Refill'] as Filter[]).map(item=><button type="button" className={filter===item?styles.active:''} onClick={()=>{setFilter(item);setLimit(90)}} key={item}>{item}</button>)}</div></div>

   {shown.length===0?<div className={styles.empty}><Search size={34}/><h3>No matching services</h3><p>Try another platform, service ID or a shorter search.</p></div>:<>
    <div className={styles.grid}>{shown.slice(0,limit).map(service=><article className={styles.card} key={service.id}>
     <div className={styles.cardTop}><span className={`${styles.mark} ${styles[toneClass[service.platform]||'']||''}`}>{marks[service.platform]||service.platform.slice(0,2).toUpperCase()}</span><button type="button" className={`${styles.saveButton} ${saved.has(service.id)?styles.saved:''}`} onClick={()=>favorite(service.id)} aria-label={`Save ${service.name}`}><Heart size={16} fill={saved.has(service.id)?'currentColor':'none'}/></button></div>
     <small className={styles.category}>{service.platform} · {service.category}</small><h3>{service.name}</h3><p>{service.description}</p>
     <div className={styles.meta}><span><Clock3 size={11}/>{service.averageTime?`Avg. ${service.averageTime}`:'Average not published'}</span>{service.refill?<span className={styles.refill}><BadgeCheck size={11}/>Refill listed</span>:null}</div>
     <dl className={styles.specs}><div><dt>Service ID</dt><dd>#{service.providerServiceId}</dd></div><div><dt>Minimum</dt><dd>{service.min.toLocaleString('en-IN')}</dd></div><div><dt>Maximum</dt><dd>{service.max.toLocaleString('en-IN')}</dd></div></dl>
     <div className={styles.cardBottom}><div className={styles.price}><small>Rate per 1,000</small><strong>₹{(service.retailRatePaisePerThousand/100).toFixed(2)}</strong></div><Link href={`/order?service=${encodeURIComponent(service.id)}`} className={styles.orderButton}>Create order <ArrowRight size={13}/></Link></div>
    </article>)}</div>
    {limit<shown.length?<div className={styles.loadMore}><button type="button" onClick={()=>setLimit(current=>current+90)}>Load 90 more</button></div>:null}
   </>}

   <div className={styles.bottomTrust}>
    <article><span><BadgeCheck size={16}/></span><div><b>Live catalog details</b><small>Current service IDs, rates and limits are synchronized from the connected supplier.</small></div></article>
    <article><span><CreditCard size={16}/></span><div><b>Cashfree hosted checkout</b><small>MANGLO wallet top-ups use Cashfree checkout; banking credentials are not stored by MANGLO.</small></div></article>
    <article><span><ShieldCheck size={16}/></span><div><b>Order-linked support</b><small>Each order has a MANGLO tracking ID and can be attached directly to a support request.</small></div></article>
   </div>
  </section>
 </main>;
}
