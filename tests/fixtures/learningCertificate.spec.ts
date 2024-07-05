import { test } from "../../customFixtures/salesforceFixture";
import { createJiraIssue } from "../../jira/jira-integration";

test(`Verify Salesforce Verification`, async ({ home, learning, administrator }) => {
    // Perform login
    console.log("Logging in...");
    
    // Assume login.autoLogin is already performed in the fixture, so you are already logged in
    
    // Navigate to mobilePublisher and get the new window
    console.log(`Navigating to mobilePublisher...`);
    const newWindow = await home.mobilePublisher();

    // Click Confirm button on the new window
    console.log(`Clicking Confirm button...`);
    await learning.clickConfirm(newWindow);

    // Interact with the shadow DOM element 'Learning' on the new window
    console.log(`Interacting with 'Learning'...`);
    await learning.createAndPublish(newWindow);

    await learning.clickTrailhead(newWindow);
    await learning.clickCertification(newWindow);
    await administrator.clickAdminOverview(newWindow);
    await administrator.getCertificates(newWindow);   
});

/**
* Creates a Jira issue with specified details.
* @param summary The summary or title of the Jira issue.
* @param description The description or details of the issue being logged.
*/
test.afterAll(() => {
    createJiraIssue("Salesforce Testcase", "Logging a defect in Learning test module");

})
