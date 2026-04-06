import { test, expect } from '@playwright/test';

test('Hyprfrsh login button test', async ({ page }) => {

  await page.goto('https://hyprfrsh.com', { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  await page.locator('button:has-text("Select manually")').click();
  console.log("Clicked Select Manually");

  await page.locator('button[aria-label="Select Midas Tower for pick-up"]').click();
  console.log("Midas Tower selected");
  await page.waitForTimeout(1500);

  const loginBtn = page.getByRole('button', { name: /sign in/i });
  await loginBtn.waitFor({ state: 'visible', timeout: 20000 });
  await loginBtn.click();
  console.log("Login button clicked!");

  // ⭐ FIND THE REAL LOGIN SHEET
  const loginSheet = page.locator(
    'div[role="dialog"]:has(input[placeholder="10-digit mobile number"])'
  );

  await loginSheet.first().waitFor({ state: 'visible', timeout: 10000 });
  console.log("Correct login sheet detected!");

  // PHONE NUMBER INPUT
  const mobileInput = loginSheet.locator('input[placeholder="10-digit mobile number"]');
  await mobileInput.first().fill('8888888888');
  console.log("Mobile number entered!");

// SEND OTP BUTTON
const sendOtpBtn = loginSheet.getByRole('button', { name: /send otp/i });

// ⭐ Wait until button is enabled
await expect(sendOtpBtn).toBeEnabled({ timeout: 15000 });

await sendOtpBtn.click();
console.log("OTP sent!");
});