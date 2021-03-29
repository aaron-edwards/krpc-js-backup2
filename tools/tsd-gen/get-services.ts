import RcpClient from "../../src/client/RpcClient";
import {
  ProcedureCall,
  Service,
  Services,
} from "../../src/generated/proto/krpc";

export default async function getServices(): Promise<Service[]> {
  const client = new RcpClient({
    host: "localhost",
    port: 50_000,
    name: "krpc",
  });
  await client.connect();
  const services = await client.sendRequest({
    request: ProcedureCall.fromPartial({
      service: "KRPC",
      procedure: "GetServices",
    }),
    decode: Services.decode,
  });
  await client.close();
  return services.services;
}
