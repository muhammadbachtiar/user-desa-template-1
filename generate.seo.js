import fs from 'fs';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const domainUrl = process.env['VITE_DOMAIN_URL'] || 'https://default.site';
const sitemapUrl = `${domainUrl}/sitemap.xml`;

const robotsContent = `User-agent: *
Allow: /
Sitemap: ${sitemapUrl}
`.trim();

const lastmod = new Date().toISOString();
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
 xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
       http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url>
<loc>${domainUrl}</loc>
<lastmod>${lastmod}</lastmod>
<priority>1.00</priority>
</url>
</urlset>`.trim();

fs.writeFileSync('./robots.txt', robotsContent, 'utf8');
fs.writeFileSync('./sitemap.xml', sitemapContent, 'utf8');

console.log('robots.txt and sitemap.xml generated successfully!');