"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsServiceStack = void 0;
const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigateway = require("aws-cdk-lib/aws-apigateway");
class ProductsServiceStack extends cdk.Stack {
    constructor(scope, id, props) {
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
        apiProducts.addMethod("GET", new apigateway.LambdaIntegration(getProductsList));
        const apiProductById = apiProducts.addResource("{id}");
        apiProductById.addMethod("GET", new apigateway.LambdaIntegration(getProductByID));
    }
}
exports.ProductsServiceStack = ProductsServiceStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHMtc2VydmljZS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2R1Y3RzLXNlcnZpY2Utc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLGlEQUFpRDtBQUNqRCx5REFBeUQ7QUFHekQsTUFBYSxvQkFBcUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNqRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDbkUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUM7WUFDL0MsT0FBTyxFQUFFLHlCQUF5QjtTQUNuQyxDQUFDLENBQUM7UUFFSCxNQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ2pFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDO1lBQy9DLE9BQU8sRUFBRSx3QkFBd0I7U0FDbEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDdEQsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixXQUFXLEVBQUUsa0RBQWtEO1lBQy9ELDJCQUEyQixFQUFFO2dCQUMzQixZQUFZLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUN6QyxZQUFZLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXO2FBQzFDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQsV0FBVyxDQUFDLFNBQVMsQ0FDbkIsS0FBSyxFQUNMLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUNsRCxDQUFDO1FBRUYsTUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxjQUFjLENBQUMsU0FBUyxDQUN0QixLQUFLLEVBQ0wsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQ2pELENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFyQ0Qsb0RBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBhcGlnYXRld2F5IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheVwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2R1Y3RzU2VydmljZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgZ2V0UHJvZHVjdHNMaXN0ID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIkdldFByb2R1Y3RzTGlzdFwiLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMjBfWCxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcImxhbWJkYS1mdW5jdGlvbnNcIiksXG4gICAgICBoYW5kbGVyOiBcImdldFByb2R1Y3RzTGlzdC5oYW5kbGVyXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZXRQcm9kdWN0QnlJRCA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJHZXRQcm9kdWN0QnlJRFwiLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMjBfWCxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcImxhbWJkYS1mdW5jdGlvbnNcIiksXG4gICAgICBoYW5kbGVyOiBcImdldFByb2R1Y3RCeUlkLmhhbmRsZXJcIixcbiAgICB9KTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlnYXRld2F5LlJlc3RBcGkodGhpcywgXCJQcm9kdWN0c0FQSVwiLCB7XG4gICAgICByZXN0QXBpTmFtZTogXCJQcm9kdWN0c1NlcnZpY2VcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgc2VydmljZSBzZXJ2ZXMgcHJvZHVjdHMgZm9yIFJTUyBBV1MgY291cnNlLlwiLFxuICAgICAgZGVmYXVsdENvcnNQcmVmbGlnaHRPcHRpb25zOiB7XG4gICAgICAgIGFsbG93T3JpZ2luczogYXBpZ2F0ZXdheS5Db3JzLkFMTF9PUklHSU5TLFxuICAgICAgICBhbGxvd01ldGhvZHM6IGFwaWdhdGV3YXkuQ29ycy5BTExfTUVUSE9EUyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBhcGlQcm9kdWN0cyA9IGFwaS5yb290LmFkZFJlc291cmNlKFwicHJvZHVjdHNcIik7XG4gICAgYXBpUHJvZHVjdHMuYWRkTWV0aG9kKFxuICAgICAgXCJHRVRcIixcbiAgICAgIG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGdldFByb2R1Y3RzTGlzdClcbiAgICApO1xuXG4gICAgY29uc3QgYXBpUHJvZHVjdEJ5SWQgPSBhcGlQcm9kdWN0cy5hZGRSZXNvdXJjZShcIntpZH1cIik7XG4gICAgYXBpUHJvZHVjdEJ5SWQuYWRkTWV0aG9kKFxuICAgICAgXCJHRVRcIixcbiAgICAgIG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGdldFByb2R1Y3RCeUlEKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==