import { Page, BrowserContext } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";
import { ConfirmRedirectPage } from "./ConfirmRedirectPage";
import { LoginPage } from "./LoginPage";
import testData from "../data/loginData.json"

export class HomePage extends PlaywrightWrapper {

    static homeUrl = URLConstants.homeURL;

    constructor(page:Page, context: BrowserContext) {
        super(page, context);
        this.common(page, context);
        // this.setupPageListeners();
    }

    private async common(page: Page, context: BrowserContext) {
        try{
        const login = new LoginPage(page, context);
        await login.doLogin(testData.username, testData.password);
        }
        catch(error){
            console.error("Error during the common setup", error);
            throw error;
        }
    }

    /* private setupPageListeners() {
         // Setting up page event listeners
         this.page.on('load', async () => {
            console.log("Salesforce Home Page loaded. Executing after-load actions...");
            try {
                await this.executeAfterLoad();
            } catch (err) {
                console.error("Error during post-load execution:", err);
                throw err;
            }
        });
    }

    private async executeAfterLoad() {
        // Ensuring the page is fully interactive before proceeding
            console.log("Ensuring the home page is fully loaded...");
            await this.page.waitForLoadState('networkidle'); // Waits until no network connections for at least 500 ms
            console.log("Page is fully loaded. Executing tasks...");
            await this.init();
            await this.setup(); // Example: Check if setup home link is visible after page load
    } */

    public async init() {
        await this.loadApp(HomePage.homeUrl);
    }

    /* public async setup() {
        // Example task: Check for a specific element or perform an action
        const isSetupVisible = await this.page.isVisible("//a[text()='Setup Home']");
        if (isSetupVisible) {
            console.log("Setup Home link is visible.");         
        } else {
            console.error("Setup Home link is not visible, checking might be necessary.");
        }
    } */

    async clickAppLauncher() {
        await this.click("//div[@class='slds-icon-waffle']", "App Launcher", "Toggle Button");
    }

    async clickViewAll() {
        await this.click("//button[text()='View All']", "View All", "Link");
    }

    async menuSearchBox(menuInput: string) {
        await this.typeAndEnter("//input[@placeholder='Search apps or items...']", "Search apps or items", menuInput);
    }

    async clickMenu(data: string) {
        await this.click(`//p/mark[text()= '${data}']`, "Menu", "Link");
    }

    async mobilePublisher() {
        await this.windowHandle("//span[text()='Learn More']");
        const confirmRedirectPage = new ConfirmRedirectPage(this.page, this.context);
        await confirmRedirectPage.clickConfirm();
    }
}
