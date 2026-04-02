const { test, expect } = require('@playwright/test');

test('hyfrshwebsite', async ({ page }) => {

   await page.goto('https://hyprfrsh.com', { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  // Close promo popup
  const popupClose = page.locator('button[aria-label="Close"]');
  if (await popupClose.isVisible()) {
    await popupClose.click({ force: true });
    console.log("Popup closed");
  }

  // Click Select manually
  await page.locator('button:has-text("Select manually")').click();
  console.log("Clicked Select Manually");
  await page.waitForTimeout(1000);

  // Select Midas Tower
  await page.locator('button[aria-label="Select Midas Tower for pick-up"]').click();
  console.log("Midas Tower selected");

 await page.waitForLoadState('load');
  await page.waitForTimeout(1500);

  // 🔍 SEARCH for Watermelon
const searchInput = page.locator('input[aria-label="Search products"]:visible');

await expect(searchInput.first()).toBeVisible({ timeout: 8000 });

await searchInput.first().click();
await searchInput.first().fill('watermelon');
await page.keyboard.press('Enter');

console.log("Searching watermelon...");
await page.waitForTimeout(2000);

  // ADD Watermelon
  const addBtn = page.locator('button[aria-label="Add Watermelon Kiran to cart"]');
  await addBtn.scrollIntoViewIfNeeded();
  await expect(addBtn).toBeVisible({ timeout: 10000 });
  await addBtn.click();
  console.log("Watermelon added");

  // Increase quantity 2 times
  const plus = page.locator('button[aria-label*="Increase Quantity"]');
  await plus.first().click();
  await plus.first().click();
  console.log("Quantity increased to 3");

//   // Open Cart
//   await page.locator('a[aria-label*="Cart"]').click();
//   console.log("Cart opened!");



});