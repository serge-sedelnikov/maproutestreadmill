<template lang="pug">
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      required: false,
      default: () => null,
    },
    map: {
      type: Object,
      required: false,
      default: () => null,
    },
  },
  watch: {
    map() {
      if (this.map) {
        this.map.events.add('ready', () => this.renderRoutes())
      }
    },
  },
  methods: {
    pointClicked(point) {
      console.log(point)
    },
    renderRoutes() {
      const atlas = this.$atlas
      const { map, routes } = this
      const source = new atlas.source.DataSource(null, {
        cluster: true,
      })
      map.sources.add(source)
      const pointsLayer = new atlas.layer.BubbleLayer(source)
      map.layers.add(pointsLayer)
      routes.forEach((route) => {
        // add all props to geoJson as additioal data
        const geoJson = {
          ...route.geojson,
          properties: {
            ...route,
            geojson: undefined
          }
        }
        console.log(geoJson)
        source.add(geoJson)
      })
      const pointClicked = this.pointClicked
      const callback = function (event) {
        pointClicked(event)
      }
      map.events.add('click', pointsLayer, callback)
    },
  },
}
</script>