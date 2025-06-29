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
        destination: 'https://app.robotcall.uz/api/:path*',  
      },
    ]
  },
}

export default nextConfig
