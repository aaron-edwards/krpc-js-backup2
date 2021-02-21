import { stat } from "fs";
import { Socket } from "net";

import { Writer } from "protobufjs";
import { isConstructSignatureDeclaration } from "typescript";

import {
  ConnectionResponse,
  ConnectionResponse_Status,
} from "../generated/proto/krpc";

import { TcpRpcClient } from "./RpcClient";

const mockConnect = jest.fn((_o, cb) => cb());
const mockWrite = jest.fn();
let queueData: Uint8Array[] = [];
const mockOnce = jest.fn((t, cb) => {
  if (t === "data") {
    cb(queueData.pop());
  }
});
jest.mock("net", () => ({
  Socket: () => ({
    connect: mockConnect,
    write: mockWrite,
    once: mockOnce,
  }),
}));

// const mockedSocket = Socket as jest.MockedClass<typeof Socket>;

// jest.mock("net", () => {
//   const writtenData: Uint8Array[] = [];
//   const socket = {
//     connect: jest.fn().mockImplementation((_p, _h, cb) => cb()),
//     write: jest
//       .fn()
//       .mockImplementation((bytes: Uint8Array) => writtenData.push(bytes)),
//     once: jest.fn(),
//     writtenData,
//   };

//   return { Socket: jest.fn().mockReturnValue(socket) };
// });

describe("TcpRpcClient", () => {
  beforeEach(() => {
    queueData = [];
  });
  const enqueuData = (rawData: Uint8Array) => {
    const writer = Writer.create();
    writer.bytes(rawData);
    queueData.push(writer.finish());
  };
  describe("connect", () => {
    it("should connect", async () => {
      const expectedResponse = ConnectionResponse.fromPartial({
        status: ConnectionResponse_Status.OK,
      });
      enqueuData(ConnectionResponse.encode(expectedResponse).finish());

      const client = new TcpRpcClient("localhost", 50_000, "krpc-test");

      return expect(client.connect()).resolves.toBeDefined();
    });

    it.each([
      ConnectionResponse_Status.MALFORMED_MESSAGE,
      ConnectionResponse_Status.TIMEOUT,
      ConnectionResponse_Status.UNRECOGNIZED,
      ConnectionResponse_Status.WRONG_TYPE,
    ])("should reject if status is %s", (status) => {
      const expectedResponse = ConnectionResponse.fromPartial({ status });
      enqueuData(ConnectionResponse.encode(expectedResponse).finish());
      const client = new TcpRpcClient("localhost", 50_000, "krpc-test");
      return expect(client.connect()).rejects.toBeDefined();
    });
  });
});
