import { Long } from "protobufjs";

import * as proto from "../src/generated/proto/krpc";

export namespace TestService {
  export interface TestService {
    floatToString(value: number): Promise<string>;

    doubleToString(value: number): Promise<string>;

    int32ToString(value: number): Promise<string>;

    int64ToString(value: number | Long): Promise<string>;

    boolToString(value: boolean): Promise<string>;

    stringToInt32(value: string): Promise<number>;

    bytesToHexString(value: Uint8Array): Promise<string>;

    addMultipleValues(x: number, y: number, z: number | Long): Promise<string>;

    createTestObject(value: string): Promise<TestClass>;

    echoTestObject(value: TestClass): Promise<TestClass>;

    returnNullWhenNotAllowed(): Promise<TestClass>;

    optionalArguments(
      x: string,
      y?: string,
      z?: string,
      obj?: TestClass
    ): Promise<string>;

    enumReturn(): Promise<TestEnum>;

    enumEcho(x: TestEnum): Promise<TestEnum>;

    enumDefaultArg(x?: TestEnum): Promise<TestEnum>;

    blockingProcedure(n: number, sum?: number): Promise<number>;

    incrementList(l: number[]): Promise<number[]>;

    incrementDictionary(d: {
      [key: string]: number;
    }): Promise<{ [key: string]: number }>;

    incrementSet(h: Set<number>): Promise<Set<number>>;

    incrementTuple(t: [number, number | Long]): Promise<[number, Long]>;

    incrementNestedCollection(d: {
      [key: string]: number[];
    }): Promise<{ [key: string]: number[] }>;

    tupleDefault(x?: [number, boolean]): Promise<[number, boolean]>;

    listDefault(x?: number[]): Promise<number[]>;

    setDefault(x?: Set<number>): Promise<Set<number>>;

    dictionaryDefault(x?: {
      [key: number]: boolean;
    }): Promise<{ [key: number]: boolean }>;

    addToObjectList(l: TestClass[], value: string): Promise<TestClass[]>;

    counter(id?: string, divisor?: number): Promise<number>;

    throwInvalidOperationException(): Promise<number>;

    resetInvalidOperationExceptionLater(): Promise<void>;

    throwInvalidOperationExceptionLater(): Promise<number>;

    throwArgumentException(): Promise<number>;

    throwArgumentNullException(foo: string): Promise<number>;

    throwArgumentOutOfRangeException(foo: number): Promise<number>;

    throwCustomException(): Promise<number>;

    resetCustomExceptionLater(): Promise<void>;

    throwCustomExceptionLater(): Promise<number>;

    onTimer(milliseconds: number, repeats?: number): Promise<proto.Event>;

    onTimerUsingLambda(milliseconds: number): Promise<proto.Event>;

    getStringProperty(): Promise<string>;

    setStringProperty(value: string): Promise<void>;

    setStringPropertyPrivateGet(value: string): Promise<void>;

    getStringPropertyPrivateSet(): Promise<string>;

    getObjectProperty(): Promise<TestClass>;

    setObjectProperty(value: TestClass): Promise<void>;
  }

  export interface TestClass {
    readonly id: number;
    constructor(id: number): TestClass;

    getValue(): Promise<string>;

    floatToString(x: number): Promise<string>;

    objectToString(other: TestClass): Promise<string>;

    optionalArguments(
      x: string,
      y?: string,
      z?: string,
      obj?: TestClass
    ): Promise<string>;

    // static staticMethod(a?: string, b?: string): Promise<string>

    getIntProperty(): Promise<number>;

    setIntProperty(value: number): Promise<void>;

    getObjectProperty(): Promise<TestClass>;

    setObjectProperty(value: TestClass): Promise<void>;
  }

  export type TestEnum = "ValueA" | "ValueB" | "ValueC";
}
