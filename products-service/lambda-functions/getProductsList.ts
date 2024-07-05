import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getAllProducts = async () => {
  const command = new ScanCommand({
    TableName: "Product",
  });

  const response = await docClient.send(command);
  return response.Items;
};

const getAllStockData = async () => {
  const command = new ScanCommand({
    TableName: "Stock",
  });

  const response = await docClient.send(command);
  return response.Items;
};

exports.handler = async function (event: APIGatewayProxyEvent) {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));
  try {
    const products = await getAllProducts();
    const stockData = await getAllStockData();

    const combinedData = products?.map((i) => {
      const stockProduct = stockData?.find((e) => e.product_id === i.id) || {
        count: 0,
      };
      return { ...i, count: stockProduct.count };
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(combinedData),
    };
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
