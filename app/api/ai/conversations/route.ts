import {NextRequest,NextResponse} from 'next/server';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {assertSameOrigin} from '@/lib/security';

export async function GET(req:NextRequest){
 const user=await getUser();if(!user)return NextResponse.json({error:'Sign in required'},{status:401});
 const id=req.nextUrl.searchParams.get('id');
 if(id){
  const conversation=await db.aiConversation.findFirst({where:{id,userId:user.id},include:{messages:{orderBy:{createdAt:'asc'},take:120}}});
  if(!conversation)return NextResponse.json({error:'Conversation not found.'},{status:404});
  return NextResponse.json({conversation:{id:conversation.id,title:conversation.title,updatedAt:conversation.updatedAt.toISOString()},messages:conversation.messages.map(message=>({id:message.id,role:message.role,content:message.content,metadata:message.metadata,createdAt:message.createdAt.toISOString()}))});
 }
 const rows=await db.aiConversation.findMany({where:{userId:user.id},orderBy:{updatedAt:'desc'},take:30,select:{id:true,title:true,updatedAt:true,_count:{select:{messages:true}}}});
 return NextResponse.json({conversations:rows.map(row=>({id:row.id,title:row.title,updatedAt:row.updatedAt.toISOString(),messageCount:row._count.messages}))});
}

export async function DELETE(req:NextRequest){
 try{
  assertSameOrigin(req);
  const user=await getUser();if(!user)return NextResponse.json({error:'Sign in required'},{status:401});
  const id=req.nextUrl.searchParams.get('id');if(!id)return NextResponse.json({error:'Conversation id required.'},{status:400});
  const deleted=await db.aiConversation.deleteMany({where:{id,userId:user.id}});
  if(!deleted.count)return NextResponse.json({error:'Conversation not found.'},{status:404});
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:'Could not delete conversation.'},{status:500});}
}
