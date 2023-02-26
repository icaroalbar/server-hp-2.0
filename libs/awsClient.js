// Create service client module using ES6 syntax.
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const aws = require("@aws-sdk/client-ses");

const { fromIni } = require("@aws-sdk/credential-providers");
const clientAws = fromIni({ profile: 'personal-account' })

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
    credentials: clientAws
});

// Create an Amazon SES service client object.
const ses = new aws.SES({
    credentials: clientAws
});

module.exports = { ddbClient, ses, aws };