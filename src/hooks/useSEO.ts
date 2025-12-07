import { useEffect } from "react";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

/**
 * Custom hook to manage SEO meta tags dynamically per page
 *
 * @example
 * useSEO({
 *   title: "Upwork Profile Optimizer - Provolo AI",
 *   description: "Optimize your Upwork profile with AI-powered copywriting...",
 *   keywords: "upwork profile, upwork optimizer, freelance tools"
 * });
 */
export const useSEO = ({
  title,
  description,
  keywords,
  ogImage = "https://res.cloudinary.com/do89gqxmt/image/upload/w_1200,h_630,c_fill/v1759515929/provoloai_krrnqx.png",
  ogType = "website",
  canonicalUrl,
  noindex = false,
}: SEOConfig) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (
      selector: string,
      content: string,
      attribute = "content"
    ) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attribute, content);
      } else {
        // Create meta tag if it doesn't exist
        element = document.createElement("meta");
        const [attr, value] =
          selector.match(/\[(.*?)=['"]?(.*?)['"]?\]/)?.slice(1, 3) || [];
        if (attr && value) {
          element.setAttribute(attr, value);
          element.setAttribute(attribute, content);
          document.head.appendChild(element);
        }
      }
    };

    // Update meta description
    updateMetaTag('meta[name="description"]', description);

    // Update keywords if provided
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', keywords);
    }

    // Update robots meta if noindex
    if (noindex) {
      updateMetaTag('meta[name="robots"]', "noindex, nofollow");
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (
        robotsMeta &&
        robotsMeta.getAttribute("content") === "noindex, nofollow"
      ) {
        robotsMeta.setAttribute(
          "content",
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        );
      }
    }

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:image"]', ogImage);
    updateMetaTag('meta[property="og:type"]', ogType);

    // Update Twitter Card tags
    updateMetaTag('meta[property="twitter:title"]', title);
    updateMetaTag('meta[property="twitter:description"]', description);
    updateMetaTag('meta[property="twitter:image"]', ogImage);

    // Update canonical URL if provided
    if (canonicalUrl) {
      let canonicalLink = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement;
      if (canonicalLink) {
        canonicalLink.href = canonicalUrl;
      } else {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        canonicalLink.href = canonicalUrl;
        document.head.appendChild(canonicalLink);
      }
    } else {
      // Set canonical to current URL
      const currentUrl = window.location.href.split("?")[0].split("#")[0];
      const canonicalLink = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement;
      if (canonicalLink) {
        canonicalLink.href = currentUrl;
      }
    }

    // Update OG URL
    const currentUrl =
      canonicalUrl || window.location.href.split("?")[0].split("#")[0];
    updateMetaTag('meta[property="og:url"]', currentUrl);
    updateMetaTag('meta[property="twitter:url"]', currentUrl);
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, noindex]);
};

/**
 * SEO configurations for common pages
 * Use these as defaults for consistency
 */
export const SEO_CONFIGS = {
  home: {
    title:
      "Provolo AI - Upwork Profile & Proposal Optimizer | Win More Freelance Jobs",
    description:
      "Provolo AI optimizes your Upwork profile and proposals with AI-powered copywriting. Improve your Upwork profile visibility, write winning Upwork proposals, and get more client interviews. Try free Upwork profile analysis and proposal generator.",
    keywords:
      "provolo ai, upwork profile optimizer, upwork proposal generator, upwork profiles, AI proposal writer, freelance profile tools, get more upwork clients, upwork job invites",
    canonicalUrl: "https://www.provolo.org/",
  },
  optimizer: {
    title:
      "Upwork Profile Optimizer - AI-Powered Profile Analysis | Provolo AI",
    description:
      "Get instant AI-powered analysis of your Upwork profile. Improve your overview, skills, portfolio, and copywriting to rank higher in Upwork search and attract more clients. Free profile optimization tool.",
    keywords:
      "upwork profile optimizer, optimize upwork profile, upwork profile analysis, upwork profile tips, upwork copywriting, improve upwork profile, upwork profile ranking",
    canonicalUrl: "https://www.provolo.org/optimizer",
  },
  proposal: {
    title:
      "AI Upwork Proposal Generator - Write Winning Proposals Fast | Provolo AI",
    description:
      "Generate personalized, high-converting Upwork proposals in seconds with AI. Get more client responses, save time, and win more freelance jobs with smart proposal templates and copywriting assistance.",
    keywords:
      "upwork proposal generator, upwork proposal writer, AI proposal tool, upwork cover letter, write upwork proposals, upwork proposal templates, winning proposals",
    canonicalUrl: "https://www.provolo.org/proposal",
  },
  learn: {
    title: "Upwork Tips & Tutorials - Learn to Win More Jobs | Provolo Learn",
    description:
      "Free Upwork tutorials, guides, and best practices. Learn how to optimize your profile, write better proposals, improve your JSS score, and get more client invitations on Upwork.",
    keywords:
      "upwork tips, upwork tutorials, upwork best practices, upwork guide, freelance tips, upwork success, upwork help, upwork advice",
    canonicalUrl: "https://www.provolo.org/learn",
  },
  pricing: {
    title: "Provolo AI Pricing - Free Profile Analysis & Affordable Plans",
    description:
      "Start free with Provolo AI. Get unlimited profile optimizations, proposal generation, and AI copywriting assistance. Transparent pricing, no hidden fees, cancel anytime.",
    keywords:
      "provolo pricing, upwork optimizer cost, free upwork tools, affordable freelance tools, provolo plans",
    canonicalUrl: "https://www.provolo.org/pricing",
  },
  faq: {
    title: "Frequently Asked Questions - Provolo AI Help Center",
    description:
      "Get answers to common questions about Provolo AI. Learn how to optimize your Upwork profile, generate proposals, improve your freelance success, and more.",
    keywords:
      "provolo faq, upwork optimizer help, provolo questions, upwork help, freelance tools faq",
    canonicalUrl: "https://www.provolo.org/faq",
  },
} as const;
