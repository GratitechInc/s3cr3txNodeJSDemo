var https = require('https');

var openai_host = 'api.openai.com';
var s3cr3tx_host = 's3cr3tx.com';
var s3cr3tx_email = process.env.s3cr3tx_email;
var s3cr3tx_token = process.env.s3cr3tx_token;
var s3cr3tx_code = process.env.s3cr3tx_code;
openai_apiKey = process.env.openai_apiKey;

var options = {
    host : String(openai_host), // here only the domain name
    // (no http/https !)
    port : 443,
    path : '/v1/models', // the rest of the url with parameters if needed
    method : 'GET', // do GET
    headers : {'Authorization':'Bearer '+ String(openai_apiKey)}
};

console.info('Options prepared for first OpenAI API call:');
console.info(options);
console.info('Do the First GET call to OpenAI API');

// do the GET request With clear text API Key stored in env variable
var reqGet = https.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
    res.on('data', function(d) {
        console.info('First GET result:\n');
        process.stdout.write(d);
        console.info('\n\nCall completed');
    });

});

reqGet.end();
reqGet.on('error', function(e) {
    console.error(e);
});
function getS3cr3tx(input,EoD){
    var s3cr3txOptions = {
        host : String(s3cr3tx_host), // here only the domain name
        port : 443,
        path : '/Values', // the rest of the url with parameters if needed
        method : 'GET', // do GET
        headers : {'Email':String(s3cr3tx_email),
        'APIToken':String(s3cr3tx_token),
        'AuthCode':String(s3cr3tx_code),
        'Input':String(input),
        'EoD':String(EoD)
        }
    };
    var s3cr3txreqGet = https.request(s3cr3txOptions, function(res) {
        console.log("statusCode Fromm S3cr3tx.com : ", res.statusCode);
        res.on('data', function(d) {
            return String(d);
            });
       });
    s3cr3txreqGet.end();
    s3cr3txreqGet.on('error', function(e) {
    console.error(e);
});
}
process.env.s3cr3tx_Protected_OpenAI_Key = getS3cr3tx(process.env.openai_apiKey,'e');
var options2 = {
    host : String(openai_host), // here only the domain name
    // (no http/https !)
    port : 443,
    path : '/v1/models', // the rest of the url with parameters if needed
    method : 'GET', // do GET
    headers : {'Authorization':'Bearer '+ getS3cr3tx(String(process.env.s3cr3tx_Protected_OpenAI_Key),'d')}
};

console.info('Options prepared For 2nd call to OpenAI API with s3cr3tx Protection:');
console.info(options);
console.info('Do the 2nd GET call using protectd API Key Env Var');

// do the GET request With S3cr3tx Protected API Key stored in env variable
var reqGet = https.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
    res.on('data', function(d) {
        console.info('GET 2nd call to OpenAI results:\n');
        process.stdout.write(d);
        console.info('\n\n2nd Call to OpemAI with Protected API Key completed');
    });

});

reqGet.end();
reqGet.on('error', function(e) {
    console.error(e);
});
