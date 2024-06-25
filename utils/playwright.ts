import { Page, test, BrowserContext } from "@playwright/test";

export abstract class PlaywrightWrapper{

    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context:BrowserContext){
        this.page = page;
        this.context = context;
    }

    async loadUrl(url: string): Promise<void>{
        try {
           await test.step(`The URL ${url} loaded`, async() => {
                await this.page.goto(url, {timeout: 60000});
           });
        } catch (error) {
            console.error("Error loading the page", error);            
        }
    }

    async storageState(path: string): Promise<void>{
        await this.context.storageState({path: path});
    }

    async type(locator: string, name: string, data: string): Promise<void>{
        await test.step(`Testbox ${name} filled with ${data}`, async()=>{
           await this.page.locator(locator).fill(data);
        });
    }

    async clearAndtype(locator: string, name: string, data: string): Promise<void>{
        await test.step(`Testbox ${name} filled with ${data}`, async()=>{
            await this.page.locator(locator).clear();
            await this.page.locator(locator).fill(data);
        });
    }

    async typeAndEnter(locator: string, name: string, data: string): Promise<void>{
        await test.step(`Testbox ${name} filled with ${data}`, async()=>{
            await this.page.locator(locator).clear();
            await this.page.locator(locator).fill(data);
            await this.page.keyboard.press('Enter');
        });

    }
    async click(locator: string, name: string, type: string): Promise<void>{
        await test.step(`The ${name} ${type} is clicked`, async() => {
            await this.page.waitForSelector(locator, {state:'attached'});
            await this.page.locator(locator).click();
       })
    }

    async forceClick(locator: string, name: string, type: string): Promise<void>{
        await test.step(`The ${name} ${type} is clicked`, async() => {
            await this.page.waitForSelector(locator, {state:'attached'});
            await this.page.locator(locator).click({force:true});
       })
    }

    async getText(locator: string): Promise<string>{
        return await test.step(`Getting text from ${locator}`, async() => {
            await this.page.waitForSelector(locator, {state:'attached'});
            return await this.page.locator(locator).innerText();
        })
    }

    async getInput(locator: string): Promise<string>{
        return await test.step(`Getting text from ${locator}`, async() => {
            await this.page.waitForSelector(locator, {state:'attached'});
            return await this.page.locator(locator).inputValue();
        })
    }

    async getTitle(): Promise<string>{
        return await test.step(`Title of the page is displayed`, async() => {   
            await this.page.waitForLoadState('networkidle');        
            return await this.page.title();
        })
    }

    async loadState(state: "load" | "domcontentloaded" | "networkidle"): Promise<void>{
        await test.step(`Waiting for the load state ${state}`, async() => {
            await this.page.waitForLoadState(state, {timeout: 40000});
        })
    }
}