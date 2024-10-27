/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrnpictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', '127.0.0.1', 'storage.googleapis.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com/__/auth/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
