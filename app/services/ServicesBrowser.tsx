'use client';

import Link from 'next/link';
import {useEffect,useMemo,useState} from 'react';
import {
 ArrowRight,BadgeCheck,Bot,ChevronDown,Clock3,CreditCard,Heart,ListFilter,Search,ShieldCheck,SlidersHorizontal,X,
} from 'lucide-react';
import styles from './CommerceMarketplace.module.css';

type Service={id:string;providerServiceId:string;platform:string;category:string;name:string;description:string|null;averageTime:string|null;retailRatePaisePerThousand:number;min:number;max:number;refill:boolean;score:number;orderable:boolean};
const preferred=['All','Instagram','YouTube','TikTok','Telegram','Facebook','X'];
const marks:Record<string,string>={Instagram:'IG',YouTube:'YT',TikTok:'TT',Telegram:'TG',Facebook:'FB',X:'X'};
const toneClass:Record<string,string>={Instagram:'instagram',YouTube:'youtube',TikTok:'tiktok',Telegram:'telegram',Facebook:'facebook',X:'x'};
type Sort='Recommended'|'Lowest rate'|'Fastest'|'Highest reliability';
const validSorts:Sort[]=['Recommended','Lowest rate','Fastest','Highest reliability'];

function averageMinutes(value:string|null){
 if(!value)return Number.POSITIVE_INFINITY;
 const text=value.toLowerCase();let total=0;
 const d=text.match(/([\d.]+)\s*d(?:ay|ays)?/);const h=text.match(/([\d.]+)\s*h(?:our|ours|r)?/);const m=text.match(/([\d.]+)\s*m(?:in|ins|inute|inutes)?/);
 if(d)total+=Number(d[1])*1440;if(h)total+=Number(h[1])*60;if(m)total+=Number(m[1]);
 if(total>0)return total;const first=text.match(/[\d.]+/);return first?Number(first[0]):Number.POSITIVE_INFINITY;
}

function money(paise:number){return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(paise/100)}
function syncLabel(value:string|null){
 if(!value)return 'Latest synchronized snapshot';
 const date=new Date(value);if(Number.isNaN(date.getTime()))return 'Latest synchronized snapshot';
 return `Synced ${new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'}).format(date)}`;
}

