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
        this.map.setCamera({
          ...this.map.getCamera(),
          // limit boundaries to be able to query DB for them
          // if they are not limited, the longitude can go over 180 and DB will not return any values
          maxBounds: [-170, -80, 170, 80],
        })
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
