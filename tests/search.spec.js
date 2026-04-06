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
  // 🔍 SEARCH for Watermelon
const searchInput = page.locator('input[aria-label="Search products"]:visible');

await expect(searchInput.first()).toBeVisible({ timeout: 8000 });

await searchInput.first().click();
await searchInput.first().fill('watermelon');
await page.keyboard.press('Enter');

console.log("Searching watermelon...");
await page.waitForTimeout(2000);

// Wait for the product card to appear
await page.waitForSelector('a[aria-label="View details for Watermelon Kiran"]', { timeout: 15000 });

// Click the product to open details page
await page.locator('a[aria-label="View details for Watermelon Kiran"]').click();
console.log("Watermelon Kiran product opened!");

// Wait for product details page to load
await page.waitForSelector('section', { timeout: 10000 });

// Scroll down smoothly on details page
for (let i = 0; i < 5; i++) {
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(500);
}

console.log("Scrolled down on product details page");

});