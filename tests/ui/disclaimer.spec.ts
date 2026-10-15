import { test, expect } from '../fixtures';

test('footer shows the demo-shop disclaimer and build version', async ({ page, footer }) => {
    await page.goto('/');

    await expect(footer.disclaimerHeading).toBeVisible();
    await expect(footer.disclaimerText).toBeVisible();
    await expect(footer.versionInfo).toBeVisible();
});
