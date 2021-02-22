import { Socket } from "net";

import { Writer } from "protobufjs";

import { Response } from "../../generated/proto/krpc";
import socketIterator from "../TpcSocketIterator";

function generatePayload(response: Response) {
  const bytes = Response.encode(response).finish();

  return new Writer().bytes(bytes).finish();
}

describe("TcpSocketIterator", () => {
  afterEach(jest.resetAllMocks);

  const response1 = Response.fromPartial({
    results: [{ value: Buffer.from([1, 2, 3]) }],
  });
  const response2 = Response.fromPartial({
    results: [{ value: Buffer.from([3, 2, 1]) }],
  });
  const readIterator = {
    next: jest.fn(),
  };
  const socket = ({
    [Symbol.asyncIterator]: () => readIterator,
  } as unknown) as Socket;

  it("should return a single response", async () => {
    readIterator.next.mockResolvedValueOnce({
      done: false,
      value: generatePayload(response1),
    });

    const { value } = await socketIterator(socket).next();

    expect(value).toEqual(response1);
  });

  it("should return responses split over multiple chunks", async () => {
    const allBytes = generatePayload(response1);
    const chunk1 = allBytes.slice(0, 3);
    const chunk2 = allBytes.slice(3, undefined);

    readIterator.next
      .mockResolvedValueOnce({
        done: false,
        value: chunk1,
      })
      .mockResolvedValueOnce({
        done: false,
        value: chunk2,
      });

    const { value } = await socketIterator(socket).next();

    expect(value).toEqual(response1);
  });

  it("should return 2 messages split between chunks", async () => {
    const bytes1 = generatePayload(response1);
    const bytes2 = generatePayload(response2);
    const allBytes = new Uint8Array(bytes1.length + bytes2.length);
    allBytes.set(bytes1);
    allBytes.set(bytes2, bytes1.length);

    const chunk1 = allBytes.slice(0, 3);
    const chunk2 = allBytes.slice(3, undefined);

    readIterator.next
      .mockResolvedValueOnce({
        done: false,
        value: chunk1,
      })
      .mockResolvedValueOnce({
        done: false,
        value: chunk2,
      });

    const it = socketIterator(socket);

    const { value: firstResponse } = await it.next();

    const { value: secondResponse } = await it.next();

    expect(firstResponse).toEqual(response1);
    expect(secondResponse).toEqual(response2);
  });

  describe("end of message", () => {
    it("should handle end of message if at the end of message block", async () => {
      readIterator.next
        .mockResolvedValueOnce({
          done: false,
          value: generatePayload(response1),
        })
        .mockResolvedValueOnce({ done: true });

      const it = socketIterator(socket);
      await it.next();
      const { value, done } = await it.next();

      expect(done).toBeTruthy();
      expect(value).toBeUndefined();
    });

    it("should handle end of message if partially processing message", async () => {
      readIterator.next
        .mockResolvedValueOnce({
          done: false,
          value: generatePayload(response1).slice(0, 5),
        })
        .mockResolvedValueOnce({ done: true });

      const it = socketIterator(socket);
      await it.next();
      const { value, done } = await it.next();

      expect(done).toBeTruthy();
      expect(value).toBeUndefined();
    });
  });
});
