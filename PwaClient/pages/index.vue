<template lang="pug">
.full-screen
  map-main.full-screen(:routes='routes', @routeClicked='handleRouteClicked')
  core-toolbar
  details-drawer(v-model='expanded')
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      expanded: false,
    }
  },
  computed: {
    ...mapState('main', ['routes', 'selectedRoute']),
  },
  watch: {
    selectedRoute(val) {
      this.expanded = !!val
    },
    expanded(val) {
      if(!val) {
        this.setSelectedRoute(null)
      }
    }
  },
  methods: {
    ...mapActions('main', ['setSelectedRoute']),
    handleRouteClicked(id) {
      console.log(id)
      this.setSelectedRoute(id)
    },
  },
}
</script>

<style lang="sass" scoped>
.full-screen
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
</style>