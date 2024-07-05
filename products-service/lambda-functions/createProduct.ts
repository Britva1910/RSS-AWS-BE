import { APIGatewayProxyEvent } from "aws-lambda";
import {
  DynamoDBDocumentClient,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";
import { validateProductInput } from "./utils/validator";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const createProduct = async (product: any) => {
  const id = randomUUID();
  const newProduct = {
    id: id,
    description: product.description,
    title: product.title,
    price: product.price,
  };

  const newCount = {
    product_id: id,
    count: product.count,
  };

  const params = {
    TransactItems: [
      {
        Put: {
          TableName: "Product",
          Item: newProduct,
        },
      },
      {
        Put: {
          TableName: "Stock",
          Item: newCount,
        },
      },
    ],
  };

  const command = new TransactWriteCommand(params);
  const response = await docClient.send(command);
  return response;
};

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
    const newProduct = {
      id: randomUUID(),
      title: productData.title,
      description: productData.description,
      price: productData.price,
      count: productData.count,
    };

    try {
      await createProduct(newProduct);

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
