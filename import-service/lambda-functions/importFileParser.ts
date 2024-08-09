import { S3Event } from "aws-lambda";
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import csv = require("csv-parser");
import { Readable } from "stream";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

const BUCKET_NAME = process.env.BUCKET_NAME!;
const SQS_URL = process.env.SQS_URL;
const s3Client = new S3Client({});

exports.handler = async function (event: S3Event) {
  const key = event.Records[0].s3.object.key;
  const products: any = [];

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      throw new Error("Error with getting data from S3");
    }

    const stream = response.Body as Readable;

    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (data) => products.push(data))
        .on("end", () => {
          resolve();
        })
        .on("error", (error) => {
          reject(error);
        });
    });

    const destinationKey = key.replace("uploaded", "parsed");

    const copyCommand = new CopyObjectCommand({
      Bucket: BUCKET_NAME,
      CopySource: BUCKET_NAME + "/" + key,
      Key: destinationKey,
    });

    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const copyData = await s3Client.send(copyCommand);
    await s3Client.send(deleteCommand);
  } catch (err) {
    console.log("Error processing S3 event:", err);
  }

  const sqsClient = new SQSClient({});
  console.log("SQS URL: ", SQS_URL);
  const sqsCommand = new SendMessageCommand({
    QueueUrl: SQS_URL,
    MessageBody: JSON.stringify(products),
  });

  try {
    const data = await sqsClient.send(sqsCommand);
    console.log("SQS message success", data);
  } catch (error: any) {
    console.log("SQS message error", error);
  }
};
