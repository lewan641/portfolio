import type { NextConfig } from "next";

// Static export: `pnpm build` writes the whole site to `out/`,
// which can be hosted on Vercel, Cloudflare Pages, Netlify or GitHub Pages.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
