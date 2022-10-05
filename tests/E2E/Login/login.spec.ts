import { test, expect } from '@playwright/test'; 
import Header from '../../../src/pages/components/Header';
import LeftPanel from '../../../src/pages/components/LeftPanel';
import LoginPage from '../../../src/pages/login/LoginPage';
import ENV from "../../../src/utils/env"
import LOCALE from "../../../src/utils/locale"


test.describe.parallel(`Verify Login Functionality`, ()=>{

    let loginPage : LoginPage;
    let headerComponent : Header;
    let leftPanelComponent : LeftPanel;

    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        headerComponent = new Header(page);
        leftPanelComponent = new LeftPanel(page);
        await loginPage.visit(ENV.BASE_URL);
        
    });

    test(`Valid Login`, async ({page})=>{
        await loginPage.loginToSatmetrix({username:ENV.USERNAME, password:ENV.PASSWORD, domain:ENV.DOMAIN});
        await expect(page).toHaveURL('https://sp01app.dev.nicesatmetrix.net/app/core/main/home.jsp');
        expect(await headerComponent.logoDisplayed()).toBeTruthy();
    });

    test(`Invalid Login`, async ({page})=>{
        await loginPage.loginToSatmetrix({username:ENV.USERNAME});
        let error = await loginPage.getErrorMessage();
        expect(error).toBe(LOCALE.INVALID_LOGIN);
    });
});

