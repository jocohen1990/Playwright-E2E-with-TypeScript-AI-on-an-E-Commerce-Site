import { type Locator, type Page } from '@playwright/test';
import { type Product } from '../data/products';
import { parsePrice } from '../../utils/price';

export class CartPage {
    readonly heading: Locator;
    readonly items: Locator;
    readonly emptyCartMessage: Locator;
    readonly subtotal: Locator;
    readonly shipping: Locator;
    readonly total: Locator;
    readonly proceedToCheckoutButton: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByRole('heading', { name: 'Your Cart' });
        this.items = page.getByTestId('cart-item');
        this.emptyCartMessage = page.getByTestId('empty-cart');
        this.subtotal = this.summaryValue('Subtotal');
        this.shipping = this.summaryValue('Shipping');
        this.total = page.getByTestId('total-price');
        this.proceedToCheckoutButton = page.getByTestId('proceed-to-checkout');
    }

    item(product: Pick<Product, 'name'>): Locator {
        return this.items.filter({ has: this.page.getByRole('heading', { name: product.name, exact: true }) });
    }

    quantity(product: Pick<Product, 'id'>): Locator {
        return this.page.getByTestId(`quantity-${product.id}`);
    }

    async increaseQuantity(product: Pick<Product, 'id'>) {
        await this.page.getByTestId(`quantity-increase-${product.id}`).click();
    }

    async remove(product: Pick<Product, 'id'>) {
        await this.page.getByTestId(`remove-${product.id}`).click();
    }

    async getSubtotal(): Promise<number> {
        return parsePrice(await this.subtotal.textContent());
    }

    async getShipping(): Promise<number> {
        return parsePrice(await this.shipping.textContent());
    }

    async getTotal(): Promise<number> {
        return parsePrice(await this.total.textContent());
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    /** Order summary rows are "<label> <value>" pairs with no test IDs, so read the value next to the label. */
    private summaryValue(label: string): Locator {
        return this.page.getByText(label, { exact: true }).locator('xpath=following-sibling::*[1]');
    }
}
