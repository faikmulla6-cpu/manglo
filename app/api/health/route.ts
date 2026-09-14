import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {adminConfigured} from '@/lib/admin';
import {catalogFreshAfter} from '@/lib/catalog-freshness';
import {getPublicAppOrigin} from '@/lib/public-app-origin';

export const dynamic = 'force-dynamic';

function productionConfigReady(){
 let publicOriginReady=false;
 try{publicOriginReady=Boolean(getPublicAppOrigin())}catch{}
 return Boolean(
  publicOriginReady&&
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
 let databaseReady=true,catalogReady=false;
 try{
  await db.$queryRaw`SELECT 1`;
  const freshService=await db.service.findFirst({
   where:{active:true,operatorDisabled:false,lastSyncedAt:{gte:catalogFreshAfter()}},
   select:{id:true},
  });
  catalogReady=Boolean(freshService);
 }catch(error){
  databaseReady=false;
  console.error('MANGLO health database check failed', error instanceof Error ? error.message : 'unknown');
 }
 const ok=databaseReady&&catalogReady&&productionConfigReady();
 return NextResponse.json({ok,status:ok?'ready':'unavailable'}, {
  status:ok?200:503,
  headers:{'Cache-Control':'no-store, max-age=0','X-Robots-Tag':'noindex, nofollow'},
 });
}
