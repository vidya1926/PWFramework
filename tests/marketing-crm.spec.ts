import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.use({storageState: "login/salesforceLogin.json"})
test(`Verify Salesforce Verification`, async({page, context}) => {
    const home = new HomePage(page, context);
    await home.init();
    await home.clickAppLauncher();
    await home.clickViewAll();
    await home.menuSearchBox("Marketing CRM Classic");
    await home.clickMenu("Marketing CRM Classic");
})