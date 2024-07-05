import { Page, test, BrowserContext, expect, Locator } from "@playwright/test";

export abstract class PlaywrightWrapper {

    /**
    * Represents a class with properties for managing page and browser context, and methods for interacting with web elements.
    */
    readonly page: Page;    // Represents the Page object associated with the current context.
    readonly context: BrowserContext;   // Represents the BrowserContext object associated with the current context.
    protected newWindow: Page | null = null;    // Stores a reference to a new window Page object, if opened.
    protected multiWindow: Page | null = null;  // Stores a reference to a multi-window Page object, if applicable.

    /**
    * Constructs a new instance of the class with the provided Page and BrowserContext.
    * @param page The Page object associated with the constructor.
    * @param context The BrowserContext object associated with the constructor.
    */
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    /**
    * Loads the specified URL in the current page context.
    * @param url The URL to be loaded.
    */
    async loadApp(url: string): Promise<void> {
        try {
            await test.step(`The URL ${url} loaded`, async () => {
                await this.page.goto(url);
            });
        } catch (error) {
            console.error("Error loading the page", error);
        }
    }

    /**
    * Captures the storage state of the current context and saves it to a specified path.
    * @param path The path where the storage state should be saved.
    */
    async storageState(path: string): Promise<void> {
        await this.context.storageState({ path: path });
    }

    /**
    * Types the provided data into an input element identified by the locator.
    * @param locator The selector to locate the input element.
    * @param name The name or description of the input element.
    * @param data The data to be typed into the input element.
    */
    async type(locator: string, name: string, data: string): Promise<void> {
        await test.step(`Testbox ${name} filled with ${data}`, async () => {
            await this.page.locator(locator).fill(data);
        });
    }

    /**
    * Clears the input element and then types the provided data into it.
    * @param locator The selector to locate the input element.
    * @param name The name or description of the input element.
    * @param data The data to be typed into the input element after clearing.
    */
    async clearAndtype(locator: string, name: string, data: string): Promise<void> {
        await test.step(`Testbox ${name} filled with ${data}`, async () => {
            await this.page.waitForSelector(locator, { state: 'visible', timeout: 40000 });  // Wait for the element to be visible
            const element = this.page.locator(locator);
            await element.clear();
            await element.fill(data);
        });
    }

    /**
    * Types the provided data into an input element and then simulates pressing Enter key.
    * @param locator The selector to locate the input element.
    * @param name The name or description of the input element.
    * @param data The data to be typed into the input element.
    */
    async typeAndEnter(locator: string, name: string, data: string): Promise<void> {
        await test.step(`Testbox ${name} filled with ${data}`, async () => {
            await this.page.locator(locator).clear();
            await this.page.locator(locator).fill(data);
            await this.page.keyboard.press('Enter');
        });
    }

    /**
    * Clicks on an element identified by the locator.
    * @param locator The selector to locate the element to be clicked.
    * @param name The name or description of the element to be clicked.
    * @param type The type or action being performed on the element (e.g., button, link).
    */
    async click(locator: string, name: string, type: string): Promise<void> {
        await test.step(`The ${name} ${type} is clicked`, async () => {
            await this.page.waitForSelector(locator, { state: 'attached' });
            await this.page.locator(locator).click();
        })
    }

    /**
    * Clicks on a dynamically loaded element identified by the locator after waiting for it to be attached.
    * Logs detailed messages for debugging.
    * @param locator The selector to locate the element to be clicked.
    * @param name The name or description of the element to be clicked.
    * @param type The type or action being performed on the element (e.g., button, link).
    */
    async dynamicElementClick(locator: string, name: string, type: string): Promise<void> {
         await test.step(`The ${name} ${type} is clicked`, async() => {
             console.log(`Waiting for selector: ${locator}`);
             try {
                 await this.page.waitForSelector(locator, { state: 'attached', timeout: 60000 }); // Increased timeout
                 console.log(`Selector ${locator} is now attached. Clicking on it.`);
                 await this.page.locator(locator).click();
                 console.log(`Clicked on ${locator}`);
             } catch (error) {
                 console.error(`Failed to find or click on the selector: ${locator}`, error);
                 throw error;
             }
         });
     } 

