import { Context } from "@azure/functions";
import { CosmosDbConnectionInfo } from "../repos/core";

/**
 * Middleware context that contains `next` method, together with `done` to be able to move between middleware handlers.
 */
interface CustomContext extends Context {
  /**
   * Move to the next middleware
   * @param error Error to pass to the next middleware, optional.
   */
  next(error?: Error): void;

  /** Main Data Cosmos DB connection */
  cosmosDb: CosmosDbConnectionInfo;
}

export default CustomContext;
