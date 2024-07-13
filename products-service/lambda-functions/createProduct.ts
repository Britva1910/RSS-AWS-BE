import { APIGatewayProxyEvent } from "aws-lambda";
import { validateProductInput } from "./utils/validator";
import { storeProduct } from "./utils/storeProduct";

exports.handler = async function (event: APIGatewayProxyEvent) {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));

  let productData;

  try {
    productData = JSON.parse(event.body || "{}");
  } catch (e) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Invalid JSON input" }),
    };
  }

  if (validateProductInput(productData)) {
    try {
      await storeProduct(productData);

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "Product created successfully" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(error),
      };
    }
  } else {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Invalid input: please check the product fields",
      }),
    };
  }
};
