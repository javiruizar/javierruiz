import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // www → dominio raíz (canónico). En Vercel conviene configurarlo también en Domains.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.javierruiz.org" }],
        destination: "https://javierruiz.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
