import {APIGatewayProxyEvent} from "aws-lambda";

exports.handler = async function (event: APIGatewayProxyEvent) {
    const fileName = event.queryStringParameters?.name;

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({message: `File name: ${fileName}`}),
    };

}