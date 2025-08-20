/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yesha-realty.vercel.app/',
  generateRobotsTxt: true, // ✅ also creates robots.txt
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
};
