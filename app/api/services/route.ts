import {NextRequest,NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {presentService} from '@/lib/catalog';
import {catalogFreshAfter} from '@/lib/catalog-freshness';
import {autoRefreshSupplierCatalog} from '@/lib/service-sync';

export const dynamic='force-dynamic';
export const revalidate=0;

const serviceSelect={
 id:true,
 providerServiceId:true,
 platform:true,
 category:true,
 name:true,
 description:true,
 averageTime:true,
 retailRatePaisePerThousand:true,
 min:true,
 max:true,
 refill:true,
 cancel:true,
 lastSyncedAt:true,
} as const;

async function freshServices(){
 return db.service.findMany({
  where:{active:true,operatorDisabled:false,lastSyncedAt:{gte:catalogFreshAfter()}},
  select:serviceSelect,
  orderBy:[{score:'desc'},{lastSyncedAt:'desc'}],
 });
}

export async function GET(_request:NextRequest){
 try{
  let services=await freshServices();

  // The hourly cron remains the primary refresh path. If it was missed and the
  // whole order catalog aged out, one customer request may safely repair it.
  // The helper coalesces concurrent requests and rate-limits failed attempts.
  if(!services.length){
   const refreshed=await autoRefreshSupplierCatalog();
   if(refreshed)services=await freshServices();
  }

  if(!services.length){
   return NextResponse.json(
    {error:'Live service availability is being refreshed. Please try again shortly.',code:'CATALOG_REFRESHING'},
    {status:503,headers:{'Cache-Control':'no-store, no-cache, must-revalidate, max-age=0','CDN-Cache-Control':'no-store','Retry-After':'30'}},
   );
  }

  const rows=services.map(service=>presentService({
   ...service,
   retailRatePaisePerThousand:Number(service.retailRatePaisePerThousand),
   orderable:true,
   catalogStatus:'fresh' as const,
   lastSyncedAt:service.lastSyncedAt.toISOString(),
  }));
  return NextResponse.json(rows,{headers:{'Cache-Control':'no-store, no-cache, must-revalidate, max-age=0','CDN-Cache-Control':'no-store'}});
 }catch(error){
  console.error('[services]',error instanceof Error?error.message:'catalog unavailable');
  return NextResponse.json({error:'Services are temporarily unavailable.',code:'CATALOG_UNAVAILABLE'},{status:503,headers:{'Cache-Control':'no-store','Retry-After':'30'}});
 }
}
