'use client';

import Link from 'next/link';
import {FormEvent,useEffect,useMemo,useState} from 'react';
import {
 ArrowRight,BadgeCheck,ChevronRight,Clock3,CreditCard,Info,Link2,
 Search,ShieldCheck,Sparkles,X,Zap
} from 'lucide-react';
import styles from './PremiumAccount.module.css';

type Service={
 id:string;
 providerServiceId:string;
 platform:string;
 category:string;
 name:string;
 description:string|null;
 averageTime:string|null;
 retailRatePaisePerThousand:number;
 min:number;
 max:number;
 refill:boolean;
 cancel?:boolean;
};

type Props={initialServiceId?:string;walletPaise?:number};
type SmartFilter='all'|'fastest'|'cheapest'|'refill'|'lowmin';
type SortMode='recommended'|'price'|'fastest'|'minimum';

const money=(paise:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:2}).format(paise/100);

function averageMinutes(value:string|null){
 if(!value)return Number.POSITIVE_INFINITY;
 const text=value.toLowerCase();
 let total=0;
 const hours=text.match(/([\d.]+)\s*h(?:our|ours|r)?/);
 const minutes=text.match(/([\d.]+)\s*m(?:in|ins|inute|inutes)?/);
 const seconds=text.match(/([\d.]+)\s*s(?:ec|ecs|econd|econds)?/);
 if(hours)total+=Number(hours[1])*60;
 if(minutes)total+=Number(minutes[1]);
 if(seconds)total+=Number(seconds[1])/60;
 if(total>0)return total;
 const first=text.match(/[\d.]+/);
 return first?Number(first[0]):Number.POSITIVE_INFINITY;
}

function recommendation(service:Service){
 const avg=averageMinutes(service.averageTime);
 if(service.refill)return {label:'Refill listed',green:true};
 if(avg<=60)return {label:'Fast average',green:true};
 if(service.min<=50)return {label:'Low minimum',green:false};
 if(service.retailRatePaisePerThousand<=1000)return {label:'Low rate',green:false};
 return {label:'Curated',green:false};
}

function serviceScore(service:Service){
 let score=0;
 if(service.refill)score+=20;
 if(service.min<=100)score+=8;
 const avg=averageMinutes(service.averageTime);
 if(avg<=60)score+=14;else if(avg<=360)score+=7;
 score+=Math.max(0,14-Math.log10(Math.max(1,service.retailRatePaisePerThousand))*3);
 return score;
}

function newRequestId(){
 try{return crypto.randomUUID()}catch{return `mg-${Date.now()}-${Math.random().toString(36).slice(2,10)}`}
}

