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
  const { data } = await this.$axios.get(url)
  this.videoData = data
}
