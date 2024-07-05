import { test } from "../../customFixtures/salesforceFixture";
import { createJiraIssue } from "../../jira/jira-integration";
import { readCsvFile } from "../../data-utility/csvUtils";
import { loadEnvFile, getEnvVariable } from "../../data-utility/envUtils";
import { readExcelFile } from "../../data-utility/excelUtils";
import { readJsonFile } from "../../data-utility/jsonUtils";

test.describe(`Data driven test`, async () => {
    let csvData: any[];
    let envData: { [key: string]: string | undefined };
    let excelData: any[];
    let jsonData: any[];

    test.beforeAll(async () => {
        // Read the CSV file
    csvData = await readCsvFile('./data/service.csv');

    // Load environment file and read variables
    loadEnvFile('./data/service.env');
    envData = {
      Menu: getEnvVariable('Menu'),
      SubMenu: getEnvVariable('SubMenu'),
      AccountName: getEnvVariable('AccountName'),
      AccountNumber: getEnvVariable('AccountNumber'),
      Type: getEnvVariable('Type'),
      Industry: getEnvVariable('Industry'),
      Rating: getEnvVariable('Rating')
    };

    // Read the Excel file
    excelData = readExcelFile('./data/service.xlsx');

    // Read the JSON file
    jsonData = await readJsonFile('./data/service.json');
    })
    test(`Test with csv data`, async ({ home, account }) => {

        await home.clickAppLauncher();
        await home.clickViewAll();
        for(const row of csvData) {
            await home.menuSearchBox(row.Menu);
            await home.clickMenu(row.SubMenu);
            await account.enterAccountName(row.AccountName);
            await account.enterAccountNumber(row.AccountNumber);
            await account.chooseType(row.Type);
            await account.chooseIndustry(row.Industry);
            await account.chooseRating(row.Rating);
        }        
    });
    
    test(`Test with env data`, async ({ home, account }) => {

        await home.clickAppLauncher();
        await home.clickViewAll();
        await home.menuSearchBox(envData.Menu || '');
        await home.clickMenu(envData.SubMenu || '');
        await account.enterAccountName(envData.AccountName || '');
        await account.enterAccountNumber(envData.AccountNumber || '');
        await account.chooseType(envData.Type || '');
        await account.chooseIndustry(envData.Industry || '');
        await account.chooseRating(envData.Rating || '');       
    });

    test(`Test with excel data`, async ({ home, account }) => {

        await home.clickAppLauncher();
        await home.clickViewAll();
        for(const row of excelData) {
            await home.menuSearchBox(row.Menu);
            await home.clickMenu(row.SubMenu);
            await account.enterAccountName(row.AccountName);
            await account.enterAccountNumber(row.AccountNumber);
            await account.chooseType(row.Type);
            await account.chooseIndustry(row.Industry);
            await account.chooseRating(row.Rating);
        }        
    });

    test(`Test with JSON data`, async ({ home, account }) => {

        await home.clickAppLauncher();
        await home.clickViewAll();
        for(const row of jsonData) {
            await home.menuSearchBox(row.Menu);
            await home.clickMenu(row.SubMenu);
            await account.enterAccountName(row.AccountName);
            await account.enterAccountNumber(row.AccountNumber);
            await account.chooseType(row.Type);
            await account.chooseIndustry(row.Industry);
            await account.chooseRating(row.Rating);
        }        
    });
    /**
    * Creates a Jira issue with specified details.
    * @param summary The summary or title of the Jira issue.
    * @param description The description or details of the issue being logged.
    */
    test.afterAll(() => {
        createJiraIssue("Salesforce Testcase", "Logging a defect in Learning test module");
    
    })
})
