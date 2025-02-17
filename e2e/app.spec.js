import { test, expect } from '@playwright/test';

test('Check title and body content', async ({ page }) => {
  // Open the React app using the baseURL from the config
  await page.goto('/');

  // ✅ Verify if the title contains "React App"
  await expect(page).toHaveTitle(/React App/);

  // ✅ Check if the body contains "Jenkins"
  const bodyText = await page.locator('body').innerText();
  expect(bodyText).toContain('Jenkins');
});
