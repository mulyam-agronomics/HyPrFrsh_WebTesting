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

await test.step('Click Second Banner', async () => {

  await page.goto('https://hyprfrsh.com', { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Select only the clickable banner (object-cover inside <a href="/products/">
  const secondBanner = page.locator('a[href="/products/"] img.object-cover').nth(0);

  await expect(secondBanner).toBeVisible();

  await secondBanner.click();
  console.log("Second banner clicked");

  await expect(page).toHaveURL(/\/products\//);
});

await test.step('Click Third Banner', async () => {

  await page.goBack(); // back to homepage
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(500);

  const thirdBanner = page.locator('a[href="/products/"] img.object-cover').nth(2);
  await expect(thirdBanner).toBeVisible();
  await thirdBanner.click();

  console.log("Third banner clicked");
});

// await test.step('Click Fourth Banner', async () => {

//   await page.goBack(); // back to homepage again
//   await page.waitForLoadState("domcontentloaded");
//   await page.waitForTimeout(500);

//   const fourthBanner = page.locator('a[href="/products/"] img.object-cover').nth(3);
//   await expect(fourthBanner).toBeVisible();
//   await fourthBanner.click();

//   console.log("Fourth banner clicked");
// });

});