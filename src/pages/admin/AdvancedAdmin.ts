import { Locator, Page, expect } from "@playwright/test";

export default class AdvancedAdminPage {

    private page : Page;

    constructor(page : Page){
        this.page = page;
    }

    public async selectAdminMenuOption(adminMenu: string){
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.locator(`h4.media-heading a:has-text('${adminMenu}')`).click();
    }


}
