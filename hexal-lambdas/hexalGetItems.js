const AWS = require('aws-sdk');

exports.handler  = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = '';
  let statusCode = 0;

  const params = {
    TableName: "Products",
  };

  try {
    const data = await documentClient.scan(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (err) {
    console.log(err);
    responseBody = `Unable to get products: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: responseBody
  };
  return response;
};
