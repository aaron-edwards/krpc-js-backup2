export type RcpClass = {
  new (id: Long): {
    id: Long;
  };
};

export interface Service {
  readonly name: string;
  readonly enums: { [enumName: string]: string[] };
  readonly classes: { [className: string]: RcpClass };
}

export type ServiceMap = {
  [serviceName: string]: Service;
};
