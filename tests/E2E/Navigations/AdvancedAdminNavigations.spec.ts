import { test, expect, Page } from "@playwright/test";
import Header from "../../../src/pages/components/Header";
import LeftPanel from "../../../src/pages/components/LeftPanel";
import LoginPage from "../../../src/pages/login/LoginPage";
import ENV from "../../../src/utils/env";
import { MenuOptions, SubMenuOptions } from "../../../src/constants/navigationMenu";
import AdvancedAdminPage from "../../../src/pages/admin/AdvancedAdmin";

test.describe(`Advanced Admin Navigation Tests`, () => {

    let loginPage: LoginPage;
    let headerComponent: Header;
    let leftPanelComponent: LeftPanel;
    let advancedAdmin: AdvancedAdminPage;
    let page: Page;
    let context;

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        headerComponent = new Header(page);
        leftPanelComponent = new LeftPanel(page);
        advancedAdmin = new AdvancedAdminPage(page);
        await loginPage.visit(ENV.BASE_URL);
        await loginPage.loginToSatmetrix({ username: ENV.USERNAME, password: ENV.PASSWORD, domain: ENV.DOMAIN });
        await expect(page).toHaveURL('https://sp01app.dev.nicesatmetrix.net/app/core/main/home.jsp');
        await expect(await headerComponent.logoDisplayed()).toBeTruthy();
        //await page.pause()
        await leftPanelComponent.navigate(MenuOptions.Admin, SubMenuOptions.AdvancedAdmin);

    });

    test.afterEach(async () => {
        await page.close();
        await context.close();
    })

    let advancedAdminMenu = ['Scheduled Jobs', 'System Settings', 'Polling Windows']

    advancedAdminMenu.forEach(m => {
        test(`Validate Advanced Admin Navigation ${m}`, async () => {
            await advancedAdmin.selectAdminMenuOption(m);
            await page.goto('https://sp01app.dev.nicesatmetrix.net/app/core/main/home.jsp#moreAdmin');
            await page.waitForLoadState('domcontentloaded');
        });
    })
});