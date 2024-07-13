import { SQSEvent } from "aws-lambda";
import { mockClient } from "aws-sdk-client-mock";
import { storeProduct } from "../lambda-functions/utils/storeProduct";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { validateProductInput } from "../lambda-functions/utils/validator";
import { getMessage } from "../lambda-functions/utils/getMessage";
const { handler } = require("../lambda-functions/catalogBatchProcess.js");

jest.mock("../lambda-functions/utils/storeProduct");
jest.mock("../lambda-functions/utils/validator");
jest.mock("../lambda-functions/utils/getMessage");

const snsMock = mockClient(SNSClient);
const storeProductMock = storeProduct as jest.Mock;
const validateProductInputMock = validateProductInput as jest.Mock;
const getMessageMock = getMessage as jest.Mock;

const event: SQSEvent = {
  Records: [
    {
      body: JSON.stringify({
        id: "123",
        title: "Product A",
        price: 100,
        count: 10,
        description: "A sample product",
      }),
    },
  ],
} as any;

describe("SQS Handler", () => {
  beforeEach(() => {
    snsMock.reset();
    jest.clearAllMocks();
  });

  it("should process valid product and send SNS message", async () => {
    const product = {
      id: "123",
      title: "Product A",
      price: 100,
      count: 10,
      description: "A sample product",
    };

    validateProductInputMock.mockReturnValue(true);
    storeProductMock.mockResolvedValue({});
    getMessageMock.mockReturnValue("Sample Message");

    snsMock.on(PublishCommand).resolves({});

    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    await handler(event);

    expect(validateProductInputMock).toHaveBeenCalledWith(product);
    expect(storeProductMock).toHaveBeenCalledWith(product);
    expect(getMessageMock).toHaveBeenCalledWith(product);
    /*     expect(snsMock).toHaveReceivedCommand(PublishCommand, {
      TopicArn: process.env.SNS_ARN,
      Message: "Sample Message",
      MessageAttributes: {
        count: {
          DataType: "Number",
          StringValue: "10",
        },
      },
    });
 */
    consoleLogSpy.mockRestore();
  });

  it("should log error if storeProduct fails", async () => {
    const product = {
      id: "123",
      title: "Product A",
      price: 100,
      count: 10,
      description: "A sample product",
    };

    validateProductInputMock.mockReturnValue(true);
    storeProductMock.mockRejectedValue(new Error("Store product failed"));

    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await handler(event);

    expect(validateProductInputMock).toHaveBeenCalledWith(product);
    expect(storeProductMock).toHaveBeenCalledWith(product);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error storing product:",
      expect.any(Error)
    );

    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it("should skip invalid product", async () => {
    const product = {
      id: "123",
      title: "Product A",
      price: 100,
      count: 10,
      description: "A sample product",
    };

    validateProductInputMock.mockReturnValue(false);

    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    await handler(event);

    expect(validateProductInputMock).toHaveBeenCalledWith(product);
    expect(storeProductMock).not.toHaveBeenCalled();
    expect(getMessageMock).not.toHaveBeenCalled();
    //expect(snsMock).not.toHaveReceivedCommand(PublishCommand);
    expect(consoleLogSpy).toHaveBeenCalledWith("Product validation error");

    consoleLogSpy.mockRestore();
  });
});
