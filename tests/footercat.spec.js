import { test, expect } from '@playwright/test';

test.setTimeout(120000);

test('Test Footer Category Links', async ({ page, context }) => {

  await page.goto('https://hyprfrsh.com', { waitUntil: 'load' });

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  // Locate Categories section by heading text
  const categoriesSection = page.locator('footer').locator('h3:text("Categories")').locator('..');  
  // ^ Move to parent div

  // Extract only links inside Categories section
  const categoryLinks = categoriesSection.locator('a');
  const count = await categoryLinks.count();

  console.log("Total category links found:", count);

  for (let i = 0; i < count; i++) {
    const link = categoryLinks.nth(i);
    const text = await link.innerText();
    const href = await link.getAttribute('href');

    console.log(`Testing category: ${text} → ${href}`);

    const newPage = await context.newPage();

    // Build correct URL
    const fullURL = `https://hyprfrsh.com${href}`;

    const response = await newPage.goto(fullURL, { timeout: 45000 });

    expect(response.status()).toBeLessThan(400);

    console.log(`✔ Category Link Valid: ${href}`);

    await newPage.close();
  }
});