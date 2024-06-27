import { Page, test, BrowserContext, Locator } from "@playwright/test";

export abstract class PlaywrightWrapper {

    readonly page: Page;
    readonly context: BrowserContext;
    protected newWindow: Page | null = null;
    protected multiWindow: Page | null = null;

    constructor(page: Page, context:BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async loadApp(url: string): Promise<void> {
        try {
           await test.step(`The URL ${url} loaded`, async() => {
                await this.page.goto(url, {timeout: 60000});
           });
        } catch (error) {
            console.error("Error loading the page", error);            
        }
    }

    async storageState(path: string): Promise<void> {
        await this.context.storageState({path: path});
    }

    async type(locator: string, name: string, data: string): Promise<void> {
        await test.step(`Testbox ${name} filled with ${data}`, async()=>{
           await this.page.locator(locator).fill(data);
        });
    }

    async clearAndtype(locator: string, name: string, data: string): Promise<void> {
        await test.step(`Testbox ${name} filled with ${data}`, async() => {
            await this.page.waitForSelector(locator, { state: 'visible', timeout: 40000 });  // Wait for the element to be visible
            const element = this.page.locator(locator);
            await element.clear();
            await element.fill(data);
        });
    }

    async typeAndEnter(locator: string, name: string, data: string): Promise<void> {
        await test.step(`Testbox ${name} filled with ${data}`, async() => {
            await this.page.locator(locator).clear();
            await this.page.locator(locator).fill(data);
            await this.page.keyboard.press('Enter');
        });

    }
    async click(locator: string, name: string, type: string): Promise<void> {
        await test.step(`The ${name} ${type} is clicked`, async() => {
            await this.page.waitForSelector(locator, {state:'attached'});
            await this.page.locator(locator).click();
       })
    }

    async forceClick(locator: string, name: string, type: string): Promise<void> {
        await test.step(`The ${name} ${type} is clicked`, async() => {
            await this.page.waitForSelector(locator, {state:'attached'});
            await this.page.locator(locator).click({force:true});
       })
    }

    async getText(locator: string): Promise<string> {
        return await test.step(`Getting text from ${locator}`, async() => {
            await this.page.waitForSelector(locator, {state:'attached'});
            return await this.page.locator(locator).innerText();
        })
    }

    async getInput(locator: string): Promise<string> {
        return await test.step(`Getting text from ${locator}`, async() => {
            await this.page.waitForSelector(locator, {state:'attached'});
            return await this.page.locator(locator).inputValue();
        })
    }

    async getTitle(): Promise<string> {
        return await test.step(`Title of the page is displayed`, async() => {   
            await this.page.waitForLoadState('networkidle');        
            return await this.page.title();
        })
    }

    async loadState(state: "load" | "domcontentloaded" | "networkidle"): Promise<void> {
        await test.step(`Waiting for the load state ${state}`, async() => {
            await this.page.waitForLoadState(state, {timeout: 40000});
        })
    }

    async windowCount(): Promise<void> {
        await test.step(`Number of pages opened`, async() => {
            const totalPages = this.context.pages();
            console.log(totalPages);
            console.log(`Number of pages opened: ${totalPages.length}`);            
        })        
    }

    async allWindowTitles(): Promise<void> {
        await test.step(`Titles of the pages are displayed`, async() => {
            const pages = this.context.pages();
            for(let page of pages){
                const title = await page.title();
                console.log(`Title of the page: ${title}`);
            }            
        })
    }

    async multipleWindowHandle(locator: string, windowTitle: string): Promise<void> {
        await test.step(`Window is opened`, async() => {
            const [multiWindow] = await Promise.all([
                this.context.waitForEvent('page'),
                this.page.locator(locator).click(),
            ])
            this.multiWindow = multiWindow;
            console.log(`Title of the new window being in focus: ${multiWindow.title()}`);  
            const pages = this.context.pages();
                for(let page of pages) {
                    const pageTitle = await page.title();
                    console.log(`Title of the page: ${pageTitle}`);
                    const pageUrl = page.url();
                    console.log(`The page URL: ${pageUrl}`);                                        
                    if(pageTitle === windowTitle) {
                        console.log(`Switching to the page with title: ${windowTitle}`);
                        await page.bringToFront();
                        return page;
                    } else {
                    console.log(`No page is found`);
                    return null;
                    }
                } 
        })
    }

    async windowHandle(locator: string): Promise<void> {
        await test.step(`Window is opened`, async() => {
            const [newWindow] = await Promise.all([
                this.context.waitForEvent('page'),
                this.page.locator(locator).click({timeout: 60000}),
            ]);
            //Store the new window instance
            this.newWindow = newWindow;
            await newWindow.waitForLoadState('load'); 
            console.log(`Title of the new window being in focus: ${await newWindow.title()}`);  
            /* const pages = this.context.pages();
                for(let page of pages) {
                    const pageTitle = await page.title();
                    console.log(`Title of the page: ${pageTitle}`);
                    const pageUrl = page.url();
                    console.log(`The page URL: ${pageUrl}`);                                        
                } */
        })
    }

    async findShadowElement(locatorType: shadowLocator, locatorValue: string): Promise<any> {
        let locator:any;
        switch (locatorType) {
            case "text":
                locator = this.page.getByText(locatorValue);
                await this.click(locator, locatorValue, "Shadow Element")
                break;
            case "testId":
                locator = this.page.getByTestId(locatorValue);
                await this.click(locator, locatorValue, "Shadow Element")
                break;
            case "label":
                locator = this.page.getByLabel(locatorValue);
                await this.click(locator, locatorValue, "Shadow Element")
                break;
            case "role":
                locator = this.page.getByRole('link', {name: locatorValue});
                await this.click(locator, locatorValue, "Shadow Element")
                break;
            case "placeholder":
                locator = this.page.getByPlaceholder(locatorValue);
                await this.click(locator, locatorValue, "Shadow Element")
                break;
            case "title":
                locator = this.page.getByTitle(locatorValue);
                await this.click(locator, locatorValue, "Shadow Element")
                break;
            default:
                throw new Error(`Unsupported locator type: ${locatorType}`);
        }
        return locator;
    }

    getNewWindow(): Page | null {
        return this.newWindow;
    }

    getMultipleWindow(): Page | null {
        return this.multiWindow;
    }
}