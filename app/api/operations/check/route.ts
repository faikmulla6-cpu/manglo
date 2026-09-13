import {NextRequest,NextResponse} from 'next/server';
import {cronAuthorized} from '@/lib/cron';
import {db} from '@/lib/db';
import {providerBalance} from '@/lib/provider';

export const dynamic='force-dynamic';

function finiteEnv(name:string,fallback:number){
 const parsed=Number(process.env[name]);
 return Number.isFinite(parsed)&&parsed>=0?parsed:fallback;
}

export async function POST(req:NextRequest){
 if(!cronAuthorized(req))return NextResponse.json({error:'Unauthorized'},{status:401});

 const now=Date.now();
 const catalogStaleHours=finiteEnv('CATALOG_STALE_HOURS',24);
 const paymentStaleMinutes=finiteEnv('PAYMENT_STALE_MINUTES',30);
 const orderStaleHours=finiteEnv('ORDER_STALE_HOURS',24);
 const lowBalanceThreshold=finiteEnv('SMM_LOW_BALANCE_THRESHOLD_INR',0);

 const newest=await db.service.findFirst({where:{active:true},orderBy:{lastSyncedAt:'desc'},select:{lastSyncedAt:true}});
 const catalogAgeHours=newest?.lastSyncedAt?Math.max(0,(now-newest.lastSyncedAt.getTime())/3_600_000):null;
 const stalePayments=await db.payment.count({where:{status:{in:['CREATED','PENDING']},createdAt:{lt:new Date(now-paymentStaleMinutes*60_000)}}});
 const staleOrders=await db.order.count({where:{status:{in:['QUEUED','PROCESSING']},createdAt:{lt:new Date(now-orderStaleHours*3_600_000)}}});

 let supplierBalance:number|null=null;
 let supplierCurrency='INR';
 let supplierError='';
 try{
  const raw=await providerBalance() as Record<string,unknown>;
  const value=Number(raw.balance);
  if(!Number.isFinite(value))throw new Error('Invalid supplier balance');
  supplierBalance=value;
  supplierCurrency=String(raw.currency||'INR').toUpperCase();
 }catch(error){supplierError=error instanceof Error?error.message:'Supplier unavailable'}

 const issues:string[]=[];
 if(supplierError)issues.push('SUPPLIER_API_UNAVAILABLE');
 if(lowBalanceThreshold>0&&supplierBalance!==null&&supplierBalance<lowBalanceThreshold)issues.push('SUPPLIER_BALANCE_LOW');
 if(catalogAgeHours===null||catalogAgeHours>catalogStaleHours)issues.push('CATALOG_SYNC_STALE');
 if(stalePayments>0)issues.push('STALE_PAYMENTS');
 if(staleOrders>0)issues.push('STALE_ORDERS');

 const ok=issues.length===0;
 return NextResponse.json({
  ok,
  issues,
  supplier:{available:!supplierError,balance:supplierBalance,currency:supplierCurrency,threshold:lowBalanceThreshold},
  catalog:{ageHours:catalogAgeHours,staleAfterHours:catalogStaleHours},
  payments:{stale:stalePayments,staleAfterMinutes:paymentStaleMinutes},
  orders:{stale:staleOrders,staleAfterHours:orderStaleHours},
 },{status:ok?200:503,headers:{'Cache-Control':'no-store'}});
}
