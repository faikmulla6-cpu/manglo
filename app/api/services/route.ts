import {NextRequest,NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {presentService} from '@/lib/catalog';
import {catalogFreshAfter} from '@/lib/catalog-freshness';

export const dynamic='force-dynamic';
export const revalidate=0;

export async function GET(_request:NextRequest){
 try{
  const freshAfter=catalogFreshAfter();
  const services=await db.service.findMany({
   where:{active:true,operatorDisabled:false,lastSyncedAt:{gte:freshAfter}},
   select:{
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
   },
   orderBy:[{score:'desc'},{lastSyncedAt:'desc'}],
  });
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
  return NextResponse.json({error:'Services are temporarily unavailable.'},{status:503,headers:{'Cache-Control':'no-store'}});
 }
}
