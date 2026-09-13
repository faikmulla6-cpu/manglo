import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {db} from '@/lib/db';
import {requireAdminApi} from '@/lib/admin-ops';

const Body=z.object({providerServiceId:z.string().min(1).max(40),operatorDisabled:z.boolean()});

export async function POST(req:NextRequest){
 try{
  const admin=await requireAdminApi(req);
  if(!admin)return NextResponse.json({error:'Not found'},{status:404});
  const body=Body.parse(await req.json());
  const service=await db.service.findUnique({where:{provider_providerServiceId:{provider:'primary',providerServiceId:body.providerServiceId}}});
  if(!service)return NextResponse.json({error:'Service not found'},{status:404});

  const freshEnough=service.lastSyncedAt.getTime()>=Date.now()-12*60*60*1000;
  const nextActive=body.operatorDisabled?false:freshEnough;
  const before={active:service.active,operatorDisabled:service.operatorDisabled};
  const after={active:nextActive,operatorDisabled:body.operatorDisabled};

  await db.$transaction(async tx=>{
   await tx.service.update({where:{id:service.id},data:{active:nextActive,operatorDisabled:body.operatorDisabled}});
   await tx.adminAuditLog.create({data:{adminEmail:admin.email,action:body.operatorDisabled?'SERVICE_PAUSED':'SERVICE_RESUMED',entityType:'Service',entityId:service.providerServiceId,before,after}});
  });

  return NextResponse.json({ok:true,providerServiceId:service.providerServiceId,...after,resumePending:!body.operatorDisabled&&!nextActive},{headers:{'Cache-Control':'no-store'}});
 }catch(error:any){
  console.error('[admin-service-state]',error instanceof Error?error.message:'unknown');
  return NextResponse.json({error:error?.issues?'Invalid request':'Unable to update service'},{status:400});
 }
}
