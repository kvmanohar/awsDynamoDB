const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
AWS.config.getCredentials((err) => {
	if (err) console.log(err.stack);
	else {
		console.log("Access key:", AWS.config.credentials.accessKeyId);
		console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
		console.log("Region: ", AWS.config.region);
	}
});

const tableName = "jiradata";

writeToDynamoDB = (tableName, jsonObj) => {
	/**
	 * WRITE Data to DynamoDB table
	 */
	const docClient = new AWS.DynamoDB.DocumentClient();
	var params = {
		TableName: tableName,
		Item: JSON.parse(JSON.stringify(jsonObj))
	};

	docClient.put(params, (err, data) => {
		if (err) console.log("WRITE Error", err);
		else console.log("WRITE Successful", data);
	});
};

readFromDynamoDB = (tableName, dbKeyObj) => {
	/**
	 * READ Data from DynamoDB table
	 */
	const docClient = new AWS.DynamoDB.DocumentClient();
	var param = {
		TableName: tableName,
		Key: dbKeyObj
	};

	//call DynamoDB to read the item from the table
	docClient.get(param, (err, data) => {
		if (err) console.log("READ Error", err);
		else console.log("READ Successful", data.Item);
	});
};

updateDynamoDB = (addParam) => {
	/**
	 * UPDATE Data in DynamoDB table
	 */
	var docClient = new AWS.DynamoDB.DocumentClient();
	docClient.update(addParam, (err, data) => {
		if (err) console.log("UPDATE Error", err);
		else console.log("UPDATE Successful", data);
	});
};

deleteFromDynamoDB = (tableName, dbKey) => {
	/**
	 * DELETE record from DynamoDB table
	 */
	var docClient = new AWS.DynamoDB.DocumentClient();
	var param = {
		TableName: tableName,
		Key: dbKey
	};
	docClient.delete(param, (err, data) => {
		if (err) console.log("DELETE Error", err);
		else console.log("DELETE Successful", data);
	});
};

const dbKey = {
	jiraUrl: "https://theaacom.atlassian.net"
};
const jsonObj = {
	users: ["manTest"],
	jiraUrl: "https://theaacom.atlassian.net",
	fieldsUdpated: "2019-08-28T14:57:20.044Z",
	totalFields: 2,
	customFields: [
		{
			id: "customfield_44400",
			displayName: "Estimate (Raw Dev Hours)",
			clauseNames: "cf[44400]",
			type: "number",
			customType: "float"
		},
		{
			id: "customfield_19200",
			key: "customfield_19200",
			displayName: "Penetration Test Reference",
			clauseNames: "cf[19200]",
			type: "string",
			customType: "textfield"
		}
	]
};
const updateParams1 = {
	TableName: tableName,
	Key: dbKey,
	UpdateExpression: "SET #cf = list_append(#cf, :t)",
	ExpressionAttributeNames: { "#cf": "customFields" },
	ExpressionAttributeValues: {
		":t": [
			{
				clauseNames: "cf[99900]",
				customType: "float",
				displayName: "TestField9",
				id: "customfield_99900",
				type: "number"
			}
		]
	}
}; //Parameter to update one extra field item to the custome field list.

const updateParams2 = {
	TableName: tableName,
	Key: dbKey,
	UpdateExpression: "SET #nf = :t",
	ExpressionAttributeNames: { "#nf": "NewField" },
	ExpressionAttributeValues: {
		":t": {
			NewItmFld1: "Test Fld 1",
			NewItmFld2: "Test Fld 2"
		}
	}
}; //Update parameter to add new attribute to the item in the table. Here NewField is a new attribute to the field.

// deleteFromDynamoDB(tableName, dbKey);
// writeToDynamoDB(tableName, jsonObj);
// updateDynamoDB(updateParams2);
readFromDynamoDB(tableName, dbKey);
