<template lang="pug">
v-navigation-drawer(
  bottom,
  temporary,
  app,
  v-model='expanded',
  :mobile-breakpoint='99999',
  elevation='4'
)
  template(v-slot:prepend)
    .d-flex
      //- buttons to start video
      video-control-buttons(:route="selectedRoute")
      //- END buttons to start video
      v-spacer
      v-btn.ma-2(icon, @click='expanded = false')
        v-icon mdi mdi-close
  div
    video-item(:route='selectedRoute')
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      expanded: this.value,
    }
  },
  computed: {
    ...mapState('main', ['selectedRoute']),
  },
  watch: {
    value(val) {
      this.expanded = val
    },
    expanded(val) {
      this.$emit('input', val)
    },
  },
}
</script>
