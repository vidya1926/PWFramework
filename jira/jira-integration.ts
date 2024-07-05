import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";

const url = "https://2023-bootcamp.atlassian.net/rest/api/2/issue/"
const username = "hari@testleaf.com"
const apiKey = "ATATT3xFfGF0cxPe9amm2Eh2povMKFdeArlU0Fb_VIFH7Qh3lYf73V0lLmXTdpsbteIGFH6f9eBYOPJ91gUTSf562osZ0TyPgIFF_WfVnFbYD-D0brV5dwBBQNgXtvq_9qA93uvejQXu5lkAzGSfn-BEd_alGxsGxmrI5n6KHjlqU7urNqlVKcE=265CCF24"
const projectId = "S10"

async function createJiraIssue(summary: string, description: string) {

    const issueRequestJson = {
        "fields": {
            "project":
            {
                "key": projectId
            },
            "summary": summary,
            "description": description,
            "issuetype": {
                "name": "Bug"
            }
        }
    };

    axios.post(url, issueRequestJson, {
        auth: {
            username: username,
            password: apiKey
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log("The API request is successful")
}

async function updateJiraIssue(issueKey: string, folderPath: string) {
    const formData = new FormData();
    console.log(`Current working directory: ${process.cwd()}`);
    const absoluteFolderPath = path.resolve(folderPath);

    console.log(`Absolute path of folderPath: ${absoluteFolderPath}`);
    //const files = fs.readdirSync(folderPath);
    //console.log(files.entries())

    // Append each file to FormData
    const file = "video.webm";
    const filePath = path.join(absoluteFolderPath, file);
    console.log(filePath);

    // Check if it's a file before attempting to read
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
        const fileSizeInBytes = stats.size;
        formData.append('file', fs.createReadStream(filePath), { filename: file, knownLength: fileSizeInBytes });
    } else {
        console.warn(`${file} is a directory and won't be included in the upload.`);
    }
    

    try {
        console.log(`${url}${issueKey}/attachments`);
        // Send a Post Request
       await axios.post(`${url}${issueKey}/attachments`, formData, {
            auth: {
                username: username,
                password: apiKey
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Atlassian-Token': 'no-check'
            }
        }).then((payload) => {
            console.log('payload');
            console.log(payload);

        }).catch((e) => {
            console.log('error');
            console.log(e);


        });

        console.log('Attachment uploaded successfully');
    } catch (error) {
        console.error('Attachment upload failed:', error.message);
    }
}

export { createJiraIssue, updateJiraIssue }