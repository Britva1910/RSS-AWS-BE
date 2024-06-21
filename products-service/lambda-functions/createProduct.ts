import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { IProducts } from "../models/products";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const createProduct = async (product: IProducts) => {
  const command = new PutCommand({
    TableName: "Product",
    Item: {
      description: product.description,
      id: product.id,
      price: product.price,
      title: product.title,
    },
  });

  const response = await docClient.send(command);
  return response;
};

const validateProductInput = (product: any): boolean => {
  if (!product || typeof product !== "object") {
    return false;
  }
  if (typeof product.title !== "string" || product.title.length === 0) {
    return false;
  }

  if (
    typeof product.description !== "string" ||
    product.description.length === 0
  ) {
    return false;
  }

  if (typeof product.price !== "number" || product.price < 0) {
    return false;
  }

  return true;
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
    const newProduct: IProducts = {
      id: randomUUID(),
      title: productData.title,
      description: productData.description,
      price: productData.price,
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
        body: JSON.stringify({ error: "Internal Server Error" }),
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
