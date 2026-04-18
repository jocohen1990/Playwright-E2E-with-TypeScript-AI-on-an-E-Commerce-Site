import { test, expect } from '@playwright/test';

test('test authentication', async ({ page }) => {

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Login button should NOT be present when authenticated, so we check for that:
    await expect(page.getByRole('button', { name: 'Login' })).not.toBeVisible();

});