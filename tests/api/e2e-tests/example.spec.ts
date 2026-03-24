import { test, expect, APIRequestContext} from '@playwright/test';

// Request context
let request: APIRequestContext;
test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext({
        baseURL: 'https://api.valentinos-magic-beans.click',
        extraHTTPHeaders: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
});
    
test.afterAll(async ({ page }) => {
    await page.goto('https://valentinos-magic-beans.click/logout');


test('has title', async ({ page }) => {
    //Make HTTP request to the application
    const response = await page.goto('https://valentinos-magic-beans.click/');

    // Check if the response status is 200 OK
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);   

    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of the framework.
    await expect(page.getByRole('heading', { name: 'Playwright for JavaScript' })).toBeVisible();
});

test('API test example', async ({ request }) => {
    const response = await request.get('https://api.valentinos-magic-beans.click/products');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('success', true);
    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBeGreaterThan(0);
    }); 
});