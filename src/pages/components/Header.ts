import { Locator, Page } from "@playwright/test";

export default class Header {

    private page: Page
    private headerBar: Locator
    private hideMenuBtn: Locator
    private smxLoginLogo: Locator

    constructor(page: Page) {
        this.page = page;
        this.headerBar = page.locator('#header');
        this.hideMenuBtn = page.locator('#hide-menu');
        this.smxLoginLogo = page.locator('.brand-logo smx-icon[icon="NiceSatmetrixWhiteLogoWithLady"]')
    }

    public async logoDisplayed() {
        await this.smxLoginLogo.waitFor({ state: 'visible' });
        return await this.smxLoginLogo.isVisible();
    }

    public async clickDisplayHideLeftPanel() {
        await this.hideMenuBtn.click();
    }


}
