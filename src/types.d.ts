import { Long } from "protobufjs";

export interface RpcClass {
  readonly id: Long;
}
export interface RpcClassConstuctor {
  new (id: Long): RpcClass;
}

export interface Service {
  readonly name: string;
  readonly enums: { [enumName: string]: string[] };
  readonly classes: { [className: string]: RpcClassConstuctor };
}

export type ServiceMap = {
  [serviceName: string]: Service;
};
