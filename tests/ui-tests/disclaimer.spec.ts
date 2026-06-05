import { test, expect } from '@playwright/test';

test('Disclaimer is visible in footer and shows warning text', async ({ page }) => {
  await page.goto('/');

  // Footer contains a Disclaimer heading and explanatory text
  const heading = page.getByRole('heading', { name: 'Disclaimer' });
  await expect(heading).toBeVisible();

  // Assert the main warning sentence is present
  await expect(page.getByText('This is not a real shop', { exact: false })).toBeVisible();

  // Assert version/build info is present
  await expect(page.getByText('Version:', { exact: false })).toBeVisible();
});
