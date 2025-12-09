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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "yt3.googleusercontent.com",
        pathname: "/**",
      },
      ...(process.env.NEXT_PUBLIC_ASSETS_URL
        ? [
            {
              protocol: new URL(process.env.NEXT_PUBLIC_ASSETS_URL).protocol.replace(":", "") as "http" | "https",
              hostname: new URL(process.env.NEXT_PUBLIC_ASSETS_URL).hostname,
              ...(new URL(process.env.NEXT_PUBLIC_ASSETS_URL).port && {
                port: new URL(process.env.NEXT_PUBLIC_ASSETS_URL).port,
              }),
              pathname: "/**",
            },
          ]
        : []),
    ],
  },
};

const nextIntlConfig = createNextIntlPlugin();

export default nextIntlConfig(nextConfig);
