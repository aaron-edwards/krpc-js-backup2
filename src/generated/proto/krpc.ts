/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ConnectionRequest {
  type: ConnectionRequest_Type;
  clientName: string;
  clientIdentifier: Uint8Array;
}

export interface ConnectionResponse {
  status: ConnectionResponse_Status;
  message: string;
  clientIdentifier: Uint8Array;
}

export interface Request {
  calls: ProcedureCall[];
}

export interface ProcedureCall {
  service: string;
  procedure: string;
  serviceId: number;
  procedureId: number;
  arguments: Argument[];
}

export interface Argument {
  position: number;
  value: Uint8Array;
}

export interface Response {
  error?: Error;
  results: ProcedureResult[];
}

export interface ProcedureResult {
  error?: Error;
  value: Uint8Array;
}

export interface Error {
  service: string;
  name: string;
  description: string;
  stackTrace: string;
}

export interface StreamUpdate {
  results: StreamResult[];
}

export interface StreamResult {
  id: Long;
  result?: ProcedureResult;
}

export interface Services {
  services: Service[];
}

export interface Service {
  name: string;
  procedures: Procedure[];
  classes: Class[];
  enumerations: Enumeration[];
  exceptions: Exception[];
  documentation: string;
}

export interface Procedure {
  name: string;
  parameters: Parameter[];
  returnType?: Type;
  returnIsNullable: boolean;
  gameScenes: Procedure_GameScene[];
  documentation: string;
}

export interface Parameter {
  name: string;
  type?: Type;
  defaultValue: Uint8Array;
}

export interface Class {
  name: string;
  documentation: string;
}

export interface Enumeration {
  name: string;
  values: EnumerationValue[];
  documentation: string;
}

export interface EnumerationValue {
  name: string;
  value: number;
  documentation: string;
}

export interface Exception {
  name: string;
  documentation: string;
}

export interface Type {
  code: Type_TypeCode;
  service: string;
  name: string;
  types: Type[];
}

export interface Tuple {
  items: Uint8Array[];
}

export interface List {
  items: Uint8Array[];
}

export interface Set {
  items: Uint8Array[];
}

export interface Dictionary {
  entries: DictionaryEntry[];
}

export interface DictionaryEntry {
  key: Uint8Array;
  value: Uint8Array;
}

export interface Stream {
  id: Long;
}

export interface Event {
  stream?: Stream;
}

export interface Status {
  version: string;
  bytesRead: Long;
  bytesWritten: Long;
  bytesReadRate: number;
  bytesWrittenRate: number;
  rpcsExecuted: Long;
  rpcRate: number;
  oneRpcPerUpdate: boolean;
  maxTimePerUpdate: number;
  adaptiveRateControl: boolean;
  blockingRecv: boolean;
  recvTimeout: number;
  timePerRpcUpdate: number;
  pollTimePerRpcUpdate: number;
  execTimePerRpcUpdate: number;
  streamRpcs: number;
  streamRpcsExecuted: Long;
  streamRpcRate: number;
  timePerStreamUpdate: number;
}

export interface MultiplexedRequest {
  connectionRequest?: ConnectionRequest;
  request?: Request;
}

export interface MultiplexedResponse {
  response?: Response;
  streamUpdate?: StreamUpdate;
}

const baseConnectionRequest: object = {
  type: 0,
  clientName: "",
};

const baseConnectionResponse: object = {
  status: 0,
  message: "",
};

const baseRequest: object = {
};

const baseProcedureCall: object = {
  service: "",
  procedure: "",
  serviceId: 0,
  procedureId: 0,
};

const baseArgument: object = {
  position: 0,
};

const baseResponse: object = {
};

const baseProcedureResult: object = {
};

const baseError: object = {
  service: "",
  name: "",
  description: "",
  stackTrace: "",
};

const baseStreamUpdate: object = {
};

const baseStreamResult: object = {
  id: Long.UZERO,
};

const baseServices: object = {
};

const baseService: object = {
  name: "",
  documentation: "",
};

const baseProcedure: object = {
  name: "",
  returnIsNullable: false,
  gameScenes: 0,
  documentation: "",
};

const baseParameter: object = {
  name: "",
};

const baseClass: object = {
  name: "",
  documentation: "",
};

const baseEnumeration: object = {
  name: "",
  documentation: "",
};

const baseEnumerationValue: object = {
  name: "",
  value: 0,
  documentation: "",
};

const baseException: object = {
  name: "",
  documentation: "",
};

const baseType: object = {
  code: 0,
  service: "",
  name: "",
};

const baseTuple: object = {
};

const baseList: object = {
};

const baseSet: object = {
};

const baseDictionary: object = {
};

const baseDictionaryEntry: object = {
};

const baseStream: object = {
  id: Long.UZERO,
};

const baseEvent: object = {
};

const baseStatus: object = {
  version: "",
  bytesRead: Long.UZERO,
  bytesWritten: Long.UZERO,
  bytesReadRate: 0,
  bytesWrittenRate: 0,
  rpcsExecuted: Long.UZERO,
  rpcRate: 0,
  oneRpcPerUpdate: false,
  maxTimePerUpdate: 0,
  adaptiveRateControl: false,
  blockingRecv: false,
  recvTimeout: 0,
  timePerRpcUpdate: 0,
  pollTimePerRpcUpdate: 0,
  execTimePerRpcUpdate: 0,
  streamRpcs: 0,
  streamRpcsExecuted: Long.UZERO,
  streamRpcRate: 0,
  timePerStreamUpdate: 0,
};

const baseMultiplexedRequest: object = {
};

const baseMultiplexedResponse: object = {
};

export const protobufPackage = 'krpc.schema'

export enum ConnectionRequest_Type {
  RPC = 0,
  STREAM = 1,
  UNRECOGNIZED = -1,
}

export function connectionRequest_TypeFromJSON(object: any): ConnectionRequest_Type {
  switch (object) {
    case 0:
    case "RPC":
      return ConnectionRequest_Type.RPC;
    case 1:
    case "STREAM":
      return ConnectionRequest_Type.STREAM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConnectionRequest_Type.UNRECOGNIZED;
  }
}

export function connectionRequest_TypeToJSON(object: ConnectionRequest_Type): string {
  switch (object) {
    case ConnectionRequest_Type.RPC:
      return "RPC";
    case ConnectionRequest_Type.STREAM:
      return "STREAM";
    default:
      return "UNKNOWN";
  }
}

export enum ConnectionResponse_Status {
  OK = 0,
  MALFORMED_MESSAGE = 1,
  TIMEOUT = 2,
  WRONG_TYPE = 3,
  UNRECOGNIZED = -1,
}

export function connectionResponse_StatusFromJSON(object: any): ConnectionResponse_Status {
  switch (object) {
    case 0:
    case "OK":
      return ConnectionResponse_Status.OK;
    case 1:
    case "MALFORMED_MESSAGE":
      return ConnectionResponse_Status.MALFORMED_MESSAGE;
    case 2:
    case "TIMEOUT":
      return ConnectionResponse_Status.TIMEOUT;
    case 3:
    case "WRONG_TYPE":
      return ConnectionResponse_Status.WRONG_TYPE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConnectionResponse_Status.UNRECOGNIZED;
  }
}

export function connectionResponse_StatusToJSON(object: ConnectionResponse_Status): string {
  switch (object) {
    case ConnectionResponse_Status.OK:
      return "OK";
    case ConnectionResponse_Status.MALFORMED_MESSAGE:
      return "MALFORMED_MESSAGE";
    case ConnectionResponse_Status.TIMEOUT:
      return "TIMEOUT";
    case ConnectionResponse_Status.WRONG_TYPE:
      return "WRONG_TYPE";
    default:
      return "UNKNOWN";
  }
}

