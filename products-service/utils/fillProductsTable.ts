import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { products } from "../lambda-functions/products";
import { IProducts } from "../models/products";

const allProducts = products;
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const main = async (dbName: string, product: IProducts) => {
  const command = new PutCommand({
    TableName: dbName,
    Item: {
      description: product.description,
      id: product.id,
      price: product.price,
      title: product.title,
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};

allProducts.forEach((e) => {
  main("Product", e)
    .then(() => {
      console.log(`${e.title} was added`);
    })
    .catch((err) => {
      console.log(`${e.title} was not added due to an error`);
    });
});
