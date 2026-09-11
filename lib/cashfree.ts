import crypto from 'crypto';
const mode=process.env.CASHFREE_MODE==='production'?'production':'sandbox';
const base=mode==='production'?'https://api.cashfree.com/pg':'https://sandbox.cashfree.com/pg';
function headers(){ const clientId=process.env.CASHFREE_CLIENT_ID?.trim()||'',secret=process.env.CASHFREE_CLIENT_SECRET?.trim()||'';if(!clientId||!secret)throw new Error('Cashfree is not configured');return {'Content-Type':'application/json','x-client-id':clientId,'x-client-secret':secret,'x-api-version':process.env.CASHFREE_API_VERSION||'2023-08-01'}; }
export async function createCashfreeOrder(input:{orderId:string,amount:number,userId:string,name:string,email:string,phone:string}){
 const res=await fetch(`${base}/orders`,{method:'POST',headers:headers(),body:JSON.stringify({order_id:input.orderId,order_amount:input.amount,order_currency:'INR',customer_details:{customer_id:input.userId,customer_name:input.name,customer_email:input.email,customer_phone:input.phone},order_meta:{return_url:`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=return&order_id={order_id}`,notify_url:`${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`},order_note:'MANGLO wallet top-up'}) ,cache:'no-store'});
 if(!res.ok) throw new Error(`Cashfree create order failed: ${res.status} ${await res.text()}`); return res.json();
}
export async function getCashfreeOrder(orderId:string){ const r=await fetch(`${base}/orders/${encodeURIComponent(orderId)}`,{headers:headers(),cache:'no-store'}); if(!r.ok)throw new Error('Cashfree verify failed'); return r.json(); }
export function verifyCashfreeWebhook(raw:string,timestamp:string,signature:string){ const secret=process.env.CASHFREE_CLIENT_SECRET?.trim()||'';if(!secret||!timestamp||!signature)return false;const expected=crypto.createHmac('sha256',secret).update(timestamp+raw).digest('base64'); const a=Buffer.from(expected),b=Buffer.from(signature); return a.length===b.length&&crypto.timingSafeEqual(a,b); }
export const cashfreeMode=mode;
