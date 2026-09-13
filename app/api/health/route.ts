import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks = {
    app: 'ok',
    database: 'unknown',
    supabaseUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabaseKeyConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
    cashfreeConfigured: Boolean(process.env.CASHFREE_CLIENT_ID && process.env.CASHFREE_CLIENT_SECRET),
    cashfreeWebhookSecretConfigured: Boolean(process.env.CASHFREE_WEBHOOK_SECRET),
    cashfreeMode: process.env.CASHFREE_MODE === 'production' ? 'production' : 'sandbox',
    cashfreeApiVersion: process.env.CASHFREE_API_VERSION || '2025-01-01',
    supplierConfigured: Boolean(process.env.SMM_API_URL && process.env.SMM_API_KEY),
    supplierRateCurrency: (process.env.SMM_RATE_CURRENCY || 'INR').toUpperCase(),
    aiConfigured: Boolean(process.env.GROQ_API_KEY),
    aiProvider: 'groq',
    aiModel: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
  } as const;

  let database: 'ok' | 'error' = 'ok';
  try {
    await db.$queryRaw`SELECT 1`;
  } catch (error) {
    database = 'error';
    console.error('MANGLO health database check failed', error instanceof Error ? error.message : 'unknown');
  }

  const body = { ...checks, database };
  const healthy = database === 'ok'
    && checks.supabaseUrlConfigured
    && checks.supabaseKeyConfigured
    && checks.cashfreeConfigured
    && checks.cashfreeMode === 'production'
    && checks.aiConfigured;

  return NextResponse.json(body, {
    status: healthy ? 200 : 503,
    headers: { 'Cache-Control': 'no-store' },
  });
}
