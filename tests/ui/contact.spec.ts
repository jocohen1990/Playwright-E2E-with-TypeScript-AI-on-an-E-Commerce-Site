import { test, expect } from '../fixtures';

test('contact page shows the order tracking form and accepts order details', async ({ contactPage }) => {
    await contactPage.goto();

    await expect(contactPage.heading).toBeVisible();
    await expect(contactPage.orderIdInput).toBeVisible();
    await expect(contactPage.emailInput).toBeVisible();
    await expect(contactPage.trackOrderButton).toBeEnabled();

    await contactPage.fillOrderLookup('ABC123XYZ', 'test@example.com');

    await expect(contactPage.orderIdInput).toHaveValue('ABC123XYZ');
    await expect(contactPage.emailInput).toHaveValue('test@example.com');
});
