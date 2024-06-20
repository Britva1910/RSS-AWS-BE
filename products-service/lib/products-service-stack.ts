import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export class ProductsServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getProductsList = new lambda.Function(this, "GetProductsList", {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset("lambda-functions"),
      handler: "getProductsList.handler",
    });

    const getProductByID = new lambda.Function(this, "GetProductByID", {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset("lambda-functions"),
      handler: "getProductById.handler",
    });

    const api = new apigateway.RestApi(this, "ProductsAPI", {
      restApiName: "ProductsService",
      description: "This service serves products for RSS AWS course.",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    const apiProducts = api.root.addResource("products");
    apiProducts.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProductsList)
    );

    const apiProductById = apiProducts.addResource("{id}");
    apiProductById.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProductByID)
    );
  }
}
