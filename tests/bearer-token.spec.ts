import { test } from "@playwright/test";
import { getBearerToken } from "../api/get-bearer-token";


    test(`Generating bearer token`, async () => {

        const token = await getBearerToken();
        console.log(token);    
   
})