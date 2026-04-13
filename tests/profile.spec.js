import { test, expect } from '@playwright/test';

test('Hyprfrsh profile test', async ({ page }) => {

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
  // const popupClose = page.locator('button[aria-label="Close"]');
  // if (await popupClose.isVisible()) {
  //   await popupClose.click({ force: true });
  //   console.log("Popup closed");
  // }


  // 3. OPEN LOGIN SHEET
  const loginBtn = page.getByRole('button', { name: /sign in/i });
  await loginBtn.waitFor({ state: 'visible', timeout: 20000 });
  await loginBtn.click();
  console.log("Login button clicked!");

  // 4. WAIT FOR LOGIN SHEET
  const loginSheet = page.locator(
    'div[role="dialog"]:has(input[placeholder="10-digit mobile number"])'
  );
  await loginSheet.first().waitFor({ state: 'visible', timeout: 20000 });

  // 5. ENTER MOBILE NUMBER
  const mobileInput = loginSheet.locator('input[placeholder="10-digit mobile number"]');
  await mobileInput.first().fill('8888888888');
  console.log("Mobile number entered!");

  // 6. CLICK ENABLED "SEND OTP" BUTTON (FIXED)
  const sendOTP = page.locator('button[aria-label="Send OTP"]:not([disabled])');
  await expect(sendOTP).toBeVisible({ timeout: 20000 });
  await expect(sendOTP).toBeEnabled({ timeout: 20000 });

  await sendOTP.click();
  console.log("Send OTP clicked!");

  // 7. WAIT FOR OTP INPUT
await page.waitForSelector('input[aria-label="Digit 1 of 6"]', { timeout: 20000 });
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
  await avatarButton.waitFor({ state: 'visible', timeout: 10000 });
  await avatarButton.click();
  console.log('Profile menu opened!');

// Now click Profile
await page.waitForSelector('a[href="/profile/"]', { state: 'visible' });
await page.click('a[href="/profile/"]');

// Verify profile page opened
await expect(page).toHaveURL(/\/profile/);

 // --- 2. PAGE TITLE ---
  await expect(page.locator('h1')).toHaveText('Profile');

  // --- 3. PROFILE IMAGE ---
  const profileImg = page.locator('img[src*="profile_images"]');
  await expect(profileImg).toBeVisible();

  // Remove icon
  await expect(page.locator('span[aria-label="Remove profile picture"]')).toBeVisible();

  // Camera icon
  await expect(page.locator('.lucide-camera')).toBeVisible();

  // --- 4. WALLET BALANCE ---
  const walletText = page.locator('text=Wallet Balance');
  await expect(walletText).toBeVisible();

  const walletAmount = page.locator('p.text-lg.font-bold.text-primary');
  await expect(walletAmount).toHaveText('100.00');

  // --- 5. PHONE NUMBER (read-only box) ---
  const phoneNumber = page.locator('div.text-muted-foreground.select-none');
  await expect(phoneNumber).toHaveText('+918888888888');

  // --- 6. FULL NAME INPUT ---
  const nameInput = page.locator('input[placeholder="Enter your name"]');
  await expect(nameInput).toHaveValue('void testing');
  await nameInput.fill('New Test Name');

  // --- 7. EMAIL INPUT ---
  const emailInput = page.locator('input[type="email"]');
  await expect(emailInput).toHaveValue('void@test.in');
  await emailInput.fill('newtest@example.com');

  // --- 8. PICK-UP POINT SELECT ---
  const pickupSelect = page.locator('select');
  await expect(pickupSelect).toBeVisible();

  await pickupSelect.selectOption('1');
  await expect(pickupSelect).toHaveValue('1');

  // --- 9. SAVE CHANGES BUTTON ---
  const saveButton = page.locator('button:has-text("Save changes")');
  await expect(saveButton).toBeVisible();

  await saveButton.click();
});