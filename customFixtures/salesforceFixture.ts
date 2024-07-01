import { test as baseTest } from "@playwright/test"
import { createAndPublishPage } from "../pages/CreateAndPublishPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import testData from "../data/loginData.json"
import { MarketingPage } from "../pages/MarketingPage";

    /**
    * Represents a fixture for Salesforce-related tests, providing access to specific pages and functionalities.
    * Contains methods for setting up and using different pages within the Salesforce application.
    */
type salesforceFixture = {
    login: LoginPage                // Represents the LoginPage instance for handling login operations. 
    home: HomePage                  // Represents the HomePage instance for interacting with the home page.
    learning: createAndPublishPage  // Represents the createAndPublishPage instance for managing learning content.
    marketing: MarketingPage        // Represents the MarketingPage instance for managing marketing activities.
}

    /**
    * Defines a test fixture for Salesforce tests, extending a base test setup with specific fixtures.
    */
export const test = baseTest.extend<salesforceFixture> ({

    /**
     * Sets up the login fixture, initializing the LoginPage and performing automatic login.
     * @param page The current Page instance.
     * @param context The current BrowserContext instance.
     * @param use Function to provide access to the login instance.
     */
    login: async({ page,context }, use) => {
        const login = new LoginPage(page, context);
        await login.skipLogin(testData.username, testData.password);
        await use(login);
    },

    /**
     * Sets up the home page fixture, initializing the HomePage instance.
     * @param page The current Page instance.
     * @param context The current BrowserContext instance.
     * @param use Function to provide access to the home instance.
     */
    home: async({ page,context }, use) => {
        const home = new HomePage(page, context);
        await use(home);
    },

     /**
     * Sets up the learning page fixture, initializing the createAndPublishPage instance.
     * @param page The current Page instance.
     * @param context The current BrowserContext instance.
     * @param use Function to provide access to the learning instance.
     */
    learning: async({ page,context }, use) => {
        const learning = new createAndPublishPage(page, context);
        await use(learning);
    },

    /**
    * Initializes the marketing fixture by creating a MarketingPage instance and passing it to the use function.
    * @param page The Page object associated with the current page context.
    * @param context The BrowserContext object associated with the current context.
    * @param use The function to invoke with the created MarketingPage instance.
    */
    marketing: async({ page,context }, use) => {
        const marketing = new MarketingPage(page, context);
        await use(marketing);
    },
})