import crypto from 'crypto';
import { NextRequest } from 'next/server';

export function randomToken(bytes = 32) { return crypto.randomBytes(bytes).toString('base64url'); }
export function sha256(value: string) { return crypto.createHash('sha256').update(value).digest('hex'); }
export function safeEqual(a:string,b:string){ const x=Buffer.from(a); const y=Buffer.from(b); return x.length===y.length && crypto.timingSafeEqual(x,y); }
export function assertSameOrigin(req: NextRequest) {
  const origin = req.headers.get('origin');
  const base = process.env.NEXT_PUBLIC_APP_URL;
  if (origin && base && new URL(origin).origin !== new URL(base).origin) throw new Error('Invalid origin');
}
export function cleanText(s:string,max=500){ return s.replace(/[\u0000-\u001F\u007F]/g,'').trim().slice(0,max); }
