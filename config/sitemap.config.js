/** @type {import('next-sitemap').IConfig} */
module.exports = {
    distDir: 'docs',
    siteUrl: process.env.SITE_URL || 'https://batazor.ru',
    generateRobotsTxt: true,
    // optional
    robotsTxtOptions: {
        additionalSitemaps: [],
    },
}
