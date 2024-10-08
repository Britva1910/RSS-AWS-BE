import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { aws_dynamodb as dynamodb } from "aws-cdk-lib";
import { aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Topic, SubscriptionFilter } from "aws-cdk-lib/aws-sns";
import { EmailSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import {
  SNS_EMAIL_ADD,
  SNS_EMAIL_MAIN,
} from "../lambda-functions/constants/sns.emails";

export class ProductsServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const catalogItemsQueue = new cdk.aws_sqs.Queue(this, "catalogItemsQueue");
    const createProductTopic = new Topic(this, "createProductTopic");

    const productTable = dynamodb.Table.fromTableName(
      this,
      "ImportedProductsTable",
      "Product"
    );
    const stockTable = dynamodb.Table.fromTableName(
      this,
      "ImportedStocksTable",
      "Stock"
    );

    const getProductsList = new lambda.Function(this, "GetProductsList", {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset("lambda-functions"),
      handler: "getProductsList.handler",
      environment: {
        PRODUCTS_TABLE_NAME: productTable.tableName,
      },
    });

    const getProductByID = new lambda.Function(this, "GetProductByID", {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset("lambda-functions"),
      handler: "getProductById.handler",
      environment: {
        PRODUCTS_TABLE_NAME: productTable.tableName,
      },
    });

    const createProduct = new lambda.Function(this, "CreateProduct", {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset("lambda-functions"),
      handler: "createProduct.handler",
      environment: {
        PRODUCTS_TABLE_NAME: productTable.tableName,
        STOCKS_TABLE_NAME: stockTable.tableName,
      },
    });

    const catalogBatchProcess = new lambda.Function(
      this,
      "CatalogBatchProcess",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        code: lambda.Code.fromAsset("lambda-functions"),
        handler: "catalogBatchProcess.handler",
        environment: {
          SNS_ARN: createProductTopic.topicArn,
        },
      }
    );

    const api = new apigateway.RestApi(this, "ProductsAPI", {
      restApiName: "ProductsService",
      description: "This service serves products for RSS AWS course.",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    const dynamoDbPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
      ],
      resources: [productTable.tableArn, stockTable.tableArn],
    });

    createProductTopic.addSubscription(new EmailSubscription(SNS_EMAIL_MAIN));

    createProductTopic.addSubscription(
      new EmailSubscription(SNS_EMAIL_ADD, {
        filterPolicy: {
          count: SubscriptionFilter.numericFilter({
            between: { start: 0, stop: 20 },
          }),
        },
      })
    );

    const apiProducts = api.root.addResource("products");
    apiProducts.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProductsList)
    );

    apiProducts.addMethod(
      "POST",
      new apigateway.LambdaIntegration(createProduct)
    );

    const apiProductById = apiProducts.addResource("{id}");
    apiProductById.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProductByID)
    );

    catalogBatchProcess.addEventSource(
      new SqsEventSource(catalogItemsQueue, { batchSize: 5 })
    );

    getProductsList.addToRolePolicy(dynamoDbPolicy);
    getProductByID.addToRolePolicy(dynamoDbPolicy);
    createProduct.addToRolePolicy(dynamoDbPolicy);
    catalogBatchProcess.addToRolePolicy(dynamoDbPolicy);
    createProductTopic.grantPublish(catalogBatchProcess);
  }
}
