/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["gold.pronetwork.cloud", "http://192.168.1.20", "192.168.1.20"], // اضافه کردن دامنه API شما
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
