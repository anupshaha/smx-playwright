import { Locator, Page } from "@playwright/test"
import { MenuOptions, SubMenuOptions } from "../../constants/navigationMenu";
import Header from "./Header";


export default class LeftPanel {
    private page: Page;
    private headerComponent: Header;
    private analyticsMenuTxt: Locator

    constructor(page: Page) {
        this.page = page;
        this.headerComponent = new Header(page);
        this.analyticsMenuTxt = page.locator(`//span[normalize-space()='Analytics']`)
    }

    public async navigate(menu: MenuOptions, submenu?: SubMenuOptions) {
        if (await this.analyticsMenuTxt.isHidden()) {
            await this.headerComponent.clickDisplayHideLeftPanel();
        }
        if (!submenu) {
            await this.page.locator(`//span[normalize-space()='${menu}']`).click();
            await this.page.waitForLoadState("domcontentloaded");
            return
        }
        if (await this.page.locator(`//ul[@id='leftMenuUL']//a[contains(text(),'${submenu}')]`).isVisible()) {
            await this.page.locator(`//ul[@id='leftMenuUL']//a[contains(text(),'${submenu}')]`).waitFor({ state: 'attached' });
            await this.page.locator(`//ul[@id='leftMenuUL']//a[contains(text(),'${submenu}')]`).click();
        }
        else if (await this.page.locator(`//ul[@id='leftMenuUL']//a[contains(text(),'${submenu}')]`).isHidden()) {
            await this.page.locator(`//span[normalize-space()='${menu}']`).click();
            await this.page.locator(`//ul[@id='leftMenuUL']//a[contains(text(),'${submenu}')]`).click();
        }
        await this.page.waitForLoadState("domcontentloaded");
    }
}