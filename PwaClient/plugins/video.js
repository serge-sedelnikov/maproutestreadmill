
const self = {
  axios: null
}

/**
 * Fetches the video metadata from youtube embed API.
 * @param {*} route
 * @returns
 */
export const fetchVideoInfo = async (route) => {
  if (!route) {
    return
  }
  const videoUrl = route.link
  const url = `https://youtube.com/oembed?url=${videoUrl}&format=json`
  const { data } = await self.axios.get(url)
  return data
}

/**
 * Fetches the list of the video routes within the given geojson polygon
 * @param {*} polygonGeoJson 
 */
export const fetchVideosWithinPolygon = (polygonGeoJson) => {
  
}

export default function({ app }, inject) {
  self.axios = app.$axios
}