    /**
    * Clicks on an element identified by the locator forcefully, bypassing any visibility checks.
    * @param locator The selector to locate the element to be clicked.
    * @param name The name or description of the element to be clicked.
    * @param type The type or action being performed on the element (e.g., button, link).
    */
    async forceClick(locator: string, name: string, type: string): Promise<void> {
        await test.step(`The ${name} ${type} is clicked`, async () => {
            await this.page.waitForSelector(locator, { state: 'attached' });
            await this.page.locator(locator).click({ force: true });
        })
    }

    /**
    * Retrieves the inner text of an element identified by the locator.
    * @param locator The selector to locate the element from which to get the text.
    * @returns A promise that resolves to the text content of the element.
    */
    async getText(locator: string): Promise<string> {
        return await test.step(`Getting text from ${locator}`, async () => {
            await this.page.waitForSelector(locator, { state: 'attached' });
            return await this.page.locator(locator).innerText();
        })
    }

    /**
    * Retrieves the current input value of an input element identified by the locator.
    * @param locator The selector to locate the input element.
    * @returns A promise that resolves to the current value of the input element.
    */
    async getInput(locator: string): Promise<string> {
        return await test.step(`Getting text from ${locator}`, async () => {
            await this.page.waitForSelector(locator, { state: 'attached' });
            return await this.page.locator(locator).inputValue();
        })
    }

    /**
    * Retrieves the title of the current page.
    * @returns A promise that resolves to the title of the page.
    */
    async getTitle(): Promise<string> {
        return await test.step(`Title of the page is displayed`, async () => {
            await this.page.waitForLoadState('networkidle');
            return await this.page.title();
        })
    }

    /**
    * Waits for a specific load state of the page (e.g., load, domcontentloaded, networkidle).
    * @param state The state to wait for (load, domcontentloaded, networkidle).
    */
    async loadState(state: "load" | "domcontentloaded" | "networkidle"): Promise<void> {
        await test.step(`Waiting for the load state ${state}`, async () => {
            await this.page.waitForLoadState(state, { timeout: 40000 });
        })
    }

    /**
    * Logs the number of currently open browser pages.
    */
    async windowCount(): Promise<void> {
        await test.step(`Number of pages opened`, async () => {
            const totalPages = this.context.pages();
            console.log(totalPages);
            console.log(`Number of pages opened: ${totalPages.length}`);
        })
    }

    /**
    * Logs the titles of all currently open browser pages.
    */
    async allWindowTitles(): Promise<void> {
        await test.step(`Titles of the pages are displayed`, async () => {
            const pages = this.context.pages();
            for (let page of pages) {
                const title = await page.title();
                console.log(`Title of the page: ${title}`);
            }
        })
    }

    /**
    * Opens a new browser window by clicking on an element identified by the locator.
    * Waits for the new window to be available and returns its Page object.
    * @param locator The selector to locate the element that triggers the new window.
    * @param name The name or description of the element to be clicked.
    * @returns A promise that resolves to the Page object representing the new window.
    */
    async windowHandle(locator: string, name: string): Promise<Page> {
        return await test.step(`Window is opened`, async () => {
            console.log(`Setting up promise to wait for new page event.`);
            const windowPromise = this.context.waitForEvent('page');

            console.log(`Clicking on locator: ${locator} to open new window.`);
            await this.click(locator, name, "Button");

            console.log(`Waiting for the new window to be available.`);
            const newWindow = await windowPromise;

            console.log(`New window found, waiting for load state.`);
            await newWindow.waitForLoadState('load');

            const url = newWindow.url();
            console.log(`New window detected: URL = ${url}`);
            await expect(newWindow).toHaveURL(url);

            return newWindow;
        });
    }

    async delayedType(selector: string, value: string) {
        await this.page.delayedFill(selector, value);
    }

    async delayedclick(selector: string) {
        await this.page.clickAndDelay(selector);
    }
}