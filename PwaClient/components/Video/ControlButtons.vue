<template lang="pug">
    div.d-flex.flex-wrap
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
import { fetchVideoInfo } from '@/services/video'
export default {
  props: {
    /** Route to render */
    route: {
      type: Object,
      required: false,
      default: () => null,
    },
  },
  async fetch() {
    await fetchVideoInfo()
  },
  watch: {
    async route() {
      await fetchVideoInfo()
    },
  },
}
</script>
