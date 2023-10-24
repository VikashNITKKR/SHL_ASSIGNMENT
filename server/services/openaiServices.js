import config from "../../config/env"
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
 apiKey: config.API_KEY,
});

const openai = new OpenAIApi(configuration);

const runPrompt = async (message) => {
    console.log("printing message ", message)
 const prompt = `
        message:${message}
        First remove any typo in the message
        Please provide a JSON object based on the information in the following message:
The JSON object must adhere to the following format and be strictly parsable:

{
    "Q": "question",
    "Frontend": [List of technologies used in frontend],
    "Backend": [List of technologies used in backend],ß
    "Database" : [List of technologies used as Database],
    "Infrastructure" : [List of technologies used for infrastructure],
    "Technologies": [List of Technology],
    "Project_Tittle": "Title of Project",
    "Description":"Description"
    "AND": "true/false"
}


Please set the "AND" attribute to "true" if the message indicates that all technologies should be present in the project. If there's flexibility in choosing any one technology from all technologies in the project, set "AND" to "false".

Example:

messgae : I'm building a new web app using Python, Django, and PostgreSQL. I'm looking for some advice on how to choose the right infrastructure for my project.

Expected JSON object:

{
    "Q": "What infrastructure technologies should I use for my new web app?",
    "Frontend": ["Python", "Django"],
    "Backend": ["Python", "Django"],
    "Database": ["PostgreSQL"],
    "Infrastructure": [],
    "Technologies": ["Python", "Django", "PostgreSQL"],
    "Project_Tittle": "New Web App",
    "Description": "I'm building a new web app using Python, Django, and PostgreSQL. I'm looking for some advice on how to choose the right infrastructure for my project.",
    "AND": "false"
}
This JSON object can be parsed without any errors when using JSON.parse(response.data.choices[0].text) in JavaScript.
    `;
 const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt,
  max_tokens: 2048,
  temperature: 1,
 });

 const parsableJSONresponse = response.data.choices[0].text;
    var flg = 0;
    var res = "";
    var i = 0;
    do{
        if (parsableJSONresponse.charAt(i) == "{") {
            flg = 1;
        }
        if (flg) {
            res = res + parsableJSONresponse.charAt(i);
        }
    }while (parsableJSONresponse.charAt(i++) != "}")
    

    console.log(res)
    const parsedResponse = JSON.parse(res);
    
    return parsedResponse;
};

export default runPrompt;