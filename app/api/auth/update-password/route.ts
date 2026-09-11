import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { assertSameOrigin } from '@/lib/security';
import { createClient } from '@/lib/supabase/server';

const Schema = z.object({ password: z.string().min(10).max(128) });

export async function POST(req: NextRequest) {
  try {
    assertSameOrigin(req);
    const { password } = Schema.parse(await req.json());
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      return NextResponse.json({ error: 'Your recovery session has expired. Request a new link.' }, { status: 401 });
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      return NextResponse.json({ error: 'Unable to update the password. Request a new recovery link.' }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Choose a password with at least 10 characters.' }, { status: 400 });
  }
}
