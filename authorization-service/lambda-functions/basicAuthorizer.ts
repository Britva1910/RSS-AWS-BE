import { Effect } from "aws-cdk-lib/aws-iam";
import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayAuthorizerResult,
} from "aws-lambda";

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  console.log("Event: ", event);
  try {
    if (!event.authorizationToken) {
      return generatePolicy("user", Effect.DENY, event.methodArn, 401);
    }

    const token = event.authorizationToken.split(" ")[1];
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username, password] = decoded.split(":");
    const basePasword = process.env[username];

    if (password === basePasword) {
      return generatePolicy("user", Effect.ALLOW, event.methodArn);
    } else {
      return generatePolicy("user", Effect.DENY, event.methodArn, 403);
    }
  } catch (error) {
    return generatePolicy("user", Effect.DENY, event.methodArn, 401);
  }
};

const generatePolicy = (
  principalId: string,
  effect: Effect,
  resource: string,
  statusCode?: number
): APIGatewayAuthorizerResult => {
  const authResponse: APIGatewayAuthorizerResult = {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context: {
      statusCode: statusCode?.toString() || "200",
    },
  };

  return authResponse;
};
