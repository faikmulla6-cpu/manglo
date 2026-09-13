'use client';

import Link from 'next/link';
import {useMemo,useState} from 'react';
import {ArrowRight,BadgeCheck,Bot,Clock3,CreditCard,Heart,Search,ShieldCheck,SlidersHorizontal} from 'lucide-react';
import styles from './Marketplace.module.css';

type Service={id:string;providerServiceId:string;platform:string;category:string;name:string;description:string|null;averageTime:string|null;retailRatePaisePerThousand:number;min:number;max:number;refill:boolean;score:number};
const preferred=['All','Instagram','YouTube','TikTok','Telegram','Facebook','X'];
const marks:Record<string,string>={Instagram:'IG',YouTube:'YT',TikTok:'TT',Telegram:'TG',Facebook:'FB',X:'X'};
const toneClass:Record<string,string>={Instagram:'instagram',YouTube:'youtube',TikTok:'tiktok',Telegram:'telegram',Facebook:'facebook',X:'x'};
type Filter='Recommended'|'Lowest rate'|'Fastest'|'Refill';
function averageMinutes(value:string|null){if(!value)return Number.POSITIVE_INFINITY;const text=value.toLowerCase();let total=0;const h=text.match(/([\d.]+)\s*h(?:our|ours|r)?/);const m=text.match(/([\d.]+)\s*m(?:in|ins|inute|inutes)?/);if(h)total+=Number(h[1])*60;if(m)total+=Number(m[1]);if(total>0)return total;const first=text.match(/[\d.]+/);return first?Number(first[0]):Number.POSITIVE_INFINITY}