export default function OrderForm({initialServiceId,walletPaise}:Props){
 const [services,setServices]=useState<Service[]>([]);
 const [serviceId,setServiceId]=useState(initialServiceId||'');
 const [query,setQuery]=useState('');
 const [platform,setPlatform]=useState('All');
 const [smartFilter,setSmartFilter]=useState<SmartFilter>('all');
 const [sort,setSort]=useState<SortMode>('recommended');
 const [link,setLink]=useState('');
 const [quantity,setQuantity]=useState(0);
 const [message,setMessage]=useState('');
 const [publicId,setPublicId]=useState('');
 const [busy,setBusy]=useState(false);
 const [loading,setLoading]=useState(true);
 const [explorerOpen,setExplorerOpen]=useState(false);

 useEffect(()=>{
  fetch('/api/services?scope=order',{cache:'no-store'})
   .then(async response=>{if(!response.ok)throw new Error();return response.json()})
   .then((rows:Service[])=>{
    setServices(rows);
    const requested=rows.find(row=>row.id===initialServiceId||row.providerServiceId===initialServiceId);
    const first=requested||rows[0];
    if(first){setServiceId(first.id);setQuantity(first.min)}
   })
   .catch(()=>setMessage('Services are temporarily unavailable. Please try again shortly.'))
   .finally(()=>setLoading(false));
 },[initialServiceId]);

 useEffect(()=>{
  function keyboard(event:KeyboardEvent){
   if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){
    event.preventDefault();
    setExplorerOpen(true);
   }
   if(event.key==='Escape')setExplorerOpen(false);
  }
  window.addEventListener('keydown',keyboard);
  return()=>window.removeEventListener('keydown',keyboard);
 },[]);

 useEffect(()=>{
  if(!explorerOpen)return;
  const before=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=before};
 },[explorerOpen]);

 const selected=services.find(service=>service.id===serviceId);
 const platforms=useMemo(()=>{
  const preferred=['Instagram','YouTube','TikTok','Telegram','Facebook','X'];
  const unique=[...new Set(services.map(service=>service.platform).filter(Boolean))];
  return preferred.filter(item=>unique.includes(item)).concat(unique.filter(item=>!preferred.includes(item))).slice(0,8);
 },[services]);

 const filtered=useMemo(()=>{
  const term=query.trim().toLowerCase();
  let rows=services.filter(service=>{
   if(platform!=='All'&&service.platform!==platform)return false;
   if(term&&!`${service.providerServiceId} ${service.platform} ${service.category} ${service.name}`.toLowerCase().includes(term))return false;
   if(smartFilter==='refill'&&!service.refill)return false;
   if(smartFilter==='lowmin'&&service.min>100)return false;
   return true;
  });
  if(smartFilter==='fastest')rows=rows.sort((a,b)=>averageMinutes(a.averageTime)-averageMinutes(b.averageTime));
  else if(smartFilter==='cheapest')rows=rows.sort((a,b)=>a.retailRatePaisePerThousand-b.retailRatePaisePerThousand);
  else if(sort==='price')rows=rows.sort((a,b)=>a.retailRatePaisePerThousand-b.retailRatePaisePerThousand);
  else if(sort==='fastest')rows=rows.sort((a,b)=>averageMinutes(a.averageTime)-averageMinutes(b.averageTime));
  else if(sort==='minimum')rows=rows.sort((a,b)=>a.min-b.min);
  else rows=rows.sort((a,b)=>serviceScore(b)-serviceScore(a));
  return rows.slice(0,120);
 },[services,query,platform,smartFilter,sort]);

 const total=selected?Math.ceil(selected.retailRatePaisePerThousand*quantity/1000):0;
 const balanceAfter=walletPaise===undefined?undefined:walletPaise-total;
 const insufficient=walletPaise!==undefined&&total>walletPaise;
 const quickQuantities=useMemo(()=>{
  if(!selected)return [];
  return [...new Set([selected.min,100,500,1000,5000,10000].filter(value=>value>=selected.min&&value<=selected.max))].slice(0,5);
 },[selected]);

 function choose(id:string){
  setServiceId(id);
  const service=services.find(item=>item.id===id);
  if(service)setQuantity(service.min);
  setMessage('');
  setPublicId('');
  setExplorerOpen(false);
 }

 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(!selected)return;
  setBusy(true);setMessage('');setPublicId('');
  const requestId=newRequestId();
  try{
   const response=await fetch('/api/orders/create',{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json','X-Manglo-Request-Id':requestId},
    credentials:'same-origin',cache:'no-store',
    body:JSON.stringify({serviceId:selected.id,link,quantity}),
   });
   const raw=await response.text();
   let result:Record<string,unknown>={};
   if(raw){try{result=JSON.parse(raw) as Record<string,unknown>}catch{result={}}}
   const reference=response.headers.get('x-manglo-request-id')||requestId;
   if(!response.ok){
    if(typeof result.error==='string')throw new Error(result.error);
    const safeRef=reference.slice(0,12);
    if(response.status===401)throw new Error('Your session expired. Sign in again before placing the order.');
    if(response.status===429)throw new Error('Too many order attempts. Wait a few minutes before trying again.');
    if(response.status>=500)throw new Error(`MANGLO could not confirm this order (HTTP ${response.status}, ref ${safeRef}). Check My orders before retrying so a supplier order is never duplicated.`);
    throw new Error(`The order request was rejected (HTTP ${response.status}, ref ${safeRef}).`);
   }
   if(typeof result.publicId!=='string'||!result.publicId){
    throw new Error(`MANGLO received an incomplete confirmation (ref ${reference.slice(0,12)}). Check My orders before retrying.`);
   }
   setPublicId(result.publicId);
   setMessage(`Order ${result.publicId} was accepted and sent for processing.`);
   setLink('');
  }catch(error){
   if(error instanceof TypeError)setMessage('The order request could not reach MANGLO. Check your connection, then check My orders before trying again.');
   else setMessage(error instanceof Error?error.message:'The order could not be placed.');
  }finally{setBusy(false)}
 }

 if(loading)return <div className={styles.sectionCard}>Loading live services…</div>;
 if(!services.length)return <div className={styles.orderMessage}>{message||'No services are currently available.'}</div>;

 return <form onSubmit={submit} className={styles.orderGrid}>
  <div className={styles.orderWorkspace}>
   <section className={styles.sectionCard}>
    <div className={styles.sectionTitle}>
     <div><h2>Platform, service or ID</h2><p>Search the live MANGLO catalog and review the exact limits before ordering.</p></div>
     <span className={styles.sectionGlyph}><Sparkles size={18}/></span>
    </div>
    <button type="button" className={styles.selectorTrigger} onClick={()=>setExplorerOpen(true)}>
     <Search size={18}/><span>Search platform, service, or ID…</span><kbd className={styles.kbd}>Ctrl K</kbd>
    </button>
    {selected&&<div className={styles.selectedCard}>
     <span className={styles.platformBadge}>{selected.platform.slice(0,2).toUpperCase()}</span>
     <div className={styles.serviceInfo}>
      <div className={styles.serviceTopline}><h3>{selected.name}</h3><span className={styles.serviceId}>ID {selected.providerServiceId}</span></div>
      <p>{selected.description||'Live service details are verified against the current supplier catalog before ordering.'}</p>
      <div className={styles.metaRow}>
       <span className={`${styles.metaChip} ${styles.priceChip}`}>{money(selected.retailRatePaisePerThousand)} / 1K</span>
       <span className={styles.metaChip}>Min {selected.min.toLocaleString('en-IN')}</span>
       <span className={styles.metaChip}>Max {selected.max.toLocaleString('en-IN')}</span>
       <span className={styles.metaChip}><Clock3 size={11}/>{selected.averageTime||'Average not published'}</span>
       {selected.refill&&<span className={styles.metaChip}><BadgeCheck size={11}/>Refill listed</span>}
      </div>
     </div>
     <button type="button" className={styles.changeButton} onClick={()=>setExplorerOpen(true)}>Change <ChevronRight size={13}/></button>
    </div>}
   </section>

   <section className={styles.sectionCard}>
    <div className={styles.sectionTitle}>
     <div><h2>Get started</h2><p>Enter only the public destination required for fulfilment.</p></div>
     <span className={styles.sectionGlyph}><ShieldCheck size={18}/></span>
    </div>
    <div className={styles.formField}>
     <label htmlFor="order-link">Public profile or content link</label>
     <div className={styles.inputShell}><Link2 size={17}/><input id="order-link" type="url" value={link} onChange={event=>setLink(event.target.value)} required placeholder="https://www.instagram.com/…"/></div>
     <small className={styles.fieldHelp}><Info size={12}/>Double-check the destination. Delivery can start as soon as the supplier accepts the order.</small>
    </div>
    <div className={styles.quantityLine}>
     <div className={styles.formField}>
      <label htmlFor="order-quantity">Quantity</label>
      <div className={styles.inputShell}><Zap size={16}/><input id="order-quantity" type="number" value={quantity||''} min={selected?.min||1} max={selected?.max||100000000} onChange={event=>setQuantity(Number(event.target.value))} required/></div>
     </div>
     <div className={styles.quantityQuick}>{quickQuantities.map(value=><button type="button" key={value} onClick={()=>setQuantity(value)}>{value.toLocaleString('en-IN')}</button>)}</div>
    </div>
    {message&&<div className={`${styles.orderMessage} ${publicId?styles.orderSuccess:''}`}>{message}{publicId?<><br/><Link href="/dashboard">Track this order in your dashboard</Link></>:null}</div>}
   </section>
  </div>

  <aside className={styles.summary}>
   <h3>Order summary</h3>
   <div className={styles.summaryBlock}><span>Service</span><b>{selected?.name||'Choose a service'}</b></div>
   <div className={styles.summaryBlock}><span>Quantity</span><b>{quantity?quantity.toLocaleString('en-IN'):'—'}</b></div>
   <div className={styles.summaryRows}>
    <div className={styles.summaryRow}><span>Rate</span><strong>{selected?`${money(selected.retailRatePaisePerThousand)} / 1K`:'—'}</strong></div>
    <div className={styles.summaryRow}><span>Total wallet charge</span><strong className={styles.summaryTotal}>{selected?money(total):'—'}</strong></div>
    {walletPaise!==undefined&&<><div className={styles.summaryRow}><span>Wallet balance</span><strong>{money(walletPaise)}</strong></div><div className={styles.summaryRow}><span>Balance after order</span><strong>{balanceAfter!==undefined?money(Math.max(0,balanceAfter)):'—'}</strong></div></>}
   </div>
   <button className={`${styles.primaryButton} ${styles.summaryButton}`} disabled={busy||!selected||quantity<selected.min||quantity>selected.max||insufficient}>{busy?'Placing order…':insufficient?'Add wallet funds to continue':'Confirm & place order'} <ArrowRight size={15}/></button>
   <div className={styles.secureRail}>
    <div className={styles.secureItem}><span className={styles.secureIcon}><ShieldCheck size={15}/></span><div><b>Server-validated ordering</b><small>Price, limits and wallet balance are verified again on the server.</small></div></div>
    <div className={styles.secureItem}><span className={styles.secureIcon}><CreditCard size={15}/></span><div><b>Secure wallet funding</b><small>Wallet top-ups are completed through Cashfree hosted checkout.</small></div></div>
   </div>
   <div className={styles.cashfreeSeal}><ShieldCheck size={14}/>Payments processed securely through Cashfree. MANGLO does not store card numbers, CVV, UPI PINs or banking credentials.</div>
  </aside>

  {explorerOpen&&<div className={styles.overlay} role="presentation" onMouseDown={()=>setExplorerOpen(false)}>
   <section className={styles.explorer} role="dialog" aria-modal="true" aria-label="Choose a MANGLO service" onMouseDown={event=>event.stopPropagation()}>
    <div className={styles.explorerTop}>
     <div className={styles.explorerSearch}><Search size={18}/><input autoFocus value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search platform, service, or ID…"/><kbd className={styles.kbd}>Ctrl K</kbd><button type="button" className={styles.closeButton} onClick={()=>setExplorerOpen(false)} aria-label="Close service explorer"><X size={18}/></button></div>
     <div className={styles.platforms}>
      {['All',...platforms].map(item=><button type="button" key={item} onClick={()=>setPlatform(item)} className={`${styles.filterButton} ${platform===item?styles.filterActive:''}`}>{item}</button>)}
     </div>
     <div className={styles.filters}>
      <button type="button" className={`${styles.filterButton} ${smartFilter==='all'?styles.filterActive:''}`} onClick={()=>setSmartFilter('all')}>Recommended</button>
      <button type="button" className={`${styles.filterButton} ${smartFilter==='fastest'?styles.filterActive:''}`} onClick={()=>setSmartFilter('fastest')}><Zap size={12}/>Fastest</button>
      <button type="button" className={`${styles.filterButton} ${smartFilter==='cheapest'?styles.filterActive:''}`} onClick={()=>setSmartFilter('cheapest')}>Lowest rate</button>
      <button type="button" className={`${styles.filterButton} ${smartFilter==='refill'?styles.filterActive:''}`} onClick={()=>setSmartFilter('refill')}><BadgeCheck size={12}/>Refill</button>
      <button type="button" className={`${styles.filterButton} ${smartFilter==='lowmin'?styles.filterActive:''}`} onClick={()=>setSmartFilter('lowmin')}>Low minimum</button>
      <span className={styles.filterSpacer}/>
      <select aria-label="Sort services" value={sort} onChange={event=>setSort(event.target.value as SortMode)} className={styles.filterButton}>
       <option value="recommended">Sort: recommended</option><option value="price">Sort: lowest rate</option><option value="fastest">Sort: fastest average</option><option value="minimum">Sort: lowest minimum</option>
      </select>
      <span className={styles.resultCount}>{filtered.length} shown</span>
     </div>
    </div>
    <div className={styles.explorerBody}>
     {filtered.length?filtered.map(service=>{
      const rec=recommendation(service);const isSelected=service.id===serviceId;
      return <article key={service.id} className={`${styles.serviceCard} ${isSelected?styles.serviceCardSelected:''}`} onClick={()=>choose(service.id)}>
       <span className={styles.platformBadge}>{service.platform.slice(0,2).toUpperCase()}</span>
       <div className={styles.serviceCardMain}>
        <div className={styles.serviceCardTitle}><b>{service.name}</b><span className={`${styles.recommendation} ${rec.green?styles.recommendationGreen:''}`}>{rec.label}</span></div>
        <p>{service.platform} · Service ID {service.providerServiceId} · {service.category}</p>
        <div className={styles.cardMeta}><span className={styles.cardPrice}>{money(service.retailRatePaisePerThousand)} / 1K</span><span>Min {service.min.toLocaleString('en-IN')}</span><span>Max {service.max.toLocaleString('en-IN')}</span><span><Clock3 size={10}/>{service.averageTime||'Average n/a'}</span>{service.refill&&<span><BadgeCheck size={10}/>Refill</span>}</div>
       </div>
       <button type="button" className={styles.selectButton} onClick={event=>{event.stopPropagation();choose(service.id)}}>{isSelected?'Selected':'Select'} <ArrowRight size={12}/></button>
      </article>
     }):<div className={styles.noResults}><Search size={26}/><b>No matching services</b><small>Try another keyword, platform, or filter.</small></div>}
    </div>
   </section>
  </div>}
 </form>;
}
