'use client';
import Link from 'next/link';
import {useEffect,useMemo,useState} from 'react';
import {BadgeCheck,Clock3,Search,ShieldCheck} from 'lucide-react';

type Service={id:string;providerServiceId:string;platform:string;category:string;name:string;description:string|null;averageTime:string|null;retailRatePaisePerThousand:number;min:number;max:number;refill:boolean};

export default function OrderForm({initialServiceId}:{initialServiceId?:string}){
 const [services,setServices]=useState<Service[]>([]),[serviceId,setServiceId]=useState(initialServiceId||''),[query,setQuery]=useState(''),[link,setLink]=useState(''),[quantity,setQuantity]=useState(0),[message,setMessage]=useState(''),[publicId,setPublicId]=useState(''),[busy,setBusy]=useState(false),[loading,setLoading]=useState(true);
 useEffect(()=>{fetch('/api/services?scope=order',{cache:'no-store'}).then(async response=>{if(!response.ok)throw new Error();return response.json()}).then((rows:Service[])=>{setServices(rows);const requested=rows.find(row=>row.id===initialServiceId||row.providerServiceId===initialServiceId);const first=requested||rows[0];if(first){setServiceId(first.id);setQuantity(first.min)}}).catch(()=>setMessage('Services are temporarily unavailable. Please try again shortly.')).finally(()=>setLoading(false))},[initialServiceId]);
 const selected=services.find(service=>service.id===serviceId);
 const filtered=useMemo(()=>{const term=query.trim().toLowerCase();return term?services.filter(service=>`${service.providerServiceId} ${service.platform} ${service.category} ${service.name}`.toLowerCase().includes(term)).slice(0,200):services.slice(0,200)},[services,query]);
 const total=selected?Math.ceil(selected.retailRatePaisePerThousand*quantity/1000):0;
 function choose(id:string){setServiceId(id);const service=services.find(item=>item.id===id);if(service)setQuantity(service.min);setMessage('');setPublicId('')}
 async function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();if(!selected)return;setBusy(true);setMessage('');setPublicId('');try{const response=await fetch('/api/orders/create',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({serviceId:selected.id,link,quantity})});const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error(result.error||'The order could not be placed.');setPublicId(result.publicId);setMessage(`Order ${result.publicId} was accepted and sent for processing.`);setLink('')}catch(error){setMessage((error as Error).message)}finally{setBusy(false)}}
 if(loading)return <div className="panel order-loading">Loading live services…</div>;
 if(!services.length)return <div className="notice danger">{message||'No services are currently available.'}</div>;
 return <form className="panel purchase-form" onSubmit={submit}>
  <div className="purchase-heading"><div><span className="kicker">SECURE ORDER</span><h2>Choose exactly what you need</h2><p>Review the source ID, limits and final price before placing your order.</p></div><ShieldCheck/></div>
  <div className="field"><label htmlFor="service-search">Find a service</label><div className="service-search"><Search size={18}/><input id="service-search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search platform, service or ID"/></div></div>
  <div className="field"><label htmlFor="service-select">Service</label><select id="service-select" value={serviceId} onChange={event=>choose(event.target.value)} required>{filtered.map(service=><option value={service.id} key={service.id}>{service.platform} — {service.name} (ID {service.providerServiceId})</option>)}</select>{query&&filtered.length===0?<small>No services match this search.</small>:null}</div>
  {selected?<section className="selected-service"><span>{selected.platform} · Service ID #{selected.providerServiceId}</span><h3>{selected.name}</h3><p>{selected.description}</p><div><small><Clock3 size={14}/>{selected.averageTime?`Provider average: ${selected.averageTime}`:'Average time not published'}</small>{selected.refill?<small><BadgeCheck size={14}/>Refill listed</small>:null}</div><dl><div><dt>Rate</dt><dd>₹{(selected.retailRatePaisePerThousand/100).toFixed(2)} / 1,000</dd></div><div><dt>Minimum</dt><dd>{selected.min.toLocaleString('en-IN')}</dd></div><div><dt>Maximum</dt><dd>{selected.max.toLocaleString('en-IN')}</dd></div></dl></section>:null}
  <div className="field"><label htmlFor="order-link">Public profile or content link</label><input id="order-link" type="url" value={link} onChange={event=>setLink(event.target.value)} required placeholder="https://…"/><small>Double-check this link. Delivery starts automatically after the provider accepts the order.</small></div>
  <div className="field"><label htmlFor="order-quantity">Quantity</label><input id="order-quantity" type="number" value={quantity||''} min={selected?.min||1} max={selected?.max||100000000} onChange={event=>setQuantity(Number(event.target.value))} required/></div>
  <div className="order-review"><div><small>Total wallet charge</small><strong>₹{(total/100).toFixed(2)}</strong></div><button className="btn btn-primary btn-lg" disabled={busy||!selected||quantity<selected.min||quantity>selected.max}>{busy?'Placing order…':'Confirm & place order'}</button></div>
  {message?<div className={`notice ${publicId?'success':'danger'}`}>{message}{publicId?<><br/><Link href="/dashboard">Track it in your dashboard</Link></>:null}</div>:null}
  <p className="purchase-note">Orders use your MANGLO Wallet. The provider receives only the public link, service ID and quantity needed for fulfilment.</p>
 </form>
}
