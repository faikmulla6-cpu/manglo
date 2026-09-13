import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {db} from '@/lib/db';
import {requireAdminApi} from '@/lib/admin-ops';

const Body=z.object({publicId:z.string().min(1).max(40),status:z.enum(['OPEN','IN_REVIEW','RESOLVED','CLOSED'])});

export async function POST(req:NextRequest){
 try{
  const admin=await requireAdminApi(req);
  if(!admin)return NextResponse.json({error:'Not found'},{status:404});
  const body=Body.parse(await req.json());
  const ticket=await db.supportTicket.findUnique({where:{publicId:body.publicId}});
  if(!ticket)return NextResponse.json({error:'Ticket not found'},{status:404});
  const before={status:ticket.status};
  const after={status:body.status};

  await db.$transaction(async tx=>{
   await tx.supportTicket.update({where:{id:ticket.id},data:{status:body.status}});
   await tx.adminAuditLog.create({data:{adminEmail:admin.email,action:'SUPPORT_STATUS_CHANGED',entityType:'SupportTicket',entityId:ticket.publicId,before,after}});
  });

  return NextResponse.json({ok:true,publicId:ticket.publicId,status:body.status},{headers:{'Cache-Control':'no-store'}});
 }catch(error:any){
  console.error('[admin-support-status]',error instanceof Error?error.message:'unknown');
  return NextResponse.json({error:error?.issues?'Invalid request':'Unable to update support request'},{status:400});
 }
}
