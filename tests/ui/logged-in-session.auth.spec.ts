import { test, expect } from '../fixtures';

test('saved session keeps the user logged in', async ({ page, header }) => {
    await page.goto('/');

    // Wait for the header to render first so the hidden checks below can't pass on an empty page.
    await expect(header.cartButton).toBeVisible();
    await expect(header.loginButton).toBeHidden();
    await expect(header.signUpButton).toBeHidden();
});
