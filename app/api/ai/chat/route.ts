import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {assertSameOrigin} from '@/lib/security';
import {OrderProposal,runMangloAi} from '@/lib/manglo-ai';

const inputSchema=z.object({conversationId:z.string().min(1).max(80).optional(),message:z.string().trim().min(1).max(2000)});

function titleFrom(text:string){const clean=text.replace(/\s+/g,' ').trim();return clean.length>58?`${clean.slice(0,57)}…`:clean;}
function proposalFrom(metadata:unknown):OrderProposal|null{
 if(!metadata||typeof metadata!=='object')return null;
 const value=(metadata as any).proposal;
 if(!value||typeof value!=='object'||typeof value.serviceDbId!=='string'||typeof value.chargePaise!=='number')return null;
 return value as OrderProposal;
}

export async function POST(req:NextRequest){
 try{
  assertSameOrigin(req);
  const user=await getUser();if(!user)return NextResponse.json({error:'Sign in required'},{status:401});
  if(!process.env.XAI_API_KEY)return NextResponse.json({error:'MANGLO AI is not configured yet.'},{status:503});
  const input=inputSchema.parse(await req.json());

  const since=new Date(Date.now()-60_000);
  const recent=await db.aiMessage.count({where:{createdAt:{gte:since},conversation:{userId:user.id}}});
  if(recent>=24)return NextResponse.json({error:'You’re moving fast. Please wait a moment before sending another AI message.'},{status:429});

  let conversation=input.conversationId?await db.aiConversation.findFirst({where:{id:input.conversationId,userId:user.id}}):null;
  if(input.conversationId&&!conversation)return NextResponse.json({error:'Conversation not found.'},{status:404});
  if(!conversation)conversation=await db.aiConversation.create({data:{userId:user.id,title:titleFrom(input.message)}});

  const previous=await db.aiMessage.findMany({where:{conversationId:conversation.id},orderBy:{createdAt:'desc'},take:28});
  const pendingProposal=previous.map(item=>proposalFrom(item.metadata)).find(Boolean)||null;

  await db.aiMessage.create({data:{conversationId:conversation.id,role:'user',content:input.message}});
  const history=[...previous.reverse().map(item=>({role:item.role,content:item.content})),{role:'user',content:input.message}];

  const ai=await runMangloAi({userId:user.id,userName:user.name,conversationId:conversation.id,history,pendingProposal});
  const assistant=await db.aiMessage.create({data:{conversationId:conversation.id,role:'assistant',content:ai.content,metadata:ai.artifacts as any}});
  await db.aiConversation.update({where:{id:conversation.id},data:{updatedAt:new Date()}});

  return NextResponse.json({ok:true,conversationId:conversation.id,title:conversation.title,message:{id:assistant.id,role:'assistant',content:assistant.content,metadata:assistant.metadata},action:ai.artifacts.executeProposal?{type:'place_order',proposal:ai.artifacts.executeProposal}:null});
 }catch(error){
  if(error instanceof z.ZodError)return NextResponse.json({error:'Please send a valid message.'},{status:400});
  const text=error instanceof Error?error.message:'unknown';
  console.error('MANGLO AI chat failed',text.replace(/Bearer\s+[A-Za-z0-9._-]+/g,'Bearer [redacted]'));
  if(text==='XAI_NOT_CONFIGURED')return NextResponse.json({error:'MANGLO AI is not configured yet.'},{status:503});
  if(text.startsWith('XAI_'))return NextResponse.json({error:'MANGLO AI is temporarily unavailable. Your wallet and orders were not changed.'},{status:503});
  return NextResponse.json({error:'MANGLO AI could not complete that request. Your wallet and orders were not changed.'},{status:500});
 }
}
