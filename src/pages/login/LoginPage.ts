import { Locator, Page, expect } from "@playwright/test";

export default class LoginPage {

    private domainInputBox: Locator;
    private usernameInputBox: Locator;
    private passwordInputBox: Locator;
    private signInBtn: Locator;
    private alertMessageTxt : Locator;
    private page: Page
    private satmetrixLogoSVG: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernameInputBox = page.locator('[placeholder="Username"]');
        this.passwordInputBox = page.locator('[placeholder="Password"]');
        this.domainInputBox = page.locator('[placeholder="Site Name"]');
        this.signInBtn = page.locator('input:has-text("Sign In")');
        this.alertMessageTxt = page.locator('(//div[@class="alert alert-danger"])[1]')
        this.satmetrixLogoSVG = page.locator('#logo')
    }

    public async visit(url: string) {
        await this.page.goto(url);
    }

    public async loginToSatmetrix(options?:{username?: string, password?: string, domain?: string}){
        if(options.username){
            await this.usernameInputBox.waitFor({ state: "attached" });
            await this.usernameInputBox.fill(options.username);
        }
        if(options.password){
            await this.passwordInputBox.fill(options.password);
        }
        if(options.domain){
            await this.domainInputBox.waitFor({ state: "attached" });
            await this.domainInputBox.fill(options.domain);
        }
        await this.signInBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

     public async getErrorMessage(){
        await this.alertMessageTxt.waitFor({ state: "visible" });
        return await this.alertMessageTxt.textContent()
    }

    public async snapshotSatmetrixLogo(){
        await this.satmetrixLogoSVG.waitFor({ state: "attached" }); 
        await expect (await this.satmetrixLogoSVG.screenshot()).toMatchSnapshot('SatmetrixLogo.png')
    }

    public async snapshotLoginForm(){
        const form = await this.page.locator('div#login-forms');
        await expect(await form.screenshot()).toMatchSnapshot('login-form.png')
    }

}