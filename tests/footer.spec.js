// import { test, expect } from '@playwright/test';

// test.setTimeout(120000); // Prevent unexpected failures

// test('Test all footer links', async ({ page, context }) => {
//   await page.goto('https://hyprfrsh.com', { waitUntil: 'load' });

//   // Scroll to footer
//   await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
//   await page.waitForTimeout(1000);

//   const footer = page.locator('footer');
//   await expect(footer).toBeVisible();

//   const footerLinks = footer.locator('a');
//   const count = await footerLinks.count();

//   console.log("Total footer links found:", count);

//   for (let i = 0; i < count; i++) {
//     const link = footerLinks.nth(i);
//     const linkText = await link.innerText();
//     const href = await link.getAttribute('href');

//     console.log(`Testing: ${linkText} → ${href}`);

//     const newPage = await context.newPage();

//     // Faster + reliable loading
//     const response = await newPage.goto(`https://hyprfrsh.com${href}`, { timeout: 45000 });

//     expect(response.status()).toBeLessThan(400);

//     console.log(`✔ Link working: ${href}`);

//     await newPage.close();
//   }
// });

import { test, expect } from '@playwright/test';

test.setTimeout(120000);

test('Test all footer links including Categories', async ({ page, context }) => {
  await page.goto('https://hyprfrsh.com', { waitUntil: 'load' });

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const footer = page.locator('footer');
  await expect(footer).toBeVisible();

  // 👉 Select ALL links inside footer
  const allFooterLinks = footer.locator('a');
  const count = await allFooterLinks.count();

  console.log("Total footer links found:", count);

  for (let i = 0; i < count; i++) {
    const link = allFooterLinks.nth(i);
    const text = await link.innerText();
    const href = await link.getAttribute('href');

    console.log(`Testing: ${text} → ${href}`);

    const newPage = await context.newPage();

    // Full URL handling
    let fullURL = href.startsWith('http')
      ? href
      : `https://hyprfrsh.com${href}`;

    // Open link
    const response = await newPage.goto(fullURL, { timeout: 45000 });

    // Validation
    expect(response.status()).toBeLessThan(400);

    console.log(`✔ Link working: ${href}`);

    await newPage.close();
  }
});