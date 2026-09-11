import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks = {
    app: 'ok',
    database: 'unknown',
    supabaseUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabaseKeyConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
  } as const;

  let database: 'ok' | 'error' = 'ok';
  try {
    await db.$queryRaw`SELECT 1`;
  } catch (error) {
    database = 'error';
    console.error('MANGLO health database check failed', error instanceof Error ? error.message : 'unknown');
  }

  const body = { ...checks, database };
  return NextResponse.json(body, {
    status: database === 'ok' && checks.supabaseUrlConfigured && checks.supabaseKeyConfigured ? 200 : 503,
    headers: { 'Cache-Control': 'no-store' },
  });
}
