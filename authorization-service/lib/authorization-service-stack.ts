import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { ServicePrincipal } from "aws-cdk-lib/aws-iam";

export class AuthorizationServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const basicAuthorizer = new lambda.Function(this, "basicAuthorizer", {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset("lambda-functions"),
      handler: "basicAuthorizer.handler",
    });

    basicAuthorizer.grantInvoke(
      new ServicePrincipal("apigateway.amazonaws.com")
    );

    new cdk.CfnOutput(this, "BasicAuthorizer", {
      value: basicAuthorizer.functionArn,
      exportName: "BasicAuthorizerArn",
    });
    new cdk.CfnOutput(this, "BasicAuthorizerRole", {
      value: basicAuthorizer.role!.roleArn,
      exportName: "BasicAuthorizerArnRole",
    });
  }
}
