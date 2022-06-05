/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/projects/:projectId',
        destination: '/projects/:projectId/tasks',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