export enum Procedure_GameScene {
  SPACE_CENTER = 0,
  FLIGHT = 1,
  TRACKING_STATION = 2,
  EDITOR_VAB = 3,
  EDITOR_SPH = 4,
  MISSION_BUILDER = 5,
  UNRECOGNIZED = -1,
}

export function procedure_GameSceneFromJSON(object: any): Procedure_GameScene {
  switch (object) {
    case 0:
    case "SPACE_CENTER":
      return Procedure_GameScene.SPACE_CENTER;
    case 1:
    case "FLIGHT":
      return Procedure_GameScene.FLIGHT;
    case 2:
    case "TRACKING_STATION":
      return Procedure_GameScene.TRACKING_STATION;
    case 3:
    case "EDITOR_VAB":
      return Procedure_GameScene.EDITOR_VAB;
    case 4:
    case "EDITOR_SPH":
      return Procedure_GameScene.EDITOR_SPH;
    case 5:
    case "MISSION_BUILDER":
      return Procedure_GameScene.MISSION_BUILDER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Procedure_GameScene.UNRECOGNIZED;
  }
}

export function procedure_GameSceneToJSON(object: Procedure_GameScene): string {
  switch (object) {
    case Procedure_GameScene.SPACE_CENTER:
      return "SPACE_CENTER";
    case Procedure_GameScene.FLIGHT:
      return "FLIGHT";
    case Procedure_GameScene.TRACKING_STATION:
      return "TRACKING_STATION";
    case Procedure_GameScene.EDITOR_VAB:
      return "EDITOR_VAB";
    case Procedure_GameScene.EDITOR_SPH:
      return "EDITOR_SPH";
    case Procedure_GameScene.MISSION_BUILDER:
      return "MISSION_BUILDER";
    default:
      return "UNKNOWN";
  }
}

export enum Type_TypeCode {
  NONE = 0,
  /** DOUBLE -  Values
   */
  DOUBLE = 1,
  FLOAT = 2,
  SINT32 = 3,
  SINT64 = 4,
  UINT32 = 5,
  UINT64 = 6,
  BOOL = 7,
  STRING = 8,
  BYTES = 9,
  /** CLASS -  Objects
   */
  CLASS = 100,
  ENUMERATION = 101,
  /** EVENT -  Messages
   */
  EVENT = 200,
  PROCEDURE_CALL = 201,
  STREAM = 202,
  STATUS = 203,
  SERVICES = 204,
  /** TUPLE -  Collections
   */
  TUPLE = 300,
  LIST = 301,
  SET = 302,
  DICTIONARY = 303,
  UNRECOGNIZED = -1,
}

export function type_TypeCodeFromJSON(object: any): Type_TypeCode {
  switch (object) {
    case 0:
    case "NONE":
      return Type_TypeCode.NONE;
    case 1:
    case "DOUBLE":
      return Type_TypeCode.DOUBLE;
    case 2:
    case "FLOAT":
      return Type_TypeCode.FLOAT;
    case 3:
    case "SINT32":
      return Type_TypeCode.SINT32;
    case 4:
    case "SINT64":
      return Type_TypeCode.SINT64;
    case 5:
    case "UINT32":
      return Type_TypeCode.UINT32;
    case 6:
    case "UINT64":
      return Type_TypeCode.UINT64;
    case 7:
    case "BOOL":
      return Type_TypeCode.BOOL;
    case 8:
    case "STRING":
      return Type_TypeCode.STRING;
    case 9:
    case "BYTES":
      return Type_TypeCode.BYTES;
    case 100:
    case "CLASS":
      return Type_TypeCode.CLASS;
    case 101:
    case "ENUMERATION":
      return Type_TypeCode.ENUMERATION;
    case 200:
    case "EVENT":
      return Type_TypeCode.EVENT;
    case 201:
    case "PROCEDURE_CALL":
      return Type_TypeCode.PROCEDURE_CALL;
    case 202:
    case "STREAM":
      return Type_TypeCode.STREAM;
    case 203:
    case "STATUS":
      return Type_TypeCode.STATUS;
    case 204:
    case "SERVICES":
      return Type_TypeCode.SERVICES;
    case 300:
    case "TUPLE":
      return Type_TypeCode.TUPLE;
    case 301:
    case "LIST":
      return Type_TypeCode.LIST;
    case 302:
    case "SET":
      return Type_TypeCode.SET;
    case 303:
    case "DICTIONARY":
      return Type_TypeCode.DICTIONARY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Type_TypeCode.UNRECOGNIZED;
  }
}

export function type_TypeCodeToJSON(object: Type_TypeCode): string {
  switch (object) {
    case Type_TypeCode.NONE:
      return "NONE";
    case Type_TypeCode.DOUBLE:
      return "DOUBLE";
    case Type_TypeCode.FLOAT:
      return "FLOAT";
    case Type_TypeCode.SINT32:
      return "SINT32";
    case Type_TypeCode.SINT64:
      return "SINT64";
    case Type_TypeCode.UINT32:
      return "UINT32";
    case Type_TypeCode.UINT64:
      return "UINT64";
    case Type_TypeCode.BOOL:
      return "BOOL";
    case Type_TypeCode.STRING:
      return "STRING";
    case Type_TypeCode.BYTES:
      return "BYTES";
    case Type_TypeCode.CLASS:
      return "CLASS";
    case Type_TypeCode.ENUMERATION:
      return "ENUMERATION";
    case Type_TypeCode.EVENT:
      return "EVENT";
    case Type_TypeCode.PROCEDURE_CALL:
      return "PROCEDURE_CALL";
    case Type_TypeCode.STREAM:
      return "STREAM";
    case Type_TypeCode.STATUS:
      return "STATUS";
    case Type_TypeCode.SERVICES:
      return "SERVICES";
    case Type_TypeCode.TUPLE:
      return "TUPLE";
    case Type_TypeCode.LIST:
      return "LIST";
    case Type_TypeCode.SET:
      return "SET";
    case Type_TypeCode.DICTIONARY:
      return "DICTIONARY";
    default:
      return "UNKNOWN";
  }
}

export const ConnectionRequest = {
  encode(message: ConnectionRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.type);
    writer.uint32(18).string(message.clientName);
    writer.uint32(26).bytes(message.clientIdentifier);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ConnectionRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseConnectionRequest } as ConnectionRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.clientName = reader.string();
          break;
        case 3:
          message.clientIdentifier = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ConnectionRequest {
    const message = { ...baseConnectionRequest } as ConnectionRequest;
    if (object.type !== undefined && object.type !== null) {
      message.type = connectionRequest_TypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.clientName !== undefined && object.clientName !== null) {
      message.clientName = String(object.clientName);
    } else {
      message.clientName = "";
    }
    if (object.clientIdentifier !== undefined && object.clientIdentifier !== null) {
      message.clientIdentifier = bytesFromBase64(object.clientIdentifier);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ConnectionRequest>): ConnectionRequest {
    const message = { ...baseConnectionRequest } as ConnectionRequest;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.clientName !== undefined && object.clientName !== null) {
      message.clientName = object.clientName;
    } else {
      message.clientName = "";
    }
    if (object.clientIdentifier !== undefined && object.clientIdentifier !== null) {
      message.clientIdentifier = object.clientIdentifier;
    } else {
      message.clientIdentifier = new Uint8Array();
    }
    return message;
  },
  toJSON(message: ConnectionRequest): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = connectionRequest_TypeToJSON(message.type));
    message.clientName !== undefined && (obj.clientName = message.clientName);
    message.clientIdentifier !== undefined && (obj.clientIdentifier = base64FromBytes(message.clientIdentifier !== undefined ? message.clientIdentifier : new Uint8Array()));
    return obj;
  },
};

