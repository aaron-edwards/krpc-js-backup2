import createServiceFiles from "./create-files";
import getServices from "./get-services";
import createService from "./create-service";

getServices()
  .then((s) => s.map(createService))
  .then(createServiceFiles)
  .catch(console.error); // eslint-disable-line no-console
