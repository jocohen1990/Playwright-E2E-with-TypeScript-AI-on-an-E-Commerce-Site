import { test, expect } from '@playwright/test';
import { type ApiProduct, type ApiResponse, type ErrorResult } from './types';
import { brazilianSantos } from '../data/products';

test.describe('GET /products', () => {
    test('returns the product catalog', async ({ request }) => {
        const response = await request.get('/products');

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');

        const body: ApiResponse<ApiProduct[]> = await response.json();
        expect(body.success).toBe(true);
        expect(body.data.length).toBeGreaterThan(0);
        for (const product of body.data) {
            expect(product).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    price: expect.any(Number),
                    stock: expect.any(Number),
                }),
            );
            expect(product.price).toBeGreaterThan(0);
        }
    });
});

test.describe('GET /products/:id', () => {
    test('returns a single product', async ({ request }) => {
        const response = await request.get(`/products/${brazilianSantos.id}`);

        expect(response.status()).toBe(200);
        const body: ApiResponse<ApiProduct> = await response.json();
        expect(body.success).toBe(true);
        expect(body.data).toMatchObject({ name: brazilianSantos.name, price: brazilianSantos.price });
    });

    test('returns 404 for an unknown product', async ({ request }) => {
        const response = await request.get('/products/999999');

        expect(response.status()).toBe(404);
        const body: ApiResponse<ErrorResult> = await response.json();
        expect(body.success).toBe(false);
        expect(body.data.message).toBe('Product with ID 999999 not found.');
    });
});
