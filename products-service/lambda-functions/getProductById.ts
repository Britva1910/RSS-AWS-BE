import { APIGatewayProxyEvent } from "aws-lambda";
import { products as Products } from "./products";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { IProducts } from "../models/products";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getProductById = async (id: string) => {
  const command = new GetCommand({
    TableName: "Product",
    Key: {
      id: id,
    },
  });
  const response = await docClient.send(command);
  return response.Item;
};

const getStockById = async (id: string) => {
  const command = new GetCommand({
    TableName: "Stock",
    Key: {
      product_id: id,
    },
  });

  const response = await docClient.send(command);
  return response.Item;
};

exports.handler = async function (event: APIGatewayProxyEvent) {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));

  const id = event.pathParameters?.id || "";

  try {
    const product = await getProductById(id);
    const stockData = await getStockById(id);

    const combinedData = { ...product, count: stockData?.count };

    if (Object.keys(combinedData).length > 1) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(combinedData),
      };
    } else {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "Product not found" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error }),
    };
  }
};
