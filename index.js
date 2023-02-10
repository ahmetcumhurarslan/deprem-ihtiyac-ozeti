const OpenAi = require("openai");
const Configuration = OpenAi.Configuration;
const OpenAIApi = OpenAi.OpenAIApi;
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const eksi = require("./eksi")


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const timeout = ms => new Promise(res => setTimeout(res, ms))

function createFolder(relativePath) {
    if (!fs.existsSync(path.join(__dirname, relativePath))) fs.mkdirSync(path.join(__dirname, relativePath));
}

async function asyncMain(topicUrl, startPageNumber, endPageNumber) {
    
    if (!configuration.apiKey) {
        console.error("OpenAI API key not configured, please follow instructions in README.md");
        return;
    }

    createFolder("data");

    try {
        let start = endPageNumber>startPageNumber ? startPageNumber : endPageNumber;
        let end = endPageNumber>startPageNumber ? endPageNumber : startPageNumber;

        for (let j = end; j >= start; j--) {
            let pageNumber = j;

            let page = ""
            let entries = await eksi.getEntries(topicUrl,j);

            for (let i = 0; i < entries.length; i++) {
                page += entries[i];
                page += "\n\n"
            }


            let promptJson = generatePromptJson(page);
            const completion = await openai.createCompletion(promptJson);
            let pageIhtiyac = completion.data.choices[0].text;
            console.log("************************* " + pageNumber + " ***************************");
            console.log(pageIhtiyac);
            console.log("************************* end: " + pageNumber + " ***************************\n\n");

            createFolder(path.join("data", "page"));
            createFolder(path.join("data", "page", pageNumber.toString()));
            fs.writeFileSync(path.join(__dirname, "data", "page", pageNumber.toString(), "liste.txt"), pageIhtiyac, 'utf8');
            fs.writeFileSync(path.join(__dirname, "data", "page", pageNumber.toString(), "rawData.txt"), page, 'utf8');


            let totalIhtiyac = "\n\n\n------------------------------- page " + pageNumber + " ----------------------------------------------";
            totalIhtiyac += pageIhtiyac;
            let totalEntry = "\n\n\n------------------------------- page " + pageNumber + " ----------------------------------------------\n";
            totalEntry += page;
            fs.appendFileSync(path.join(__dirname, "data", "liste.txt"), totalIhtiyac, 'utf8');
            fs.appendFileSync(path.join(__dirname, "data", "rawData.txt"), totalEntry, 'utf8');

            //await timeout(500)
        }


    }
    catch (error) {
        console.error(error);
    }
}

function generatePromptJson(text) {
    let yazi = "sadece deprem bölgesindeki ihtiyaçlarını özetleyen bir tablo çıkar: \n\n" + text + "\n\n| ihtiyaç | adres | telefon | isim |";

    return {
        model: "text-davinci-003",
        //model: "text-ada-001",
        prompt: yazi,
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
    }
}

asyncMain('https://eksisozluk.com/6-subat-2023-deprem-yardimlasma-basligi--7568616',1310,1308);