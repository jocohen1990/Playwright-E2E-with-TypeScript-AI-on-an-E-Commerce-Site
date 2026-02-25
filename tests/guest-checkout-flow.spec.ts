import { test, expect } from '@playwright/test';

// Use only chromium-guest project (no auth required)
test.use({ trace: 'on-first-retry' });

test.describe('Guest Checkout Flow - Brazilian Coffee Order', () => {
  let orderID: string;
  let guestEmail: string;
  const productName = 'Brazilian Santos';
  const productPrice = '$22.99';
  const shippingCost = '$5.99';
  const totalPrice = '$28.98';

  test('should complete guest checkout and verify order status', async ({ page }) => {
    // Step 1: Navigate to the application
    await page.goto('https://valentinos-magic-beans.click/');
    await expect(page).toHaveTitle(/Valentino's Magic Beans/);

    // Step 2: Navigate to Shop
    await page.getByRole('link', { name: 'Shop', exact: true }).click();
    await expect(page).toHaveURL(/\/products/);

    // Step 3: Add Brazilian Santos to cart
    const brazilianProduct = page.locator('[data-test-id="product-card-add-to-cart-button-504"]');
    await expect(brazilianProduct).toBeVisible();
    await brazilianProduct.click();

    // Verify product was added to cart (check notification)
    const cartNotification = page.getByText('Added to Cart');
    await expect(cartNotification).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Brazilian Santos is now in your cart')).toBeVisible({ timeout: 5000 });

    // Step 4: Navigate to cart
    const cartButton = page.locator('[data-test-id="header-cart-button"]');
    await cartButton.click();
    await expect(page).toHaveURL(/\/cart/);

    // Step 5: Verify cart contents
    const cartPage = page.locator('[data-test-id="cart-container"]');

await expect(cartPage.getByRole('heading', { name: 'Your Cart' })).toBeVisible();

await expect(cartPage.getByRole('heading', { name: productName })).toBeVisible();

await expect(cartPage.getByText(productPrice)).toBeVisible();

await expect(cartPage.getByText('Subtotal')).toBeVisible();

await expect(cartPage.getByText(shippingCost)).toBeVisible();

await expect(cartPage.getByText(totalPrice)).toBeVisible();

    // Step 6: Proceed to checkout
    await page.getByRole('link', { name: 'Proceed to Checkout' }).click();
    await expect(page).toHaveURL(/\/checkout/);

    // Step 7: Fill contact information (guest checkout, no authentication)
    await page.locator('[data-test-id="checkout-firstname-input"]').fill('John');
    await page.locator('[data-test-id="checkout-lastname-input"]').fill('Guest');
    guestEmail = 'john.guest@example.com';
    await page.locator('[data-test-id="checkout-email-input"]').fill(guestEmail);

    // Step 8: Fill shipping address
    await page.locator('[data-test-id="checkout-address-input"]').fill('123 Test Street');
    await page.locator('[data-test-id="checkout-city-input"]').fill('Test City');
    await page.locator('[data-test-id="checkout-zipcode-input"]').fill('12345');
    await page.locator('[data-test-id="checkout-country-input"]').fill('United States');

    // Step 9: Fill payment information
    await page.locator('[data-test-id="checkout-cardname-input"]').fill('John Guest');
    await page.locator('[data-test-id="checkout-cardnumber-input"]').fill('4242424242424242');
    await page.locator('[data-test-id="checkout-cardexpiry-input"]').fill('12/25');
    await page.locator('[data-test-id="checkout-cardcvc-input"]').fill('123');

    // Step 10: Verify order summary before placing order
    await expect(page.getByText(productName)).toBeVisible();
    await expect(page.getByText('x1')).toBeVisible();
    await expect(page.getByText(productPrice)).toBeVisible();
    await expect(page.getByText(totalPrice)).toBeVisible();

    // Step 11: Place order
    const placeOrderButton = page.locator('[data-test-id="place-order-button"]');
    await expect(placeOrderButton).toBeVisible();
    await placeOrderButton.click();

    // Step 12: Verify order confirmation
    await expect(page).toHaveURL(/\/order-confirmation/);
    await expect(page.getByRole('heading', { name: 'Order Confirmed!' })).toBeVisible();
    await expect(page.getByText('Your order has been placed successfully')).toBeVisible();

    // Step 13: Capture Order ID from confirmation page
    const orderIDText = page.locator('text=Your Order ID is:').getByRole('heading').nth(0);
    const orderConfirmationText = await page.locator('p').filter({ hasText: /^B/ }).textContent();
    orderID = orderConfirmationText?.trim() || '';
    
    // Alternative method to get Order ID
    const allParagraphs = await page.locator('main >> paragraph').all();
    for (const para of allParagraphs) {
      const text = await para.textContent();
      if (text && /^B\d+$/.test(text.trim())) {
        orderID = text.trim();
        break;
      }
    }

    expect(orderID).toBeTruthy();
    expect(orderID).toMatch(/^B\d+$/);

    // Step 14: Verify confirmation email is correct
    await expect(page.getByText(guestEmail)).toBeVisible();

    // Step 15: Navigate to order tracking
    await page.getByRole('link', { name: 'Track Your Order' }).click();
    await expect(page).toHaveURL(/\/contact/);

    // Step 16: Fill order tracking form
    await page.locator('[data-test-id="contact-order-id-input"]').fill(orderID);
    await page.locator('[data-test-id="contact-email-input"]').fill(guestEmail);

    // Step 17: Track order
    const trackOrderButton = page.locator('[data-test-id="contact-track-order-button"]');
    await expect(trackOrderButton).toBeVisible();
    await trackOrderButton.click();

    // Step 18: Verify order status page
    await expect(page).toHaveURL(new RegExp(`\/order\/${orderID}`));
    await expect(page.getByRole('heading', { name: 'Order Details' })).toBeVisible();

    // Step 19: Verify order contains exact product and price
    await expect(page.getByText(productName)).toBeVisible();
    await expect(page.getByText('Qty: 1')).toBeVisible();
    await expect(page.getByText(productPrice)).toBeVisible();

    // Step 20: Verify customer details match
    await expect(page.getByText('Name: John Guest')).toBeVisible();
    await expect(page.getByText(`Email: ${guestEmail}`)).toBeVisible();

    console.log(`✅ Test completed successfully`);
    console.log(`Order ID: ${orderID}`);
    console.log(`Email: ${guestEmail}`);
    console.log(`Product: ${productName}`);
    console.log(`Price: ${productPrice}`);
    console.log(`Total: ${totalPrice}`);
  });
});
