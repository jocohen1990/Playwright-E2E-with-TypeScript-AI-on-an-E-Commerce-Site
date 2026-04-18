import { test, expect } from '@playwright/test';
import { log } from 'node:console'; 

test('create order', async ({ request }) => {
    const orderPayload = {
        customerDetails: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            address: '123 Main St',
            city: 'Anytown',
            zipCode: '12345',
            country: 'United States'
        },
        items: [
            {
                productId: "504",
                quantity: 1
            }
        ]
    };

    const orderResponse = await request.post('https://api.valentinos-magic-beans.click/orders', {
        data: orderPayload
    }); 

    // Check status code
    expect(orderResponse.status()).toBe(201);

    const orderResponseBody = await orderResponse.json();

    // Validate order response
    expect(orderResponseBody).toHaveProperty('success', true);
    expect(orderResponseBody).toHaveProperty('data');
    
    console.log(orderResponseBody);

});