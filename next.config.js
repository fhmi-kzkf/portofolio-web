/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { unoptimized: true },
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
