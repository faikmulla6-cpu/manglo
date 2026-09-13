import {NextRequest,NextResponse} from 'next/server';
import {providerServices} from '@/lib/provider';
import {db} from '@/lib/db';
import {cronAuthorized} from '@/lib/cron';
import {normalizeSupplierServices,supplierCatalogAudit} from '@/lib/service-sync';

function envFlag(name:string,defaultValue=false){
 const value=process.env[name];
 if(value==null)return defaultValue;
 return ['1','true','yes','on'].includes(value.trim().toLowerCase());
}

export async function POST(req:NextRequest){
 if(!cronAuthorized(req))return NextResponse.json({error:'Unauthorized'},{status:401});

 try{
  const raw=await providerServices();
  const normalized=normalizeSupplierServices(raw);
  const audit=supplierCatalogAudit(normalized);
  const minimum=Math.max(1,Number(process.env.SMM_MIN_SYNC_SERVICES||2000));
  if(normalized.length<minimum)return NextResponse.json({error:'Supplier returned too few valid services; existing catalog was preserved.',writePerformed:false,...audit},{status:502});

  const minimumMatchRatio=Math.min(1,Math.max(0,Number(process.env.SMM_MIN_CURATED_MATCH_RATIO||0.75)));
  if(audit.matchRatio<minimumMatchRatio)return NextResponse.json({error:'Supplier catalog no longer matches the curated MANGLO baseline closely enough. No changes were made.',writePerformed:false,minimumMatchRatio,...audit},{status:409});

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

  return NextResponse.json({ok:true,writePerformed:true,synced:syncList.length,deactivated:retired.count,importedNewServices:importNew,...audit},{headers:{'Cache-Control':'no-store'}});
 }catch(error){
  console.error('Supplier sync failed',error instanceof Error?error.message:'unknown');
  return NextResponse.json({error:'Supplier synchronization failed. Existing catalog was preserved.'},{status:502});
 }
}
