import { test, expect } from '@playwright/test';
import {
    type ApiProduct,
    type ApiResponse,
    type CreateOrderRequest,
    type CreateOrderResult,
    type ErrorResult,
} from './types';

const customerDetails: CreateOrderRequest['customerDetails'] = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    address: '1234 Main St.',
    city: 'Rhyolite',
    zipCode: '89003',
    country: 'United States',
};

const MISSING_FIELDS_MESSAGE = 'Customer details and at least one item are required.';

test.describe('POST /orders', () => {
    test('guest can order an in-stock product', async ({ request }) => {
        const productsResponse = await request.get('/products');
        expect(productsResponse.ok()).toBe(true);
        const products: ApiResponse<ApiProduct[]> = await productsResponse.json();
        const inStockProduct = products.data.find((product) => product.stock > 0);
        expect(inStockProduct, 'at least one product should be in stock').toBeDefined();

        const response = await request.post('/orders', {
            data: {
                customerDetails,
                items: [{ productId: inStockProduct!.id, quantity: 1 }],
            } satisfies CreateOrderRequest,
        });

        expect(response.status()).toBe(201);
        expect(response.headers()['content-type']).toContain('application/json');

        const body: ApiResponse<CreateOrderResult> = await response.json();
        expect(body.success).toBe(true);
        expect(body.data.message).toBe('Order created successfully');
        expect(body.data.orderId).toMatch(/^[A-Z0-9]+$/);
    });

    test('rejects an order with no items', async ({ request }) => {
        const response = await request.post('/orders', {
            data: { customerDetails, items: [] } satisfies CreateOrderRequest,
        });

        expect(response.status()).toBe(400);
        const body: ApiResponse<ErrorResult> = await response.json();
        expect(body.success).toBe(false);
        expect(body.data.message).toBe(MISSING_FIELDS_MESSAGE);
    });

    test('rejects an order with no customer details', async ({ request }) => {
        const response = await request.post('/orders', {
            data: { items: [{ productId: '504', quantity: 1 }] } satisfies CreateOrderRequest,
        });

        expect(response.status()).toBe(400);
        const body: ApiResponse<ErrorResult> = await response.json();
        expect(body.success).toBe(false);
        expect(body.data.message).toBe(MISSING_FIELDS_MESSAGE);
    });
});
