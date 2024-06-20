import { APIGatewayProxyEvent } from "aws-lambda";
import { products as Products } from "./products";
import { IProducts } from "../models/products";

exports.handler = async function (event: APIGatewayProxyEvent) {
  const products: IProducts[] = Products;
  const id: string = event.pathParameters?.id || "";

  if (products.length === 0) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Products data doesn't exist" }),
    };
  }

  const product = products.find((i) => i.id === id);

  if (!product) {
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

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(product),
  };
};