export default function ServicesBrowser({services,initialPlatform='All'}:{services:Service[];initialPlatform?:string}){
 const validInitial=initialPlatform==='All'||services.some(service=>service.platform.toLowerCase()===initialPlatform.toLowerCase())?initialPlatform:'All';
 const [platform,setPlatform]=useState(validInitial);const [query,setQuery]=useState('');const [filter,setFilter]=useState<Filter>('Recommended');const [limit,setLimit]=useState(72);const [saved,setSaved]=useState<Set<string>>(new Set());const [notice,setNotice]=useState('');
 const platforms=useMemo(()=>{const found=[...new Set(services.map(service=>service.platform))];return[...preferred,...found.filter(item=>!preferred.includes(item)).sort()].filter((item,index,all)=>all.indexOf(item)===index)},[services]);
 const shown=useMemo(()=>{const term=query.trim().toLowerCase();let rows=services.filter(service=>(platform==='All'||service.platform.toLowerCase()===platform.toLowerCase())&&(!term||`${service.providerServiceId} ${service.platform} ${service.name} ${service.category}`.toLowerCase().includes(term))&&(filter!=='Refill'||service.refill));if(filter==='Lowest rate')rows=[...rows].sort((a,b)=>a.retailRatePaisePerThousand-b.retailRatePaisePerThousand);else if(filter==='Fastest')rows=[...rows].sort((a,b)=>averageMinutes(a.averageTime)-averageMinutes(b.averageTime));else rows=[...rows].sort((a,b)=>b.score-a.score);return rows},[services,platform,query,filter]);
 async function favorite(id:string){setNotice('');try{const response=await fetch('/api/favorites',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({serviceId:id})});if(response.status===401){location.href=`/auth?next=${encodeURIComponent('/services')}`;return}const result=await response.json();if(!response.ok)throw new Error(result.error||'Could not update favorite.');setSaved(old=>{const next=new Set(old);result.saved?next.add(id):next.delete(id);return next})}catch(error){setNotice((error as Error).message)}}
 function choosePlatform(value:string){setPlatform(value);setLimit(72)}

 return <main className={styles.marketplace}>
  <section className={styles.hero}><div className={`container ${styles.heroInner}`}>
   <div><span className={styles.eyebrow}>LIVE SERVICE CATALOG</span><h1>Exact services. Exact IDs. No panel maze.</h1><p>Search current MANGLO services directly, or let MANGLO AI compare the catalog for you. Rates, limits and provider-reported timing stay visible before any order is submitted.</p><div className={styles.searchWrap}><Search size={17}/><input aria-label="Search services" value={query} onChange={event=>{setQuery(event.target.value);setLimit(72)}} placeholder="Search service, category or exact service ID…"/><button type="button" onClick={()=>setLimit(72)}>Search</button></div></div>
   <aside className={styles.aiCard}><span className={styles.aiIcon}><Bot size={17}/></span><div><small>MANGLO AI</small><strong>Don’t want to compare 2,000+ listings manually?</strong><p>Describe what you need. AI can search the live catalog, compare IDs and prepare a wallet quote.</p><Link href="/dashboard">Ask MANGLO AI <ArrowRight size={13}/></Link></div></aside>
  </div></section>

  <section className={`container ${styles.body}`}>
   {notice?<div className={styles.notice}>{notice}</div>:null}
   <div className={styles.platformTabs}>{platforms.map(item=><button type="button" className={platform===item?styles.active:''} onClick={()=>choosePlatform(item)} key={item}>{item!=='All'?<span className={`${styles.mark} ${styles[toneClass[item]||'']||''}`}>{marks[item]||item.slice(0,2).toUpperCase()}</span>:null}{item}</button>)}</div>
   <div className={styles.catalogHead}><div><h2>{platform==='All'?'All live services':platform}</h2><span>{shown.length.toLocaleString('en-IN')} matching services</span></div><div className={styles.filterGroup}><SlidersHorizontal size={14}/>{(['Recommended','Lowest rate','Fastest','Refill'] as Filter[]).map(item=><button type="button" className={filter===item?styles.active:''} onClick={()=>{setFilter(item);setLimit(72)}} key={item}>{item}</button>)}</div></div>
   {shown.length===0?<div className={styles.empty}><Search size={30}/><h3>No matching services</h3><p>Try another platform, service ID or a shorter search.</p></div>:<>
    <div className={styles.grid}>{shown.slice(0,limit).map(service=><article className={styles.card} key={service.id}>
     <div className={styles.cardTop}><div className={styles.serviceIdentity}><span className={`${styles.mark} ${styles[toneClass[service.platform]||'']||''}`}>{marks[service.platform]||service.platform.slice(0,2).toUpperCase()}</span><div><small className={styles.category}>{service.platform} · {service.category}</small><h3>{service.name}</h3></div></div><button type="button" className={`${styles.saveButton} ${saved.has(service.id)?styles.saved:''}`} onClick={()=>favorite(service.id)} aria-label={`Save ${service.name}`}><Heart size={15} fill={saved.has(service.id)?'currentColor':'none'}/></button></div>
     <p>{service.description}</p><div className={styles.meta}><span><Clock3 size={10}/>{service.averageTime?`Avg. ${service.averageTime}`:'Average not published'}</span>{service.refill?<span className={styles.refill}><BadgeCheck size={10}/>Refill listed</span>:null}</div>
     <dl className={styles.specs}><div><dt>Service ID</dt><dd>#{service.providerServiceId}</dd></div><div><dt>Minimum</dt><dd>{service.min.toLocaleString('en-IN')}</dd></div><div><dt>Maximum</dt><dd>{service.max.toLocaleString('en-IN')}</dd></div></dl>
     <div className={styles.cardBottom}><div className={styles.price}><small>Customer rate / 1,000</small><strong>₹{(service.retailRatePaisePerThousand/100).toFixed(2)}</strong></div><Link href={`/order?service=${encodeURIComponent(service.id)}`} className={styles.orderButton}>Review order <ArrowRight size={12}/></Link></div>
    </article>)}</div>{limit<shown.length?<div className={styles.loadMore}><button type="button" onClick={()=>setLimit(current=>current+72)}>Load more services</button></div>:null}
   </>}
   <div className={styles.bottomTrust}><article><span><BadgeCheck size={15}/></span><div><b>Live catalog details</b><small>Current customer rates, service IDs and limits come from the synchronized catalog.</small></div></article><article><span><CreditCard size={15}/></span><div><b>Cashfree hosted checkout</b><small>Wallet top-ups are completed through Cashfree; payment credentials are not stored by MANGLO.</small></div></article><article><span><ShieldCheck size={15}/></span><div><b>Order-linked support</b><small>Each order has a MANGLO tracking ID and can be attached directly to a support request.</small></div></article></div>
  </section>
 </main>;
}
