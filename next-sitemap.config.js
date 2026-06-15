/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.bonnmed.com',
  generateRobotsTxt: true,
  outDir: 'public',
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,

  additionalPaths: async () => {
    const paths = [
      '/',
      '/about',
      '/services',
      '/registration',
      '/contact',
      '/covix-care',
    ];

    return paths.map((path) => ({
      loc: path,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
