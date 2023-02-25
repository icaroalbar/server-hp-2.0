// Create service client module using ES6 syntax.
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {fromIni} = require("@aws-sdk/credential-providers");

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({ 
    credentials: fromIni({profile: 'personal-account'})
 });
module.exports = { ddbClient };