import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import testData from "../data/loginData.json"

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://login.salesforce.com");
  await page.fill("#username", testData.username);
  await page.fill("#password", testData.password);
  await page.click("#Login");
  
  
  // Save storage state into the file.
  const storageState = await context.storageState({path:"auth/salesforceLogin.json"});
  writeFileSync("auth/salesforceLogin.json", JSON.stringify(storageState));
  
  await browser.close();
}

export default globalSetup;
