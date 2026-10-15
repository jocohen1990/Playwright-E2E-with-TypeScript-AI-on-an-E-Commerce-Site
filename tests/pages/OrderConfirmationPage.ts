import { type Locator, type Page } from '@playwright/test';

export class OrderConfirmationPage {
    readonly heading: Locator;
    readonly successMessage: Locator;
    readonly orderId: Locator;
    readonly trackOrderLink: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByRole('heading', { name: 'Order Confirmed!' });
        this.successMessage = page.getByText('Your order has been placed successfully');
        // The order ID is the paragraph right after its label; the page has no test ID for it.
        this.orderId = page.getByText('Your Order ID is:').locator('xpath=following-sibling::p[1]');
        this.trackOrderLink = page.getByRole('link', { name: 'Track Your Order' });
    }

    confirmationEmail(email: string): Locator {
        return this.page.getByRole('main').locator('strong', { hasText: email });
    }

    async getOrderId(): Promise<string> {
        return (await this.orderId.innerText()).trim();
    }
}
