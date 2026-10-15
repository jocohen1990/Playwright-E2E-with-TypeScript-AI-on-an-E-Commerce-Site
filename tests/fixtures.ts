import { test as base } from '@playwright/test';
import { Header } from './pages/components/Header';
import { Footer } from './pages/components/Footer';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { ContactPage } from './pages/ContactPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';

type PageObjects = {
    header: Header;
    footer: Footer;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    orderConfirmationPage: OrderConfirmationPage;
    contactPage: ContactPage;
    orderDetailsPage: OrderDetailsPage;
    loginPage: LoginPage;
    signUpPage: SignUpPage;
};

/** Playwright `test` with every page object available as a fixture. */
export const test = base.extend<PageObjects>({
    header: async ({ page }, use) => use(new Header(page)),
    footer: async ({ page }, use) => use(new Footer(page)),
    productsPage: async ({ page }, use) => use(new ProductsPage(page)),
    cartPage: async ({ page }, use) => use(new CartPage(page)),
    checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
    orderConfirmationPage: async ({ page }, use) => use(new OrderConfirmationPage(page)),
    contactPage: async ({ page }, use) => use(new ContactPage(page)),
    orderDetailsPage: async ({ page }, use) => use(new OrderDetailsPage(page)),
    loginPage: async ({ page }, use) => use(new LoginPage(page)),
    signUpPage: async ({ page }, use) => use(new SignUpPage(page)),
});

export { expect } from '@playwright/test';
