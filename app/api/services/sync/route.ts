import {NextRequest,NextResponse} from 'next/server';
import {providerServices} from '@/lib/provider';
import {db} from '@/lib/db';
import {retailRate} from '@/lib/money';
import {platformOf,providerCatalogById,serviceDescription,trustworthyCategory,trustworthyServiceName} from '@/lib/catalog';

export async function POST(req:NextRequest){
 if(req.headers.get('authorization')!==`Bearer ${process.env.CRON_SECRET}`)return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const list=await providerServices();
  if(!Array.isArray(list))return NextResponse.json({error:'Unexpected provider response'},{status:502});
  const normalized=[] as Array<{id:string;data:any}>;
  for(const x of list.slice(0,5000)){
   const id=String(x?.service||'').trim();
   if(!id)continue;
   const meta=providerCatalogById.get(id);
   const rateRupees=Number(x?.rate);
   if(!Number.isFinite(rateRupees)||rateRupees<=0)continue;
   const providerPaise=Math.max(1,Math.ceil(rateRupees*100));
   const min=Math.max(1,Number(x?.min)||meta?.min||1);
   const max=Math.max(min,Number(x?.max)||meta?.max||min);
   const category=trustworthyCategory(String(meta?.category||x?.category||'Other')).slice(0,190);
   const name=trustworthyServiceName(String(meta?.name||x?.name||'Service')).slice(0,190);
   const averageTime=meta?.averageTime||null;
   const refill=Boolean(x?.refill??meta?.refill);
   const cancel=Boolean(x?.cancel??meta?.cancel);
   const description=serviceDescription({averageTime,min,max,refill});
   normalized.push({id,data:{platform:platformOf(category,name),category,name,description,averageTime,providerRatePaisePerThousand:BigInt(providerPaise),retailRatePaisePerThousand:BigInt(retailRate(providerPaise)),min,max,refill,cancel,active:true,lastSyncedAt:new Date()}});
  }

  const minimum=Math.max(1,Number(process.env.SMM_MIN_SYNC_SERVICES||50));
  if(normalized.length<minimum){
   console.error(`Supplier sync rejected: only ${normalized.length} valid services returned`);
   return NextResponse.json({error:'Supplier returned too few valid services; existing catalog was preserved.'},{status:502});
  }

  const batchSize=25;
  for(let i=0;i<normalized.length;i+=batchSize){
   const batch=normalized.slice(i,i+batchSize);
   await Promise.all(batch.map(({id,data})=>db.service.upsert({where:{provider_providerServiceId:{provider:'primary',providerServiceId:id}},create:{provider:'primary',providerServiceId:id,...data},update:data})));
  }

  const activeIds=normalized.map(item=>item.id);
  const retired=await db.service.updateMany({where:{provider:'primary',providerServiceId:{notIn:activeIds},active:true},data:{active:false}});
  return NextResponse.json({ok:true,synced:normalized.length,deactivated:retired.count});
 }catch(error){
  console.error('Supplier sync failed',error instanceof Error?error.message:'unknown');
  return NextResponse.json({error:'Supplier synchronization failed.'},{status:502});
 }
}
