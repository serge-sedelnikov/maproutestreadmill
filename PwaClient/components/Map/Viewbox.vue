<template lang="pug">
    
</template>

<script>
export default {
  props: {
    map: {
      type: Object,
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
      }
    },
  },
  methods: {
    mapViewboxChanged(event) {
      // get camera and current map bound box
      const { bounds } = this.map.getCamera()
      // bounds is a set of 2 points - a corners of the viewport
      // need to convert it to geojson polygon
      const geojson = {
        type: 'Polygon',
        coordinates: [
          [
            [bounds[0], bounds[1]],
            [bounds[2], bounds[1]],
            [bounds[2], bounds[3]],
            [bounds[0], bounds[3]],
            [bounds[0], bounds[1]],
          ],
        ],
      }
      console.log(JSON.stringify(geojson))
    },
  },
}
</script>
