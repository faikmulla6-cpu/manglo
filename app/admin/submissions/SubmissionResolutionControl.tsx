'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import styles from './SubmissionReview.module.css';

export default function SubmissionResolutionControl({publicId}:{publicId:string}){
 const router=useRouter();
 const [providerOrderId,setProviderOrderId]=useState('');
 const [busy,setBusy]=useState<'attach'|'refund'|null>(null);
 const [message,setMessage]=useState('');

 async function act(action:'attach'|'refund'){
  if(action==='attach'&&!providerOrderId.trim()){setMessage('Enter the supplier order ID you verified first.');return}
  if(action==='refund'&&!window.confirm(`Refund order ${publicId}? Only do this after confirming the supplier did not accept the submission.`))return;
  setBusy(action);setMessage('');
  try{
   const res=await fetch('/api/admin/orders/resolve-submission',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(action==='attach'?{action,publicId,providerOrderId:providerOrderId.trim()}:{action,publicId})});
   const data=await res.json().catch(()=>({}));
   if(!res.ok)throw new Error(data.error||'Unable to resolve order.');
   setMessage(action==='attach'?'Supplier order attached.':'Wallet refund issued.');
   router.refresh();
  }catch(error){setMessage(error instanceof Error?error.message:'Unable to resolve order.')}finally{setBusy(null)}
 }

 return <div className={styles.actions}>
  <input value={providerOrderId} onChange={event=>setProviderOrderId(event.target.value)} maxLength={120} placeholder="Verified supplier order ID" aria-label={`Supplier order ID for ${publicId}`}/>
  <button type="button" onClick={()=>act('attach')} disabled={Boolean(busy)}>{busy==='attach'?'Attaching…':'Attach verified ID'}</button>
  <button type="button" className={styles.refund} onClick={()=>act('refund')} disabled={Boolean(busy)}>{busy==='refund'?'Refunding…':'Refund wallet'}</button>
  {message?<small>{message}</small>:null}
 </div>;
}
