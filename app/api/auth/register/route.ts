import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { provisionUser } from '@/lib/auth';
import { assertSameOrigin, cleanText } from '@/lib/security';
import { createClient } from '@/lib/supabase/server';

const RegisterSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(200),
  phone: z.string().regex(/^\d{10}$/),
  password: z.string().min(10).max(128),
});

export async function POST(req: NextRequest) {
  try {
    assertSameOrigin(req);
    const input = RegisterSchema.parse(await req.json());
    const email = input.email.trim().toLowerCase();
    const name = cleanText(input.name, 80);

    const existingProfile = await db.user.findFirst({
      where: { OR: [{ email }, { phone: input.phone }] },
      select: { id: true },
    });
    if (existingProfile) {
      return NextResponse.json({ error: 'An account already exists with those details.' }, { status: 409 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password: input.password,
      options: {
        data: { name, phone: input.phone },
      },
    });

    if (error || !data.user) {
      return NextResponse.json({ error: 'Unable to create account. Please check your details.' }, { status: 400 });
    }

    await provisionUser(data.user);

    return NextResponse.json({
      ok: true,
      confirmationRequired: !data.session,
    });
  } catch (error) {
    console.error('MANGLO registration error', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ error: 'Unable to create account.' }, { status: 400 });
  }
}
