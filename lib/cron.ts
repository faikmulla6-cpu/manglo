import type {NextRequest} from 'next/server';

export function cronAuthorized(req:NextRequest){
 const secret=process.env.CRON_SECRET?.trim();
 if(!secret)return false;
 return req.headers.get('authorization')===`Bearer ${secret}`;
}
