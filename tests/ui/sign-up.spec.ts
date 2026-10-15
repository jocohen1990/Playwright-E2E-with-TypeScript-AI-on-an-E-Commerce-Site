import { test, expect } from '../fixtures';
import { EmailUtils } from '../../utils/EmailUtils';

// Creates a real MailSlurp inbox and site account, so it only runs when explicitly enabled.
test.skip(process.env.SIGN_UP_FLOW !== 'true', 'Set SIGN_UP_FLOW=true to run the sign-up test');

test('new user can sign up, confirm their email and log in', async ({ page, signUpPage, loginPage, header }) => {
    const emailUtils = new EmailUtils();
    const inbox = await emailUtils.createInbox();
    const newUser = {
        firstName: 'Test',
        lastName: 'User',
        email: inbox.emailAddress,
        password: 'Qa-Automation-2026!',
    };

    await test.step('submit the sign-up form', async () => {
        await signUpPage.goto();
        await signUpPage.signUp(newUser);
    });

    await test.step('confirm the email with the 6-digit code', async () => {
        const email = await emailUtils.waitForLatestEmail(inbox.id);
        const code = email.body?.match(/\b(\d{6})\b/)?.[1];
        expect(code, 'confirmation email should contain a 6-digit code').toBeDefined();
        await signUpPage.confirm(code!);
    });

    await test.step('log in with the new account', async () => {
        await loginPage.login(newUser.email, newUser.password);
        await expect(page).toHaveURL('/');
        await expect(header.loginButton).toBeHidden();
    });
});
