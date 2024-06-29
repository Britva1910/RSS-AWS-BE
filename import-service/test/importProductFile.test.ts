import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { mockClient } from "aws-sdk-client-mock";
const { handler } = require("../lambda-functions/importProductsFile");

jest.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: jest.fn(),
}));

const s3Mock = mockClient(S3Client);

describe("importProductsFile Lambda", () => {
  beforeEach(() => {
    s3Mock.reset();
  });

  it("should return a signed URL when a valid file name is provided", async () => {
    const event = {
      queryStringParameters: {
        name: "testFile.csv",
      },
    } as any;

    s3Mock.on(PutObjectCommand).resolves({});
    (getSignedUrl as jest.Mock) = jest
      .fn()
      .mockResolvedValue("https://signed-url.com");
    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).url).toBe("https://signed-url.com");
  });

  it("should return a 400 error when no file name is provided", async () => {
    const event = {
      queryStringParameters: {},
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe(
      "Missing file name in query parameters"
    );
  });

  it("should return a 500 error if getSignedUrl throws an error", async () => {
    const event = {
      queryStringParameters: {
        name: "testFile.csv",
      },
    };

    (getSignedUrl as jest.Mock) = jest
      .fn()
      .mockRejectedValue(new Error("Some error"));

    const response = await handler(event);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).message).toBe(
      "Could not generate signed URL"
    );
  });
});
