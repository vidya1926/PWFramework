import { Page, BrowserContext} from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";
import { URLConstants } from "../constants/urlConstants";

export class LoginPage extends PlaywrightWrapper{

    static pageUrl = URLConstants.baseURL; 

    constructor(page: Page, context: BrowserContext){
        super(page, context);
    }
    
    async doLogin(username: string, password: string){
        console.log("Login process initiated...");
        await this.loadApp(LoginPage.pageUrl);
        await this.clearAndtype("#username", "Username", username);
        await this.clearAndtype("#password", "Password", password);
        console.log("Logging In...");
        await this.click("#Login", "Login", "Button");
        console.log('Loading the page...');        
        await this.loadState('load');
        console.log('Storing state...');        
        await this.context.storageState({path:"login/salesforceLogin.json"});
        console.log(`Title of the page is: ${await this.getTitle()}`);
         
    }
    
}