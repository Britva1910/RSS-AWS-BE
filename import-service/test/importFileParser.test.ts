/* import {
  S3Client,
  GetObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { mockClient } from "aws-sdk-client-mock";
import { Readable } from "stream";
import { sdkStreamMixin } from "@smithy/util-stream";
import "aws-sdk-client-mock-jest";
const { handler } = require("../lambda-functions/importFileParser.js");

const s3Mock = mockClient(S3Client);
const event = {
  Records: [
    {
      s3: {
        object: {
          key: "testKey",
        },
      },
    },
  ],
};

describe("importFileParser Lambda", () => {
  beforeEach(() => {
    s3Mock.reset();
  });

  it("should return a signed URL when a valid file name is provided", async () => {
    s3Mock.on(GetObjectCommand).resolves({});

    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    await handler(event);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Error processing S3 event:",
      expect.any(Error)
    );
    consoleLogSpy.mockRestore();
  });
  it("should log the result stream", async () => {
    const stream = new Readable();
    stream.push("header1,header2\nvalue1,value2\n");
    stream.push(null);

    const sdkStream = sdkStreamMixin(stream);

    s3Mock.on(GetObjectCommand).resolves({
      Body: sdkStream,
    });

    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    await handler(event);

    expect(consoleLogSpy).toHaveBeenCalledWith("Result stream: ", [
      { header1: "value1", header2: "value2" },
    ]);

    consoleLogSpy.mockRestore();
  });
  it("should copy the object after processing the stream", async () => {
    const stream = new Readable();
    stream.push("header1,header2\nvalue1,value2\n");
    stream.push(null);

    const sdkStream = sdkStreamMixin(stream);

    s3Mock.on(GetObjectCommand).resolves({
      Body: sdkStream,
    });

    s3Mock.on(CopyObjectCommand).resolves({});

    await handler(event);

    expect(s3Mock).toHaveReceivedCommand(CopyObjectCommand);
  });

  it("should delete the object after processing the stream", async () => {
    const stream = new Readable();
    stream.push("header1,header2\nvalue1,value2\n");
    stream.push(null);

    const sdkStream = sdkStreamMixin(stream);

    s3Mock.on(GetObjectCommand).resolves({
      Body: sdkStream,
    });

    s3Mock.on(DeleteObjectCommand).resolves({});

    await handler(event);

    expect(s3Mock).toHaveReceivedCommand(DeleteObjectCommand);
  });
});
 */
