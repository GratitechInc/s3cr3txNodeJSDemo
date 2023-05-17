const fetch = require("node-fetch");
const openai_host = 'https://api.openai.com/v1/models';
var s3cr3tx_email = process.env.s3cr3tx_email;
var s3cr3tx_token = process.env.s3cr3tx_token;
var s3cr3tx_code = process.env.s3cr3tx_code;
var openai_apiKey = process.env.openai_apiKey;
async function fetchS3cr3tx(input,direction) {
        try {
            const response = await fetch(`https://s3cr3tx.com/Values`, {
                method: 'GET',
                headers:{'Email':String(s3cr3tx_email),
                'APIToken':String(s3cr3tx_token),
                'AuthCode':String(s3cr3tx_code),
                'Input':String(input),
                'EorD':String(direction)
                }
            });
            const result = await response.text();
            return result;
        } catch (error) {
            console.error(error);
        }
    }
async function getS3cr3tx(input,direction) {
        var s3cr3tx = await fetchS3cr3tx(input,direction);
        return s3cr3tx;
    }
    async function fetchOpenAImodels() {
        try {
            const response = await fetch(openai_host, {
                method: 'GET',
                headers:{'Authorization':'Bearer ' + process.env.openai_apiKey
                }
            });
            const result = await response.text();
            return result;
        } catch (error) {
            console.error(error);
        }
    }
async function fetchOpenAImodelsProtected() {
        try {
            const response = await fetch(openai_host, {
                method: 'GET',
                headers:{'Authorization':'Bearer ' + await getS3cr3tx(process.env.s3cr3tx_openAIkey,'d')
                }
            });
            const result = await response.text();
            return result;
        } catch (error) {
            console.error(error);
        }
    }
async function testS3cr3tx(){
    var s3cr3tx_openAIkey = await getS3cr3tx(process.env.openai_apiKey,'e');
    process.env.s3cr3tx_openAIkey = s3cr3tx_openAIkey;
var OpenAIresponse1= await fetchOpenAImodels();
var OpenAIresponse2 = await fetchOpenAImodelsProtected();
    console.log("First Response: " + OpenAIresponse1)
    console.log("2nd Response: " + OpenAIresponse2)
}
testS3cr3tx();
