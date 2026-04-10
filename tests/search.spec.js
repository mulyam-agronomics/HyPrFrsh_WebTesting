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

    // Close promo popup
  const popupClose = page.locator('button[aria-label="Close"]');
  if (await popupClose.isVisible()) {
    await popupClose.click({ force: true });
    console.log("Popup closed");
  }

  // 🔍 SEARCH for Watermelon
  const searchInput = page.locator('input[aria-label="Search products"]:visible');

  await expect(searchInput.first()).toBeVisible({ timeout: 8000 });

  await searchInput.first().click();
  await searchInput.first().fill('watermelon');
  await page.keyboard.press('Enter');

  console.log("Searching watermelon...");
  await page.waitForTimeout(2000);

  // Wait for the product card
  await page.waitForSelector('a[aria-label="View details for Watermelon Kiran"]', { timeout: 15000 });

  // Open product details
  await page.locator('a[aria-label="View details for Watermelon Kiran"]').click();
  console.log("Watermelon Kiran product opened!");

  // Wait for product page
  await page.waitForSelector('section', { timeout: 10000 });

  // Scroll down
  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(500);
  }

  console.log("Scrolled down on product details page");

  // CLICK ADD BUTTON
  await test.step('Add Watermelon Kiran to cart', async () => {
    const addBtn = page.getByRole('button', {
      name: /add watermelon kiran to cart/i,
    });

    await expect(addBtn).toBeVisible({ timeout: 8000 });

    await addBtn.click();
    console.log("Product added to cart!");

    await page.waitForTimeout(2000);
  });

  // OPEN CART PAGE
await test.step('Open Cart Page', async () => {
  const cartButton = page.getByRole('link', { name: 'Cart' });

  await expect(cartButton).toBeVisible({ timeout: 5000 });

  await cartButton.click();
  console.log("Cart page opened!");

  await page.waitForURL('**/shopping-cart/**', { timeout: 10000 });

  await page.waitForTimeout(2000);
});

});   // <-- THIS BRACE WAS MISSING (End of test)