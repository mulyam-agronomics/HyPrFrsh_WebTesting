import { test, expect } from '@playwright/test';

test('Hyprfrsh login button test', async ({ page }) => {

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

  const profileMenu = page.locator('div[role="menu"][aria-label="Profile menu"]');
  await profileMenu.waitFor({ state: 'visible', timeout: 10000 });

  // --- CHECK ALL PROFILE ITEMS ---
  const profileItems = [
  'Home',
  'Orders',
  'Payments',
  'Profile',
  'Feedback',
  'About Us',
  'Privacy Policy',
  'Terms and Conditions',
  'Shipping & Delivery',
  'Refund & Cancellation',
  'Log out'
];

for (const item of profileItems) {
  const menuItem = profileMenu.getByRole('button', { name: item }).first();

  // Some items like About/Privacy are <a>, not <button>
  if (!(await menuItem.isVisible())) {
    const linkItem = profileMenu.getByRole('link', { name: item }).first();
    await expect(linkItem).toBeVisible();
    console.log(`Profile menu item visible: ${item}`);
    continue;
  }

  await expect(menuItem).toBeVisible();
  console.log(`Profile menu item visible: ${item}`);
}
 

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

  await page.waitForURL('**/shopping-cart/**', { timeout: 15000 });
console.log("Cart page opened!");

// Scroll down
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1500);

// Click Wallet Balance toggle
const walletToggle = page.locator('button:has-text("Use Wallet Balance")');
await walletToggle.scrollIntoViewIfNeeded();
await expect(walletToggle).toBeVisible();
await walletToggle.click();
console.log("Wallet Balance toggle clicked!");

// Continue button
const continueBtn = page.getByRole('button', { name: 'Continue' }).first();
await continueBtn.scrollIntoViewIfNeeded();
await expect(continueBtn).toBeVisible();
await continueBtn.click();
console.log("Continue button clicked!");

});

await page.waitForURL('**/checkout**', { timeout: 15000 });
console.log("Checkout page opened!");

// Scroll to delivery slot section
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1500);

// Delivery slot select
const deliverySlot = page.locator('button.snap-start').first();
await deliverySlot.scrollIntoViewIfNeeded();
await expect(deliverySlot).toBeVisible();
await deliverySlot.click();
console.log("Delivery slot selected!");

// Scroll to place order
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1000);

// Place order
const placeOrderBtn = page.getByRole('button', { name: /place order/i }).first();
await expect(placeOrderBtn).toBeVisible();
await placeOrderBtn.click();
console.log("Place Order clicked!");

});