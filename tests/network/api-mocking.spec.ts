import { test, expect } from '../fixtures';
import { formatPrice } from '../../utils/price';
import { API_BASE_URL } from '../../utils/env';

// Use the full API URL: a "**/products" glob would also match the /products page itself.
const PRODUCTS_API = `${API_BASE_URL}/products`;

const mockProducts = [
    { id: '900', name: 'Mocha Coffee', price: 10.99 },
    { id: '901', name: 'Java Cool', price: 5.99 },
];

test('shop renders products from the products API response', async ({ page, productsPage }) => {
    const productsResponse = page.waitForResponse(PRODUCTS_API);

    await productsPage.goto();

    const response = await productsResponse;
    expect(response.ok()).toBe(true);
    const { data } = await response.json();
    await expect(productsPage.productCards).toHaveCount(data.length);
});

test('shop and cart use mocked product data', async ({ page, productsPage, header, cartPage }) => {
    await page.route(PRODUCTS_API, (route) =>
        route.fulfill({ json: { success: true, source: 'mock', data: mockProducts } }),
    );

    await productsPage.goto();
    await expect(productsPage.productCards).toHaveCount(mockProducts.length);
    for (const product of mockProducts) {
        await expect(productsPage.card(product)).toContainText(product.name);
        await expect(productsPage.card(product)).toContainText(formatPrice(product.price));
    }

    await productsPage.addToCart(mockProducts[0]);
    await header.openCart();

    await expect(cartPage.item(mockProducts[0])).toBeVisible();
    await expect(cartPage.subtotal).toHaveText(formatPrice(mockProducts[0].price));
});

test('shows no products when the products API fails', {
    annotation: {
        type: 'issue',
        description: 'Known gap: the shop keeps showing loading skeletons and never displays an error message.',
    },
}, async ({ page, productsPage }) => {
    const failedRequest = page.waitForResponse(PRODUCTS_API);
    await page.route(PRODUCTS_API, (route) => route.fulfill({ status: 500, json: { success: false } }));

    await productsPage.goto();
    expect((await failedRequest).status()).toBe(500);

    await expect(productsPage.heading).toBeVisible();
    await expect(productsPage.productCards).toHaveCount(0);
});
