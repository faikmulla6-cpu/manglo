import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { provisionUser } from '@/lib/auth';
import { assertSameOrigin } from '@/lib/security';
import { createClient } from '@/lib/supabase/server';

const LoginSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(1).max(128),
});

export async function POST(req: NextRequest) {
  try {
    assertSameOrigin(req);
    const input = LoginSchema.parse(await req.json());
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email.trim().toLowerCase(),
      password: input.password,
    });

    if (error || !data.user) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
    }

    await provisionUser(data.user);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('MANGLO login error', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ error: 'Unable to log in.' }, { status: 400 });
  }
}
