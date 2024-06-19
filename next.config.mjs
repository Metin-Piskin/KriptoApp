/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_KEY: process.env.API_KEY,
        API_KEY_NEWS: process.env.API_KEY_NEWS
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'coin-images.coingecko.com'
            },
            {
                protocol: 'https',
                hostname: '*'
            }
        ],
    },
};

export default nextConfig;
