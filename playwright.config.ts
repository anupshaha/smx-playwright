import { PlaywrightTestConfig } from "@playwright/test";
const test_env = process.env.test_env;
let locale_code = process.env.locale_code;


if (!test_env || ![`sp01at2`, `sp01at4`].includes(test_env)) {
    console.log(`Please provide a correct enterprise value like "npx cross-env test_env=sp01at2|sp01at4"`);
    process.exit();
}

if (!locale_code || ![`enUS`, `jaJP`].includes(locale_code)) {
    process.env.locale_code=`enUS`;
    console.log(`Locale code value is not provided hence executing with locale = enUS"`);
    //process.exit();
}

const config: PlaywrightTestConfig = {
    timeout: 120000,
    retries: 0,
    reporter: [["list"], ["html"], ["junit"]],
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 120000,
        ignoreHTTPSErrors: true,
        video: "retain-on-failure",
        screenshot: "only-on-failure"
    },
    globalSetup:"src/utils/globalSetup.ts",
    projects: [
        {
            name: "Chromium",
            use: { browserName: "chromium" }
        },
        {
            name: "Firefox",
            use: { browserName: "firefox" }
        },
        {
            name: "Webkit",
            use: { browserName: "webkit" }
        },
    ],
}

export default config