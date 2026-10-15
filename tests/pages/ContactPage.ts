import { type Locator, type Page } from '@playwright/test';

export class ContactPage {
    readonly heading: Locator;
    readonly orderIdInput: Locator;
    readonly emailInput: Locator;
    readonly trackOrderButton: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByRole('heading', { name: 'Contact Us & Track Your Order' });
        this.orderIdInput = page.getByTestId('contact-order-id-input');
        this.emailInput = page.getByTestId('contact-email-input');
        this.trackOrderButton = page.getByTestId('contact-track-order-button');
    }

    async goto() {
        await this.page.goto('/contact');
    }

    async fillOrderLookup(orderId: string, email: string) {
        await this.orderIdInput.fill(orderId);
        await this.emailInput.fill(email);
    }

    async trackOrder(orderId: string, email: string) {
        await this.fillOrderLookup(orderId, email);
        await this.trackOrderButton.click();
    }
}
