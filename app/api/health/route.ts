import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {adminConfigured} from '@/lib/admin';

export const dynamic = 'force-dynamic';

function productionConfigReady(){
 const appUrl=process.env.NEXT_PUBLIC_APP_URL?.trim()||'';
 let secureOrigin=false;
 try{secureOrigin=new URL(appUrl).protocol==='https:'}catch{}
 return Boolean(
  secureOrigin&&
  process.env.NEXT_PUBLIC_SUPABASE_URL&&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY&&
  process.env.CASHFREE_CLIENT_ID&&
  process.env.CASHFREE_CLIENT_SECRET&&
  process.env.CASHFREE_WEBHOOK_SECRET&&
  process.env.CASHFREE_MODE==='production'&&
  process.env.SMM_API_URL&&
  process.env.SMM_API_KEY&&
  (process.env.CRON_SECRET?.trim().length||0)>=32&&
  adminConfigured()
 );
}

export async function GET() {
 let databaseReady=true;
 try{
  await db.$queryRaw`SELECT 1`;
 }catch(error){
  databaseReady=false;
  console.error('MANGLO health database check failed', error instanceof Error ? error.message : 'unknown');
 }
 const ok=databaseReady&&productionConfigReady();
 return NextResponse.json({ok,status:ok?'ready':'unavailable'}, {
  status:ok?200:503,
  headers:{'Cache-Control':'no-store, max-age=0','X-Robots-Tag':'noindex, nofollow'},
 });
}
