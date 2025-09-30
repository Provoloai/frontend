const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

app.get('/scrape', async (req, res) => {
  const { url } = req.query;

  console.log('🔍 Attempting to scrape URL:', url);

  // Validate the URL format for Upwork freelancer profiles
  if (!url || !url.startsWith('https://www.upwork.com/freelancers/')) {
    console.error('❌ Invalid or unsupported Upwork profile URL provided.');
    return res.status(400).json({ error: 'Invalid or unsupported Upwork profile URL. Please provide a valid freelancer profile link.' });
  }

  let browser;

  try {
    // Launch Puppeteer with stealth mode and necessary arguments for headless operation
    browser = await puppeteer.launch({
      headless: 'new', // Use 'new' for Puppeteer v20+ for the new headless mode
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage', // Recommended for Docker environments
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // Use if issues with multi-process
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // Set a realistic user-agent to mimic a real browser
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Set a default timeout for navigation to prevent indefinite waits
    await page.setDefaultNavigationTimeout(60000); // 60 seconds

    console.log('🚀 Navigating to URL...');
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait for a few seconds to allow dynamic content to load and potential Cloudflare checks
    // A more robust solution might involve `page.waitForSelector` for a key element
    await new Promise(resolve => setTimeout(resolve, 5000)); // Increased wait time

    // Check for CAPTCHA or bot protection pages
    const isCaptchaPage = await page.evaluate(() => {
      const pageTitle = document.title.toLowerCase();
      const pageText = document.body.innerText.toLowerCase();
      return (
        pageTitle.includes('just a moment') ||
        pageText.includes('verify you are human') ||
        pageText.includes('security check') ||
        pageText.includes('checking your browser')
      );
    });

    if (isCaptchaPage) {
      console.warn('⚠️ Blocked by CAPTCHA or bot protection from Upwork. Retrying might be necessary or consider a proxy.');
      return res.status(403).json({ error: 'Blocked by CAPTCHA or bot protection from Upwork. The page requires human verification.' });
    }

    console.log('✅ Page loaded successfully. Beginning data extraction...');

    // Scrape all relevant profile content using page.evaluate
    const profileData = await page.evaluate(() => {
      // Helper function to safely extract text from a selector
      const extractText = (selector) =>
        document.querySelector(selector)?.innerText?.trim() || null;

      // Helper function to extract all texts from multiple elements
      const extractAllText = (selector) =>
        Array.from(document.querySelectorAll(selector))
          .map(el => el.innerText.trim())
          .filter(Boolean);

      // Helper to extract numerical values from text (e.g., "94% Job Success")
      const extractNumber = (text) => {
        const match = text ? text.match(/[\d.]+/g) : null;
        return match ? parseFloat(match[0]) : null;
      };

      // --- Basic Profile Information ---
      const name = extractText('h1.air3-font-header');
      const title = extractText('[data-test="headline"]');
      const hourlyRate = extractText('[data-test="rate"]');
      const location = extractText('[data-test="location"]');

      // --- Stats ---
      const jobSuccessScoreText = extractText('[data-test="job-success-score"]');
      const jobSuccessScore = jobSuccessScoreText ? extractNumber(jobSuccessScoreText) : null;

      const totalHoursText = extractText('[data-test="total-hours"]');
      const totalHours = totalHoursText ? extractNumber(totalHoursText.replace(/,/g, '')) : null; // Remove commas for parsing

      const jobsCompletedText = extractText('[data-test="jobs-completed"]');
      const jobsCompleted = jobsCompletedText ? extractNumber(jobsCompletedText) : null;

      // --- Description ---
      let description = null;
      const possibleDescSelectors = [
        '[data-test="profile-description"]',
        '[data-qa="description"]',
        '.up-line-clamp-v2', // Common class for truncated text
        '.air3-line-clamp.is-clamped .text-pre-line', // Another common pattern
        '.air3-line-clamp .text-pre-line',
        '.up-card-section p', // General paragraph in a card section
      ];

      for (let selector of possibleDescSelectors) {
        const el = document.querySelector(selector);
        if (el && el.innerText?.trim()) {
          description = el.innerText.trim();
          break;
        }
      }

      // --- Skills ---
      const skills = extractAllText('[data-test="skill-tag"]');

      // --- Work History & Feedback (More complex extraction) ---
      const workHistory = [];
      const jobElements = document.querySelectorAll('[data-test="past-contract"]');

      jobElements.forEach(jobEl => {
        const jobTitle = jobEl.querySelector('[data-test="contract-title"]')?.innerText?.trim() || null;
        const clientFeedback = jobEl.querySelector('[data-test="client-feedback"]')?.innerText?.trim() || null;
        const ratingText = jobEl.querySelector('[data-test="contract-rating"]')?.getAttribute('aria-label') || null;
        const rating = ratingText ? extractNumber(ratingText) : null; // e.g., "5.00 of 5 stars" -> 5.00

        const contractHoursText = jobEl.querySelector('[data-test="contract-hours"]')?.innerText?.trim() || null;
        const contractHours = contractHoursText ? extractNumber(contractHoursText.replace(/,/g, '')) : null;

        const contractDurationText = jobEl.querySelector('[data-test="contract-duration"]')?.innerText?.trim() || null;
        const contractDate = contractDurationText ? contractDurationText.split(' - ')[0] : null; // "Jul 2023 - Present" or "Jul 2023 - Aug 2023"

        workHistory.push({
          jobTitle,
          clientFeedback,
          rating,
          contractHours,
          contractDate
        });
      });

      // --- Testimonials (if present) ---
      const testimonials = [];
      const testimonialElements = document.querySelectorAll('.air3-card-section.air3-card-section-testimonial');

      testimonialElements.forEach(testimonialEl => {
        const testimonialText = testimonialEl.querySelector('.air3-line-clamp.is-clamped .text-pre-line')?.innerText?.trim() ||
                                testimonialEl.querySelector('.air3-line-clamp .text-pre-line')?.innerText?.trim() ||
                                null;
        const clientName = testimonialEl.querySelector('.air3-font-body-2.air3-font-bold')?.innerText?.trim() || null;
        const clientTitle = testimonialEl.querySelector('.air3-font-body-2:not(.air3-font-bold)')?.innerText?.trim() || null;

        if (testimonialText) {
          testimonials.push({
            text: testimonialText,
            clientName,
            clientTitle
          });
        }
      });


      return {
        name,
        title,
        hourlyRate,
        location,
        jobSuccessScore,
        totalHours,
        jobsCompleted,
        description,
        skills,
        workHistory,
        testimonials
      };
    });

    if (!profileData || !profileData.name) {
      console.warn('⚠️ No profile data found or name not extracted. The page structure might have changed or content is missing.');
      return res.status(404).json({ error: 'Could not extract profile data. The page structure might have changed, or content is missing.' });
    }

    console.log('✅ Data extraction complete. Sending response.');
    res.json({ profileData });

  } catch (err) {
    console.error('❌ Scraping failed due to an error:', err);
    res.status(500).json({ error: 'Scraping failed', details: err.message });
  } finally {
    // Ensure the browser is closed even if an error occurs
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
      console.log('Browser closed.');
    }
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Puppeteer scraper running at http://localhost:${PORT}`);
  console.log(`Try it: http://localhost:${PORT}/scrape?url=https://www.upwork.com/freelancers/~01b269e156cff4615c`);
});
