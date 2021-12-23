<template lang="pug">
    div(v-if='videoData && route').d-flex.flex-wrap
        v-btn(outlined, :href='route.link', target='_blank', large).mr-3.mt-3
            v-icon mdi mdi-play
        v-btn(
            outlined,
            :href='videoData.author_url',
            target='_blank',
            large
        ).mt-3
            v-icon mdi mdi-youtube-subscription
            span.ml-2.text-truncate(:style='{ "max-width": "300px" }') Channel: {{ videoData.author_name }}
</template>

<script>
import { fetchVideoInfo } from '~/plugins/video'
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
    this.videoData = await fetchVideoInfo(this.route)
  },
  watch: {
    async route(val) {
      this.videoData = await fetchVideoInfo(val)
    },
  },
}
</script>
