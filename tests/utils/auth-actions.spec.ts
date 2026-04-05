import { test, expect } from '@playwright/test';

test('test authentication', async ({ page }) => {
    await page.goto('/')

    // check if user is authenticated:
    const navButton = page.getByRole('button', { name: /toggle navigation/i });  
    await navButton.click({ timeout: 60000 }); // increased timeout for 60 seconds to allow for authentication process to complete

    const welcomeMessage = page.getByText('Welcome!')
    await expect(welcomeMessage).toBeVisible()
    // page is authenticated
});