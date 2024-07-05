import { SQSEvent } from "aws-lambda";

exports.handler = async function (event: SQSEvent) {
  return {
    statusCode: 400,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "Products data doesn't exist" }),
  };
};
