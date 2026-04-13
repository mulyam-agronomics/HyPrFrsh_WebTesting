import { test, expect } from '@playwright/test';

test('Dark mode toggle test', async ({ page }) => {
  // Open your website
  await page.goto('https://hyprfrsh.com'); // replace with actual URL

  // Wait for the dark mode button to be visible
  const darkModeBtn = page.getByRole('button', { name: 'Switch to dark mode' });

  await expect(darkModeBtn).toBeVisible();

  // Click the button
  await darkModeBtn.click();

  // Optional: verify class, attribute, or theme actually changed
  await page.waitForTimeout(1500);  
});