import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as s3 from 'aws-cdk-lib/aws-s3';

export class ImportServiceStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const bucket = s3.Bucket.fromBucketName(this, 'ImportBucket', 'import-service-rss');

        const importProductsFile = new lambda.Function(this, "importProductsFile", {
            runtime: lambda.Runtime.NODEJS_20_X,
            code: lambda.Code.fromAsset("lambda-functions"),
            handler: "importProductsFile.handler",
            environment: {
                BUCKET_NAME: bucket.bucketName,
            },
        })

        bucket.grantReadWrite(importProductsFile);

        const api = new apigateway.RestApi(this, "ImportProductAPI", {
            restApiName: "ImportService",
            description: "This service import products for RSS AWS course.",
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS,
            },
            cloudWatchRole: true,
        });

        const apiImportProductsFile = api.root.addResource("import")

        apiImportProductsFile.addMethod("GET", new apigateway.LambdaIntegration(importProductsFile), {
            requestParameters: {
                'method.request.querystring.name': true
            }
        })
    }
}
