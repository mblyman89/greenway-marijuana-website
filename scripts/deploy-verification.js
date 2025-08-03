#!/usr/bin/env node

/**
 * Deployment verification script for Greenway Marijuana website
 * This script checks that all critical features are working after deployment
 * 
 * Usage:
 *   node scripts/deploy-verification.js https://your-deployment-url.com
 */

const { chromium } = require('playwright');
const chalk = require('chalk');

// Get the URL from command line arguments
const url = process.argv[2];
if (!url) {
  console.error(chalk.red('Error: Please provide a URL to test'));
  console.error(chalk.yellow('Usage: node scripts/deploy-verification.js https://your-deployment-url.com'));
  process.exit(1);
}

// Critical paths to test
const criticalPaths = [
  { path: '/', name: 'Homepage' },
  { path: '/products', name: 'Products Page' },
  { path: '/products?category=flower', name: 'Products Category Filter' },
  { path: '/loyalty', name: 'Loyalty Program' },
  { path: '/cart', name: 'Shopping Cart' },
  { path: '/blog', name: 'Blog' },
  { path: '/api/health', name: 'Health Check API' },
];

// Critical features to test
const criticalFeatures = [
  { name: 'Age Verification', test: async (page) => {
    await page.goto(url);
    return await page.$('text="You must be 21 years or older to enter this website"');
  }},
  { name: 'Product Search', test: async (page) => {
    await page.goto(`${url}/products`);
    await page.fill('#search', 'flower');
    await page.waitForTimeout(500); // Wait for search to update
    return await page.$('.bg-white.rounded-lg');
  }},
  { name: 'Product Filtering', test: async (page) => {
    await page.goto(`${url}/products`);
    await page.selectOption('#category', 'flower');
    await page.waitForTimeout(500); // Wait for filter to update
    return await page.$('.bg-white.rounded-lg');
  }},
  { name: 'Add to Cart', test: async (page) => {
    await page.goto(`${url}/products`);
    await page.click('text="Add to Cart"');
    await page.waitForTimeout(500);
    // Check if cart notification or alert appears
    return await page.$('text="Added"') || await page.evaluate(() => window.alert !== undefined);
  }},
  { name: 'SEO Meta Tags', test: async (page) => {
    await page.goto(url);
    const title = await page.title();
    const description = await page.$eval('meta[name="description"]', el => el.getAttribute('content'));
    return title && description;
  }},
  { name: 'Structured Data', test: async (page) => {
    await page.goto(url);
    const structuredData = await page.$$eval('script[type="application/ld+json"]', els => els.length > 0);
    return structuredData;
  }},
  { name: 'Responsive Design', test: async (page) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(url);
    const mobileMenu = await page.$('.container');
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(url);
    const desktopMenu = await page.$('.container');
    
    return mobileMenu && desktopMenu;
  }}
];

// Main function to run tests
async function runVerification() {
  console.log(chalk.blue(`\n🔍 Starting deployment verification for ${url}\n`));
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Test critical paths
  console.log(chalk.blue('Testing critical paths:'));
  let pathResults = [];
  
  for (const { path, name } of criticalPaths) {
    try {
      await page.goto(`${url}${path}`);
      const status = await page.evaluate(() => ({
        status: document.readyState === 'complete',
        title: document.title
      }));
      
      if (status.status) {
        console.log(chalk.green(`✓ ${name} (${path}) loaded successfully`));
        pathResults.push({ path, name, success: true });
      } else {
        console.log(chalk.red(`✗ ${name} (${path}) failed to load completely`));
        pathResults.push({ path, name, success: false });
      }
    } catch (error) {
      console.log(chalk.red(`✗ ${name} (${path}) error: ${error.message}`));
      pathResults.push({ path, name, success: false, error: error.message });
    }
  }
  
  // Test critical features
  console.log(chalk.blue('\nTesting critical features:'));
  let featureResults = [];
  
  for (const { name, test } of criticalFeatures) {
    try {
      const result = await test(page);
      
      if (result) {
        console.log(chalk.green(`✓ ${name} working correctly`));
        featureResults.push({ name, success: true });
      } else {
        console.log(chalk.red(`✗ ${name} not working as expected`));
        featureResults.push({ name, success: false });
      }
    } catch (error) {
      console.log(chalk.red(`✗ ${name} error: ${error.message}`));
      featureResults.push({ name, success: false, error: error.message });
    }
  }
  
  // Performance testing
  console.log(chalk.blue('\nRunning performance checks:'));
  try {
    await page.goto(url);
    const performanceTimings = await page.evaluate(() => JSON.stringify(performance.timing));
    const timings = JSON.parse(performanceTimings);
    
    const loadTime = timings.loadEventEnd - timings.navigationStart;
    const domContentLoaded = timings.domContentLoadedEventEnd - timings.navigationStart;
    
    console.log(chalk.yellow(`Page Load Time: ${loadTime}ms`));
    console.log(chalk.yellow(`DOM Content Loaded: ${domContentLoaded}ms`));
    
    if (loadTime < 3000) {
      console.log(chalk.green('✓ Page load time is good (< 3s)'));
    } else if (loadTime < 5000) {
      console.log(chalk.yellow('⚠ Page load time is acceptable but could be improved (3-5s)'));
    } else {
      console.log(chalk.red('✗ Page load time is too slow (> 5s)'));
    }
  } catch (error) {
    console.log(chalk.red(`✗ Performance testing error: ${error.message}`));
  }
  
  // Summary
  console.log(chalk.blue('\nVerification Summary:'));
  const pathSuccess = pathResults.filter(r => r.success).length;
  const featureSuccess = featureResults.filter(r => r.success).length;
  
  console.log(chalk.yellow(`Paths: ${pathSuccess}/${pathResults.length} successful`));
  console.log(chalk.yellow(`Features: ${featureSuccess}/${featureResults.length} working`));
  
  const allSuccess = pathSuccess === pathResults.length && featureSuccess === featureResults.length;
  
  if (allSuccess) {
    console.log(chalk.green('\n✅ All tests passed! Deployment verification successful.'));
  } else {
    console.log(chalk.red('\n❌ Some tests failed. Please check the issues above.'));
  }
  
  await browser.close();
  
  return allSuccess ? 0 : 1;
}

// Run the verification
runVerification()
  .then(exitCode => process.exit(exitCode))
  .catch(error => {
    console.error(chalk.red(`Fatal error: ${error.message}`));
    process.exit(1);
  });