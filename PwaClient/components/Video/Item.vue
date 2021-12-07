<template lang="pug">
div
  v-list(v-if='videoData && route')
    v-list-item-group
      v-list-item
        v-list-item-content.d-flex.flex-wrap
          v-row
            v-col(cols='12', lg='4', md='4', sm='5').d-flex.justify-center
              v-img(:src='videoData.thumbnail_url', max-width='300')
            v-col(cols='12', lg='8', md='8', sm='7')
              .text-subtitle-1 {{ videoData.title }}
              .mt-2 Author: {{ videoData.author_name }}
                v-row.mt-6
                  v-col.d-flex(cols='12')
                    v-btn(outlined, :href='route.link', target='_blank', large)
                        v-icon mdi mdi-play
                    v-btn.ml-3(
                        outlined,
                        :href='videoData.author_url',
                        target='_blank',
                        large
                    )
                        v-icon mdi mdi-youtube-subscription
                        span.ml-2 Author: {{ videoData.author_name }}
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