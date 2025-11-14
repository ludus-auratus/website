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
    remotePatterns: [{ protocol: "https", hostname: "placehold.co", pathname: "/**" }],
  },
};

const nextIntlConfig = createNextIntlPlugin();

export default nextIntlConfig(nextConfig);
