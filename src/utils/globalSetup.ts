import { FullConfig } from "@playwright/test";

import * as dotenv from "dotenv"

async function globalSetUp(config: FullConfig) {
    if (process.env.test_env) {
        dotenv.config({
            path: `test_data/env/.env.${process.env.test_env}`,
            override: true
        })
    }
    if(process.env.locale){
        dotenv.config({
            path: `test_data/locale/.env.${process.env.locale_code}`,
            override: true
        })
    }
}
export default globalSetUp;