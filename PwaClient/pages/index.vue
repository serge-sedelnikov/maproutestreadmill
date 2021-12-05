<template lang="pug">
div.full-screen
  map-main.full-screen(:routes="routes")
  core-toolbar
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('main', ['routes'])
  }
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