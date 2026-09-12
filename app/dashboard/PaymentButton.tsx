'use client';
import {useState} from 'react';

declare global{interface Window{Cashfree?:any}}

let sdkPromise:Promise<void>|null=null;
function loadCashfree(){
 if(window.Cashfree)return Promise.resolve();
 if(sdkPromise)return sdkPromise;
 sdkPromise=new Promise<void>((resolve,reject)=>{
  const existing=document.querySelector<HTMLScriptElement>('script[data-manglo-cashfree="1"]');
  if(existing){
   existing.addEventListener('load',()=>resolve(),{once:true});
   existing.addEventListener('error',()=>reject(new Error('Unable to load secure checkout.')),{once:true});
   return;
  }
  const script=document.createElement('script');
  script.src='https://sdk.cashfree.com/js/v3/cashfree.js';
  script.async=true;
  script.dataset.mangloCashfree='1';
  script.onload=()=>resolve();
  script.onerror=()=>reject(new Error('Unable to load secure checkout.'));
  document.head.appendChild(script);
 });
 return sdkPromise;
}

export default function PaymentButton(){
 const [amount,setAmount]=useState(99);
 const [busy,setBusy]=useState(false);
 const [msg,setMsg]=useState('');

 async function pay(){
  const paise=Math.round(amount*100);
  if(!Number.isFinite(amount)||amount<10||amount>50000||Math.abs(amount*100-paise)>0.000001){
   setMsg('Enter an amount from ₹10 to ₹50,000 with at most two decimal places.');
   return;
  }
  setBusy(true);
  setMsg('');
  try{
   const response=await fetch('/api/payments/create',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({amount:paise/100}),
   });
   const data=await response.json();
   if(!response.ok)throw new Error(data.error||'Could not start payment.');
   if(!data.paymentSessionId)throw new Error('Secure payment session was not created.');
   await loadCashfree();
   if(!window.Cashfree)throw new Error('Secure checkout could not be initialized.');
   const cashfree=window.Cashfree({mode:data.mode});
   await cashfree.checkout({paymentSessionId:data.paymentSessionId,redirectTarget:'_self'});
  }catch(error){
   setMsg(error instanceof Error?error.message:'Could not start payment.');
   setBusy(false);
  }
 }

 return <div className="panel">
  <h3>Add money</h3>
  <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
   {[10,49,99,249,499,999].map(value=><button type="button" key={value} className={`btn ${amount===value?'btn-primary':'btn-ghost'}`} onClick={()=>setAmount(value)} disabled={busy}>₹{value}</button>)}
  </div>
  <div className="field">
   <label>Custom amount (₹10–₹50,000)</label>
   <input value={amount} type="number" min={10} max={50000} step="0.01" inputMode="decimal" onChange={event=>setAmount(Number(event.target.value))} disabled={busy}/>
  </div>
  {msg&&<div className="notice danger">{msg}</div>}
  <button type="button" className="btn btn-primary" onClick={pay} disabled={busy}>{busy?'Opening secure checkout…':'Proceed securely'}</button>
  <p style={{fontSize:12,color:'#777'}}>Payments are completed on Cashfree's hosted checkout. MANGLO never stores your card number, CVV, UPI PIN or banking credentials.</p>
 </div>;
}
