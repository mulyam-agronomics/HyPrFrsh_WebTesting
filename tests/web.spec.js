const { test, expect } = require('@playwright/test');

test('Hyprfrsh Website Flow', async ({ page }) => {

  // STEP 1: Open website
  await test.step('Open Website', async () => {
    await page.goto('https://hyprfrsh.com', { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);
  });

  // STEP 3: Click Select Manually
  await test.step('Select Manually', async () => {
    await page.locator('button:has-text("Select manually")').click();
    console.log("Clicked Select Manually");
    await page.waitForTimeout(1000);
  });

  // STEP 4: Choose Pickup Point
  await test.step('Select Pickup Location (Midas Tower)', async () => {
    await page.locator('button[aria-label="Select Midas Tower for pick-up"]').click();
    console.log("Midas Tower selected");
    await page.waitForLoadState('load');
    await page.waitForTimeout(1500);
  });

  await test.step('Click Hero Banner and Scroll', async () => {

  // Wait for image to appear
  await page.waitForSelector('img[alt="Fresh produce delivered fast"]', { timeout: 10000 });

  // Click the banner image
  await page.getByRole('img', { name: 'Fresh produce delivered fast' }).click();
  console.log("Hero banner image clicked");

  // Scroll down slowly to load content
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(600);
  }

  console.log("Scrolled after opening banner");
});


  // STEP 5: Click All Products Category
  await test.step('Open All Products Category', async () => {
  await page.waitForSelector('span:has-text("All Products")', { timeout: 15000 });
  
  await page.locator('button:has-text("All Products")').first().click();
  console.log("All Products clicked");

  // Scroll page to load products
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(600);
  }
});

await test.step('Open Fresh leafy Category', async () => {

  // Wait for Fresh leafy button using correct selector
  await page.waitForSelector('button:has-text("Fresh leafy")', { timeout: 15000 });

  // Scroll into view if needed
  await page.evaluate(() => window.scrollBy(0, 300));

  // Click the Fresh leafy category
  await page.getByRole('button', { name: /Fresh leafy/i }).click();

  console.log("Fresh leafy category clicked");
  await page.waitForTimeout(2000);
});

await test.step('Open Vegetables Category', async () => {

  await page.getByRole('button', { name: 'Vegetables' }).click();
  console.log("Vegetables category clicked");

  await page.waitForSelector('[data-testid="product-card"], .grid, [class*="product"]');

  await page.evaluate(() => {
    const productSection = document.querySelector('.grid, [data-testid="product-card"]');
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  console.log("Scrolled to vegetable products");
  await page.waitForTimeout(2000);
});

await test.step('Open Fruits Category', async () => {

  // Click Fruits category
  await page.getByRole('button', { name: 'Fruits' }).click();
  console.log("Fruits category clicked");

  // Wait for products to load (any product card)
  await page.waitForSelector('[data-testid="product-card"], .grid, [class*="product"]', {
    timeout: 15000
  });

  // Scroll the products section
  await page.evaluate(() => {
    const productSection = document.querySelector('.grid, [data-testid="product-card"]');
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  console.log("Scrolled to fruit products");

  await page.waitForTimeout(2000);
});

await test.step('Open Exotics Category', async () => {

  // Click the Exotics category
  await page.getByRole('button', { name: 'Exotics' }).click();
  console.log("Exotics category clicked");

  // Wait for products to load
  await page.waitForSelector('[data-testid="product-card"], .grid, [class*="product"]', {
    timeout: 15000
  });

  // Scroll to product section
  await page.evaluate(() => {
    const productSection = document.querySelector('.grid, [data-testid="product-card"]');
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  console.log("Scrolled to Exotics products");
  await page.waitForTimeout(2000);
});

await test.step('Open Fresh Cuts Category', async () => {

  // Click Fresh Cuts category
  await page.getByRole('button', { name: 'Fresh Cuts' }).click();
  console.log("Fresh Cuts category clicked");

  // Wait for products to appear
  await page.waitForSelector('[data-testid="product-card"], .grid, [class*="product"]', {
    timeout: 15000
  });

  // Scroll to product section
  await page.evaluate(() => {
    const productSection = document.querySelector('.grid, [data-testid="product-card"]');
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  console.log("Scrolled to Fresh Cuts products");
  await page.waitForTimeout(2000);
});

// Wait for product cards to load
await page.waitForSelector('a[href="/products/details/?id=144-145"]', { timeout: 15000 });

// Scroll to the product
const product = page.locator('a[href="/products/details/?id=144-145"]');
await product.scrollIntoViewIfNeeded();

// Wait for UI animations
await page.waitForTimeout(500);

// Click the product
await product.click();

console.log("Product details page opened!");
await page.waitForSelector('section', { timeout: 10000 });

// Scroll down smoothly
for (let i = 0; i < 5; i++) {
  await page.mouse.wheel(0, 600); // scroll down
  await page.waitForTimeout(500); // wait for content load
}

console.log("Scrolled down on product details page");

await page.locator('button[aria-label="Switch to light mode"]').scrollIntoViewIfNeeded();
await page.getByRole('button', { name: "Switch to light mode" }).click();

});