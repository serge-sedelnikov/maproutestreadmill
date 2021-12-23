import {
  CosmosClient,
  Database,
  SqlQuerySpec,
} from "@azure/cosmos";

/**
 * Connection information to the cosmos DB
 */
export class CosmosDbConnectionInfo {
  /**Access key */
  key: string;
  /**URL endpoint to connect to. */
  endpoint: string;
  /**Database name */
  dbName: string;

  /** Creates an instance of the cosmos db information */
  constructor(key: string, endpoint: string, dbName: string) {
    this.key = key;
    this.endpoint = endpoint;
    this.dbName = dbName;
  }

  /**
   * Converts the DB information to the instance of the cosmos DB client Database instance.
   */
  toCosmosDbDatabaseClient(): Database {
    const client = new CosmosClient({
      endpoint: this.endpoint,
      key: this.key,
    });
    const database = client.database(this.dbName);
    return database;
  }
}

/**
 * Executes the query against the tenant specific cosmos db
 * @param connectionInfo Cosmos DB connection info
 * @param containerName Name of the container to execute the query on
 * @param query Query object with or without parameters
 */
export const queryCosmosDb = async (
  connectionInfo: CosmosDbConnectionInfo,
  containerName: string,
  query: SqlQuerySpec | string,
  cleanInternalFields: boolean = true
): Promise<any> => {
  //get the cosmos db database client
  const dbClient = connectionInfo.toCosmosDbDatabaseClient();
  const container = dbClient.container(containerName);
  // compose query
  // query the database
  const { resources } = await container.items.query(query).fetchAll();
  if (!cleanInternalFields) {
    return resources;
  }
  // clean up resource from all the internal cosmosdb properties
  const cleanedResources = resources.map((r) => {
    const clone = {};
    Object.keys(r).forEach((key) => {
      if (!key.startsWith("_")) {
        clone[key] = r[key];
      }
    });
    return clone;
  });
  return cleanedResources;
};

/**
 * Creates new document in the container.
 * @param connectionInfo
 * @param containerName
 * @param document
 */
export const createDocument = async (
  connectionInfo: CosmosDbConnectionInfo,
  containerName: string,
  document: any
) => {
  //get the cosmos db database client
  const dbClient = connectionInfo.toCosmosDbDatabaseClient();
  const container = dbClient.container(containerName);
  await container.items.create(document);
  return document;
};

/**
 * Deletes the document by ID
 * @param connectionInfo
 * @param containerName
 * @param id
 */
export const deleteDocument = async (
  connectionInfo: CosmosDbConnectionInfo,
  containerName: string,
  id: String,
  partitionId: String
) => {
  //get the cosmos db database client
  const dbClient = connectionInfo.toCosmosDbDatabaseClient();
  const container = dbClient.container(containerName);
  const result = await container.item(id as string, partitionId).delete();
  return result.item;
};

/**
 * Updates the document by ID
 * @param connectionInfo
 * @param containerName
 * @param id
 */
export const updateDocument = async (
  connectionInfo: CosmosDbConnectionInfo,
  containerName: string,
  id: String,
  partitionId: String,
  newContent: any
) => {
  //get the cosmos db database client
  const dbClient = connectionInfo.toCosmosDbDatabaseClient();
  const container = dbClient.container(containerName);
  const result = await container
    .item(id as string, partitionId)
    .replace(newContent);
  return result.item;
};
