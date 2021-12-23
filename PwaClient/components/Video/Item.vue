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
            v-row.mt-6
              v-col.d-flex.flex-wrap(cols='12')
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
  data() {
    return {
      videoData: null,
    }
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