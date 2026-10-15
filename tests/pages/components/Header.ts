import { type Locator, type Page } from '@playwright/test';

export class Header {
    readonly shopLink: Locator;
    readonly contactLink: Locator;
    readonly loginButton: Locator;
    readonly signUpButton: Locator;
    readonly cartButton: Locator;

    constructor(page: Page) {
        const banner = page.getByRole('banner');
        this.shopLink = banner.getByRole('link', { name: 'Shop', exact: true });
        this.contactLink = banner.getByRole('link', { name: 'Contact', exact: true });
        this.loginButton = page.getByTestId('header-login-button-desktop');
        this.signUpButton = page.getByTestId('header-signup-button-desktop');
        this.cartButton = page.getByTestId('header-cart-button');
    }

    /** The cart lives in app state, so open it from the header instead of reloading /cart. */
    async openCart() {
        await this.cartButton.click();
    }
}
