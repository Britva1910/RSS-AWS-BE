import { Effect } from "aws-cdk-lib/aws-iam";
import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayAuthorizerResult,
} from "aws-lambda";
import * as dotenv from "dotenv";

dotenv.config();
const USER_NAME = "Britva1910";

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  console.log("Event: ", event);
  try {
    if (!event.authorizationToken) {
      return generatePolicy("user", Effect.DENY, event.methodArn);
    }
    console.log("event.authorizationToken", event.authorizationToken);
    const token = event.authorizationToken.split(" ")[1];
    console.log("Token", token);
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    console.log("Decoder", decoded);
    const [username, password] = decoded.split(":");
    const basePasword = process.env[USER_NAME];
    console.log("Base password", basePasword);
    console.log("User password", password);

    if (basePasword && password === basePasword) {
      console.log("Ok auth");
      return generatePolicy("user", Effect.ALLOW, event.methodArn);
    } else {
      console.log("Bad auth");
      return generatePolicy("user", Effect.DENY, event.methodArn);
    }
  } catch (error) {
    console.log("Error", error);
    return generatePolicy("user", Effect.DENY, event.methodArn);
  }
};

const generatePolicy = (
  principalId: string,
  effect: Effect,
  resource: string
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
  };

  return authResponse;
};
