import { randomUUID } from "crypto";
import {
  DynamoDBDocumentClient,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const storeProduct = async (product: any) => {
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
