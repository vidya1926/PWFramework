import test, { expect } from "@playwright/test";
import { createLead } from "../api/createLead-api";



test.describe(`Create New Lead`, async () => {

    test(`Create a new Lead`, async () => {
        const leadId = await createLead();
        console.log(leadId);
        
    })
})