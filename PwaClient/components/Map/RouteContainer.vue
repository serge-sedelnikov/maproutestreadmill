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
    renderRoutes() {
      const atlas = this.$atlas
      const { map, routes } = this
      const source = new atlas.source.DataSource()
      map.sources.add(source)
      map.layers.add(new atlas.layer.BubbleLayer(source));
      routes.forEach((route) => {
        source.add(route.geojson)
      })
    },
  },
}
</script>