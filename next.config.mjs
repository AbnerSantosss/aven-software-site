import { fileURLToPath } from 'node:url';
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  devIndicators: false,
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
};
export default nextConfig;
