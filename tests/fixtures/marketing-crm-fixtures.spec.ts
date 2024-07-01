import { test } from "../../customFixtures/salesforceFixture";
import { FakerData } from "../../utils/faker";
import { createJiraIssue } from "../../jira/jira-integration";

/**
 * Sets up the test with predefined storage state from "login/salesforceLogin.json".
 */
test.use({storageState: "login/salesforceLogin.json"})

/**
 * Test case to verify Salesforce functionality, leveraging the `home` and `marketing` fixtures.
 * @param home The HomePage instance used for navigating and interacting with the Salesforce home page.
 * @param marketing The MarketingPage instance used for performing marketing-related actions.
 */
test(`Verify a new lead created`, async({home, marketing}) => {

    // Generate fake data for the lead creation
    let salutatation = FakerData.salutationFemale();
    let lastname = FakerData.getLastName();
    let company = FakerData.company();

    // Navigate through the Salesforce UI to perform lead creation
    await home.clickAppLauncher();
    await home.clickViewAll();
    await home.menuSearchBox("Marketing CRM Classic");
    await home.clickMenu("Marketing CRM Classic");
    await marketing.clickLeads();
    await marketing.clickNew();
    await marketing.enterSalutation(salutatation);
    await marketing.enterLastName(lastname);
    await marketing.enterCompany(company);
    await marketing.clickSave();

    
    //createJiraIssue("Salesforce Testcase", "Logging a defect in Marketing test module");
})

/**
* Creates a Jira issue with specified details.
* @param summary The summary or title of the Jira issue.
* @param description The description or details of the issue being logged.
*/
test.afterAll(async () => {
    await createJiraIssue("Salesforce Testcase", "Logging a defect in Marketing test module");
})