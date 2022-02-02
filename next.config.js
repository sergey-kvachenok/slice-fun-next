const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n,
    reactStrictMode: true,
    images: {
        domains: ['slice-fun-podcasts.s3.eu-west-1.amazonaws.com']
    }
}

module.exports = nextConfig
