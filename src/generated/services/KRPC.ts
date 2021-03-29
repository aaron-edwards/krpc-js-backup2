import { Long } from "protobufjs";

import * as proto from "../proto/krpc";

export namespace KRPC {
  export interface KRPC {
    getClientID(): Promise<Uint8Array>;

    getClientName(): Promise<string>;

    getStatus(): Promise<proto.Status>;

    getServices(): Promise<proto.Services>;

    addStream(
      call: proto.ProcedureCall,
      start?: boolean
    ): Promise<proto.Stream>;

    startStream(id: number | Long): Promise<void>;

    setStreamRate(id: number | Long, rate: number): Promise<void>;

    removeStream(id: number | Long): Promise<void>;

    addEvent(expression: Expression): Promise<proto.Event>;

    getClients(): Promise<[Uint8Array, string, string][]>;

    getCurrentGameScene(): Promise<GameScene>;

    getPaused(): Promise<boolean>;

    setPaused(value: boolean): Promise<void>;
  }

  export interface Expression {
    readonly id: number;
    constructor(id: number): Expression;

    // static constantDouble(value: number): Promise<Expression>

    // static constantFloat(value: number): Promise<Expression>

    // static constantInt(value: number): Promise<Expression>

    // static constantBool(value: boolean): Promise<Expression>

    // static constantString(value: string): Promise<Expression>

    // static call(call: proto.ProcedureCall): Promise<Expression>

    // static equal(arg0: Expression, arg1: Expression): Promise<Expression>

    // static notEqual(arg0: Expression, arg1: Expression): Promise<Expression>

    // static greaterThan(arg0: Expression, arg1: Expression): Promise<Expression>

    // static greaterThanOrEqual(arg0: Expression, arg1: Expression): Promise<Expression>

    // static lessThan(arg0: Expression, arg1: Expression): Promise<Expression>

    // static lessThanOrEqual(arg0: Expression, arg1: Expression): Promise<Expression>

    // static and(arg0: Expression, arg1: Expression): Promise<Expression>

    // static or(arg0: Expression, arg1: Expression): Promise<Expression>

    // static exclusiveOr(arg0: Expression, arg1: Expression): Promise<Expression>

    // static not(arg: Expression): Promise<Expression>

    // static add(arg0: Expression, arg1: Expression): Promise<Expression>

    // static subtract(arg0: Expression, arg1: Expression): Promise<Expression>

    // static multiply(arg0: Expression, arg1: Expression): Promise<Expression>

    // static divide(arg0: Expression, arg1: Expression): Promise<Expression>

    // static modulo(arg0: Expression, arg1: Expression): Promise<Expression>

    // static power(arg0: Expression, arg1: Expression): Promise<Expression>

    // static leftShift(arg0: Expression, arg1: Expression): Promise<Expression>

    // static rightShift(arg0: Expression, arg1: Expression): Promise<Expression>

    // static cast(arg: Expression, type: Type): Promise<Expression>

    // static parameter(name: string, type: Type): Promise<Expression>

    // static function(parameters: Expression[], body: Expression): Promise<Expression>

    // static invoke(func: Expression, args: { [key: string]: Expression }): Promise<Expression>

    // static createTuple(elements: Expression[]): Promise<Expression>

    // static createList(values: Expression[]): Promise<Expression>

    // static createSet(values: Set<Expression>): Promise<Expression>

    // static createDictionary(keys: Expression[], values: Expression[]): Promise<Expression>

    // static toList(arg: Expression): Promise<Expression>

    // static toSet(arg: Expression): Promise<Expression>

    // static get(arg: Expression, index: Expression): Promise<Expression>

    // static count(arg: Expression): Promise<Expression>

    // static sum(arg: Expression): Promise<Expression>

    // static max(arg: Expression): Promise<Expression>

    // static min(arg: Expression): Promise<Expression>

    // static average(arg: Expression): Promise<Expression>

    // static select(arg: Expression, func: Expression): Promise<Expression>

    // static where(arg: Expression, func: Expression): Promise<Expression>

    // static contains(arg: Expression, value: Expression): Promise<Expression>

    // static aggregate(arg: Expression, func: Expression): Promise<Expression>

    // static aggregateWithSeed(arg: Expression, seed: Expression, func: Expression): Promise<Expression>

    // static concat(arg1: Expression, arg2: Expression): Promise<Expression>

    // static orderBy(arg: Expression, key: Expression): Promise<Expression>

    // static all(arg: Expression, predicate: Expression): Promise<Expression>

    // static any(arg: Expression, predicate: Expression): Promise<Expression>
  }
  export interface Type {
    readonly id: number;
    constructor(id: number): Type;

    // static double(): Promise<Type>

    // static float(): Promise<Type>

    // static int(): Promise<Type>

    // static bool(): Promise<Type>

    // static string(): Promise<Type>
  }

  export type GameScene =
    | "SpaceCenter"
    | "Flight"
    | "TrackingStation"
    | "EditorVAB"
    | "EditorSPH";
}
