<template lang="pug">
</template>

<script>
import { differenceBy } from 'lodash'
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
      pointsLayer: null,
    }
  },
  watch: {
    map() {
      if (this.map) {
        this.map.events.add('ready', () => this.createPointLayerAndSource())
      }
    },
    routes(newRoutes, oldRoutes) {
      const source = this.datasource

      // calculate routes to delete
      const toBeDeleted = differenceBy(oldRoutes, newRoutes, 'id')
      const toBeAdded = differenceBy(newRoutes, oldRoutes, 'id')

      // delete all old values
      toBeDeleted.forEach((route) => {
        const shapes = source.getShapes()
        const geoJson = shapes.find(
          (s) => s.data.geometry.properties.id === route.id
        )
        source.remove(geoJson)
      })

      // add all new values
      toBeAdded.forEach((route) => {
        // add all props to geoJson as additional data
        const geoJson = {
          ...route.geojson,
          properties: {
            ...route,
            geojson: undefined,
          },
        }
        source.add(geoJson)
      })
    },
  },
  methods: {
    // what happens when user clicks on the point
    pointClicked(e) {
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
    createPointLayerAndSource() {
      const atlas = this.$atlas
      const { map } = this

      const source = new atlas.source.DataSource(null, {
        cluster: true,
        // The radius in pixels to cluster points together.
        clusterRadius: 45,
        // The maximum zoom level in which clustering occurs.
        // If you zoom in more than this, all points are rendered as symbols.
        clusterMaxZoom: 15,
      })

      map.sources.add(source)
      this.datasource = source
      // TODO: Add style for each point based on type, etc.
      this.pointsLayer = new atlas.layer.BubbleLayer(source)
      map.layers.add(this.pointsLayer)

      const pointClicked = this.pointClicked
      const callback = function (event) {
        pointClicked(event)
      }
      map.events.add('click', this.pointsLayer, callback)
    },
  },
}
</script>
