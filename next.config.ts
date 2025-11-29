import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.md": {
        loaders: [{ loader: "raw-loader", options: {} }],
        as: "*.ts",
      },
    },
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      {
        protocol: "https",
        hostname: "shared.fastly.steamstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.itch.zone",
        pathname: "/**",
      },
    ],
  },
};

const nextIntlConfig = createNextIntlPlugin();

export default nextIntlConfig(nextConfig);
