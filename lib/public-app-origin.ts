import type { NextRequest } from 'next/server';

const BLOCKED_PRODUCTION_HOSTS = new Set([
  '0.0.0.0',
  '127.0.0.1',
  'localhost',
  '::1',
]);

export function getPublicAppOrigin(request?: NextRequest) {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (configured) {
    const url = new URL(configured);

    if (process.env.NODE_ENV === 'production') {
      if (url.protocol !== 'https:') {
        throw new Error('NEXT_PUBLIC_APP_URL must use HTTPS in production.');
      }
      if (BLOCKED_PRODUCTION_HOSTS.has(url.hostname.toLowerCase())) {
        throw new Error('NEXT_PUBLIC_APP_URL must use MANGLO\'s public production hostname.');
      }
      if (url.username || url.password) {
        throw new Error('NEXT_PUBLIC_APP_URL must not contain credentials.');
      }
    }

    return url.origin;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_APP_URL is required in production.');
  }

  return request?.nextUrl.origin || 'http://localhost:3000';
}
