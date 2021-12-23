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
  data() {
    return {
      datasource: null,
    }
  },
  watch: {
    map() {
      if (this.map) {
        this.map.events.add('ready', () => this.renderRoutes())
      }
    },
  },
  methods: {
    // what happens when user clicks on the point
    pointClicked(e) {
      console.log(e)
      const { datasource, map } = this
      // if clicking on cluster, zoom on it
      if (
        e &&
        e.shapes &&
        e.shapes.length > 0 &&
        e.shapes[0].properties?.cluster
      ) {
        // Get the clustered point from the event.
        const cluster = e.shapes[0]

        // Get the cluster expansion zoom level. This is the zoom level at which the cluster starts to break apart.
        datasource
          .getClusterExpansionZoom(cluster.properties.cluster_id)
          .then(function (zoom) {
            // Update the map camera to be centered over the cluster.
            map.setCamera({
              center: cluster.geometry.coordinates,
              zoom,
              type: 'ease',
              duration: 200,
            })
          })
        return
      }
      // if clicking on point, set it as selected
      const properties =
        e.shapes[0].data.geometry.properties || e.shapes[0].data.properties
      this.$emit('routeClicked', properties.id)
    },
    // renders points on the map
    renderRoutes() {
      const atlas = this.$atlas
      const { map, routes } = this
      const source = new atlas.source.DataSource(null, {
        cluster: false,
      })
      map.sources.add(source)
      this.datasource = source
      // TODO: Add style for each point based on type, etc.
      const pointsLayer = new atlas.layer.BubbleLayer(source)
      map.layers.add(pointsLayer)
      routes.forEach((route) => {
        // add all props to geoJson as additioal data
        const geoJson = {
          ...route.geojson,
          properties: {
            ...route,
            geojson: undefined,
          },
        }
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
