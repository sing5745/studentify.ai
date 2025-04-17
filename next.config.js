/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  distDir: 'dist',
  // Disable webpack caching during development
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = false;
    }
    // Exclude Supabase functions from the build
    if (isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/node_modules/**', '**/supabase/functions/**'],
      };
    }
    return config;
  },
};

module.exports = nextConfig;