export default function ServicesBrowser({
 services,catalogFresh,catalogAsOf,orderableCount,initialPlatform='All',initialQuery='',initialSort='Recommended',initialCategory='All',initialRefill=false,
}:{services:Service[];catalogFresh:boolean;catalogAsOf:string|null;orderableCount:number;initialPlatform?:string;initialQuery?:string;initialSort?:string;initialCategory?:string;initialRefill?:boolean}){
 const validInitial=initialPlatform==='All'||services.some(service=>service.platform.toLowerCase()===initialPlatform.toLowerCase())?initialPlatform:'All';
 const [platform,setPlatform]=useState(validInitial);
 const [query,setQuery]=useState(initialQuery);
 const [sort,setSort]=useState<Sort>(validSorts.includes(initialSort as Sort)?initialSort as Sort:'Recommended');
 const [category,setCategory]=useState(initialCategory);
 const [refillOnly,setRefillOnly]=useState(initialRefill);
 const [limit,setLimit]=useState(36);
 const [filtersOpen,setFiltersOpen]=useState(false);
 const [saved,setSaved]=useState<Set<string>>(new Set());
 const [notice,setNotice]=useState('');
 const [recentIds,setRecentIds]=useState<string[]>([]);

 useEffect(()=>{
  try{const parsed=JSON.parse(localStorage.getItem('manglo_recent_services')||'[]');if(Array.isArray(parsed))setRecentIds(parsed.filter(Boolean).slice(0,8))}catch{}
  fetch('/api/favorites',{cache:'no-store'}).then(response=>response.ok?response.json():null).then(data=>{if(Array.isArray(data?.ids))setSaved(new Set(data.ids))}).catch(()=>{});
 },[]);

 useEffect(()=>{
  const url=new URL(window.location.href);
  platform==='All'?url.searchParams.delete('platform'):url.searchParams.set('platform',platform);
  query.trim()?url.searchParams.set('q',query.trim()):url.searchParams.delete('q');
  sort==='Recommended'?url.searchParams.delete('sort'):url.searchParams.set('sort',sort);
  category==='All'?url.searchParams.delete('category'):url.searchParams.set('category',category);
  refillOnly?url.searchParams.set('refill','1'):url.searchParams.delete('refill');
  url.searchParams.delete('filter');
  window.history.replaceState({},'',url.pathname+(url.search?url.search:''));
 },[platform,query,sort,category,refillOnly]);

 const platforms=useMemo(()=>{
  const found=[...new Set(services.map(service=>service.platform))];
  return[...preferred,...found.filter(item=>!preferred.includes(item)).sort()].filter((item,index,all)=>all.indexOf(item)===index);
 },[services]);

 const categories=useMemo(()=>{
  const rows=services.filter(service=>platform==='All'||service.platform.toLowerCase()===platform.toLowerCase());
  return ['All',...[...new Set(rows.map(service=>service.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b))];
 },[services,platform]);

 useEffect(()=>{if(category!=='All'&&!categories.includes(category))setCategory('All')},[category,categories]);

 const shown=useMemo(()=>{
  const term=query.trim().toLowerCase();
  let rows=services.filter(service=>(platform==='All'||service.platform.toLowerCase()===platform.toLowerCase())&&(category==='All'||service.category===category)&&(!refillOnly||service.refill)&&(!term||`${service.providerServiceId} ${service.platform} ${service.name} ${service.category}`.toLowerCase().includes(term)));
  if(sort==='Lowest rate')rows=[...rows].sort((a,b)=>a.retailRatePaisePerThousand-b.retailRatePaisePerThousand||b.score-a.score);
  else if(sort==='Fastest')rows=[...rows].sort((a,b)=>averageMinutes(a.averageTime)-averageMinutes(b.averageTime)||b.score-a.score);
  else if(sort==='Highest reliability')rows=[...rows].sort((a,b)=>b.score-a.score||a.retailRatePaisePerThousand-b.retailRatePaisePerThousand);
  else rows=[...rows].sort((a,b)=>b.score-a.score||Number(b.refill)-Number(a.refill)||a.retailRatePaisePerThousand-b.retailRatePaisePerThousand);
  return rows;
 },[services,platform,category,query,refillOnly,sort]);

 const recent=useMemo(()=>recentIds.map(id=>services.find(service=>service.id===id||service.providerServiceId===id)).filter(Boolean) as Service[],[recentIds,services]);
 const activeFilterCount=(category!=='All'?1:0)+(refillOnly?1:0)+(sort!=='Recommended'?1:0);
 const platformCount=new Set(services.map(service=>service.platform)).size;

 async function favorite(id:string){
  setNotice('');
  try{
   const response=await fetch('/api/favorites',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({serviceId:id})});
   if(response.status===401){location.href=`/auth?next=${encodeURIComponent('/services')}`;return}
   const result=await response.json();if(!response.ok)throw new Error(result.error||'Could not update favorite.');
   setSaved(old=>{const next=new Set(old);result.saved?next.add(id):next.delete(id);return next});
  }catch(error){setNotice((error as Error).message)}
 }

 function choosePlatform(value:string){setPlatform(value);setCategory('All');setLimit(36)}
 function remember(service:Service){const next=[service.id,...recentIds.filter(id=>id!==service.id)].slice(0,8);setRecentIds(next);try{localStorage.setItem('manglo_recent_services',JSON.stringify(next))}catch{}}
 function resetFilters(){setCategory('All');setSort('Recommended');setRefillOnly(false);setLimit(36)}

 return <main className={styles.market}>
  <section className={styles.hero}>
   <div className={`container ${styles.heroGrid}`}>
    <div className={styles.heroCopy}>
     <span className={styles.eyebrow}>{catalogFresh?'LIVE SERVICE MARKETPLACE':'LATEST SYNCHRONIZED MARKETPLACE'}</span>
     <h1>Find the right service.<br/><em>Skip the panel maze.</em></h1>
     <p>{catalogFresh?'Search the fresh MANGLO catalog by platform, service type or exact ID. Compare customer pricing, quantity limits, provider-reported timing and reliability before you order.':'Browse MANGLO’s latest synchronized catalog by platform, service type or exact ID. Prices and availability are revalidated before any order can be submitted.'}</p>
     <div className={styles.heroFacts}>
      <span><BadgeCheck size={14}/><b>{services.length.toLocaleString('en-IN')}</b> catalog services</span>
      <span><ShieldCheck size={14}/><b>{platformCount}</b> platforms</span>
      <span><Clock3 size={14}/>{catalogFresh?'Fresh catalog only':orderableCount>0?`${orderableCount.toLocaleString('en-IN')} ready to order`:syncLabel(catalogAsOf)}</span>
     </div>
    </div>
    {catalogFresh?<aside className={styles.aiHelp}>
     <span><Bot size={17}/></span>
     <div><small>OPTIONAL ASSISTANT</small><b>Not sure what fits?</b><p>MANGLO AI can compare the same live catalog and prepare a quote without bypassing checkout checks.</p><Link href="/dashboard?view=ai">Ask MANGLO AI <ArrowRight size={12}/></Link></div>
    </aside>:<aside className={styles.aiHelp}>
     <span><Clock3 size={17}/></span>
     <div><small>CATALOG STATUS</small><b>Latest snapshot stays browsable</b><p>MANGLO keeps the last synchronized catalog visible while freshness is restored. Checkout remains protected by server-side freshness checks.</p><Link href="/trust">How MANGLO protects orders <ArrowRight size={12}/></Link></div>
    </aside>}
   </div>
  </section>

  <div className={styles.sticky}>
   <div className={`container ${styles.stickyInner}`}>
    <div className={styles.searchRow}>
     <label className={styles.search}><Search size={17}/><input aria-label="Search services" value={query} onChange={event=>{setQuery(event.target.value);setLimit(36)}} placeholder="Search service, category or exact service ID…"/>{query?<button type="button" className={styles.clearSearch} onClick={()=>{setQuery('');setLimit(36)}} aria-label="Clear search"><X size={14}/></button>:null}</label>
     <button type="button" className={`${styles.mobileFilterButton} ${activeFilterCount?styles.mobileFilterActive:''}`} onClick={()=>setFiltersOpen(open=>!open)} aria-expanded={filtersOpen}><ListFilter size={15}/> Filters{activeFilterCount?` (${activeFilterCount})`:''}</button>
    </div>

    <div className={styles.platforms}>{platforms.map(item=><button type="button" className={platform===item?styles.active:''} onClick={()=>choosePlatform(item)} key={item}>{item!=='All'?<span className={`${styles.mark} ${styles[toneClass[item]||'']||''}`}>{marks[item]||item.slice(0,2).toUpperCase()}</span>:null}{item}</button>)}</div>

    <div className={`${styles.controlBar} ${filtersOpen?styles.controlBarOpen:''}`}>
     <div className={styles.selectControl}><span>Category</span><div><select aria-label="Filter by category" value={category} onChange={event=>{setCategory(event.target.value);setLimit(36)}}>{categories.map(item=><option key={item} value={item}>{item==='All'?'All categories':item}</option>)}</select><ChevronDown size={13}/></div></div>
     <div className={styles.selectControl}><span>Sort by</span><div><select aria-label="Sort services" value={sort} onChange={event=>{setSort(event.target.value as Sort);setLimit(36)}}>{validSorts.map(item=><option key={item} value={item}>{item}</option>)}</select><ChevronDown size={13}/></div></div>
     <button type="button" className={`${styles.refillToggle} ${refillOnly?styles.refillActive:''}`} onClick={()=>{setRefillOnly(value=>!value);setLimit(36)}} aria-pressed={refillOnly}><BadgeCheck size={14}/> Refill available</button>
     {activeFilterCount?<button type="button" className={styles.resetFilters} onClick={resetFilters}>Reset</button>:null}
    </div>
   </div>
  </div>

  <section className={`container ${styles.body}`}>
   {notice?<div className={styles.notice}>{notice}</div>:null}

   {recent.length?<section className={styles.recent}>
    <div className={styles.sectionLabel}><div><span>YOUR HISTORY</span><h2>Recently viewed</h2></div><small>Stored on this device</small></div>
    <div className={styles.recentGrid}>{recent.slice(0,4).map(service=>service.orderable?<Link className={styles.recentCard} href={`/services/${service.providerServiceId}`} key={service.id} onClick={()=>remember(service)}><span className={`${styles.mark} ${styles[toneClass[service.platform]||'']||''}`}>{marks[service.platform]||service.platform.slice(0,2).toUpperCase()}</span><div><small>{service.platform} · ID {service.providerServiceId}</small><b>{service.name}</b></div><strong>{money(service.retailRatePaisePerThousand)} <small>/ 1K</small></strong></Link>:<div className={styles.recentCard} key={service.id}><span className={`${styles.mark} ${styles[toneClass[service.platform]||'']||''}`}>{marks[service.platform]||service.platform.slice(0,2).toUpperCase()}</span><div><small>{service.platform} · ID {service.providerServiceId}</small><b>{service.name}</b></div><strong>{money(service.retailRatePaisePerThousand)} <small>/ 1K</small></strong></div>)}</div>
   </section>:null}

   <div className={styles.catalogHead}>
    <div><span className={styles.catalogEyebrow}>BROWSE THE CATALOG</span><h2>{platform==='All'?'All catalog services':platform}</h2><p>{shown.length.toLocaleString('en-IN')} matching services{category!=='All'?` in ${category}`:''}</p></div>
    <div className={styles.catalogStatus}><SlidersHorizontal size={14}/><span>Showing <b>{Math.min(limit,shown.length).toLocaleString('en-IN')}</b> of {shown.length.toLocaleString('en-IN')}</span></div>
   </div>

   {shown.length===0?<div className={styles.empty}><Search size={28}/><h3>No matching services</h3><p>Try another platform, category, exact ID, or a shorter search phrase.</p><button type="button" onClick={()=>{setQuery('');setPlatform('All');resetFilters()}}>Clear filters</button></div>:<>
    <div className={styles.grid}>{shown.slice(0,limit).map(service=><article className={styles.card} key={service.id}>
     <div className={styles.cardTop}>
      <span className={`${styles.mark} ${styles[toneClass[service.platform]||'']||''}`}>{marks[service.platform]||service.platform.slice(0,2).toUpperCase()}</span>
      <div className={styles.identity}><small className={styles.category}>{service.platform} · {service.category}</small><h3>{service.name}</h3></div>
      <button type="button" className={`${styles.save} ${saved.has(service.id)?styles.saved:''}`} onClick={()=>favorite(service.id)} aria-label={`Save ${service.name}`} title={saved.has(service.id)?'Remove from favorites':'Save to favorites'}><Heart size={15} fill={saved.has(service.id)?'currentColor':'none'}/></button>
     </div>

     <div className={styles.cardBadges}>
      <span className={styles.reliability}><ShieldCheck size={11}/> Reliability {service.score}/100</span>
      {service.refill?<span className={styles.refill}><BadgeCheck size={11}/> Refill listed</span>:null}
     </div>

     <p className={styles.description}>{service.description||(service.orderable?'Review the live rate, limits and provider-reported service details before ordering.':'Review the latest synchronized rate, limits and provider-reported service details.')}</p>

     <div className={styles.quickFacts}>
      <span><Clock3 size={12}/><div><small>Provider timing</small><b>{service.averageTime?`Avg. ${service.averageTime}`:'Not published'}</b></div></span>
      <span><div><small>Service ID</small><b>#{service.providerServiceId}</b></div></span>
     </div>

     <dl className={styles.specs}><div><dt>MINIMUM</dt><dd>{service.min.toLocaleString('en-IN')}</dd></div><div><dt>MAXIMUM</dt><dd>{service.max.toLocaleString('en-IN')}</dd></div><div><dt>CATEGORY</dt><dd title={service.category}>{service.category}</dd></div></dl>

     <div className={styles.cardBottom}>
      <div className={styles.price}><small>{service.orderable?'Customer rate':'Last synchronized rate'}</small><strong>{money(service.retailRatePaisePerThousand)} <span>/ 1,000</span></strong></div>
      <div className={styles.actions}>{service.orderable?<><Link href={`/services/${service.providerServiceId}`} className={styles.details} onClick={()=>remember(service)}>Details</Link><Link href={`/order?service=${encodeURIComponent(service.id)}`} className={styles.order} onClick={()=>remember(service)}>Review & order <ArrowRight size={12}/></Link></>:<><span className={styles.details}>Catalog snapshot</span><span className={styles.details} aria-disabled="true">Refresh pending</span></>}</div>
     </div>
    </article>)}</div>
    {limit<shown.length?<div className={styles.load}><span>{(shown.length-limit).toLocaleString('en-IN')} more services available</span><button type="button" onClick={()=>setLimit(current=>current+36)}>Load 36 more</button></div>:null}
   </>}

   <div className={styles.trust}>
    <article><span><BadgeCheck size={15}/></span><div><b>{catalogFresh?'Fresh catalog details':'Latest synchronized catalog'}</b><small>{catalogFresh?'Only currently active, synchronized services are shown here.':'The marketplace remains browsable during refresh without weakening checkout freshness rules.'}</small></div></article>
    <article><span><CreditCard size={15}/></span><div><b>Server-checked checkout</b><small>Current price, quantity and wallet balance are checked again before submission.</small></div></article>
    <article><span><ShieldCheck size={15}/></span><div><b>Supplier health monitored</b><small>Recent supplier outcomes influence service reliability and repeated failures can be quarantined.</small></div></article>
   </div>
  </section>
 </main>;
}
