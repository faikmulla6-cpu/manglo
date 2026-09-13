import {NextRequest,NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {requireAdminApi} from '@/lib/admin-ops';

export async function GET(req:NextRequest){
 try{
  const admin=await requireAdminApi(req);
  if(!admin)return NextResponse.json({error:'Not found'},{status:404});
  const q=(req.nextUrl.searchParams.get('q')||'').trim().slice(0,80);
  if(q.length<2)return NextResponse.json({services:[]},{headers:{'Cache-Control':'no-store'}});
  const services=await db.service.findMany({
   where:{provider:'primary',OR:[{providerServiceId:{equals:q}},{name:{contains:q,mode:'insensitive'}},{category:{contains:q,mode:'insensitive'}},{platform:{contains:q,mode:'insensitive'}}]},
   select:{providerServiceId:true,platform:true,category:true,name:true,active:true,operatorDisabled:true,retailRatePaisePerThousand:true,min:true,max:true,lastSyncedAt:true},
   orderBy:[{operatorDisabled:'desc'},{score:'desc'}],take:20,
  });
  return NextResponse.json({services:services.map(service=>({...service,retailRatePaisePerThousand:Number(service.retailRatePaisePerThousand),lastSyncedAt:service.lastSyncedAt.toISOString()}))},{headers:{'Cache-Control':'no-store'}});
 }catch(error){
  console.error('[admin-service-search]',error instanceof Error?error.message:'unknown');
  return NextResponse.json({error:'Unable to search services'},{status:500});
 }
}
