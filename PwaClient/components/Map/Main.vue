<template lang="pug">
.map-container
  .full-screen(ref='mapContainer')
  map-route-container(:map="map" :routes="routes" @routeClicked="(id) => $emit('routeClicked', id)")
</template>

<script>
import 'azure-maps-control/dist/atlas.css'
export default {
  props: {
    routes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    // create map
    const map = new this.$atlas.Map(this.$refs.mapContainer, {
      renderWorldCopies: true,
      showLogo: true,
      style: 'grayscale_dark',
      authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: process.env.NUXT_ENV_AZURE_MAPS_API_KEY,
      },
    })
    this.map = map
  },
}
</script>

<style lang="sass" scoped>
.map-container
  position: relative
.full-screen
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
</style>