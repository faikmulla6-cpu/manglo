import {NextRequest,NextResponse} from 'next/server';
import {cronAuthorized} from '@/lib/cron';
import {db} from '@/lib/db';
import {providerBalance} from '@/lib/provider';
import {refreshServiceHealth} from '@/lib/service-health';

export const dynamic='force-dynamic';

function finiteEnv(name:string,fallback:number){
 const parsed=Number(process.env[name]);
 return Number.isFinite(parsed)&&parsed>=0?parsed:fallback;
}

export async function POST(req:NextRequest){
 if(!cronAuthorized(req))return NextResponse.json({error:'Unauthorized'},{status:401,headers:{'Cache-Control':'no-store'}});

 const now=Date.now();
 const catalogStaleHours=finiteEnv('CATALOG_STALE_HOURS',24);
 const paymentStaleMinutes=finiteEnv('PAYMENT_STALE_MINUTES',30);
 const orderStaleHours=finiteEnv('ORDER_STALE_HOURS',24);
 const lowBalanceThreshold=finiteEnv('SMM_LOW_BALANCE_THRESHOLD_INR',0);
 const uncertainCutoff=new Date(now-2*60_000);
 const healthRepairCutoff=new Date(now-60*60_000);

 const [newest,stalePayments,staleOrders,uncertainOrders,expiredDrafts,recentTerminalServices]=await Promise.all([
  db.service.findFirst({where:{active:true},orderBy:{lastSyncedAt:'desc'},select:{lastSyncedAt:true}}),
  db.payment.count({where:{status:{in:['CREATED','PENDING']},createdAt:{lt:new Date(now-paymentStaleMinutes*60_000)}}}),
  db.order.count({where:{status:{in:['QUEUED','PROCESSING']},createdAt:{lt:new Date(now-orderStaleHours*3_600_000)}}}),
  db.order.count({where:{status:'QUEUED',providerOrderId:null,createdAt:{lt:uncertainCutoff}}}),
  db.orderDraft.deleteMany({where:{expiresAt:{lte:new Date(now)}}}).catch(()=>({count:0})),
  db.order.findMany({
   where:{status:{in:['COMPLETED','PARTIAL','REFUNDED','CANCELED','FAILED']},updatedAt:{gte:healthRepairCutoff}},
   select:{serviceId:true},distinct:['serviceId'],take:200,
  }).catch(()=>[]),
 ]);
 const catalogAgeHours=newest?.lastSyncedAt?Math.max(0,(now-newest.lastSyncedAt.getTime())/3_600_000):null;

 const healthResults=await Promise.allSettled(recentTerminalServices.map(row=>refreshServiceHealth(row.serviceId)));
 const healthRefreshed=healthResults.filter(result=>result.status==='fulfilled').length;
 const healthRefreshFailed=healthResults.length-healthRefreshed;

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
 if(uncertainOrders>0)issues.push('UNCERTAIN_SUPPLIER_SUBMISSIONS');
 if(healthRefreshFailed>0)issues.push('SERVICE_HEALTH_REFRESH_FAILED');

 const ok=issues.length===0;
 return NextResponse.json({
  ok,
  issues,
  supplier:{available:!supplierError,balance:supplierBalance,currency:supplierCurrency,threshold:lowBalanceThreshold},
  catalog:{ageHours:catalogAgeHours,staleAfterHours:catalogStaleHours},
  payments:{stale:stalePayments,staleAfterMinutes:paymentStaleMinutes},
  orders:{stale:staleOrders,staleAfterHours:orderStaleHours,uncertainSupplierSubmissions:uncertainOrders},
  serviceHealth:{recentTerminalServices:recentTerminalServices.length,refreshed:healthRefreshed,failed:healthRefreshFailed,repairWindowMinutes:60},
  maintenance:{expiredDraftsDeleted:expiredDrafts.count},
 },{status:ok?200:503,headers:{'Cache-Control':'no-store'}});
}
