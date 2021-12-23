import { AzureFunction, HttpRequest } from "@azure/functions";
import * as AzureMiddleware from "azure-middleware";
import resolveDbConnection from "../middlewares/resolve-db-connection";
import CustomContext from "../core/CustomContext";

/** Main function code */
const httpTrigger: AzureFunction = async function (
  context: CustomContext,
  req: HttpRequest
): Promise<void> {
  // the API must contain a polygon geojson to fetch data within this polygon
  const boundaries = req.body;
  if (!boundaries) {
    context.res.status(400).json({ error: "Body must be a GeoJson polygon." });
    context.done();
    return;
  }
  // query the db for the routes within this boundaries
  context.res.status(200).json({ message: "OK" });
  // exit
  context.done();
};

// wrap up a resolve tenant middleware
const doFunction = new AzureMiddleware()
  // warning! order of middlewares matters
  // need to first authenticate user, then resolve tenant based on the user authenticated
  .use(resolveDbConnection)
  .use(httpTrigger)
  .listen();

export default doFunction;
