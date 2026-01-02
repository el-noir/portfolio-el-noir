import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  // Only use basePath when deploying to GitHub Pages without custom domain
  basePath: isGitHubPages && !process.env.CUSTOM_DOMAIN ? '/portfolio-el-noir' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
