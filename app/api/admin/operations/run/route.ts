import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {db} from '@/lib/db';
import {providerServices} from '@/lib/provider';
import {normalizeSupplierServices,supplierCatalogAudit} from '@/lib/service-sync';
import {reconcileCashfreePayment} from '@/lib/payments';
import {reconcileProviderOrder} from '@/lib/order-reconciliation';
import {requireAdminApi,writeAdminAudit} from '@/lib/admin-ops';

export const dynamic='force-dynamic';

const Body=z.object({action:z.enum(['SYNC_CATALOG','RECONCILE_PAYMENTS','RECONCILE_ORDERS'])});

function envFlag(name:string,defaultValue=false){
 const value=process.env[name];
 if(value==null)return defaultValue;
 return ['1','true','yes','on'].includes(value.trim().toLowerCase());
}

async function syncCatalog(){
 const raw=await providerServices();
 const normalized=normalizeSupplierServices(raw);
 const audit=supplierCatalogAudit(normalized);
 const minimum=Math.max(1,Number(process.env.SMM_MIN_SYNC_SERVICES||2000));
 if(normalized.length<minimum)throw new Error('Supplier returned too few valid services; existing catalog was preserved.');

 const minimumMatchRatio=Math.min(1,Math.max(0,Number(process.env.SMM_MIN_CURATED_MATCH_RATIO||0.75)));
 if(audit.matchRatio<minimumMatchRatio)throw new Error('Supplier catalog no longer matches the curated MANGLO baseline closely enough. No changes were made.');

 const importNew=envFlag('SMM_IMPORT_NEW_SERVICES',false);
 const syncList=importNew?normalized:normalized.filter(item=>item.curated);
 for(let i=0;i<syncList.length;i+=25){
  const batch=syncList.slice(i,i+25);
  await Promise.all(batch.map(({id,data})=>{
   const {active:_active,...refreshable}=data;
   return db.service.upsert({
    where:{provider_providerServiceId:{provider:'primary',providerServiceId:id}},
    create:{provider:'primary',providerServiceId:id,...data},
    update:refreshable,
   });
  }));
 }

 const liveIds=(importNew?normalized:normalized.filter(item=>item.curated)).map(item=>item.id);
 await db.service.updateMany({where:{provider:'primary',providerServiceId:{in:liveIds},operatorDisabled:false},data:{active:true}});
 await db.service.updateMany({where:{provider:'primary',operatorDisabled:true},data:{active:false}});
 const retired=await db.service.updateMany({where:{provider:'primary',providerServiceId:{notIn:liveIds},active:true},data:{active:false}});
 return {synced:syncList.length,deactivated:retired.count,importedNewServices:importNew,matchRatio:audit.matchRatio};
}

async function reconcilePayments(){
 const cutoffMinutes=Math.max(2,Math.min(120,Number(process.env.PAYMENT_RECONCILE_MIN_AGE_MINUTES||5)));
 const cutoff=new Date(Date.now()-cutoffMinutes*60_000);
 const pending=await db.payment.findMany({where:{status:{in:['CREATED','PENDING']},createdAt:{lt:cutoff}},select:{cfOrderId:true},orderBy:{createdAt:'asc'},take:50});
 let paid=0,stillPending=0,failed=0,errors=0;
 for(let i=0;i<pending.length;i+=5){
  const results=await Promise.allSettled(pending.slice(i,i+5).map(payment=>reconcileCashfreePayment(payment.cfOrderId)));
  for(const result of results){
   if(result.status==='rejected'){errors++;continue}
   if(!result.value)continue;
   if(result.value.status==='PAID')paid++;
   else if(result.value.status==='PENDING')stillPending++;
   else failed++;
  }
 }
 return {checked:pending.length,paid,pending:stillPending,failed,errors};
}

async function reconcileOrders(){
 const orders=await db.order.findMany({where:{status:{in:['QUEUED','PROCESSING']},providerOrderId:{not:null}},select:{id:true},orderBy:{updatedAt:'asc'},take:100});
 let reconciled=0,failed=0;
 for(let i=0;i<orders.length;i+=10){
  const results=await Promise.allSettled(orders.slice(i,i+10).map(order=>reconcileProviderOrder(order.id)));
  for(const result of results){if(result.status==='fulfilled')reconciled++;else failed++}
 }
 return {checked:orders.length,reconciled,failed};
}

export async function POST(req:NextRequest){
 try{
  const admin=await requireAdminApi(req);
  if(!admin)return NextResponse.json({error:'Not found'},{status:404});
  const {action}=Body.parse(await req.json());
  const result=action==='SYNC_CATALOG'?await syncCatalog():action==='RECONCILE_PAYMENTS'?await reconcilePayments():await reconcileOrders();
  await writeAdminAudit({adminEmail:admin.email,action:`MANUAL_${action}`,entityType:'Operations',entityId:action,after:result});
  return NextResponse.json({ok:true,action,result},{headers:{'Cache-Control':'no-store'}});
 }catch(error:any){
  console.error('[admin-operation-run]',error instanceof Error?error.message:'unknown');
  const message=error?.issues?'Invalid operation':error instanceof Error?error.message:'Operation failed';
  return NextResponse.json({error:message},{status:error?.issues?400:502,headers:{'Cache-Control':'no-store'}});
 }
}
