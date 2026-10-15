import { type Locator, type Page } from '@playwright/test';

export interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class SignUpPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly confirmationCodeInput: Locator;
    readonly confirmButton: Locator;

    constructor(private readonly page: Page) {
        this.firstNameInput = page.getByTestId('signup-firstname-input');
        this.lastNameInput = page.getByTestId('signup-lastname-input');
        this.emailInput = page.getByTestId('signup-email-input');
        this.passwordInput = page.getByTestId('signup-password-input');
        this.submitButton = page.getByTestId('signup-submit-button');
        this.confirmationCodeInput = page.locator('input[inputmode="numeric"]');
        this.confirmButton = page.getByTestId('confirm-signup-submit-button');
    }

    async goto() {
        await this.page.goto('/signup');
    }

    async signUp(user: NewUser) {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.submitButton.click();
    }

    async confirm(code: string) {
        await this.confirmationCodeInput.fill(code);
        await this.confirmButton.click();
    }
}
