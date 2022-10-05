import { test, expect } from "@playwright/test";
import Header from "../../../src/pages/components/Header";
import LeftPanel from "../../../src/pages/components/LeftPanel";
import LoginPage from "../../../src/pages/login/LoginPage";
import ENV from "../../../src/utils/env";
import {MenuOptions, SubMenuOptions} from "../../../src/constants/navigationMenu";

test.describe(`Left Side Panel Navigation Tests`, ()=>{

    let loginPage : LoginPage;
    let headerComponent : Header;
    let leftPanelComponent : LeftPanel;

    test.beforeAll(async ({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();
        loginPage = new LoginPage(page);
        headerComponent = new Header(page);
        leftPanelComponent = new LeftPanel(page);
        await loginPage.visit(ENV.BASE_URL);
        await loginPage.loginToSatmetrix({username:ENV.USERNAME, password:ENV.PASSWORD, domain:ENV.DOMAIN});
        await expect(page).toHaveURL('https://sp01app.dev.nicesatmetrix.net/app/core/main/home.jsp');
        await expect(await headerComponent.logoDisplayed()).toBeTruthy();
    });

    let Menu = [[MenuOptions.Contacts, SubMenuOptions.ContactLists], [MenuOptions.Actions, SubMenuOptions.MyActions], [MenuOptions.Admin, SubMenuOptions.AdvancedAdmin], [MenuOptions.Admin, SubMenuOptions.INR]]
    //let Menu2 = [[MenuOptions.Analytics], [MenuOptions.Admin], [MenuOptions.Actions], [MenuOptions.Contacts], [MenuOptions.Program]]

    Menu.forEach(m => {
        test(`Validate Left Panel Navigation ${m}`, async()=>{
            if(!m[1]){
                await leftPanelComponent.navigate(m[0]);  
            }
            await leftPanelComponent.navigate(m[0], m[1]);
        });
    })
});