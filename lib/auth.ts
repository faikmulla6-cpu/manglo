import { cookies } from 'next/headers';
import { db } from './db';
import { randomToken, sha256 } from './security';
const COOKIE='manglo_session';
export async function createSession(userId:string){
  const raw=randomToken(48); const pepper=process.env.SESSION_PEPPER || '';
  if(process.env.NODE_ENV==='production'&&pepper.length<32)throw new Error('SESSION_PEPPER must be at least 32 characters');
  const tokenHash=sha256(raw+pepper); const expiresAt=new Date(Date.now()+30*24*3600_000);
  await db.session.create({data:{userId,tokenHash,expiresAt}});
  const c=await cookies(); c.set(COOKIE,raw,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',expires:expiresAt});
}
export async function destroySession(){ const c=await cookies(); const raw=c.get(COOKIE)?.value; if(raw){await db.session.deleteMany({where:{tokenHash:sha256(raw+(process.env.SESSION_PEPPER||''))}});} c.delete(COOKIE); }
export async function getUser(){ const c=await cookies(); const raw=c.get(COOKIE)?.value; if(!raw)return null; const s=await db.session.findUnique({where:{tokenHash:sha256(raw+(process.env.SESSION_PEPPER||''))},include:{user:true}}); if(!s||s.expiresAt<new Date())return null; return s.user; }
