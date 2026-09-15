import {db} from './db';
import {retailRate} from './money';
import {providerServices} from './provider';
import {platformOf,providerCatalog,providerCatalogById,serviceDescription,trustworthyCategory,trustworthyServiceName} from './catalog';

export type NormalizedSupplierService={
 id:string;
 curated:boolean;
 sourceRateRupees:number;
 data:{
  platform:string;
  category:string;
  name:string;
  description:string;
  averageTime:string|null;
  providerRatePaisePerThousand:bigint;
  retailRatePaisePerThousand:bigint;
  min:number;
  max:number;
  refill:boolean;
  cancel:boolean;
  active:boolean;
  lastSyncedAt:Date;
 };
};

type CatalogAudit=ReturnType<typeof supplierCatalogAudit>;
export type CatalogSyncResult={ok:true;writePerformed:true;synced:number;deactivated:number;importedNewServices:boolean}&CatalogAudit;

export class CatalogSyncError extends Error{
 constructor(message:string,public readonly status:number,public readonly details:Record<string,unknown>={}){super(message);this.name='CatalogSyncError'}
}

function bool(value:unknown,fallback=false){
 if(typeof value==='boolean')return value;
 if(typeof value==='number')return value!==0;
 if(typeof value==='string'){
  const v=value.trim().toLowerCase();
  if(['1','true','yes','on'].includes(v))return true;
  if(['0','false','no','off',''].includes(v))return false;
 }
 return fallback;
}

function envFlag(name:string,defaultValue=false){
 const value=process.env[name];
 if(value==null)return defaultValue;
 return ['1','true','yes','on'].includes(value.trim().toLowerCase());
}

export function normalizeSupplierServices(list:unknown[]):NormalizedSupplierService[]{
 const seen=new Set<string>();
 const out:NormalizedSupplierService[]=[];
 const now=new Date();
 for(const raw of list.slice(0,5000)){
  const x=raw as Record<string,unknown>;
  const id=String(x?.service??'').trim();
  if(!id||seen.has(id))continue;
  seen.add(id);
  const meta=providerCatalogById.get(id);
  const rateRupees=Number(x?.rate);
  if(!Number.isFinite(rateRupees)||rateRupees<=0)continue;
  const providerPaise=Math.max(1,Math.ceil(rateRupees*100));
  const min=Math.max(1,Math.trunc(Number(x?.min)||meta?.min||1));
  const max=Math.max(min,Math.trunc(Number(x?.max)||meta?.max||min));
  const category=trustworthyCategory(String(meta?.category||x?.category||'Other')).slice(0,190);
  const name=trustworthyServiceName(String(meta?.name||x?.name||'Service')).slice(0,190);
  const averageTime=meta?.averageTime||null;
  const refill=bool(x?.refill,Boolean(meta?.refill));
  const cancel=bool(x?.cancel,Boolean(meta?.cancel));
  out.push({
   id,
   curated:Boolean(meta),
   sourceRateRupees:rateRupees,
   data:{
    platform:platformOf(category,name),category,name,
    description:serviceDescription({averageTime,min,max,refill}),averageTime,
    providerRatePaisePerThousand:BigInt(providerPaise),
    retailRatePaisePerThousand:BigInt(retailRate(providerPaise)),
    min,max,refill,cancel,active:true,lastSyncedAt:now,
   },
  });
 }
 return out;
}

export function supplierCatalogAudit(normalized:NormalizedSupplierService[]){
 const liveIds=new Set(normalized.map(item=>item.id));
 const curatedIds=new Set(providerCatalog.map(item=>item.providerServiceId));
 const matched=normalized.filter(item=>item.curated);
 const newSupplier=normalized.filter(item=>!item.curated);
 const missingCurated=providerCatalog.filter(item=>!liveIds.has(item.providerServiceId));
 let rateChanged=0,limitsChanged=0;
 for(const item of matched){
  const meta=providerCatalogById.get(item.id)!;
  if(Math.abs(meta.rate-item.sourceRateRupees)>0.000001)rateChanged++;
  if(meta.min!==item.data.min||meta.max!==item.data.max)limitsChanged++;
 }
 return {
  curatedBaseline:curatedIds.size,
  liveValid:normalized.length,
  matchedCurated:matched.length,
  matchRatio:curatedIds.size?Number((matched.length/curatedIds.size).toFixed(4)):0,
  newSupplierServices:newSupplier.length,
  missingCuratedServices:missingCurated.length,
  rateChanged,
  limitsChanged,
  sampleNew:newSupplier.slice(0,10).map(item=>({providerServiceId:item.id,name:item.data.name,category:item.data.category,rate:item.sourceRateRupees})),
  sampleMissing:missingCurated.slice(0,10).map(item=>({providerServiceId:item.providerServiceId,name:trustworthyServiceName(item.name),category:trustworthyCategory(item.category)})),
 };
}

export async function syncSupplierCatalog():Promise<CatalogSyncResult>{
 const raw=await providerServices();
 const normalized=normalizeSupplierServices(raw);
 const audit=supplierCatalogAudit(normalized);
 const minimum=Math.max(1,Number(process.env.SMM_MIN_SYNC_SERVICES||2000));
 if(normalized.length<minimum)throw new CatalogSyncError('Supplier returned too few valid services; existing catalog was preserved.',502,{writePerformed:false,...audit});

 const minimumMatchRatio=Math.min(1,Math.max(0,Number(process.env.SMM_MIN_CURATED_MATCH_RATIO||0.75)));
 if(audit.matchRatio<minimumMatchRatio)throw new CatalogSyncError('Supplier catalog no longer matches the curated MANGLO baseline closely enough. No changes were made.',409,{writePerformed:false,minimumMatchRatio,...audit});

 const importNew=envFlag('SMM_IMPORT_NEW_SERVICES',false);
 const syncList=importNew?normalized:normalized.filter(item=>item.curated);
 const batchSize=25;
 for(let i=0;i<syncList.length;i+=batchSize){
  const batch=syncList.slice(i,i+batchSize);
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

 return {ok:true,writePerformed:true,synced:syncList.length,deactivated:retired.count,importedNewServices:importNew,...audit};
}

let autoRefreshInFlight:Promise<boolean>|null=null;
let lastAutoRefreshAttempt=0;
const AUTO_REFRESH_COOLDOWN_MS=60_000;

export async function autoRefreshSupplierCatalog(){
 const now=Date.now();
 if(autoRefreshInFlight)return autoRefreshInFlight;
 if(now-lastAutoRefreshAttempt<AUTO_REFRESH_COOLDOWN_MS)return false;
 lastAutoRefreshAttempt=now;
 autoRefreshInFlight=(async()=>{
  try{
   await syncSupplierCatalog();
   return true;
  }catch(error){
   console.error('[catalog-auto-refresh]',error instanceof Error?error.message:'supplier refresh failed');
   return false;
  }finally{
   autoRefreshInFlight=null;
  }
 })();
 return autoRefreshInFlight;
}
