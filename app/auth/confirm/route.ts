import type { EmailOtpType } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { provisionUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

function getPublicAppOrigin(request: NextRequest) {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (configured) {
    const url = new URL(configured);
    if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') {
      throw new Error('NEXT_PUBLIC_APP_URL must use HTTPS in production.');
    }
    return url.origin;
  }

  // Local-development fallback only. Production should always define NEXT_PUBLIC_APP_URL.
  return request.nextUrl.origin;
}

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get('token_hash');
  const type = request.nextUrl.searchParams.get('type') as EmailOtpType | null;
  const code = request.nextUrl.searchParams.get('code');
  const requestedNext = request.nextUrl.searchParams.get('next') || '/dashboard';
  const nextPath = requestedNext.startsWith('/') && !requestedNext.startsWith('//') ? requestedNext : '/dashboard';

  let appOrigin: string;
  try {
    appOrigin = getPublicAppOrigin(request);
  } catch (error) {
    console.error('[auth-confirm-origin]', error instanceof Error ? error.message : 'invalid public app URL');
    return NextResponse.json({ error: 'Authentication redirect is unavailable.' }, { status: 503 });
  }

  // Never build external redirects from Host/X-Forwarded-Host or the internal Hostinger
  // Node listener (for example 0.0.0.0:3000). Always use MANGLO's configured public origin.
  const redirectTo = new URL(nextPath, `${appOrigin}/`);

  const supabase = await createClient();

  // Custom SSR email-template flow using token_hash.
  if (tokenHash && type) {
    const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });

    if (!error && data.user) {
      try {
        await provisionUser(data.user);
        if (type !== 'recovery') redirectTo.searchParams.set('verified', '1');
        return NextResponse.redirect(redirectTo);
      } catch {
        // Authentication succeeded, but the local business profile could not be provisioned.
      }
    }
  }

  // PKCE/code flow used by Supabase's default confirmation email.
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      try {
        await provisionUser(data.user);
        redirectTo.searchParams.set('verified', '1');
        return NextResponse.redirect(redirectTo);
      } catch {
        // Authentication succeeded, but the local business profile could not be provisioned.
      }
    }
  }

  const failed = new URL('/auth?error=confirmation_failed', `${appOrigin}/`);
  return NextResponse.redirect(failed);
}
