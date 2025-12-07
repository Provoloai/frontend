#!/usr/bin/env node

/**
 * Dynamic Sitemap Generator for Provolo AI
 * Automatically generates sitemap.xml with current date
 * Run: node scripts/generate-sitemap.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

// Define your site's URLs with their priorities and change frequencies
const urls = [
  {
    loc: "https://www.provolo.org/",
    changefreq: "daily",
    priority: "1.0",
    image: {
      loc: "https://res.cloudinary.com/do89gqxmt/image/upload/v1759515929/provoloai_krrnqx.png",
      title: "Provolo AI - Upwork Profile Optimizer",
    },
  },
  {
    loc: "https://www.provolo.org/optimizer",
    changefreq: "daily",
    priority: "0.9",
  },
  {
    loc: "https://www.provolo.org/proposal",
    changefreq: "daily",
    priority: "0.9",
  },
  {
    loc: "https://www.provolo.org/learn",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    loc: "https://www.provolo.org/pricing",
    changefreq: "weekly",
    priority: "0.7",
  },
  {
    loc: "https://www.provolo.org/faq",
    changefreq: "weekly",
    priority: "0.6",
  },
  {
    loc: "https://www.provolo.org/login",
    changefreq: "monthly",
    priority: "0.2",
  },
  {
    loc: "https://www.provolo.org/signup",
    changefreq: "monthly",
    priority: "0.3",
  },
];

// Generate XML content
const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  urls.forEach(url => {
    xml += `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>`;

    if (url.image) {
      xml += `
    <image:image>
      <image:loc>${url.image.loc}</image:loc>
      <image:title>${url.image.title}</image:title>
    </image:image>`;
    }

    xml += `
  </url>`;
  });

  xml += `
</urlset>
`;

  return xml;
};

// Write sitemap to public folder
const outputPath = path.join(__dirname, "..", "public", "sitemap.xml");
const sitemapContent = generateSitemap();

fs.writeFileSync(outputPath, sitemapContent, "utf8");

console.log(`✅ Sitemap generated successfully at ${outputPath}`);
console.log(`📅 Last modified date: ${today}`);
console.log(`🔗 ${urls.length} URLs included`);
