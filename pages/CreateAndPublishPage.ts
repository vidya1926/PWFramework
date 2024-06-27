import { Page, BrowserContext,expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";

export class createAndPublishPage extends PlaywrightWrapper{

    
    constructor(page: Page, context: BrowserContext){
        super(page, context);
    }

    async createAndPublish() {
        const window = this.getNewWindow();
        if(window){
        const title = await window.title();
        expect(title).toContain("Create and Publish Custom-Branded Mobile Apps");
        await this.findShadowElement('text', 'Learning');
        } else {
            console.log('New window is not available');
        }
    }
}