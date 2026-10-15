export interface Customer {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
}

export interface PaymentCard {
    nameOnCard: string;
    number: string;
    expiry: string;
    cvc: string;
}

export const guestCustomer: Customer = {
    firstName: 'John',
    lastName: 'Guest',
    email: 'john.guest@example.com',
    address: '123 Test Street',
    city: 'Test City',
    zipCode: '12345',
    country: 'United States',
};

/** Standard test card number; the demo store never charges it. */
export const testCard: PaymentCard = {
    nameOnCard: 'John Guest',
    number: '4242 4242 4242 4242',
    expiry: '12/30',
    cvc: '123',
};
