/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',                  
        destination: 'http://185.8.212.114:8987/api/:path*',  
      },
    ]
  },
}

export default nextConfig
