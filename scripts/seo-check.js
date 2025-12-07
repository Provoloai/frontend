#!/usr/bin/env node

/**
 * SEO Validation Script for Provolo AI
 * Checks for common SEO issues and provides recommendations
 * Run: node scripts/seo-check.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

const log = {
  success: msg => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: msg => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: msg => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: msg => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
};

// Check if file exists and has content
const checkFile = (filePath, name) => {
  const fullPath = path.join(__dirname, "..", filePath);
  if (!fs.existsSync(fullPath)) {
    log.error(`${name} not found at ${filePath}`);
    return false;
  }
  const content = fs.readFileSync(fullPath, "utf8");
  if (!content || content.trim().length === 0) {
    log.error(`${name} is empty`);
    return false;
  }
  log.success(`${name} exists and has content`);
  return content;
};

// Validate sitemap.xml
const validateSitemap = () => {
  console.log("\n📄 Checking Sitemap...");
  const content = checkFile("public/sitemap.xml", "sitemap.xml");
  if (!content) return false;

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (content.includes(today) || content.includes(yesterday)) {
    log.success("Sitemap dates are current");
  } else {
    log.warning("Sitemap dates may be outdated. Run: pnpm run sitemap");
  }

  const urlCount = (content.match(/<loc>/g) || []).length;
  log.info(`Found ${urlCount} URLs in sitemap`);

  if (content.includes("xmlns:image")) {
    log.success("Image sitemap namespace included");
  } else {
    log.warning("Image sitemap namespace missing");
  }

  return true;
};

// Validate robots.txt
const validateRobots = () => {
  console.log("\n🤖 Checking Robots.txt...");
  const content = checkFile("public/robots.txt", "robots.txt");
  if (!content) return false;

  if (content.includes("Sitemap:")) {
    log.success("Sitemap URL declared in robots.txt");
  } else {
    log.error("Sitemap URL missing in robots.txt");
  }

  if (content.includes("User-agent:")) {
    log.success("User-agent directives found");
  }

  if (content.includes("Disallow:")) {
    log.info("Some paths are disallowed (this is normal for private pages)");
  }

  return true;
};

// Validate llms.txt
const validateLLMsTxt = () => {
  console.log("\n🤖 Checking llms.txt...");
  const content = checkFile("public/.well-known/llms.txt", "llms.txt");
  if (!content) return false;

  const requiredFields = ["site:", "project:", "owner:", "summary:"];
  const missingFields = requiredFields.filter(
    field => !content.includes(field)
  );

  if (missingFields.length === 0) {
    log.success("All required fields present in llms.txt");
  } else {
    log.error(`Missing fields in llms.txt: ${missingFields.join(", ")}`);
  }

  return true;
};

// Validate index.html meta tags
const validateIndexHTML = () => {
  console.log("\n🌐 Checking index.html Meta Tags...");
  const content = checkFile("index.html", "index.html");
  if (!content) return false;

  const checks = [
    { pattern: /<title>/, name: "Title tag" },
    { pattern: /name="description"/, name: "Meta description" },
    { pattern: /name="keywords"/, name: "Meta keywords" },
    { pattern: /property="og:title"/, name: "Open Graph title" },
    { pattern: /property="og:description"/, name: "Open Graph description" },
    { pattern: /property="og:image"/, name: "Open Graph image" },
    { pattern: /name="twitter:card"/, name: "Twitter card" },
    { pattern: /rel="canonical"/, name: "Canonical URL" },
    {
      pattern: /"@type":\s*"SoftwareApplication"/,
      name: "SoftwareApplication schema",
    },
    { pattern: /"@type":\s*"Organization"/, name: "Organization schema" },
    { pattern: /"@type":\s*"FAQPage"/, name: "FAQ schema" },
  ];

  checks.forEach(({ pattern, name }) => {
    if (pattern.test(content)) {
      log.success(name);
    } else {
      log.error(`${name} missing`);
    }
  });

  // Check for fake ratings
  if (content.includes("aggregateRating") || content.includes("ratingValue")) {
    log.error("Fake aggregate ratings found! This will hurt SEO.");
  } else {
    log.success("No fake ratings (good!)");
  }

  return true;
};

// Validate Vercel configuration
const validateVercel = () => {
  console.log("\n⚡ Checking Vercel Configuration...");
  const content = checkFile("vercel.json", "vercel.json");
  if (!content) return false;

  try {
    const config = JSON.parse(content);

    if (config.headers && Array.isArray(config.headers)) {
      log.success(`${config.headers.length} header rules configured`);
    } else {
      log.warning("No custom headers configured");
    }

    if (config.redirects && Array.isArray(config.redirects)) {
      log.success(`${config.redirects.length} redirect rules configured`);
    } else {
      log.warning("No redirects configured (consider www redirect)");
    }

    if (config.rewrites && Array.isArray(config.rewrites)) {
      log.success(`${config.rewrites.length} rewrite rules configured`);
    }

    return true;
  } catch {
    log.error("Invalid JSON in vercel.json");
    return false;
  }
};

// Check for SEO hook implementation
const checkSEOHook = () => {
  console.log("\n🔧 Checking SEO Hook Implementation...");
  const hookExists = checkFile("src/hooks/useSEO.ts", "useSEO hook");
  if (!hookExists) return false;

  // Check if hook is actually being used
  const pagesDir = path.join(__dirname, "..", "src", "pages");
  if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir, { recursive: true });
    const tsxFiles = files.filter(
      f => typeof f === "string" && f.endsWith(".tsx")
    );

    let usageCount = 0;
    tsxFiles.forEach(file => {
      const content = fs.readFileSync(path.join(pagesDir, file), "utf8");
      if (content.includes("useSEO")) {
        usageCount++;
      }
    });

    if (usageCount > 0) {
      log.success(`useSEO hook used in ${usageCount} pages`);
    } else {
      log.warning("useSEO hook exists but not used in any pages yet");
    }
  }

  return true;
};

// Main validation function
const runSEOCheck = () => {
  console.log("\n" + "=".repeat(50));
  console.log("🔍 Provolo AI SEO Validation Report");
  console.log("=".repeat(50));

  const results = {
    sitemap: validateSitemap(),
    robots: validateRobots(),
    llms: validateLLMsTxt(),
    html: validateIndexHTML(),
    vercel: validateVercel(),
    hook: checkSEOHook(),
  };

  console.log("\n" + "=".repeat(50));
  console.log("📊 Summary");
  console.log("=".repeat(50));

  const passed = Object.values(results).filter(Boolean).length;
  const total = Object.keys(results).length;

  if (passed === total) {
    log.success(`All ${total} checks passed! 🎉`);
  } else {
    log.warning(`${passed}/${total} checks passed`);
  }

  console.log("\n📚 Next Steps:");
  console.log("1. Run: pnpm run sitemap (to update sitemap)");
  console.log("2. Submit sitemap to Google Search Console");
  console.log("3. Use useSEO hook in all page components");
  console.log("4. Create blog content under /learn");
  console.log("5. Test site: https://pagespeed.web.dev/");
  console.log("\n");
};

// Run the check
runSEOCheck();
