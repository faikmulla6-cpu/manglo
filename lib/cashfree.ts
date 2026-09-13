import crypto from 'crypto';

const mode = process.env.CASHFREE_MODE === 'production' ? 'production' : 'sandbox';
const base = mode === 'production' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';
const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://manglo.shop').replace(/\/$/, '');
const apiVersion = process.env.CASHFREE_API_VERSION || '2025-01-01';

function credentials() {
  const clientId = process.env.CASHFREE_CLIENT_ID?.trim() || '';
  const secret = process.env.CASHFREE_CLIENT_SECRET?.trim() || '';
  if (!clientId || !secret) throw new Error('Cashfree is not configured');
  return { clientId, secret };
}

function headers(idempotencyKey?: string) {
  const { clientId, secret } = credentials();
  const value: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-client-id': clientId,
    'x-client-secret': secret,
    'x-api-version': apiVersion,
  };
  if (idempotencyKey) value['x-idempotency-key'] = idempotencyKey;
  return value;
}

async function cashfreeFetch(path: string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    return await fetch(`${base}${path}`, { ...init, signal: controller.signal, cache: 'no-store' });
  } finally {
    clearTimeout(timeout);
  }
}

export async function createCashfreeOrder(input: {
  orderId: string;
  amountPaise: number;
  userId: string;
  name: string;
  email: string;
  phone: string;
}) {
  const res = await cashfreeFetch('/orders', {
    method: 'POST',
    headers: headers(input.orderId),
    body: JSON.stringify({
      order_id: input.orderId,
      order_amount: input.amountPaise / 100,
      order_currency: 'INR',
      customer_details: {
        customer_id: input.userId,
        customer_name: input.name,
        customer_email: input.email,
        customer_phone: input.phone,
      },
      order_meta: {
        return_url: `${appUrl}/dashboard?payment=return&order_id={order_id}`,
        notify_url: `${appUrl}/api/payments/webhook`,
      },
      order_note: 'MANGLO wallet top-up',
    }),
  });

  if (!res.ok) {
    const detail = (await res.text()).slice(0, 500);
    throw new Error(`Cashfree create order failed: ${res.status} ${detail}`);
  }

  const data = await res.json();
  if (!data?.payment_session_id) throw new Error('Cashfree did not return a payment session');
  return data;
}

export async function getCashfreeOrder(orderId: string) {
  const response = await cashfreeFetch(`/orders/${encodeURIComponent(orderId)}`, { headers: headers() });
  if (!response.ok) throw new Error(`Cashfree verify failed: ${response.status}`);
  return response.json();
}

export async function getCashfreeOrderPayments(orderId: string) {
  const response = await cashfreeFetch(`/orders/${encodeURIComponent(orderId)}/payments`, { headers: headers() });
  if (!response.ok) throw new Error(`Cashfree payment-attempt lookup failed: ${response.status}`);
  const data = await response.json();
  return Array.isArray(data) ? data as Record<string, unknown>[] : [];
}

function signatureMatches(secret: string, raw: string, timestamp: string, signature: string) {
  const expected = crypto.createHmac('sha256', secret).update(timestamp + raw).digest('base64');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function verifyCashfreeWebhook(raw: string, timestamp: string, signature: string) {
  if (!raw || !timestamp || !signature) return false;
  const secrets = [
    process.env.CASHFREE_CLIENT_SECRET?.trim(),
    process.env.CASHFREE_WEBHOOK_SECRET?.trim(),
  ].filter((value): value is string => Boolean(value));
  return [...new Set(secrets)].some(secret => signatureMatches(secret, raw, timestamp, signature));
}

export const cashfreeMode = mode;
