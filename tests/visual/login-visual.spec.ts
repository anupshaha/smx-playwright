import { test, expect, Page } from '@playwright/test'
import LoginPage from '../../src/pages/login/LoginPage'
import ENV from '../../src/utils/env';


test.describe('Login Page Visual Test', () => {

    let loginPage : LoginPage;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page  = await context.newPage();
        loginPage = await new LoginPage(page);
        await loginPage.visit(ENV.BASE_URL);
    })

    test('Verify Satmetrix Logo', async () => {
        await loginPage.snapshotSatmetrixLogo();
    })

    test('Verify Login Form', async ()=>{
        await loginPage.snapshotLoginForm();
    });

})





