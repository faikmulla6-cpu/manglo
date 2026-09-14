import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPublicAppOrigin } from '@/lib/public-app-origin';
import { assertSameOrigin } from '@/lib/security';
import { createClient } from '@/lib/supabase/server';

const Schema = z.object({ email: z.string().email().max(200) });

export async function POST(req: NextRequest) {
  try {
    assertSameOrigin(req);
    const { email } = Schema.parse(await req.json());
    const supabase = await createClient();
    const appUrl = getPublicAppOrigin(req);

    // Do not reveal whether an email exists. Supabase also applies auth rate limits.
    await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${appUrl}/auth/update-password`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Keep the response indistinguishable to reduce account-enumeration risk.
    console.error('[password-recovery-request]', error instanceof Error ? error.message : 'request failed');
    return NextResponse.json({ ok: true });
  }
}
