'use client';

import {FormEvent,useState} from 'react';
import {useRouter} from 'next/navigation';
import {LoaderCircle,Plus} from 'lucide-react';
import styles from './Ops.module.css';

function localDate(){const now=new Date();return new Date(now.getTime()-now.getTimezoneOffset()*60_000).toISOString().slice(0,10)}

export default function MarketingSpendControl(){
 const router=useRouter();const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();const form=event.currentTarget;const data=new FormData(form);const spend=Number(data.get('spendRupees'));const impressions=Number(data.get('impressions')||0);const clicks=Number(data.get('clicks')||0);
  if(!Number.isFinite(spend)||spend<0){setMessage('Enter a valid spend amount.');return}
  setBusy(true);setMessage('');
  try{
   const response=await fetch('/api/admin/marketing-spend',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify({source:String(data.get('source')||''),campaign:String(data.get('campaign')||''),date:String(data.get('date')||''),spendPaise:Math.round(spend*100),impressions:Number.isFinite(impressions)?Math.max(0,Math.trunc(impressions)):0,clicks:Number.isFinite(clicks)?Math.max(0,Math.trunc(clicks)):0,currency:'INR',externalCampaignId:String(data.get('externalCampaignId')||'')||null})});
   const result=await response.json();if(!response.ok)throw new Error(result.error||'Unable to save spend.');
   setMessage(`Saved ₹${spend.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})} for ${result.source} / ${result.campaign}.`);router.refresh();
  }catch(error){setMessage(error instanceof Error?error.message:'Unable to save spend.')}finally{setBusy(false)}
 }
 return <form className={styles.spendForm} onSubmit={submit}>
  <div className={styles.spendFormHead}><div><b>Record campaign spend</b><small>Use the same UTM source and campaign value used in the ad link. Saving the same source + campaign + date updates that day instead of duplicating it.</small></div></div>
  <div className={styles.spendFields}>
   <label><span>UTM source</span><input name="source" defaultValue="meta" maxLength={120} required placeholder="meta"/></label>
   <label><span>UTM campaign</span><input name="campaign" maxLength={160} required placeholder="manglo_launch_01"/></label>
   <label><span>Date</span><input name="date" type="date" defaultValue={localDate()} required/></label>
   <label><span>Spend (₹)</span><input name="spendRupees" type="number" min="0" step="0.01" required placeholder="500.00"/></label>
   <label><span>Impressions</span><input name="impressions" type="number" min="0" step="1" placeholder="0"/></label>
   <label><span>Clicks</span><input name="clicks" type="number" min="0" step="1" placeholder="0"/></label>
   <label><span>Platform campaign ID</span><input name="externalCampaignId" maxLength={200} placeholder="Optional"/></label>
  </div>
  <div className={styles.spendActions}><button disabled={busy}>{busy?<LoaderCircle className={styles.spin} size={13}/>:<Plus size={13}/>} Save spend</button><small>INR only. Campaign spend is analytics data; this does not change any ad budget.</small></div>
  {message?<p className={styles.spendMessage}>{message}</p>:null}
 </form>;
}
