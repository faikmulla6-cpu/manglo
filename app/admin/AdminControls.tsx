'use client';

import {FormEvent,useState} from 'react';
import {useRouter} from 'next/navigation';
import {Check,LoaderCircle,PauseCircle,PlayCircle,Search} from 'lucide-react';
import styles from './AdminControls.module.css';

type ServiceResult={providerServiceId:string;platform:string;category:string;name:string;active:boolean;operatorDisabled:boolean;retailRatePaisePerThousand:number;min:number;max:number;lastSyncedAt:string};

const money=(paise:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(paise/100);

export function ServiceControls(){
 const router=useRouter();
 const [query,setQuery]=useState('');
 const [services,setServices]=useState<ServiceResult[]>([]);
 const [loading,setLoading]=useState(false);
 const [busy,setBusy]=useState<string|null>(null);
 const [message,setMessage]=useState('');

 async function search(e?:FormEvent){
  e?.preventDefault();
  if(query.trim().length<2){setServices([]);setMessage('Enter at least 2 characters or an exact service ID.');return}
  setLoading(true);setMessage('');
  try{
   const res=await fetch(`/api/admin/services/search?q=${encodeURIComponent(query.trim())}`,{cache:'no-store'});
   const data=await res.json();
   if(!res.ok)throw new Error(data.error||'Search failed');
   setServices(data.services||[]);
   if(!(data.services||[]).length)setMessage('No matching services found.');
  }catch(error){setMessage(error instanceof Error?error.message:'Search failed')}finally{setLoading(false)}
 }

 async function toggle(service:ServiceResult){
  const next=!service.operatorDisabled;
  setBusy(service.providerServiceId);setMessage('');
  try{
   const res=await fetch('/api/admin/services/state',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({providerServiceId:service.providerServiceId,operatorDisabled:next})});
   const data=await res.json();
   if(!res.ok)throw new Error(data.error||'Update failed');
   setServices(current=>current.map(item=>item.providerServiceId===service.providerServiceId?{...item,operatorDisabled:data.operatorDisabled,active:data.active}:item));
   setMessage(next?`Service ${service.providerServiceId} paused.`:data.resumePending?`Service ${service.providerServiceId} unblocked; it will reactivate after the next valid catalog sync.`:`Service ${service.providerServiceId} resumed.`);
   router.refresh();
  }catch(error){setMessage(error instanceof Error?error.message:'Update failed')}finally{setBusy(null)}
 }

 return <div className={styles.serviceControl}>
  <form onSubmit={search} className={styles.searchRow}><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search service ID, name, category or platform" aria-label="Search services"/><button disabled={loading}>{loading?<LoaderCircle className={styles.spin} size={14}/>:'Search'}</button></form>
  {message&&<p className={styles.message}>{message}</p>}
  <div className={styles.results}>{services.map(service=><article key={service.providerServiceId} className={service.operatorDisabled?styles.paused:''}>
   <div className={styles.serviceMain}><div><b>{service.name}</b><small>{service.platform} · ID {service.providerServiceId} · {service.category}</small></div><span>{service.operatorDisabled?'Paused':service.active?'Live':'Inactive'}</span></div>
   <div className={styles.meta}><span>{money(service.retailRatePaisePerThousand)} / 1K</span><span>Min {service.min.toLocaleString('en-IN')}</span><span>Max {service.max.toLocaleString('en-IN')}</span><span>Synced {new Date(service.lastSyncedAt).toLocaleString('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</span></div>
   <button className={service.operatorDisabled?styles.resume:styles.pause} disabled={busy===service.providerServiceId} onClick={()=>toggle(service)}>{busy===service.providerServiceId?<LoaderCircle className={styles.spin} size={14}/>:service.operatorDisabled?<PlayCircle size={14}/>:<PauseCircle size={14}/>} {service.operatorDisabled?'Resume service':'Pause service'}</button>
  </article>)}</div>
 </div>;
}

export function TicketStatusControl({publicId,status}:{publicId:string;status:'OPEN'|'IN_REVIEW'|'RESOLVED'|'CLOSED'}){
 const router=useRouter();
 const [value,setValue]=useState(status);
 const [saving,setSaving]=useState(false);
 const [saved,setSaved]=useState(false);
 async function save(){
  setSaving(true);setSaved(false);
  try{
   const res=await fetch('/api/admin/support/status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({publicId,status:value})});
   const data=await res.json();
   if(!res.ok)throw new Error(data.error||'Unable to update ticket');
   setSaved(true);router.refresh();
  }finally{setSaving(false)}
 }
 return <div className={styles.ticketControl}><select value={value} onChange={e=>setValue(e.target.value as typeof value)}><option value="OPEN">Open</option><option value="IN_REVIEW">In review</option><option value="RESOLVED">Resolved</option><option value="CLOSED">Closed</option></select><button onClick={save} disabled={saving||value===status}>{saving?<LoaderCircle className={styles.spin} size={13}/>:saved?<Check size={13}/>:null} Save</button></div>;
}
