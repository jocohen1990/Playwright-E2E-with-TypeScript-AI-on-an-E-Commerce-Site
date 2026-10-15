import { type Locator, type Page } from '@playwright/test';
import { type Customer, type PaymentCard } from '../data/customers';

export class CheckoutPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly zipCodeInput: Locator;
    readonly countryInput: Locator;
    readonly cardNameInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cardExpiryInput: Locator;
    readonly cardCvcInput: Locator;
    readonly orderSummary: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.firstNameInput = page.getByTestId('checkout-firstname-input');
        this.lastNameInput = page.getByTestId('checkout-lastname-input');
        this.emailInput = page.getByTestId('checkout-email-input');
        this.addressInput = page.getByTestId('checkout-address-input');
        this.cityInput = page.getByTestId('checkout-city-input');
        this.zipCodeInput = page.getByTestId('checkout-zipcode-input');
        this.countryInput = page.getByTestId('checkout-country-input');
        this.cardNameInput = page.getByTestId('checkout-cardname-input');
        this.cardNumberInput = page.getByTestId('checkout-cardnumber-input');
        this.cardExpiryInput = page.getByTestId('checkout-cardexpiry-input');
        this.cardCvcInput = page.getByTestId('checkout-cardcvc-input');
        this.orderSummary = page.getByTestId('order-summary');
        this.placeOrderButton = page.getByTestId('place-order-button');
    }

    async fillContactInfo(customer: Customer) {
        await this.firstNameInput.fill(customer.firstName);
        await this.lastNameInput.fill(customer.lastName);
        await this.emailInput.fill(customer.email);
    }

    async fillShippingAddress(customer: Customer) {
        await this.addressInput.fill(customer.address);
        await this.cityInput.fill(customer.city);
        await this.zipCodeInput.fill(customer.zipCode);
        await this.countryInput.fill(customer.country);
    }

    async fillPaymentInfo(card: PaymentCard) {
        await this.cardNameInput.fill(card.nameOnCard);
        await this.cardNumberInput.fill(card.number);
        await this.cardExpiryInput.fill(card.expiry);
        await this.cardCvcInput.fill(card.cvc);
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}
