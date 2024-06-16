import { APIGatewayProxyEvent } from "aws-lambda";
import { products as Products } from "./products";
import { IProducts } from "../models/products";

exports.handler = async function (event: APIGatewayProxyEvent) {
  const products: IProducts[] = Products;

  if (products.length === 0) {
    return {
      statusCode: 404,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Products not found" }),
    };
  } else {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(products),
    };
  }
};
