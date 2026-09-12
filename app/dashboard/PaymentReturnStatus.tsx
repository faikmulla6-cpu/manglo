'use client';
import {useEffect,useState} from 'react';
import {useSearchParams} from 'next/navigation';

export default function PaymentReturnStatus(){
 const params=useSearchParams();
 const [message,setMessage]=useState('');
 const [tone,setTone]=useState<'normal'|'success'|'danger'>('normal');

 useEffect(()=>{
  if(params.get('payment')!=='return')return;
  const orderId=params.get('order_id');
  if(!orderId){setTone('danger');setMessage('The payment return was missing its order number.');return;}
  let cancelled=false;
  let timer:ReturnType<typeof setTimeout>|undefined;

  async function verify(attempt:number){
   if(cancelled)return;
   setMessage(attempt===0?'Confirming your payment…':'Payment received. Waiting for final confirmation…');
   try{
    const response=await fetch(`/api/payments/verify?order_id=${encodeURIComponent(orderId!)}`,{cache:'no-store'});
    const data=await response.json();
    if(!response.ok)throw new Error(data.error||'Unable to verify payment.');
    if(data.status==='PAID'){
     setTone('success');
     setMessage('Payment confirmed. Your wallet has been credited.');
     timer=setTimeout(()=>location.replace('/dashboard'),1400);
     return;
    }
    if(data.status==='FAILED'){
     setTone('danger');
     setMessage('Payment was not completed. No wallet balance was added.');
     return;
    }
    if(attempt<3){
     timer=setTimeout(()=>verify(attempt+1),2000);
     return;
    }
    setTone('normal');
    setMessage('Payment is still pending. Your wallet will update automatically after Cashfree confirms it.');
   }catch(error){
    setTone('danger');
    setMessage(error instanceof Error?error.message:'Unable to verify payment.');
   }
  }

  void verify(0);
  return()=>{cancelled=true;if(timer)clearTimeout(timer)};
 },[params]);

 return message?<div className={`notice ${tone==='success'?'success':tone==='danger'?'danger':''}`}>{message}</div>:null;
}
