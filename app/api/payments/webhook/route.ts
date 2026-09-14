import {NextRequest,NextResponse} from 'next/server';
import {verifyCashfreeWebhook} from '@/lib/cashfree';
import {reconcileCashfreePayment} from '@/lib/payments';

const MAX_WEBHOOK_BYTES=256*1024;

export async function POST(req:NextRequest){
 const declared=Number(req.headers.get('content-length')||0);
 if(Number.isFinite(declared)&&declared>MAX_WEBHOOK_BYTES)return NextResponse.json({error:'Payload too large'},{status:413});
 const raw=await req.text();
 if(Buffer.byteLength(raw,'utf8')>MAX_WEBHOOK_BYTES)return NextResponse.json({error:'Payload too large'},{status:413});
 const timestamp=req.headers.get('x-webhook-timestamp')||'';
 const signature=req.headers.get('x-webhook-signature')||'';
 if(!verifyCashfreeWebhook(raw,timestamp,signature))return NextResponse.json({error:'Invalid signature'},{status:401});
 let body:any;try{body=JSON.parse(raw)}catch{return NextResponse.json({error:'Bad JSON'},{status:400})}
 const orderId=String(body?.data?.order?.order_id||body?.order_id||'').trim();
 if(!orderId||orderId.length>100)return NextResponse.json({ok:true});
 try{await reconcileCashfreePayment(orderId);return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}})}catch(error){console.error('[cashfree-webhook]',error instanceof Error?error.message:'unknown');return NextResponse.json({error:'Verification failed'},{status:500})}
}
