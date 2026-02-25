import { test, expect } from '@playwright/test';

test('should get all products', async ({ request }) => {
    // Make a GET request to the products endpoint
    const response = await request.get('https://api.valentinos-magic-beans.click/products');

    // Check if the response status is 200 OK
    expect(response.status()).toBe(200);

    // Check if the response is in JSON format
    expect(response.headers()['content-type']).toContain('application/json');

    // Parse the response body as JSON
    const responseBody = await response.json();

    // Response body should be an array of products
    expect(responseBody).toHaveProperty('success', true);
    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBeGreaterThan(0);

});