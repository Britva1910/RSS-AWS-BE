import { SQSEvent } from "aws-lambda";
import { storeProduct } from "./utils/storeProduct";
import { validateProductInput } from "./utils/validator";

exports.handler = async function (event: SQSEvent) {
  console.log("request", JSON.stringify(event));
  const products = event.Records.flatMap((record) => JSON.parse(record.body));
  console.log("products from sqs:", products);

  for (const product of products) {
    const newProduct = structuredClone(product);
    newProduct.price = Number(newProduct.price);
    newProduct.count = Number(newProduct.count);
    console.log("new product:", newProduct);
    if (validateProductInput(newProduct)) {
      try {
        const response = await storeProduct(newProduct);
        console.log(response);
      } catch (error) {
        console.error("Error storing product:", error);
      }
    } else {
      console.log("Product validation error");
    }
  }
};
