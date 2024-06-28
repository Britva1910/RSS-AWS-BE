import {APIGatewayProxyEvent} from "aws-lambda";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {
    getSignedUrl,
} from "@aws-sdk/s3-request-presigner";


interface ICreateUrlProps {
    region: string;
    bucket: string;
    key: string;
}

const BUCKET_NAME = process.env.BUCKET_NAME!;
const s3Client = new S3Client({})

exports.handler = async function (event: APIGatewayProxyEvent) {
    const fileName = event.queryStringParameters?.name;
    const KEY = `uploaded/${fileName}`;

    if (!fileName) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": '*'
            },
            body: JSON.stringify({message: 'Missing file name in query parameters'}),
        };
    }

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: KEY
    })

    try {
        const preSignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600
        })

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": '*'
            },
            body: JSON.stringify({url: preSignedUrl}),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": '*'
            },
            body: JSON.stringify({message: 'Could not generate signed URL', error}),
        };
    }
}