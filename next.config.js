const { withContentlayer } = require("next-contentlayer");
const withAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    formats: ["image/webp"],
  },
};

module.exports = withAnalyzer(withContentlayer(nextConfig));
