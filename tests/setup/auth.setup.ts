import path from 'path';
import fs from 'fs';
import { test } from '@playwright/test';
import * as loginPage from '../pages/Login'

const authSessionFile = path.resolve(__dirname, '../../playwright/.auth/user.json');

// Ensure the .auth directory exists
const authDir = path.dirname(authSessionFile);
if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
}

// Use credentials from the Login page module
const loginData = {
    email: loginPage.TEST_EMAIL,
    pass: loginPage.TEST_PASSWORD
}

// // console.log('EMAIL:', loginData.email);
// // console.log('PASS:', loginData.pass);

test('authenticate', async ({ page }) => { 
    await page.goto('/login')

    await loginPage.login(
        page,
        loginData.email,
        loginData.pass
    )
    await loginPage.verifySuccessfulLogin(page)

    await page.context().storageState({
        path: authSessionFile
    })
  
})