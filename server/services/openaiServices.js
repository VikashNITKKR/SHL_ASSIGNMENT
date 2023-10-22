const API_KEY = "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"
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
	apiKey: API_KEY,
});

const openai = new OpenAIApi(config);

const runPrompt = async (message) => {
	const prompt = `
        message:${message}
        First remove any typo in the message
        You need to filter out technologies mentioned in the input message and map them into a structured JSON object. This JSON object must adhere to the following format and be strictly parsable:
        {
            "Q": "question",
            "Frontend": [List of technologies used in frontend],
            "Backend": [List of technologies used in backend],
            "Database" : [List of technologies used as Database],
            "Infrastructure" : [List of technologies used for infrastructure],
            "Technologies": [List of Technology],
            "Project_Tittle": "Title of Project",
            "Description":"Description"
            "AND": "true/false"
        }
        Set the "AND" attribute to "true" if the message indicates that all technologies should be present in the project. If there's flexibility in choosing any one technology from all technologies in the project, set "AND" to "false".

Your response should be in the above-mentioned format, and it should be parseable without any errors when using JSON.parse(response.data.choices[0].text) in JavaScript.

Please provide the JSON object based on the information in the message.
All above mentioned fields must be present 
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
    


    const parsedResponse = JSON.parse(res);

    return parsedResponse;
};

export default runPrompt;