export const ConnectionResponse = {
  encode(message: ConnectionResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.status);
    writer.uint32(18).string(message.message);
    writer.uint32(26).bytes(message.clientIdentifier);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ConnectionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseConnectionResponse } as ConnectionResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.clientIdentifier = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ConnectionResponse {
    const message = { ...baseConnectionResponse } as ConnectionResponse;
    if (object.status !== undefined && object.status !== null) {
      message.status = connectionResponse_StatusFromJSON(object.status);
    } else {
      message.status = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    if (object.clientIdentifier !== undefined && object.clientIdentifier !== null) {
      message.clientIdentifier = bytesFromBase64(object.clientIdentifier);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ConnectionResponse>): ConnectionResponse {
    const message = { ...baseConnectionResponse } as ConnectionResponse;
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    if (object.clientIdentifier !== undefined && object.clientIdentifier !== null) {
      message.clientIdentifier = object.clientIdentifier;
    } else {
      message.clientIdentifier = new Uint8Array();
    }
    return message;
  },
  toJSON(message: ConnectionResponse): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = connectionResponse_StatusToJSON(message.status));
    message.message !== undefined && (obj.message = message.message);
    message.clientIdentifier !== undefined && (obj.clientIdentifier = base64FromBytes(message.clientIdentifier !== undefined ? message.clientIdentifier : new Uint8Array()));
    return obj;
  },
};

