// Generates public/sitemap.xml at build time (wired via the "prebuild" npm
// script, which npm runs automatically right before "build" — no vercel.json
// change needed). Plain Node/CommonJS so it can run with zero extra deps.

const fs = require('fs');
const path = require('path');
const { allProducts } = require('../src/data/products');

const SITE_URL = (process.env.REACT_APP_SITE_URL || 'https://www.thetrinketbloom.shop').replace(/\/$/, '');

const staticRoutes = [
  { path: '/', changefreq: 'weekly' },
  { path: '/about', changefreq: 'monthly' },
  { path: '/contact', changefreq: 'monthly' },
];

const productRoutes = allProducts.map((product) => ({
  path: `/product/${product.slug}`,
  changefreq: 'monthly',
}));

const allRoutes = [...staticRoutes, ...productRoutes];
const today = new Date().toISOString().split('T')[0];

const urlEntries = allRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
  </url>`
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log(`sitemap.xml written with ${allRoutes.length} URLs -> ${outputPath}`);
