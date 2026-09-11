import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'Content-Security-Policy', value: `default-src 'self'; script-src 'self' 'unsafe-inline'${process.env.NODE_ENV==='development'?" 'unsafe-eval'":''} https://sdk.cashfree.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://sandbox.cashfree.com https://api.cashfree.com https://api.cheapestsmmpanels.com https://cheapestsmmpanels.com; frame-src https://payments.cashfree.com https://sandbox.cashfree.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://payments.cashfree.com; upgrade-insecure-requests`
        }
      ]
    }];
  }
};
export default nextConfig;
