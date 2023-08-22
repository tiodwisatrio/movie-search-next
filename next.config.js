/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // fetch from tmdb api
        domains: ['image.tmdb.org'],
    }
}

module.exports = nextConfig
