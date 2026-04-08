/** @type {import('next').NextConfig} */

const withBundleAnalyzer = process.env.ANALYZE === "true"
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ? require("@next/bundle-analyzer")({ enabled: true })
  : (config) => config;

const nextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // Force Next.js/Turbopack to compile these packages through its own pipeline
  // so they share the same React instance — fixes ReactCurrentBatchConfig crash
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.techrupt.me" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://plausible.io",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://res.cloudinary.com https://cdn.techrupt.me",
              "connect-src 'self' https://plausible.io https://api.beehiiv.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
