import {NextRequest} from 'next/server';
import {getUser} from './auth';
import {isAdminEmail} from './admin';
import {assertSameOrigin} from './security';
import {db} from './db';

export async function requireAdminApi(req:NextRequest){
 assertSameOrigin(req);
 const user=await getUser();
 if(!user||!isAdminEmail(user.email))return null;
 return user;
}

export async function writeAdminAudit(input:{adminEmail:string;action:string;entityType:string;entityId:string;before?:unknown;after?:unknown}){
 await db.adminAuditLog.create({data:{
  adminEmail:input.adminEmail.trim().toLowerCase(),
  action:input.action,
  entityType:input.entityType,
  entityId:input.entityId,
  before:input.before as any,
  after:input.after as any,
 }});
}
