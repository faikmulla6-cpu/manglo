import { NextRequest, NextResponse } from 'next/server';
import { destroySession } from '@/lib/auth';
import { assertSameOrigin } from '@/lib/security';

function appOrigin() {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configured) {
    try {
      const url = new URL(configured);
      if (url.protocol === 'https:' || url.hostname === 'localhost') {
        return url.origin;
      }
    } catch {
      // Fall back to the production origin below.
    }
  }
  return 'https://manglo.shop';
}

export async function POST(req: NextRequest) {
  try {
    assertSameOrigin(req);
    await destroySession();
    return NextResponse.redirect(new URL('/', appOrigin()), 303);
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
