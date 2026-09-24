'use client';

import {useState} from 'react';
import styles from './AgencyLeads.module.css';

const states=['NEW','CONTACTED','QUALIFIED','WON','CLOSED'] as const;

export default function AgencyLeadStatusControl({reference,status}:{reference:string;status:string}){
 const [value,setValue]=useState(status);
 const [saving,setSaving]=useState(false);
 const [message,setMessage]=useState('');

 async function change(next:string){
  if(next===value||saving)return;
  const previous=value;
  setValue(next);
  setSaving(true);
  setMessage('');
  try{
   const response=await fetch('/api/admin/agency-leads/status',{
    method:'PATCH',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({reference,status:next}),
   });
   const body=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(body?.error||'Update failed');
   setMessage('Saved');
  }catch(error){
   setValue(previous);
   setMessage(error instanceof Error?error.message:'Update failed');
  }finally{setSaving(false)}
 }

 return <div className={styles.statusControl}>
  <select value={value} disabled={saving} onChange={event=>change(event.target.value)} aria-label="Lead status">
   {states.map(item=><option key={item} value={item}>{item.replaceAll('_',' ')}</option>)}
  </select>
  {message?<small>{message}</small>:null}
 </div>;
}
