import { test, expect } from '@playwright/test';

test('test authentication', async ({ page }) => {

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Login button should NOT be present when authenticated, so we check for that:
    await expect(page.getByRole('button', { name: 'Login' })).not.toBeVisible();

});

    
    /*await page.goto('/')

    // check if user is authenticated:
    const navButton = page.getByRole('button', { name: /toggle navigation/i });  
    await navButton.click({ timeout: 60000 }); // increased timeout for 60 seconds to allow for authentication process to complete

    const welcomeMessage = page.getByText('Welcome back!')
    await expect(welcomeMessage).toBeVisible()
    // page is authenticated
*/