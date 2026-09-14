import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { assertPasswordNotCompromised, CompromisedPasswordError, PasswordSecurityUnavailableError } from '@/lib/password-security';
import { assertSameOrigin } from '@/lib/security';
import { createClient } from '@/lib/supabase/server';

const Schema = z.object({ password: z.string().min(12).max(128) });

export async function POST(req: NextRequest) {
  try {
    assertSameOrigin(req);
    const { password } = Schema.parse(await req.json());
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      return NextResponse.json({ error: 'Your recovery session has expired. Request a new link.' }, { status: 401 });
    }

    await assertPasswordNotCompromised(password);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      return NextResponse.json({ error: 'Unable to update the password. Request a new recovery link.' }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof CompromisedPasswordError) return NextResponse.json({ error: error.message }, { status: 400 });
    if (error instanceof PasswordSecurityUnavailableError) return NextResponse.json({ error: error.message }, { status: 503 });
    if (error instanceof z.ZodError) return NextResponse.json({ error: 'Choose a password with at least 12 characters.' }, { status: 400 });
    return NextResponse.json({ error: 'Unable to update the password securely. Please request a new recovery link and try again.' }, { status: 400 });
  }
}
