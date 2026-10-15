import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor(private readonly page: Page) {
        this.emailInput = page.getByTestId('login-email-input');
        this.passwordInput = page.getByTestId('login-password-input');
        this.submitButton = page.getByTestId('login-submit-button');
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}
