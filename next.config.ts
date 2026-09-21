import type { NextConfig } from "next";

/**
 * Static export — output goes to `out/` and can be hosted on GitHub Pages,
 * Netlify, Cloudflare Pages or any static host.
 *
 * GitHub Pages project site (https://<user>.github.io/<repo>/):
 *   NEXT_PUBLIC_BASE_PATH=/<repo> npm run build
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
