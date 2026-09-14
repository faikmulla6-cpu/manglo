import type {NextRequest} from 'next/server';
import {safeEqual} from './security';

export function cronAuthorized(req:NextRequest){
 const secret=process.env.CRON_SECRET?.trim()||'';
 if(secret.length<32)return false;
 const authorization=req.headers.get('authorization')||'';
 const expected=`Bearer ${secret}`;
 return safeEqual(authorization,expected);
}
