<template lang="pug">
div {{ videoData }}
</template>

<script>
export default {
  props: {
    /** Route to render */
    route: {
      type: Object,
      required: false,
      default: () => null,
    },
  },
  data() {
    return {
      videoData: null,
    }
  },
  async fetch() {
    await this.fetchVideoInfo()
  },
  watch: {
    async route() {
      await this.fetchVideoInfo()
    },
  },
  methods: {
    async fetchVideoInfo() {
      if (!this.route) {
        return
      }
      const videoUrl = this.route.link
      const url = `http://youtube.com/oembed?url=${videoUrl}&format=json`
      const { data } = await this.$axios.get(url)
      this.videoData = data
    },
  },
}
</script>