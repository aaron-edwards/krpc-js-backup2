import { TcpRpcClient } from "./client/RpcClient";

const run = async () => {
  const client = new TcpRpcClient("localhost", 50_000, "krpc");

  await client.connect();
  const a = await Promise.all([
    client.getServices(),
    client.getServices(),
    client.getServices(),
    client.getServices(),
  ]);
  console.log(a);
  // await client.getServices();
  // await client.getServices();
  await client.close();
};

run();
