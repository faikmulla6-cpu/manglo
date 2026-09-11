import type { EmailOtpType } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { provisionUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get('token_hash');
  const type = request.nextUrl.searchParams.get('type') as EmailOtpType | null;
  const requestedNext = request.nextUrl.searchParams.get('next') || '/dashboard';
  const nextPath = requestedNext.startsWith('/') && !requestedNext.startsWith('//') ? requestedNext : '/dashboard';

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = nextPath;
  redirectTo.search = '';

  if (!tokenHash || !type) {
    const failed = request.nextUrl.clone();
    failed.pathname = '/auth';
    failed.search = '?error=invalid_confirmation';
    return NextResponse.redirect(failed);
  }

  const supabase = await createClient();
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

  const failed = request.nextUrl.clone();
  failed.pathname = '/auth';
  failed.search = '?error=confirmation_failed';
  return NextResponse.redirect(failed);
}