export const Request = {
  encode(message: Request, writer: Writer = Writer.create()): Writer {
    for (const v of message.calls) {
      ProcedureCall.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Request {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequest } as Request;
    message.calls = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.calls.push(ProcedureCall.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Request {
    const message = { ...baseRequest } as Request;
    message.calls = [];
    if (object.calls !== undefined && object.calls !== null) {
      for (const e of object.calls) {
        message.calls.push(ProcedureCall.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Request>): Request {
    const message = { ...baseRequest } as Request;
    message.calls = [];
    if (object.calls !== undefined && object.calls !== null) {
      for (const e of object.calls) {
        message.calls.push(ProcedureCall.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: Request): unknown {
    const obj: any = {};
    if (message.calls) {
      obj.calls = message.calls.map(e => e ? ProcedureCall.toJSON(e) : undefined);
    } else {
      obj.calls = [];
    }
    return obj;
  },
};

export const ProcedureCall = {
  encode(message: ProcedureCall, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.service);
    writer.uint32(18).string(message.procedure);
    writer.uint32(32).uint32(message.serviceId);
    writer.uint32(40).uint32(message.procedureId);
    for (const v of message.arguments) {
      Argument.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ProcedureCall {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProcedureCall } as ProcedureCall;
    message.arguments = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.service = reader.string();
          break;
        case 2:
          message.procedure = reader.string();
          break;
        case 4:
          message.serviceId = reader.uint32();
          break;
        case 5:
          message.procedureId = reader.uint32();
          break;
        case 3:
          message.arguments.push(Argument.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ProcedureCall {
    const message = { ...baseProcedureCall } as ProcedureCall;
    message.arguments = [];
    if (object.service !== undefined && object.service !== null) {
      message.service = String(object.service);
    } else {
      message.service = "";
    }
    if (object.procedure !== undefined && object.procedure !== null) {
      message.procedure = String(object.procedure);
    } else {
      message.procedure = "";
    }
    if (object.serviceId !== undefined && object.serviceId !== null) {
      message.serviceId = Number(object.serviceId);
    } else {
      message.serviceId = 0;
    }
    if (object.procedureId !== undefined && object.procedureId !== null) {
      message.procedureId = Number(object.procedureId);
    } else {
      message.procedureId = 0;
    }
    if (object.arguments !== undefined && object.arguments !== null) {
      for (const e of object.arguments) {
        message.arguments.push(Argument.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ProcedureCall>): ProcedureCall {
    const message = { ...baseProcedureCall } as ProcedureCall;
    message.arguments = [];
    if (object.service !== undefined && object.service !== null) {
      message.service = object.service;
    } else {
      message.service = "";
    }
    if (object.procedure !== undefined && object.procedure !== null) {
      message.procedure = object.procedure;
    } else {
      message.procedure = "";
    }
    if (object.serviceId !== undefined && object.serviceId !== null) {
      message.serviceId = object.serviceId;
    } else {
      message.serviceId = 0;
    }
    if (object.procedureId !== undefined && object.procedureId !== null) {
      message.procedureId = object.procedureId;
    } else {
      message.procedureId = 0;
    }
    if (object.arguments !== undefined && object.arguments !== null) {
      for (const e of object.arguments) {
        message.arguments.push(Argument.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: ProcedureCall): unknown {
    const obj: any = {};
    message.service !== undefined && (obj.service = message.service);
    message.procedure !== undefined && (obj.procedure = message.procedure);
    message.serviceId !== undefined && (obj.serviceId = message.serviceId);
    message.procedureId !== undefined && (obj.procedureId = message.procedureId);
    if (message.arguments) {
      obj.arguments = message.arguments.map(e => e ? Argument.toJSON(e) : undefined);
    } else {
      obj.arguments = [];
    }
    return obj;
  },
};

export const Argument = {
  encode(message: Argument, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.position);
    writer.uint32(18).bytes(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Argument {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseArgument } as Argument;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.position = reader.uint32();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Argument {
    const message = { ...baseArgument } as Argument;
    if (object.position !== undefined && object.position !== null) {
      message.position = Number(object.position);
    } else {
      message.position = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Argument>): Argument {
    const message = { ...baseArgument } as Argument;
    if (object.position !== undefined && object.position !== null) {
      message.position = object.position;
    } else {
      message.position = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = new Uint8Array();
    }
    return message;
  },
  toJSON(message: Argument): unknown {
    const obj: any = {};
    message.position !== undefined && (obj.position = message.position);
    message.value !== undefined && (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
    return obj;
  },
};

export const Response = {
  encode(message: Response, writer: Writer = Writer.create()): Writer {
    if (message.error !== undefined && message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.results) {
      ProcedureResult.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Response {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponse } as Response;
    message.results = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 2:
          message.results.push(ProcedureResult.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Response {
    const message = { ...baseResponse } as Response;
    message.results = [];
    if (object.error !== undefined && object.error !== null) {
      message.error = Error.fromJSON(object.error);
    } else {
      message.error = undefined;
    }
    if (object.results !== undefined && object.results !== null) {
      for (const e of object.results) {
        message.results.push(ProcedureResult.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Response>): Response {
    const message = { ...baseResponse } as Response;
    message.results = [];
    if (object.error !== undefined && object.error !== null) {
      message.error = Error.fromPartial(object.error);
    } else {
      message.error = undefined;
    }
    if (object.results !== undefined && object.results !== null) {
      for (const e of object.results) {
        message.results.push(ProcedureResult.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: Response): unknown {
    const obj: any = {};
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    if (message.results) {
      obj.results = message.results.map(e => e ? ProcedureResult.toJSON(e) : undefined);
    } else {
      obj.results = [];
    }
    return obj;
  },
};

export const ProcedureResult = {
  encode(message: ProcedureResult, writer: Writer = Writer.create()): Writer {
    if (message.error !== undefined && message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).bytes(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ProcedureResult {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProcedureResult } as ProcedureResult;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ProcedureResult {
    const message = { ...baseProcedureResult } as ProcedureResult;
    if (object.error !== undefined && object.error !== null) {
      message.error = Error.fromJSON(object.error);
    } else {
      message.error = undefined;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ProcedureResult>): ProcedureResult {
    const message = { ...baseProcedureResult } as ProcedureResult;
    if (object.error !== undefined && object.error !== null) {
      message.error = Error.fromPartial(object.error);
    } else {
      message.error = undefined;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = new Uint8Array();
    }
    return message;
  },
  toJSON(message: ProcedureResult): unknown {
    const obj: any = {};
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.value !== undefined && (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
    return obj;
  },
};

export const Error = {
  encode(message: Error, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.service);
    writer.uint32(18).string(message.name);
    writer.uint32(26).string(message.description);
    writer.uint32(34).string(message.stackTrace);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Error {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseError } as Error;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.service = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.stackTrace = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Error {
    const message = { ...baseError } as Error;
    if (object.service !== undefined && object.service !== null) {
      message.service = String(object.service);
    } else {
      message.service = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.stackTrace !== undefined && object.stackTrace !== null) {
      message.stackTrace = String(object.stackTrace);
    } else {
      message.stackTrace = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<Error>): Error {
    const message = { ...baseError } as Error;
    if (object.service !== undefined && object.service !== null) {
      message.service = object.service;
    } else {
      message.service = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.stackTrace !== undefined && object.stackTrace !== null) {
      message.stackTrace = object.stackTrace;
    } else {
      message.stackTrace = "";
    }
    return message;
  },
  toJSON(message: Error): unknown {
    const obj: any = {};
    message.service !== undefined && (obj.service = message.service);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.stackTrace !== undefined && (obj.stackTrace = message.stackTrace);
    return obj;
  },
};

export const StreamUpdate = {
  encode(message: StreamUpdate, writer: Writer = Writer.create()): Writer {
    for (const v of message.results) {
      StreamResult.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): StreamUpdate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStreamUpdate } as StreamUpdate;
    message.results = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.results.push(StreamResult.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): StreamUpdate {
    const message = { ...baseStreamUpdate } as StreamUpdate;
    message.results = [];
    if (object.results !== undefined && object.results !== null) {
      for (const e of object.results) {
        message.results.push(StreamResult.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<StreamUpdate>): StreamUpdate {
    const message = { ...baseStreamUpdate } as StreamUpdate;
    message.results = [];
    if (object.results !== undefined && object.results !== null) {
      for (const e of object.results) {
        message.results.push(StreamResult.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: StreamUpdate): unknown {
    const obj: any = {};
    if (message.results) {
      obj.results = message.results.map(e => e ? StreamResult.toJSON(e) : undefined);
    } else {
      obj.results = [];
    }
    return obj;
  },
};

export const StreamResult = {
  encode(message: StreamResult, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint64(message.id);
    if (message.result !== undefined && message.result !== undefined) {
      ProcedureResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): StreamResult {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStreamResult } as StreamResult;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.result = ProcedureResult.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): StreamResult {
    const message = { ...baseStreamResult } as StreamResult;
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
    } else {
      message.id = Long.UZERO;
    }
    if (object.result !== undefined && object.result !== null) {
      message.result = ProcedureResult.fromJSON(object.result);
    } else {
      message.result = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<StreamResult>): StreamResult {
    const message = { ...baseStreamResult } as StreamResult;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id as Long;
    } else {
      message.id = Long.UZERO;
    }
    if (object.result !== undefined && object.result !== null) {
      message.result = ProcedureResult.fromPartial(object.result);
    } else {
      message.result = undefined;
    }
    return message;
  },
  toJSON(message: StreamResult): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    message.result !== undefined && (obj.result = message.result ? ProcedureResult.toJSON(message.result) : undefined);
    return obj;
  },
};

export const Services = {
  encode(message: Services, writer: Writer = Writer.create()): Writer {
    for (const v of message.services) {
      Service.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Services {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServices } as Services;
    message.services = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.services.push(Service.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Services {
    const message = { ...baseServices } as Services;
    message.services = [];
    if (object.services !== undefined && object.services !== null) {
      for (const e of object.services) {
        message.services.push(Service.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Services>): Services {
    const message = { ...baseServices } as Services;
    message.services = [];
    if (object.services !== undefined && object.services !== null) {
      for (const e of object.services) {
        message.services.push(Service.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: Services): unknown {
    const obj: any = {};
    if (message.services) {
      obj.services = message.services.map(e => e ? Service.toJSON(e) : undefined);
    } else {
      obj.services = [];
    }
    return obj;
  },
};

export const Service = {
  encode(message: Service, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    for (const v of message.procedures) {
      Procedure.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.classes) {
      Class.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.enumerations) {
      Enumeration.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.exceptions) {
      Exception.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    writer.uint32(50).string(message.documentation);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Service {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseService } as Service;
    message.procedures = [];
    message.classes = [];
    message.enumerations = [];
    message.exceptions = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.procedures.push(Procedure.decode(reader, reader.uint32()));
          break;
        case 3:
          message.classes.push(Class.decode(reader, reader.uint32()));
          break;
        case 4:
          message.enumerations.push(Enumeration.decode(reader, reader.uint32()));
          break;
        case 5:
          message.exceptions.push(Exception.decode(reader, reader.uint32()));
          break;
        case 6:
          message.documentation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Service {
    const message = { ...baseService } as Service;
    message.procedures = [];
    message.classes = [];
    message.enumerations = [];
    message.exceptions = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.procedures !== undefined && object.procedures !== null) {
      for (const e of object.procedures) {
        message.procedures.push(Procedure.fromJSON(e));
      }
    }
    if (object.classes !== undefined && object.classes !== null) {
      for (const e of object.classes) {
        message.classes.push(Class.fromJSON(e));
      }
    }
    if (object.enumerations !== undefined && object.enumerations !== null) {
      for (const e of object.enumerations) {
        message.enumerations.push(Enumeration.fromJSON(e));
      }
    }
    if (object.exceptions !== undefined && object.exceptions !== null) {
      for (const e of object.exceptions) {
        message.exceptions.push(Exception.fromJSON(e));
      }
    }
    if (object.documentation !== undefined && object.documentation !== null) {
      message.documentation = String(object.documentation);
    } else {
      message.documentation = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<Service>): Service {
    const message = { ...baseService } as Service;
    message.procedures = [];
    message.classes = [];
    message.enumerations = [];
    message.exceptions = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.procedures !== undefined && object.procedures !== null) {
      for (const e of object.procedures) {
        message.procedures.push(Procedure.fromPartial(e));
      }
    }
    if (object.classes !== undefined && object.classes !== null) {
      for (const e of object.classes) {
        message.classes.push(Class.fromPartial(e));
      }
    }
    if (object.enumerations !== undefined && object.enumerations !== null) {
      for (const e of object.enumerations) {
        message.enumerations.push(Enumeration.fromPartial(e));
      }
    }
    if (object.exceptions !== undefined && object.exceptions !== null) {
      for (const e of object.exceptions) {
        message.exceptions.push(Exception.fromPartial(e));
      }
    }
    if (object.documentation !== undefined && object.documentation !== null) {
      message.documentation = object.documentation;
    } else {
      message.documentation = "";
    }
    return message;
  },
  toJSON(message: Service): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.procedures) {
      obj.procedures = message.procedures.map(e => e ? Procedure.toJSON(e) : undefined);
    } else {
      obj.procedures = [];
    }
    if (message.classes) {
      obj.classes = message.classes.map(e => e ? Class.toJSON(e) : undefined);
    } else {
      obj.classes = [];
    }
    if (message.enumerations) {
      obj.enumerations = message.enumerations.map(e => e ? Enumeration.toJSON(e) : undefined);
    } else {
      obj.enumerations = [];
    }
    if (message.exceptions) {
      obj.exceptions = message.exceptions.map(e => e ? Exception.toJSON(e) : undefined);
    } else {
      obj.exceptions = [];
    }
    message.documentation !== undefined && (obj.documentation = message.documentation);
    return obj;
  },
};

export const Procedure = {
  encode(message: Procedure, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    for (const v of message.parameters) {
      Parameter.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.returnType !== undefined && message.returnType !== undefined) {
      Type.encode(message.returnType, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(32).bool(message.returnIsNullable);
    writer.uint32(50).fork();
    for (const v of message.gameScenes) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(42).string(message.documentation);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Procedure {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProcedure } as Procedure;
    message.parameters = [];
    message.gameScenes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.parameters.push(Parameter.decode(reader, reader.uint32()));
          break;
        case 3:
          message.returnType = Type.decode(reader, reader.uint32());
          break;
        case 4:
          message.returnIsNullable = reader.bool();
          break;
        case 6:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.gameScenes.push(reader.int32() as any);
            }
          } else {
            message.gameScenes.push(reader.int32() as any);
          }
          break;
        case 5:
          message.documentation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Procedure {
    const message = { ...baseProcedure } as Procedure;
    message.parameters = [];
    message.gameScenes = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.parameters !== undefined && object.parameters !== null) {
      for (const e of object.parameters) {
        message.parameters.push(Parameter.fromJSON(e));
      }
    }
    if (object.returnType !== undefined && object.returnType !== null) {
      message.returnType = Type.fromJSON(object.returnType);
    } else {
      message.returnType = undefined;
    }
    if (object.returnIsNullable !== undefined && object.returnIsNullable !== null) {
      message.returnIsNullable = Boolean(object.returnIsNullable);
    } else {
      message.returnIsNullable = false;
    }
    if (object.gameScenes !== undefined && object.gameScenes !== null) {
      for (const e of object.gameScenes) {
        message.gameScenes.push(procedure_GameSceneFromJSON(e));
      }
    }
    if (object.documentation !== undefined && object.documentation !== null) {
      message.documentation = String(object.documentation);
    } else {
      message.documentation = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<Procedure>): Procedure {
    const message = { ...baseProcedure } as Procedure;
    message.parameters = [];
    message.gameScenes = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.parameters !== undefined && object.parameters !== null) {
      for (const e of object.parameters) {
        message.parameters.push(Parameter.fromPartial(e));
      }
    }
    if (object.returnType !== undefined && object.returnType !== null) {
      message.returnType = Type.fromPartial(object.returnType);
    } else {
      message.returnType = undefined;
    }
    if (object.returnIsNullable !== undefined && object.returnIsNullable !== null) {
      message.returnIsNullable = object.returnIsNullable;
    } else {
      message.returnIsNullable = false;
    }
    if (object.gameScenes !== undefined && object.gameScenes !== null) {
      for (const e of object.gameScenes) {
        message.gameScenes.push(e);
      }
    }
    if (object.documentation !== undefined && object.documentation !== null) {
      message.documentation = object.documentation;
    } else {
      message.documentation = "";
    }
    return message;
  },
  toJSON(message: Procedure): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.parameters) {
      obj.parameters = message.parameters.map(e => e ? Parameter.toJSON(e) : undefined);
    } else {
      obj.parameters = [];
    }
    message.returnType !== undefined && (obj.returnType = message.returnType ? Type.toJSON(message.returnType) : undefined);
    message.returnIsNullable !== undefined && (obj.returnIsNullable = message.returnIsNullable);
    if (message.gameScenes) {
      obj.gameScenes = message.gameScenes.map(e => procedure_GameSceneToJSON(e));
    } else {
      obj.gameScenes = [];
    }
    message.documentation !== undefined && (obj.documentation = message.documentation);
    return obj;
  },
};

export const Parameter = {
  encode(message: Parameter, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    if (message.type !== undefined && message.type !== undefined) {
      Type.encode(message.type, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(26).bytes(message.defaultValue);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Parameter {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParameter } as Parameter;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.type = Type.decode(reader, reader.uint32());
          break;
        case 3:
          message.defaultValue = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Parameter {
    const message = { ...baseParameter } as Parameter;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = Type.fromJSON(object.type);
    } else {
      message.type = undefined;
    }
    if (object.defaultValue !== undefined && object.defaultValue !== null) {
      message.defaultValue = bytesFromBase64(object.defaultValue);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Parameter>): Parameter {
    const message = { ...baseParameter } as Parameter;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = Type.fromPartial(object.type);
    } else {
      message.type = undefined;
    }
    if (object.defaultValue !== undefined && object.defaultValue !== null) {
      message.defaultValue = object.defaultValue;
    } else {
      message.defaultValue = new Uint8Array();
    }
    return message;
  },
  toJSON(message: Parameter): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = message.type ? Type.toJSON(message.type) : undefined);
    message.defaultValue !== undefined && (obj.defaultValue = base64FromBytes(message.defaultValue !== undefined ? message.defaultValue : new Uint8Array()));
    return obj;
  },
};

export const Class = {
  encode(message: Class, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(18).string(message.documentation);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Class {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClass } as Class;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.documentation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Class {
    const message = { ...baseClass } as Class;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.documentation !== undefined && object.documentation !== null) {
      message.documentation = String(object.documentation);
    } else {
      message.documentation = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<Class>): Class {
    const message = { ...baseClass } as Class;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.documentation !== undefined && object.documentation !== null) {
      message.documentation = object.documentation;
    } else {
      message.documentation = "";
    }
    return message;
  },
  toJSON(message: Class): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.documentation !== undefined && (obj.documentation = message.documentation);
    return obj;
  },
};

export const Enumeration = {
  encode(message: Enumeration, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    for (const v of message.values) {
      EnumerationValue.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(26).string(message.documentation);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Enumeration {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEnumeration } as Enumeration;
    message.values = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.values.push(EnumerationValue.decode(reader, reader.uint32()));
          break;
        case 3:
          message.documentation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Enumeration {
    const message = { ...baseEnumeration } as Enumeration;
    message.values = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.values !== undefined && object.values !== null) {
      for (const e of object.values) {
        message.values.push(EnumerationValue.fromJSON(e));
      }
    }
    if (object.documentation !== undefined && object.documentation !== null) {
      message.documentation = String(object.documentation);
    } else {
      message.documentation = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<Enumeration>): Enumeration {
    const message = { ...baseEnumeration } as Enumeration;
    message.values = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.values !== undefined && object.values !== null) {
      for (const e of object.values) {
        message.values.push(EnumerationValue.fromPartial(e));
      }
    }
    if (object.documentation !== undefined && object.documentation !== null) {
      message.documentation = object.documentation;
    } else {
      message.documentation = "";
    }
    return message;
  },
  toJSON(message: Enumeration): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.values) {
      obj.values = message.values.map(e => e ? EnumerationValue.toJSON(e) : undefined);
    } else {
      obj.values = [];
    }
    message.documentation !== undefined && (obj.documentation = message.documentation);
    return obj;
  },
};

export const EnumerationValue = {
  encode(message: EnumerationValue, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(16).int32(message.value);
    writer.uint32(26).string(message.documentation);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): EnumerationValue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEnumerationValue } as EnumerationValue;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.value = reader.int32();
          break;
        case 3:
          message.documentation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EnumerationValue {
    const message = { ...baseEnumerationValue } as EnumerationValue;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    if (object.documentation !== undefined && object.documentation !== null) {
      message.documentation = String(object.documentation);
    } else {
      message.documentation = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<EnumerationValue>): EnumerationValue {
    const message = { ...baseEnumerationValue } as EnumerationValue;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
    }
    if (object.documentation !== undefined && object.documentation !== null) {
      message.documentation = object.documentation;
    } else {
      message.documentation = "";
    }
    return message;
  },
  toJSON(message: EnumerationValue): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.value !== undefined && (obj.value = message.value);
    message.documentation !== undefined && (obj.documentation = message.documentation);
    return obj;
  },
};

export const Exception = {
  encode(message: Exception, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(18).string(message.documentation);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Exception {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseException } as Exception;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.documentation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Exception {
    const message = { ...baseException } as Exception;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.documentation !== undefined && object.documentation !== null) {
      message.documentation = String(object.documentation);
    } else {
      message.documentation = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<Exception>): Exception {
    const message = { ...baseException } as Exception;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.documentation !== undefined && object.documentation !== null) {
      message.documentation = object.documentation;
    } else {
      message.documentation = "";
    }
    return message;
  },
  toJSON(message: Exception): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.documentation !== undefined && (obj.documentation = message.documentation);
    return obj;
  },
};

export const Type = {
  encode(message: Type, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.code);
    writer.uint32(18).string(message.service);
    writer.uint32(26).string(message.name);
    for (const v of message.types) {
      Type.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Type {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseType } as Type;
    message.types = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.int32() as any;
          break;
        case 2:
          message.service = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.types.push(Type.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Type {
    const message = { ...baseType } as Type;
    message.types = [];
    if (object.code !== undefined && object.code !== null) {
      message.code = type_TypeCodeFromJSON(object.code);
    } else {
      message.code = 0;
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = String(object.service);
    } else {
      message.service = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.types !== undefined && object.types !== null) {
      for (const e of object.types) {
        message.types.push(Type.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Type>): Type {
    const message = { ...baseType } as Type;
    message.types = [];
    if (object.code !== undefined && object.code !== null) {
      message.code = object.code;
    } else {
      message.code = 0;
    }
    if (object.service !== undefined && object.service !== null) {
      message.service = object.service;
    } else {
      message.service = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.types !== undefined && object.types !== null) {
      for (const e of object.types) {
        message.types.push(Type.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: Type): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = type_TypeCodeToJSON(message.code));
    message.service !== undefined && (obj.service = message.service);
    message.name !== undefined && (obj.name = message.name);
    if (message.types) {
      obj.types = message.types.map(e => e ? Type.toJSON(e) : undefined);
    } else {
      obj.types = [];
    }
    return obj;
  },
};

export const Tuple = {
  encode(message: Tuple, writer: Writer = Writer.create()): Writer {
    for (const v of message.items) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Tuple {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTuple } as Tuple;
    message.items = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.items.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Tuple {
    const message = { ...baseTuple } as Tuple;
    message.items = [];
    if (object.items !== undefined && object.items !== null) {
      for (const e of object.items) {
        message.items.push(bytesFromBase64(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Tuple>): Tuple {
    const message = { ...baseTuple } as Tuple;
    message.items = [];
    if (object.items !== undefined && object.items !== null) {
      for (const e of object.items) {
        message.items.push(e);
      }
    }
    return message;
  },
  toJSON(message: Tuple): unknown {
    const obj: any = {};
    if (message.items) {
      obj.items = message.items.map(e => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.items = [];
    }
    return obj;
  },
};

export const List = {
  encode(message: List, writer: Writer = Writer.create()): Writer {
    for (const v of message.items) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): List {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseList } as List;
    message.items = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.items.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): List {
    const message = { ...baseList } as List;
    message.items = [];
    if (object.items !== undefined && object.items !== null) {
      for (const e of object.items) {
        message.items.push(bytesFromBase64(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<List>): List {
    const message = { ...baseList } as List;
    message.items = [];
    if (object.items !== undefined && object.items !== null) {
      for (const e of object.items) {
        message.items.push(e);
      }
    }
    return message;
  },
  toJSON(message: List): unknown {
    const obj: any = {};
    if (message.items) {
      obj.items = message.items.map(e => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.items = [];
    }
    return obj;
  },
};

export const Set = {
  encode(message: Set, writer: Writer = Writer.create()): Writer {
    for (const v of message.items) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Set {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSet } as Set;
    message.items = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.items.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Set {
    const message = { ...baseSet } as Set;
    message.items = [];
    if (object.items !== undefined && object.items !== null) {
      for (const e of object.items) {
        message.items.push(bytesFromBase64(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Set>): Set {
    const message = { ...baseSet } as Set;
    message.items = [];
    if (object.items !== undefined && object.items !== null) {
      for (const e of object.items) {
        message.items.push(e);
      }
    }
    return message;
  },
  toJSON(message: Set): unknown {
    const obj: any = {};
    if (message.items) {
      obj.items = message.items.map(e => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.items = [];
    }
    return obj;
  },
};

export const Dictionary = {
  encode(message: Dictionary, writer: Writer = Writer.create()): Writer {
    for (const v of message.entries) {
      DictionaryEntry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Dictionary {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDictionary } as Dictionary;
    message.entries = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entries.push(DictionaryEntry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Dictionary {
    const message = { ...baseDictionary } as Dictionary;
    message.entries = [];
    if (object.entries !== undefined && object.entries !== null) {
      for (const e of object.entries) {
        message.entries.push(DictionaryEntry.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Dictionary>): Dictionary {
    const message = { ...baseDictionary } as Dictionary;
    message.entries = [];
    if (object.entries !== undefined && object.entries !== null) {
      for (const e of object.entries) {
        message.entries.push(DictionaryEntry.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: Dictionary): unknown {
    const obj: any = {};
    if (message.entries) {
      obj.entries = message.entries.map(e => e ? DictionaryEntry.toJSON(e) : undefined);
    } else {
      obj.entries = [];
    }
    return obj;
  },
};

export const DictionaryEntry = {
  encode(message: DictionaryEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).bytes(message.key);
    writer.uint32(18).bytes(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DictionaryEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDictionaryEntry } as DictionaryEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DictionaryEntry {
    const message = { ...baseDictionaryEntry } as DictionaryEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<DictionaryEntry>): DictionaryEntry {
    const message = { ...baseDictionaryEntry } as DictionaryEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = new Uint8Array();
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = new Uint8Array();
    }
    return message;
  },
  toJSON(message: DictionaryEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    message.value !== undefined && (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
    return obj;
  },
};

export const Stream = {
  encode(message: Stream, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint64(message.id);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Stream {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStream } as Stream;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Stream {
    const message = { ...baseStream } as Stream;
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
    } else {
      message.id = Long.UZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Stream>): Stream {
    const message = { ...baseStream } as Stream;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id as Long;
    } else {
      message.id = Long.UZERO;
    }
    return message;
  },
  toJSON(message: Stream): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },
};

export const Event = {
  encode(message: Event, writer: Writer = Writer.create()): Writer {
    if (message.stream !== undefined && message.stream !== undefined) {
      Stream.encode(message.stream, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Event {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEvent } as Event;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stream = Stream.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Event {
    const message = { ...baseEvent } as Event;
    if (object.stream !== undefined && object.stream !== null) {
      message.stream = Stream.fromJSON(object.stream);
    } else {
      message.stream = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Event>): Event {
    const message = { ...baseEvent } as Event;
    if (object.stream !== undefined && object.stream !== null) {
      message.stream = Stream.fromPartial(object.stream);
    } else {
      message.stream = undefined;
    }
    return message;
  },
  toJSON(message: Event): unknown {
    const obj: any = {};
    message.stream !== undefined && (obj.stream = message.stream ? Stream.toJSON(message.stream) : undefined);
    return obj;
  },
};

export const Status = {
  encode(message: Status, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.version);
    writer.uint32(16).uint64(message.bytesRead);
    writer.uint32(24).uint64(message.bytesWritten);
    writer.uint32(37).float(message.bytesReadRate);
    writer.uint32(45).float(message.bytesWrittenRate);
    writer.uint32(48).uint64(message.rpcsExecuted);
    writer.uint32(61).float(message.rpcRate);
    writer.uint32(64).bool(message.oneRpcPerUpdate);
    writer.uint32(72).uint32(message.maxTimePerUpdate);
    writer.uint32(80).bool(message.adaptiveRateControl);
    writer.uint32(88).bool(message.blockingRecv);
    writer.uint32(96).uint32(message.recvTimeout);
    writer.uint32(109).float(message.timePerRpcUpdate);
    writer.uint32(117).float(message.pollTimePerRpcUpdate);
    writer.uint32(125).float(message.execTimePerRpcUpdate);
    writer.uint32(128).uint32(message.streamRpcs);
    writer.uint32(136).uint64(message.streamRpcsExecuted);
    writer.uint32(149).float(message.streamRpcRate);
    writer.uint32(157).float(message.timePerStreamUpdate);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Status {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStatus } as Status;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        case 2:
          message.bytesRead = reader.uint64() as Long;
          break;
        case 3:
          message.bytesWritten = reader.uint64() as Long;
          break;
        case 4:
          message.bytesReadRate = reader.float();
          break;
        case 5:
          message.bytesWrittenRate = reader.float();
          break;
        case 6:
          message.rpcsExecuted = reader.uint64() as Long;
          break;
        case 7:
          message.rpcRate = reader.float();
          break;
        case 8:
          message.oneRpcPerUpdate = reader.bool();
          break;
        case 9:
          message.maxTimePerUpdate = reader.uint32();
          break;
        case 10:
          message.adaptiveRateControl = reader.bool();
          break;
        case 11:
          message.blockingRecv = reader.bool();
          break;
        case 12:
          message.recvTimeout = reader.uint32();
          break;
        case 13:
          message.timePerRpcUpdate = reader.float();
          break;
        case 14:
          message.pollTimePerRpcUpdate = reader.float();
          break;
        case 15:
          message.execTimePerRpcUpdate = reader.float();
          break;
        case 16:
          message.streamRpcs = reader.uint32();
          break;
        case 17:
          message.streamRpcsExecuted = reader.uint64() as Long;
          break;
        case 18:
          message.streamRpcRate = reader.float();
          break;
        case 19:
          message.timePerStreamUpdate = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Status {
    const message = { ...baseStatus } as Status;
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    } else {
      message.version = "";
    }
    if (object.bytesRead !== undefined && object.bytesRead !== null) {
      message.bytesRead = Long.fromString(object.bytesRead);
    } else {
      message.bytesRead = Long.UZERO;
    }
    if (object.bytesWritten !== undefined && object.bytesWritten !== null) {
      message.bytesWritten = Long.fromString(object.bytesWritten);
    } else {
      message.bytesWritten = Long.UZERO;
    }
    if (object.bytesReadRate !== undefined && object.bytesReadRate !== null) {
      message.bytesReadRate = Number(object.bytesReadRate);
    } else {
      message.bytesReadRate = 0;
    }
    if (object.bytesWrittenRate !== undefined && object.bytesWrittenRate !== null) {
      message.bytesWrittenRate = Number(object.bytesWrittenRate);
    } else {
      message.bytesWrittenRate = 0;
    }
    if (object.rpcsExecuted !== undefined && object.rpcsExecuted !== null) {
      message.rpcsExecuted = Long.fromString(object.rpcsExecuted);
    } else {
      message.rpcsExecuted = Long.UZERO;
    }
    if (object.rpcRate !== undefined && object.rpcRate !== null) {
      message.rpcRate = Number(object.rpcRate);
    } else {
      message.rpcRate = 0;
    }
    if (object.oneRpcPerUpdate !== undefined && object.oneRpcPerUpdate !== null) {
      message.oneRpcPerUpdate = Boolean(object.oneRpcPerUpdate);
    } else {
      message.oneRpcPerUpdate = false;
    }
    if (object.maxTimePerUpdate !== undefined && object.maxTimePerUpdate !== null) {
      message.maxTimePerUpdate = Number(object.maxTimePerUpdate);
    } else {
      message.maxTimePerUpdate = 0;
    }
    if (object.adaptiveRateControl !== undefined && object.adaptiveRateControl !== null) {
      message.adaptiveRateControl = Boolean(object.adaptiveRateControl);
    } else {
      message.adaptiveRateControl = false;
    }
    if (object.blockingRecv !== undefined && object.blockingRecv !== null) {
      message.blockingRecv = Boolean(object.blockingRecv);
    } else {
      message.blockingRecv = false;
    }
    if (object.recvTimeout !== undefined && object.recvTimeout !== null) {
      message.recvTimeout = Number(object.recvTimeout);
    } else {
      message.recvTimeout = 0;
    }
    if (object.timePerRpcUpdate !== undefined && object.timePerRpcUpdate !== null) {
      message.timePerRpcUpdate = Number(object.timePerRpcUpdate);
    } else {
      message.timePerRpcUpdate = 0;
    }
    if (object.pollTimePerRpcUpdate !== undefined && object.pollTimePerRpcUpdate !== null) {
      message.pollTimePerRpcUpdate = Number(object.pollTimePerRpcUpdate);
    } else {
      message.pollTimePerRpcUpdate = 0;
    }
    if (object.execTimePerRpcUpdate !== undefined && object.execTimePerRpcUpdate !== null) {
      message.execTimePerRpcUpdate = Number(object.execTimePerRpcUpdate);
    } else {
      message.execTimePerRpcUpdate = 0;
    }
    if (object.streamRpcs !== undefined && object.streamRpcs !== null) {
      message.streamRpcs = Number(object.streamRpcs);
    } else {
      message.streamRpcs = 0;
    }
    if (object.streamRpcsExecuted !== undefined && object.streamRpcsExecuted !== null) {
      message.streamRpcsExecuted = Long.fromString(object.streamRpcsExecuted);
    } else {
      message.streamRpcsExecuted = Long.UZERO;
    }
    if (object.streamRpcRate !== undefined && object.streamRpcRate !== null) {
      message.streamRpcRate = Number(object.streamRpcRate);
    } else {
      message.streamRpcRate = 0;
    }
    if (object.timePerStreamUpdate !== undefined && object.timePerStreamUpdate !== null) {
      message.timePerStreamUpdate = Number(object.timePerStreamUpdate);
    } else {
      message.timePerStreamUpdate = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Status>): Status {
    const message = { ...baseStatus } as Status;
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    } else {
      message.version = "";
    }
    if (object.bytesRead !== undefined && object.bytesRead !== null) {
      message.bytesRead = object.bytesRead as Long;
    } else {
      message.bytesRead = Long.UZERO;
    }
    if (object.bytesWritten !== undefined && object.bytesWritten !== null) {
      message.bytesWritten = object.bytesWritten as Long;
    } else {
      message.bytesWritten = Long.UZERO;
    }
    if (object.bytesReadRate !== undefined && object.bytesReadRate !== null) {
      message.bytesReadRate = object.bytesReadRate;
    } else {
      message.bytesReadRate = 0;
    }
    if (object.bytesWrittenRate !== undefined && object.bytesWrittenRate !== null) {
      message.bytesWrittenRate = object.bytesWrittenRate;
    } else {
      message.bytesWrittenRate = 0;
    }
    if (object.rpcsExecuted !== undefined && object.rpcsExecuted !== null) {
      message.rpcsExecuted = object.rpcsExecuted as Long;
    } else {
      message.rpcsExecuted = Long.UZERO;
    }
    if (object.rpcRate !== undefined && object.rpcRate !== null) {
      message.rpcRate = object.rpcRate;
    } else {
      message.rpcRate = 0;
    }
    if (object.oneRpcPerUpdate !== undefined && object.oneRpcPerUpdate !== null) {
      message.oneRpcPerUpdate = object.oneRpcPerUpdate;
    } else {
      message.oneRpcPerUpdate = false;
    }
    if (object.maxTimePerUpdate !== undefined && object.maxTimePerUpdate !== null) {
      message.maxTimePerUpdate = object.maxTimePerUpdate;
    } else {
      message.maxTimePerUpdate = 0;
    }
    if (object.adaptiveRateControl !== undefined && object.adaptiveRateControl !== null) {
      message.adaptiveRateControl = object.adaptiveRateControl;
    } else {
      message.adaptiveRateControl = false;
    }
    if (object.blockingRecv !== undefined && object.blockingRecv !== null) {
      message.blockingRecv = object.blockingRecv;
    } else {
      message.blockingRecv = false;
    }
    if (object.recvTimeout !== undefined && object.recvTimeout !== null) {
      message.recvTimeout = object.recvTimeout;
    } else {
      message.recvTimeout = 0;
    }
    if (object.timePerRpcUpdate !== undefined && object.timePerRpcUpdate !== null) {
      message.timePerRpcUpdate = object.timePerRpcUpdate;
    } else {
      message.timePerRpcUpdate = 0;
    }
    if (object.pollTimePerRpcUpdate !== undefined && object.pollTimePerRpcUpdate !== null) {
      message.pollTimePerRpcUpdate = object.pollTimePerRpcUpdate;
    } else {
      message.pollTimePerRpcUpdate = 0;
    }
    if (object.execTimePerRpcUpdate !== undefined && object.execTimePerRpcUpdate !== null) {
      message.execTimePerRpcUpdate = object.execTimePerRpcUpdate;
    } else {
      message.execTimePerRpcUpdate = 0;
    }
    if (object.streamRpcs !== undefined && object.streamRpcs !== null) {
      message.streamRpcs = object.streamRpcs;
    } else {
      message.streamRpcs = 0;
    }
    if (object.streamRpcsExecuted !== undefined && object.streamRpcsExecuted !== null) {
      message.streamRpcsExecuted = object.streamRpcsExecuted as Long;
    } else {
      message.streamRpcsExecuted = Long.UZERO;
    }
    if (object.streamRpcRate !== undefined && object.streamRpcRate !== null) {
      message.streamRpcRate = object.streamRpcRate;
    } else {
      message.streamRpcRate = 0;
    }
    if (object.timePerStreamUpdate !== undefined && object.timePerStreamUpdate !== null) {
      message.timePerStreamUpdate = object.timePerStreamUpdate;
    } else {
      message.timePerStreamUpdate = 0;
    }
    return message;
  },
  toJSON(message: Status): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.bytesRead !== undefined && (obj.bytesRead = (message.bytesRead || Long.UZERO).toString());
    message.bytesWritten !== undefined && (obj.bytesWritten = (message.bytesWritten || Long.UZERO).toString());
    message.bytesReadRate !== undefined && (obj.bytesReadRate = message.bytesReadRate);
    message.bytesWrittenRate !== undefined && (obj.bytesWrittenRate = message.bytesWrittenRate);
    message.rpcsExecuted !== undefined && (obj.rpcsExecuted = (message.rpcsExecuted || Long.UZERO).toString());
    message.rpcRate !== undefined && (obj.rpcRate = message.rpcRate);
    message.oneRpcPerUpdate !== undefined && (obj.oneRpcPerUpdate = message.oneRpcPerUpdate);
    message.maxTimePerUpdate !== undefined && (obj.maxTimePerUpdate = message.maxTimePerUpdate);
    message.adaptiveRateControl !== undefined && (obj.adaptiveRateControl = message.adaptiveRateControl);
    message.blockingRecv !== undefined && (obj.blockingRecv = message.blockingRecv);
    message.recvTimeout !== undefined && (obj.recvTimeout = message.recvTimeout);
    message.timePerRpcUpdate !== undefined && (obj.timePerRpcUpdate = message.timePerRpcUpdate);
    message.pollTimePerRpcUpdate !== undefined && (obj.pollTimePerRpcUpdate = message.pollTimePerRpcUpdate);
    message.execTimePerRpcUpdate !== undefined && (obj.execTimePerRpcUpdate = message.execTimePerRpcUpdate);
    message.streamRpcs !== undefined && (obj.streamRpcs = message.streamRpcs);
    message.streamRpcsExecuted !== undefined && (obj.streamRpcsExecuted = (message.streamRpcsExecuted || Long.UZERO).toString());
    message.streamRpcRate !== undefined && (obj.streamRpcRate = message.streamRpcRate);
    message.timePerStreamUpdate !== undefined && (obj.timePerStreamUpdate = message.timePerStreamUpdate);
    return obj;
  },
};

export const MultiplexedRequest = {
  encode(message: MultiplexedRequest, writer: Writer = Writer.create()): Writer {
    if (message.connectionRequest !== undefined && message.connectionRequest !== undefined) {
      ConnectionRequest.encode(message.connectionRequest, writer.uint32(10).fork()).ldelim();
    }
    if (message.request !== undefined && message.request !== undefined) {
      Request.encode(message.request, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MultiplexedRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMultiplexedRequest } as MultiplexedRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectionRequest = ConnectionRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.request = Request.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MultiplexedRequest {
    const message = { ...baseMultiplexedRequest } as MultiplexedRequest;
    if (object.connectionRequest !== undefined && object.connectionRequest !== null) {
      message.connectionRequest = ConnectionRequest.fromJSON(object.connectionRequest);
    } else {
      message.connectionRequest = undefined;
    }
    if (object.request !== undefined && object.request !== null) {
      message.request = Request.fromJSON(object.request);
    } else {
      message.request = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<MultiplexedRequest>): MultiplexedRequest {
    const message = { ...baseMultiplexedRequest } as MultiplexedRequest;
    if (object.connectionRequest !== undefined && object.connectionRequest !== null) {
      message.connectionRequest = ConnectionRequest.fromPartial(object.connectionRequest);
    } else {
      message.connectionRequest = undefined;
    }
    if (object.request !== undefined && object.request !== null) {
      message.request = Request.fromPartial(object.request);
    } else {
      message.request = undefined;
    }
    return message;
  },
  toJSON(message: MultiplexedRequest): unknown {
    const obj: any = {};
    message.connectionRequest !== undefined && (obj.connectionRequest = message.connectionRequest ? ConnectionRequest.toJSON(message.connectionRequest) : undefined);
    message.request !== undefined && (obj.request = message.request ? Request.toJSON(message.request) : undefined);
    return obj;
  },
};

export const MultiplexedResponse = {
  encode(message: MultiplexedResponse, writer: Writer = Writer.create()): Writer {
    if (message.response !== undefined && message.response !== undefined) {
      Response.encode(message.response, writer.uint32(10).fork()).ldelim();
    }
    if (message.streamUpdate !== undefined && message.streamUpdate !== undefined) {
      StreamUpdate.encode(message.streamUpdate, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MultiplexedResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMultiplexedResponse } as MultiplexedResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.response = Response.decode(reader, reader.uint32());
          break;
        case 2:
          message.streamUpdate = StreamUpdate.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MultiplexedResponse {
    const message = { ...baseMultiplexedResponse } as MultiplexedResponse;
    if (object.response !== undefined && object.response !== null) {
      message.response = Response.fromJSON(object.response);
    } else {
      message.response = undefined;
    }
    if (object.streamUpdate !== undefined && object.streamUpdate !== null) {
      message.streamUpdate = StreamUpdate.fromJSON(object.streamUpdate);
    } else {
      message.streamUpdate = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<MultiplexedResponse>): MultiplexedResponse {
    const message = { ...baseMultiplexedResponse } as MultiplexedResponse;
    if (object.response !== undefined && object.response !== null) {
      message.response = Response.fromPartial(object.response);
    } else {
      message.response = undefined;
    }
    if (object.streamUpdate !== undefined && object.streamUpdate !== null) {
      message.streamUpdate = StreamUpdate.fromPartial(object.streamUpdate);
    } else {
      message.streamUpdate = undefined;
    }
    return message;
  },
  toJSON(message: MultiplexedResponse): unknown {
    const obj: any = {};
    message.response !== undefined && (obj.response = message.response ? Response.toJSON(message.response) : undefined);
    message.streamUpdate !== undefined && (obj.streamUpdate = message.streamUpdate ? StreamUpdate.toJSON(message.streamUpdate) : undefined);
    return obj;
  },
};

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown as WindowBase64);
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, 'base64').toString('binary'));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, 'binary').toString('base64'));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(''));
}
type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;