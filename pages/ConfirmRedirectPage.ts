import { Page, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";

export class ConfirmRedirectPage extends PlaywrightWrapper{

    constructor(page: Page, context: BrowserContext){
        super(page, context);
    }

    async clickConfirm() {  
        const window = this.getNewWindow();      
        if (window) {
            // Perform actions on the new window (page)
            await window.waitForSelector("//button[text()='Confirm']", { state: 'visible' });
            await window.click("//button[text()='Confirm']");
        } else {
            console.log('New window is not available');
        }
    }
}