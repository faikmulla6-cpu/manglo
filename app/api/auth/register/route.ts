import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { provisionUser } from '@/lib/auth';
import { claimReferralForUser } from '@/lib/referrals';
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
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin).replace(/\/$/, '');
    const referralCode=req.cookies.get('manglo_referral')?.value;

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
        emailRedirectTo: `${appUrl}/auth/confirm`,
      },
    });

    if (error || !data.user) {
      return NextResponse.json({ error: 'Unable to create account. Please check your details.' }, { status: 400 });
    }

    const profile=await provisionUser(data.user);
    if(referralCode)await claimReferralForUser(profile.id,referralCode).catch(error=>console.warn('[referral-attribution]',error instanceof Error?error.message:'failed'));

    const response=NextResponse.json({
      ok: true,
      confirmationRequired: !data.session,
    });
    if(referralCode)response.cookies.set('manglo_referral','',{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:0});
    return response;
  } catch (error) {
    console.error('MANGLO registration error', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ error: 'Unable to create account.' }, { status: 400 });
  }
}
