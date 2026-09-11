import {NextRequest,NextResponse} from 'next/server';
import {verifyCashfreeWebhook} from '@/lib/cashfree';
import {reconcileCashfreePayment} from '@/lib/payments';

export async function POST(req:NextRequest){
 const raw=await req.text(),timestamp=req.headers.get('x-webhook-timestamp')||'',signature=req.headers.get('x-webhook-signature')||'';
 if(!verifyCashfreeWebhook(raw,timestamp,signature))return NextResponse.json({error:'Invalid signature'},{status:401});
 let body:any;try{body=JSON.parse(raw)}catch{return NextResponse.json({error:'Bad JSON'},{status:400})}
 const orderId=String(body?.data?.order?.order_id||body?.order_id||'');if(!orderId)return NextResponse.json({ok:true});
 try{await reconcileCashfreePayment(orderId);return NextResponse.json({ok:true})}catch{return NextResponse.json({error:'Verification failed'},{status:500})}
}
