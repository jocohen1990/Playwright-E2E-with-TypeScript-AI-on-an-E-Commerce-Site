import { type Locator, type Page } from '@playwright/test';
import { type Customer } from '../data/customers';

export class OrderDetailsPage {
    readonly heading: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByRole('heading', { name: 'Order Details' });
    }

    container(orderId: string): Locator {
        return this.page.getByTestId(`order-detail-page-${orderId}`);
    }

    itemLine(orderId: string, text: string): Locator {
        return this.container(orderId).getByText(text, { exact: true });
    }

    customerName(orderId: string, customer: Customer): Locator {
        return this.itemLine(orderId, `Name: ${customer.firstName} ${customer.lastName}`);
    }

    customerEmail(orderId: string, customer: Customer): Locator {
        return this.itemLine(orderId, `Email: ${customer.email}`);
    }
}
