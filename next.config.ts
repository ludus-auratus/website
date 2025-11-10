import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};

const nextIntlConfig = createNextIntlPlugin();

export default nextIntlConfig(nextConfig);
