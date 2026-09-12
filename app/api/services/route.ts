import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {fallbackServices,presentService} from '@/lib/catalog';

export const dynamic='force-dynamic';
export const revalidate=0;

export async function GET(){
 const services=await db.service.findMany({
  where:{active:true},
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
  },
  orderBy:{score:'desc'},
 }).catch(()=>[]);

 const rows=services.length
  ?services.map(service=>presentService({...service,retailRatePaisePerThousand:Number(service.retailRatePaisePerThousand)}))
  :fallbackServices();

 return NextResponse.json(rows,{
  headers:{
   'Cache-Control':'no-store, no-cache, must-revalidate, max-age=0',
   'CDN-Cache-Control':'no-store',
  },
 });
}
