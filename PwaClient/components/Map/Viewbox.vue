<template lang="pug">
    
</template>

<script>
import { bboxPolygon } from '@turf/turf'
import { Map } from 'azure-maps-control'
export default {
  props: {
    map: {
      type: Map,
      required: false,
      default: () => null,
    },
  },
  watch: {
    map() {
      if (this.map) {
        const events = ['dragend', 'zoomend']
        events.forEach((event) => {
          this.map.events.add(event, (e) => this.mapViewboxChanged(e))
        })
        // load default points
        this.map.events.add('ready', this.mapViewboxChanged)
      }
    },
  },
  methods: {
    mapViewboxChanged() {
      // get camera and current map bound box
      const { bounds } = this.map.getCamera()
      const geojson = bboxPolygon(bounds)
      this.$emit('mapViewportChanged', geojson)
    },
  },
}
</script>
