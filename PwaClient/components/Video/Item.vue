<template lang="pug">
div
  v-list(v-if='videoData && route')
    v-list-item
      v-list-item-content.d-flex.flex-wrap
        v-row
          v-col.d-flex.justify-center(cols='12', lg='4', md='4', sm='5')
            v-img(:src='videoData.thumbnail_url', max-width='300')
          v-col(cols='12', lg='8', md='8', sm='7')
            .text-subtitle-1 {{ videoData.title }}
            .mt-2 Author: {{ videoData.author_name }}
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