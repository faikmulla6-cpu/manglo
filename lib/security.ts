import crypto from 'crypto';
import { NextRequest } from 'next/server';

export function randomToken(bytes = 32) { return crypto.randomBytes(bytes).toString('base64url'); }
export function sha256(value: string) { return crypto.createHash('sha256').update(value).digest('hex'); }
export function safeEqual(a:string,b:string){ const x=Buffer.from(a); const y=Buffer.from(b); return x.length===y.length && crypto.timingSafeEqual(x,y); }

function configuredOrigin(){
 const base=process.env.NEXT_PUBLIC_APP_URL?.trim();
 if(!base){
  if(process.env.NODE_ENV==='production')throw new Error('Application origin is not configured');
  return null;
 }
 const parsed=new URL(base);
 if(process.env.NODE_ENV==='production'&&parsed.protocol!=='https:')throw new Error('Application origin must use HTTPS');
 return parsed.origin;
}

export function assertSameOrigin(req: NextRequest) {
 const expected=configuredOrigin();
 if(!expected)return;
 const origin=req.headers.get('origin');
 const referer=req.headers.get('referer');
 let supplied='';
 try{
  if(origin)supplied=new URL(origin).origin;
  else if(referer)supplied=new URL(referer).origin;
 }catch{throw new Error('Invalid request origin')}
 if(!supplied||supplied!==expected)throw new Error('Invalid request origin');
}

export function cleanText(s:string,max=500){ return s.replace(/[\u0000-\u001F\u007F]/g,'').trim().slice(0,max); }
