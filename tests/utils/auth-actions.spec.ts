import { test, expect } from '@playwright/test';

test('test authentication', async ({ page }) => {

    await page.goto('https://valentinos-magic-beans.click/');
    await page.waitForLoadState('networkidle');

    const navButton = page.getByRole('button').first();

    await expect(navButton).toBeVisible();
    await navButton.click();

    await expect(page.getByText('Welcome back!')).toBeVisible();

});

    
    /*await page.goto('/')

    // check if user is authenticated:
    const navButton = page.getByRole('button', { name: /toggle navigation/i });  
    await navButton.click({ timeout: 60000 }); // increased timeout for 60 seconds to allow for authentication process to complete

    const welcomeMessage = page.getByText('Welcome back!')
    await expect(welcomeMessage).toBeVisible()
    // page is authenticated
*/