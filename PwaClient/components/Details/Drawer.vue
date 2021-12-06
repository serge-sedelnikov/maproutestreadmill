<template lang="pug">
v-navigation-drawer(bottom, temporary, app, v-model='expanded')
  div
</template>

<script>
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