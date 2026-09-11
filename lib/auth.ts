import type { User as SupabaseUser } from '@supabase/supabase-js';
import { db } from './db';
import { createClient } from './supabase/server';

function profileFromAuth(user: SupabaseUser) {
  const email = user.email?.trim().toLowerCase();
  if (!email) return null;

  const rawName = typeof user.user_metadata?.name === 'string' ? user.user_metadata.name.trim() : '';
  const rawPhone = typeof user.user_metadata?.phone === 'string' ? user.user_metadata.phone.trim() : '';
  const name = (rawName || email.split('@')[0] || 'MANGLO user').slice(0, 80);
  const phone = /^\d{10}$/.test(rawPhone) ? rawPhone : null;

  return { id: user.id, email, name, phone };
}

export async function provisionUser(user: SupabaseUser) {
  const profile = profileFromAuth(user);
  if (!profile) throw new Error('Authenticated user has no email address.');

  const existing = await db.user.findUnique({ where: { id: profile.id } });
  if (existing) {
    if (existing.email !== profile.email) {
      return db.user.update({ where: { id: profile.id }, data: { email: profile.email } });
    }
    return existing;
  }

  const emailOwner = await db.user.findUnique({ where: { email: profile.email } });
  if (emailOwner && emailOwner.id !== profile.id) {
    throw new Error('This email belongs to a legacy MANGLO account and requires migration.');
  }

  return db.user.create({ data: profile });
}

export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  try {
    return await provisionUser(data.user);
  } catch {
    return null;
  }
}

export async function destroySession() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
