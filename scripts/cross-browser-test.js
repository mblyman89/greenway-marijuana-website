#!/usr/bin/env node

/**
 * Cross-browser testing script for Greenway Marijuana website
 * This script uses Playwright to run tests across multiple browsers
 * 
 * Usage:
 *   npm run test:browsers
 */

const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  baseUrl: process.env.TEST_URL || 'http://localhost:3000',
  browsers: ['chromium', 'firefox', 'webkit'],
  viewports: [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1280, height: 800, name: 'desktop' },
  ],
  pages: [
    { path: '/', name: 'Home' },
    { path: '/products', name: 'Products' },
    { path: '/products/product-1', name: 'Product Detail' },
    { path: '/cart', name: 'Cart' },
    { path: '/loyalty', name: 'Loyalty' },
    { path: '/blog', name: 'Blog' },
  ],
  screenshotsDir: path.join(__dirname, '../test-results/screenshots'),
};

// Create screenshots directory if it doesn't exist
if (!fs.existsSync(config.screenshotsDir)) {
  fs.mkdirSync(config.screenshotsDir, { recursive: true });
}

// Main test function
async function runTests() {
  console.log(`Starting cross-browser tests for ${config.baseUrl}`);
  console.log('---------------------------------------------------');
  
  // Start local server if testing locally
  let serverProcess;
  if (config.baseUrl.includes('localhost')) {
    try {
      console.log('Starting local development server...');
      serverProcess = execSync('npm run dev', { stdio: 'inherit' });
      // Wait for server to start
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
      console.error('Failed to start development server:', error);
      process.exit(1);
    }
  }
  
  const results = {
    passed: 0,
    failed: 0,
    skipped: 0,
    total: config.browsers.length * config.viewports.length * config.pages.length,
  };
  
  // Run tests for each browser
  for (const browserType of config.browsers) {
    console.log(`\nTesting on ${browserType}...`);
    
    let browser;
    try {
      // Launch browser
      switch (browserType) {
        case 'chromium':
          browser = await chromium.launch();
          break;
        case 'firefox':
          browser = await firefox.launch();
          break;
        case 'webkit':
          browser = await webkit.launch();
          break;
        default:
          console.error(`Unknown browser type: ${browserType}`);
          results.skipped += config.viewports.length * config.pages.length;
          continue;
      }
      
      // Test each viewport
      for (const viewport of config.viewports) {
        console.log(`  Viewport: ${viewport.name} (${viewport.width}x${viewport.height})`);
        
        // Create a new context with the viewport
        const context = await browser.newContext({
          viewport: {
            width: viewport.width,
            height: viewport.height,
          },
          userAgent: `Greenway-Test-Bot/${browserType}/${viewport.name}`,
        });
        
        // Test each page
        for (const page of config.pages) {
          const url = `${config.baseUrl}${page.path}`;
          console.log(`    Testing: ${page.name} (${url})`);
          
          try {
            // Create a new page
            const browserPage = await context.newPage();
            
            // Navigate to the page
            await browserPage.goto(url, { waitUntil: 'networkidle' });
            
            // Take a screenshot
            const screenshotPath = path.join(
              config.screenshotsDir,
              `${browserType}-${viewport.name}-${page.name.toLowerCase().replace(/\s+/g, '-')}.png`
            );
            await browserPage.screenshot({ path: screenshotPath, fullPage: true });
            
            // Check for common errors
            const hasErrors = await browserPage.evaluate(() => {
              const errorElements = document.querySelectorAll('.error, .error-message');
              return errorElements.length > 0;
            });
            
            if (hasErrors) {
              console.log(`      ❌ Found error messages on the page`);
              results.failed++;
            } else {
              console.log(`      ✅ Page loaded successfully`);
              results.passed++;
            }
            
            // Close the page
            await browserPage.close();
          } catch (error) {
            console.error(`      ❌ Failed to test ${page.name}: ${error.message}`);
            results.failed++;
          }
        }
        
        // Close the context
        await context.close();
      }
      
      // Close the browser
      await browser.close();
    } catch (error) {
      console.error(`Failed to launch ${browserType}: ${error.message}`);
      results.skipped += config.viewports.length * config.pages.length;
    }
  }
  
  // Print results
  console.log('\n---------------------------------------------------');
  console.log('Test Results:');
  console.log(`  Total: ${results.total}`);
  console.log(`  Passed: ${results.passed}`);
  console.log(`  Failed: ${results.failed}`);
  console.log(`  Skipped: ${results.skipped}`);
  console.log('---------------------------------------------------');
  
  // Stop local server if it was started
  if (serverProcess) {
    console.log('Stopping local development server...');
    serverProcess.kill();
  }
  
  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run the tests
runTests().catch(error => {
  console.error('Test runner failed:', error);
  process.exit(1);
});