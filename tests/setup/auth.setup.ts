import { test as setup, expect } from '../fixtures';
import { AUTH_STATE_FILE, requireEnv } from '../../utils/env';

setup('log in and save the session', async ({ page, loginPage, header }) => {
    await loginPage.goto();
    await loginPage.login(requireEnv('LOGIN_EMAIL'), requireEnv('LOGIN_PASS'));

    await expect(page).toHaveURL('/');
    await expect(header.loginButton).toBeHidden();

    // storageState creates the parent folder if it does not exist.
    await page.context().storageState({ path: AUTH_STATE_FILE });
});
