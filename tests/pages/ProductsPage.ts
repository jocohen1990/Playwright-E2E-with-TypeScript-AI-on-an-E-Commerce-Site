import { type Locator, type Page } from '@playwright/test';
import { type Product } from '../data/products';

export class ProductsPage {
    readonly heading: Locator;
    readonly productCards: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByRole('heading', { name: 'Our Coffee Collection' });
        // Card containers are "product-card-<id>"; the buttons inside share that prefix, so match the card by its button.
        this.productCards = page
            .locator('[data-test-id^="product-card-"]')
            .filter({ has: page.getByRole('button', { name: 'Add to Cart' }) });
    }

    async goto() {
        await this.page.goto('/products');
    }

    card(product: Pick<Product, 'id'>): Locator {
        return this.page.getByTestId(`product-card-${product.id}`);
    }

    async addToCart(product: Pick<Product, 'id'>) {
        await this.page.getByTestId(`product-card-add-to-cart-button-${product.id}`).click();
    }

    /**
     * Toast shown after a product is added. `exact` skips the screen-reader live region,
     * which repeats the same message with the "Notification Added to Cart" prefix.
     */
    addedToCartToast(product: Pick<Product, 'name'>): Locator {
        return this.page.getByText(`${product.name} is now in your cart.`, { exact: true });
    }
}
