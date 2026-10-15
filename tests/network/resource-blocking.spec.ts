import { test, expect } from '../fixtures';

test('shop still works when product images are blocked', async ({ page, productsPage }) => {
    const blockedImages: string[] = [];
    await page.route('**/*', (route) => {
        if (route.request().resourceType() === 'image') {
            blockedImages.push(route.request().url());
            return route.abort();
        }
        return route.continue();
    });

    await productsPage.goto();

    await expect(productsPage.productCards.first()).toBeVisible();
    await expect(productsPage.productCards.first().getByRole('button', { name: 'Add to Cart' })).toBeEnabled();
    expect(blockedImages.length).toBeGreaterThan(0);
});
