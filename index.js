var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

AWS.config.getCredentials((err) => {
	if (err) console.log(err.stack);
	else {
		console.log('Access key:', AWS.config.credentials.accessKeyId);
		console.log('Secret access key:', AWS.config.credentials.secretAccessKey);
		console.log('Region: ', AWS.config.region);
	}
});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

/**
 * WRITE Data to DynamoDB table
 */
writeToDynamoDB = (tableName, dbKey, dataObj) => {};

/**
 * READ Data from DynamoDB table
 */
readFromDynamoDB = (tableName, dbKey, matchData) => {
	var param = {
		TableName: 'jiradata',
		Key: {
			jiraUrl: { S: 'https://theaacom.atlassian.net' }
		}
	};

	//call DynamoDB to read the item from the table
	ddb.getItem(param, (err, data) => {
		if (err) console.log('Error', err);
		else console.log('Success', data.Item);
	});
};
/**
 * UPDATE Data in DynamoDB table
 */

/**
 * DELETE data from DynamoDB table
 */
