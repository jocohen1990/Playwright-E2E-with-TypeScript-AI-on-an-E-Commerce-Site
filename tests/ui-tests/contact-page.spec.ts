import { test, expect } from '@playwright/test';
import * as contact from '../pages/Contact';

test('Contact page shows order tracking form and accepts order details', async ({ page }) => {
  await page.goto('/contact');

  await expect(page.getByRole('heading', { name: 'Contact Us & Track Your Order' })).toBeVisible();
  await expect(page.locator('[data-test-id="contact-order-id-input"]')).toBeVisible();
  await expect(page.locator('[data-test-id="contact-email-input"]')).toBeVisible();
  await expect(page.locator('[data-test-id="contact-track-order-button"]')).toBeVisible();

  await contact.fillOrderIdAndEmail(page, 'ABC123XYZ', 'test@example.com');

  await expect(page.locator('[data-test-id="contact-order-id-input"]')).toHaveValue('ABC123XYZ');
  await expect(page.locator('[data-test-id="contact-email-input"]')).toHaveValue('test@example.com');
});
