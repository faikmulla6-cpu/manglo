'use client';
import {useEffect,useState} from 'react';
import {useSearchParams} from 'next/navigation';

export default function PaymentReturnStatus(){
 const params=useSearchParams(),[message,setMessage]=useState(''),[success,setSuccess]=useState(false);
 useEffect(()=>{if(params.get('payment')!=='return')return;const orderId=params.get('order_id');if(!orderId){setMessage('The payment return was missing its order number.');return}setMessage('Confirming your payment…');fetch(`/api/payments/verify?order_id=${encodeURIComponent(orderId)}`).then(async response=>({ok:response.ok,data:await response.json()})).then(({ok,data})=>{if(!ok)throw new Error(data.error||'Unable to verify payment.');if(data.status==='PAID'){setSuccess(true);setMessage('Payment confirmed. Your wallet has been credited.');setTimeout(()=>location.replace('/dashboard'),1400)}else setMessage('Payment is still pending. Your wallet will update automatically after confirmation.')}).catch(error=>setMessage(error.message))},[params]);
 return message?<div className={`notice ${success?'success':''}`}>{message}</div>:null;
}
