import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ConfirmRedirectPage } from "../pages/ConfirmRedirectPage";
import { createAndPublishPage } from "../pages/CreateAndPublishPage";

test.use({storageState: "login/salesforceLogin.json"})
test(`Verify Salesforce Verification`, async({page, context}) => {
    const home = new HomePage(page, context);
    const confirm = new ConfirmRedirectPage(page, context);
    const create = new createAndPublishPage(page, context);
    await home.init();
    await home.mobilePublisher();
    await confirm.clickConfirm();
    await create.createAndPublish();
})