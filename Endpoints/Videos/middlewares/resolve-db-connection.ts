import { HttpRequest } from "@azure/functions";
import CustomContext from "../core/CustomContext";
import { CosmosDbConnectionInfo } from "../repos/core";

/**
 * Finds the tenant based on the user token, or request origin, or other defined tenant access keys
 * @param context Azure function middleware context
 * @param req HTTP request
 */
const resolveDbConnectionMiddleware = async (
  context: CustomContext,
  req: HttpRequest
): Promise<void> => {
  // get the tenant information from master store or NULL
  const cosmosDb: CosmosDbConnectionInfo = new CosmosDbConnectionInfo(
    process.env["COMMENTS_COSMOSDB_KEY"],
    process.env["COMMENTS_COSMOSDB_ENDPOINT"],
    process.env["COMMENTS_COSMOSDB_DBNAME"]
  );

  context.cosmosDb = cosmosDb;
  context.next();
};

export default resolveDbConnectionMiddleware;
