import { CosmosDbConnectionInfo, queryCosmosDb } from "../repos/core";

/** Container name containing the list of route videos */
const CONTAINER_NAME: string = "videos";

/**
 * Fetches the lst of videos within the given GeoJson polygon.
 * @param polygon GeoJson polygon
 */
export const fetchVideosWithinPolygon = async (
  connectionInfo: CosmosDbConnectionInfo,
  polygon: any
): Promise<any> => {
  const query = "SELECT * FROM c WHERE ST_WITHIN(c.geojson, @polygon)";
  const result = await queryCosmosDb(connectionInfo, CONTAINER_NAME, {
    query,
    parameters: [{ name: "@polygon", value: polygon }],
  });
  return result;
};
