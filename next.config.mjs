/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['dl.airtable.com', 'ui-avatars.com'],
    unoptimized: true,
  },
}

export default nextConfig
