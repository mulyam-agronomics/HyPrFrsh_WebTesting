import { test, expect } from '@playwright/test';

test('Hyprfrsh retrun and refund', async ({ page }) => {

  // 1. OPEN WEBSITE
  await page.goto('https://hyprfrsh.com', { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  // 2. SELECT LOCATION
  await page.locator('button:has-text("Select manually")').click();
  console.log("Clicked Select Manually");

  await page.locator('button[aria-label="Select Midas Tower for pick-up"]').click();
  console.log("Midas Tower selected");
  await page.waitForTimeout(1500);

  
  // Close promo popup
  const popupClose = page.locator('button[aria-label="Close"]');
  if (await popupClose.isVisible()) {
    await popupClose.click({ force: true });
    console.log("Popup closed");
  }


  // 3. OPEN LOGIN SHEET
  const loginBtn = page.getByRole('button', { name: /sign in/i });
  await loginBtn.waitFor({ state: 'visible', timeout: 30000 });
  await loginBtn.click();
  console.log("Login button clicked!");

  // 4. WAIT FOR LOGIN SHEET
  const loginSheet = page.locator(
    'div[role="dialog"]:has(input[placeholder="10-digit mobile number"])'
  );
  await loginSheet.first().waitFor({ state: 'visible', timeout: 30000 });

  // 5. ENTER MOBILE NUMBER
  const mobileInput = loginSheet.locator('input[placeholder="10-digit mobile number"]');
  await mobileInput.first().fill('8888888888');
  console.log("Mobile number entered!");

  // 6. CLICK ENABLED "SEND OTP" BUTTON (FIXED)
  const sendOTP = page.locator('button[aria-label="Send OTP"]:not([disabled])');
  await expect(sendOTP).toBeVisible({ timeout: 30000 });
  await expect(sendOTP).toBeEnabled({ timeout: 30000 });

  await sendOTP.click();
  console.log("Send OTP clicked!");

  // 7. WAIT FOR OTP INPUT
await page.waitForSelector('input[aria-label="Digit 1 of 6"]', { timeout: 30000 });
console.log("OTP inputs visible!");

// --- FILL OTP 123456 ---
await page.locator('input[aria-label="Digit 1 of 6"]').fill('1');
await page.locator('input[aria-label="Digit 2 of 6"]').fill('2');
await page.locator('input[aria-label="Digit 3 of 6"]').fill('3');
await page.locator('input[aria-label="Digit 4 of 6"]').fill('4');
await page.locator('input[aria-label="Digit 5 of 6"]').fill('5');
await page.locator('input[aria-label="Digit 6 of 6"]').fill('6');

console.log("OTP 123456 entered!");

// --- OPEN SPECIFIC PRODUCT ---
// const productLink = page.locator('a[aria-label="View details for Apple Royal Gala"]');
// await productLink.waitFor({ state: 'visible', timeout: 20000 });
// await productLink.click();
// console.log("Opened product: Apple Royal Gala");


 // --- PROFILE MENU ---
  // Pick visible avatar button only
  const avatarButton = page.locator('div.relative.inline-flex button:visible');
  await avatarButton.waitFor({ state: 'visible', timeout: 30000 });
  await avatarButton.click();
  console.log('Profile menu opened!');

  // --- CLICK RETURN & REFUND ---
const refundLink = page.getByRole('link', { name: /refund & cancellation/i });

// Wait for it to be visible
await refundLink.waitFor({ state: 'visible', timeout: 20000 });

// Click it
await refundLink.click();

console.log("Refund & Cancellation page opened!");

// Optional: verify navigation
await expect(page).toHaveURL(/refund-policy/);

// --- SCROLL DOWN TO CONTACT US ---
const contactLink = page.getByRole('link', { name: /contact us/i });

// Scroll into view
await contactLink.scrollIntoViewIfNeeded();

// Wait until visible
await expect(contactLink).toBeVisible({ timeout: 20000 });

console.log("Scrolled to Contact Us link!");

// --- CLICK CONTACT US ---
await contactLink.click();

console.log("Contact Us page opened!");

// --- VERIFY NAVIGATION ---
await expect(page).toHaveURL(/contact/);

 // 13. HANDLE EMAIL LINK
  const emailLink = page.getByRole('link', { name: 'support@hyprfrsh.com' }).first();

  await emailLink.scrollIntoViewIfNeeded();
  await expect(emailLink).toBeVisible();

  // Validate mailto link
  const href = await emailLink.getAttribute('href');
  expect(href).toContain('mailto:support@hyprfrsh.com');

  console.log("Email link validated!");


});