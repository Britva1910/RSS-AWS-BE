import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {S3Event} from 'aws-lambda';
import * as csv from "csv-parser";
import {Readable} from "stream";

const BUCKET_NAME = process.env.BUCKET_NAME!;
const s3Client = new S3Client({});

exports.handler = async function (event: S3Event) {
    const key = event.Records[0].s3.object.key;

    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        });

        const response = await s3Client.send(command);

        if (!response.Body) {
            throw new Error("Error with getting data from S3")
        }

        const stream = response.Body as Readable;

        const results: any[] = [];

        await new Promise<void>((resolve, reject) => {
            stream
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    console.log("Result stream: ", results);
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    } catch (err) {
        console.log("Error processing S3 event:", err);
    }
};