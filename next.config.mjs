/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["gold.pronetwork.cloud"], // اضافه کردن دامنه API شما
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
