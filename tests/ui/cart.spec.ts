import { test, expect } from '../fixtures';
import { brazilianSantos as product, SHIPPING_FEE } from '../data/products';
import { formatPrice } from '../../utils/price';

test.describe('Shopping cart', () => {
    test.beforeEach(async ({ productsPage, header }) => {
        await productsPage.goto();
        await productsPage.addToCart(product);
        await expect(productsPage.addedToCartToast(product)).toBeVisible();
        await header.openCart();
    });

    test('shows the added product with correct subtotal, shipping and total', async ({ cartPage }) => {
        await expect(cartPage.heading).toBeVisible();
        await expect(cartPage.items).toHaveCount(1);
        await expect(cartPage.item(product)).toBeVisible();
        await expect(cartPage.quantity(product)).toHaveText('1');

        expect(await cartPage.getSubtotal()).toBe(product.price);
        expect(await cartPage.getShipping()).toBe(SHIPPING_FEE);
        expect(await cartPage.getTotal()).toBeCloseTo(product.price + SHIPPING_FEE, 2);
    });

    test('updates the subtotal when the quantity is increased', async ({ cartPage }) => {
        await cartPage.increaseQuantity(product);

        await expect(cartPage.quantity(product)).toHaveText('2');
        await expect(cartPage.subtotal).toHaveText(formatPrice(product.price * 2));
    });

    test('shows the empty-cart state after the product is removed', async ({ cartPage }) => {
        await cartPage.remove(product);

        await expect(cartPage.items).toHaveCount(0);
        await expect(cartPage.emptyCartMessage).toBeVisible();
    });
});
