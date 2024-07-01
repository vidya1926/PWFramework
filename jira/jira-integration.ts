//axios --> js library for calling any RESTful API
import axios  from "axios";

// endpoint Url, username, API key, Project key

const url = "https://project-practise.atlassian.net/rest/api/2/issue/";
const username = "subraja.sivathanu@qeagle.com";
const apiKey = "ATATT3xFfGF03nJxDeQruwvQmo3j0eLnp9xOTIKQPtOsCT7jJJFDMMJLE1B4uJ67ZPlCbb8-CWZh19SiRfj8eq-tOWVnmauIFJ-yifW1w0ZTulh3AztFurS9TyRFLwdmSXfuls_O0gKOMlpNOqvamp0uRoTIgliwUnsHRapFO1i-YvGfOJ8V8Tk=8BC2A3DC";
const projectId = "SAL"

async function createJiraIssue(summary: string, description: string) {
    //Payload 
   const issueRequestJson =  {
        "fields": {
            "project": {
                "key": projectId
            },
            "summary": summary,
            "description": description,
            "issuetype": {
                "name": "Bug"
            }
        }
    }

    //Send a Post Request
    await axios.post(url, issueRequestJson, {
        auth: {
            username: username,
            password: apiKey
        }, 
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log(`The API request is successful`);
    
}

export {createJiraIssue}