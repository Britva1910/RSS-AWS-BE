"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsServiceStack = void 0;
const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cdk_lib_2 = require("aws-cdk-lib");
class ProductsServiceStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const productTable = aws_cdk_lib_1.aws_dynamodb.Table.fromTableName(this, "ImportedProductsTable", "Product");
        const stockTable = aws_cdk_lib_1.aws_dynamodb.Table.fromTableName(this, "ImportedStocksTable", "Stock");
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
        const createProduct = new lambda.Function(this, "CreateProduct", {
            runtime: lambda.Runtime.NODEJS_20_X,
            code: lambda.Code.fromAsset("lambda-functions"),
            handler: "createProduct.handler",
        });
        const api = new apigateway.RestApi(this, "ProductsAPI", {
            restApiName: "ProductsService",
            description: "This service serves products for RSS AWS course.",
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS,
            },
        });
        const dynamoDbPolicy = new aws_cdk_lib_2.aws_iam.PolicyStatement({
            effect: aws_cdk_lib_2.aws_iam.Effect.ALLOW,
            actions: [
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:GetItem",
                "dynamodb:PutItem",
            ],
            resources: [productTable.tableArn, stockTable.tableArn],
        });
        getProductsList.addToRolePolicy(dynamoDbPolicy);
        getProductByID.addToRolePolicy(dynamoDbPolicy);
        createProduct.addToRolePolicy(dynamoDbPolicy);
        const apiProducts = api.root.addResource("products");
        apiProducts.addMethod("GET", new apigateway.LambdaIntegration(getProductsList));
        apiProducts.addMethod("POST", new apigateway.LambdaIntegration(createProduct));
        const apiProductById = apiProducts.addResource("{id}");
        apiProductById.addMethod("GET", new apigateway.LambdaIntegration(getProductByID));
    }
}
exports.ProductsServiceStack = ProductsServiceStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHMtc2VydmljZS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2R1Y3RzLXNlcnZpY2Utc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLGlEQUFpRDtBQUNqRCx5REFBeUQ7QUFDekQsNkNBQXVEO0FBQ3ZELDZDQUE2QztBQUc3QyxNQUFhLG9CQUFxQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ2pELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxZQUFZLEdBQUcsMEJBQVEsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUMvQyxJQUFJLEVBQ0osdUJBQXVCLEVBQ3ZCLFNBQVMsQ0FDVixDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcsMEJBQVEsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUM3QyxJQUFJLEVBQ0oscUJBQXFCLEVBQ3JCLE9BQU8sQ0FDUixDQUFDO1FBRUYsTUFBTSxlQUFlLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUNuRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQztZQUMvQyxPQUFPLEVBQUUseUJBQXlCO1NBQ25DLENBQUMsQ0FBQztRQUVILE1BQU0sY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDakUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUM7WUFDL0MsT0FBTyxFQUFFLHdCQUF3QjtTQUNsQyxDQUFDLENBQUM7UUFFSCxNQUFNLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUMvRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQztZQUMvQyxPQUFPLEVBQUUsdUJBQXVCO1NBQ2pDLENBQUMsQ0FBQztRQUVILE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3RELFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsV0FBVyxFQUFFLGtEQUFrRDtZQUMvRCwyQkFBMkIsRUFBRTtnQkFDM0IsWUFBWSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDekMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVzthQUMxQztTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sY0FBYyxHQUFHLElBQUkscUJBQUcsQ0FBQyxlQUFlLENBQUM7WUFDN0MsTUFBTSxFQUFFLHFCQUFHLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDeEIsT0FBTyxFQUFFO2dCQUNQLGdCQUFnQjtnQkFDaEIsZUFBZTtnQkFDZixrQkFBa0I7Z0JBQ2xCLGtCQUFrQjthQUNuQjtZQUNELFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUN4RCxDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hELGNBQWMsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0MsYUFBYSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU5QyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxXQUFXLENBQUMsU0FBUyxDQUNuQixLQUFLLEVBQ0wsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQ2xELENBQUM7UUFFRixXQUFXLENBQUMsU0FBUyxDQUNuQixNQUFNLEVBQ04sSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQ2hELENBQUM7UUFFRixNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELGNBQWMsQ0FBQyxTQUFTLENBQ3RCLEtBQUssRUFDTCxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FDakQsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTFFRCxvREEwRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSBcImF3cy1jZGstbGliXCI7XHJcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQgKiBhcyBhcGlnYXRld2F5IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheVwiO1xyXG5pbXBvcnQgeyBhd3NfZHluYW1vZGIgYXMgZHluYW1vZGIgfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcclxuaW1wb3J0IHsgYXdzX2lhbSBhcyBpYW0gfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0c1NlcnZpY2VTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgY29uc3QgcHJvZHVjdFRhYmxlID0gZHluYW1vZGIuVGFibGUuZnJvbVRhYmxlTmFtZShcclxuICAgICAgdGhpcyxcclxuICAgICAgXCJJbXBvcnRlZFByb2R1Y3RzVGFibGVcIixcclxuICAgICAgXCJQcm9kdWN0XCJcclxuICAgICk7XHJcbiAgICBjb25zdCBzdG9ja1RhYmxlID0gZHluYW1vZGIuVGFibGUuZnJvbVRhYmxlTmFtZShcclxuICAgICAgdGhpcyxcclxuICAgICAgXCJJbXBvcnRlZFN0b2Nrc1RhYmxlXCIsXHJcbiAgICAgIFwiU3RvY2tcIlxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBnZXRQcm9kdWN0c0xpc3QgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiR2V0UHJvZHVjdHNMaXN0XCIsIHtcclxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzIwX1gsXHJcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcImxhbWJkYS1mdW5jdGlvbnNcIiksXHJcbiAgICAgIGhhbmRsZXI6IFwiZ2V0UHJvZHVjdHNMaXN0LmhhbmRsZXJcIixcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGdldFByb2R1Y3RCeUlEID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIkdldFByb2R1Y3RCeUlEXCIsIHtcclxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzIwX1gsXHJcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcImxhbWJkYS1mdW5jdGlvbnNcIiksXHJcbiAgICAgIGhhbmRsZXI6IFwiZ2V0UHJvZHVjdEJ5SWQuaGFuZGxlclwiLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY3JlYXRlUHJvZHVjdCA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJDcmVhdGVQcm9kdWN0XCIsIHtcclxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzIwX1gsXHJcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcImxhbWJkYS1mdW5jdGlvbnNcIiksXHJcbiAgICAgIGhhbmRsZXI6IFwiY3JlYXRlUHJvZHVjdC5oYW5kbGVyXCIsXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBhcGkgPSBuZXcgYXBpZ2F0ZXdheS5SZXN0QXBpKHRoaXMsIFwiUHJvZHVjdHNBUElcIiwge1xyXG4gICAgICByZXN0QXBpTmFtZTogXCJQcm9kdWN0c1NlcnZpY2VcIixcclxuICAgICAgZGVzY3JpcHRpb246IFwiVGhpcyBzZXJ2aWNlIHNlcnZlcyBwcm9kdWN0cyBmb3IgUlNTIEFXUyBjb3Vyc2UuXCIsXHJcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xyXG4gICAgICAgIGFsbG93T3JpZ2luczogYXBpZ2F0ZXdheS5Db3JzLkFMTF9PUklHSU5TLFxyXG4gICAgICAgIGFsbG93TWV0aG9kczogYXBpZ2F0ZXdheS5Db3JzLkFMTF9NRVRIT0RTLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZHluYW1vRGJQb2xpY3kgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XHJcbiAgICAgIGVmZmVjdDogaWFtLkVmZmVjdC5BTExPVyxcclxuICAgICAgYWN0aW9uczogW1xyXG4gICAgICAgIFwiZHluYW1vZGI6UXVlcnlcIixcclxuICAgICAgICBcImR5bmFtb2RiOlNjYW5cIixcclxuICAgICAgICBcImR5bmFtb2RiOkdldEl0ZW1cIixcclxuICAgICAgICBcImR5bmFtb2RiOlB1dEl0ZW1cIixcclxuICAgICAgXSxcclxuICAgICAgcmVzb3VyY2VzOiBbcHJvZHVjdFRhYmxlLnRhYmxlQXJuLCBzdG9ja1RhYmxlLnRhYmxlQXJuXSxcclxuICAgIH0pO1xyXG5cclxuICAgIGdldFByb2R1Y3RzTGlzdC5hZGRUb1JvbGVQb2xpY3koZHluYW1vRGJQb2xpY3kpO1xyXG4gICAgZ2V0UHJvZHVjdEJ5SUQuYWRkVG9Sb2xlUG9saWN5KGR5bmFtb0RiUG9saWN5KTtcclxuICAgIGNyZWF0ZVByb2R1Y3QuYWRkVG9Sb2xlUG9saWN5KGR5bmFtb0RiUG9saWN5KTtcclxuXHJcbiAgICBjb25zdCBhcGlQcm9kdWN0cyA9IGFwaS5yb290LmFkZFJlc291cmNlKFwicHJvZHVjdHNcIik7XHJcbiAgICBhcGlQcm9kdWN0cy5hZGRNZXRob2QoXHJcbiAgICAgIFwiR0VUXCIsXHJcbiAgICAgIG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGdldFByb2R1Y3RzTGlzdClcclxuICAgICk7XHJcblxyXG4gICAgYXBpUHJvZHVjdHMuYWRkTWV0aG9kKFxyXG4gICAgICBcIlBPU1RcIixcclxuICAgICAgbmV3IGFwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24oY3JlYXRlUHJvZHVjdClcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgYXBpUHJvZHVjdEJ5SWQgPSBhcGlQcm9kdWN0cy5hZGRSZXNvdXJjZShcIntpZH1cIik7XHJcbiAgICBhcGlQcm9kdWN0QnlJZC5hZGRNZXRob2QoXHJcbiAgICAgIFwiR0VUXCIsXHJcbiAgICAgIG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGdldFByb2R1Y3RCeUlEKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19