import { test, expect } from '../fixtures';
import { brazilianSantos as product, SHIPPING_FEE } from '../data/products';
import { guestCustomer as customer, testCard } from '../data/customers';
import { formatPrice } from '../../utils/price';

test('guest can buy a product and track the order', async ({
    page,
    header,
    productsPage,
    cartPage,
    checkoutPage,
    orderConfirmationPage,
    contactPage,
    orderDetailsPage,
}) => {
    const orderTotal = formatPrice(product.price + SHIPPING_FEE);
    let orderId = '';

    await test.step('add the product to the cart from the shop', async () => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Valentino's Magic Beans/);
        await header.shopLink.click();
        await expect(productsPage.heading).toBeVisible();

        await productsPage.addToCart(product);
        await expect(productsPage.addedToCartToast(product)).toBeVisible();
    });

    await test.step('review the cart', async () => {
        await header.openCart();
        await expect(cartPage.item(product)).toBeVisible();
        await expect(cartPage.subtotal).toHaveText(formatPrice(product.price));
        await expect(cartPage.shipping).toHaveText(formatPrice(SHIPPING_FEE));
        await expect(cartPage.total).toHaveText(orderTotal);
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/\/checkout$/);
    });

    await test.step('fill in contact, shipping and payment details', async () => {
        await checkoutPage.fillContactInfo(customer);
        await checkoutPage.fillShippingAddress(customer);
        await checkoutPage.fillPaymentInfo(testCard);

        await expect(checkoutPage.orderSummary).toContainText(new RegExp(`${product.name}\\s*x1`));
        await expect(checkoutPage.orderSummary).toContainText(orderTotal);
    });

    await test.step('place the order and read the order ID', async () => {
        await checkoutPage.placeOrder();
        await expect(page).toHaveURL(/\/order-confirmation$/);
        await expect(orderConfirmationPage.heading).toBeVisible();
        await expect(orderConfirmationPage.successMessage).toBeVisible();
        await expect(orderConfirmationPage.confirmationEmail(customer.email)).toBeVisible();
        await expect(orderConfirmationPage.orderId).toHaveText(/^[A-Z0-9]+$/);

        orderId = await orderConfirmationPage.getOrderId();
    });

    await test.step('track the order from the contact page', async () => {
        await orderConfirmationPage.trackOrderLink.click();
        await expect(contactPage.heading).toBeVisible();
        await contactPage.trackOrder(orderId, customer.email);
        await expect(page).toHaveURL(`/order/${orderId}`);
    });

    await test.step('order details match what was purchased', async () => {
        await expect(orderDetailsPage.heading).toBeVisible();
        await expect(orderDetailsPage.itemLine(orderId, product.name)).toBeVisible();
        await expect(orderDetailsPage.itemLine(orderId, 'Qty: 1')).toBeVisible();
        await expect(orderDetailsPage.itemLine(orderId, formatPrice(product.price))).toBeVisible();
        await expect(orderDetailsPage.customerName(orderId, customer)).toBeVisible();
        await expect(orderDetailsPage.customerEmail(orderId, customer)).toBeVisible();
    });
});
