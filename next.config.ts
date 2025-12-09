import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

let apiRemotePattern = undefined;

if (apiUrl) {
  const url = new URL(apiUrl);
  apiRemotePattern = {
    protocol: url.protocol.replace(":", "") as "http" | "https",
    hostname: url.hostname,
    port: url.port || undefined,
    pathname: "/**",
  };
}

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
      { protocol: "https", hostname: "shared.fastly.steamstatic.com", pathname: "/**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "img.itch.zone", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "yt3.googleusercontent.com", pathname: "/**" },
      ...(apiRemotePattern ? [apiRemotePattern] : []),
    ],
  },
};

const nextIntlConfig = createNextIntlPlugin();

export default nextIntlConfig(nextConfig);
