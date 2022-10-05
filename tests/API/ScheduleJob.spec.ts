import { test, expect, Page } from "@playwright/test";
import Header from "../../src/pages/components/Header";
import LeftPanel from "../../src/pages/components/LeftPanel";
import LoginPage from "../../src/pages/login/LoginPage";
import ENV from "../../src/utils/env";
import AdvancedAdminPage from "../../src/pages/admin/AdvancedAdmin";

test.describe(`Advanced Admin Navigation Tests`, ()=>{

    let loginPage : LoginPage;
    let headerComponent : Header;
    let leftPanelComponent : LeftPanel;
    let advancedAdmin : AdvancedAdminPage;
    let page : Page;
    let captured_cookies : object;
    let csrf: string;
    let header_cookie: string = '';
    let user_id : string;
    let enterprise_id: string;
    let token : string;

    const baseURL = 'https://sp01app.dev.nicesatmetrix.net'

    test.beforeAll(async ({browser})=>{
        const context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        headerComponent = new Header(page);
        leftPanelComponent = new LeftPanel(page);
        advancedAdmin = new AdvancedAdminPage(page);
        await loginPage.visit(ENV.BASE_URL);
        await loginPage.loginToSatmetrix({username:ENV.USERNAME, password:ENV.PASSWORD, domain:ENV.DOMAIN});
        await expect(page).toHaveURL('https://sp01app.dev.nicesatmetrix.net/app/core/main/home.jsp');
        await expect(await headerComponent.logoDisplayed()).toBeTruthy();

        captured_cookies= await context.cookies();  
        for(var i =0; i < captured_cookies.length; i++){
            header_cookie = await header_cookie + captured_cookies[i].name + "=" + captured_cookies[i].value + "; ";
        }
        csrf = await page.locator('meta[name="_csrf"]').getAttribute('content');

        user_id = await page.evaluate(()=>{
            return userid;
        });

        enterprise_id = await page.evaluate(()=>{
            return enterpriseId;
        });

    });


    test(`Log Info`, async()=>{
        //await console.log(captured_cookies);
        //await console.log(header_cookie);
        //await console.log(csrf);
        await console.log(ENV.DOMAIN.toUpperCase());
        await console.log("userid : " + user_id);
    })


    test('Generate Bearer Token', async ({ request }) => {
        const response = await request.get(`${baseURL}/app/core/rest/token`,{headers:{'appcode': 'SCHEDULERJOB.LIST', 'content-type': 'application/json', 'tenantid': ENV.DOMAIN.toUpperCase(), 'userid': user_id, 'x-csrf-token': csrf, 'cookie': header_cookie}})
        expect(response.status()).toBe(200);
        token = await response.text();
    })

    //{headers:
    test('Schedule Job', async ({ request }) => {

    const response = await request.post
        (`${baseURL}/npxapi/system-management/v1.0/scheduler/save`,
            {
                data:{
                    jobName: "Test6",
                    jobGroup: "SP01AT2#Send Survey Invitation and Reminder Emails",
                    internaljobGroupName: "EMAIL_OUTCAST.JOB",
                    username: ENV.USERNAME,
                    scheduledStartDate: "Mon Oct 4 17:25:00 2022",
                    localeCode: "en_US",
                    timeZone: "Asia/Calcutta",
                    sourceDateFormat: "E MMM dd HH:mm:ss yyyy",
                    highPriority: "true",
                    frequencyField: [
                        "immediateFrequency"
                    ],
                    jobDetails: {
                        failurenotificationflag: true,
                        successnotificationflag: true,
                        dataErrornotificationflag: false,
                        localeCode: "en_US",
                        successnotificationemail: ENV.USERNAME,
                        failurenotificationemail: ENV.USERNAME,
                        enterpriseIdfier: ENV.DOMAIN,
                        enterpriseId: enterprise_id,
                        username: ENV.USERNAME,
                        jobRecurence: "recurring"
                    },
                    scheduledEndDate: "Wed Nov 9 10:44:00 2025"
                },
                headers:{ 'authorization': `Bearer ${token}`,
                'content-type': `application/json`,
                'tenantid': ENV.DOMAIN.toUpperCase()
            }    
        });
        expect(response.status()).toBe(200);
    })
});