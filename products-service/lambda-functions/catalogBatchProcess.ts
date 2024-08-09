import { SQSEvent } from "aws-lambda";
import { storeProduct } from "./utils/storeProduct";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { validateProductInput } from "./utils/validator";
import { getMessage } from "./utils/getMessage";

exports.handler = async function (event: SQSEvent) {
  const SNS_ARN = process.env.SNS_ARN;
  console.log("request", JSON.stringify(event));
  const products = event.Records.flatMap((record) => JSON.parse(record.body));
  console.log("products from sqs:", products);

  const snsClient = new SNSClient();
  for (const product of products) {
    const newProduct = structuredClone(product);
    newProduct.price = Number(newProduct.price);
    newProduct.count = Number(newProduct.count);
    console.log("new product:", newProduct);
    if (validateProductInput(newProduct)) {
      try {
        const response = await storeProduct(newProduct);
        const sns_command = new PublishCommand({
          TopicArn: SNS_ARN,
          Message: getMessage(product),
          MessageAttributes: {
            count: {
              DataType: "Number",
              StringValue: product.count.toString(),
            },
          },
        });
        await snsClient.send(sns_command);
        console.log(response);
      } catch (error) {
        console.error("Error storing product:", error);
      }
    } else {
      console.log("Product validation error");
    }
  }
};
