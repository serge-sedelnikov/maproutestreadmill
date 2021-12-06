<template lang="pug">
v-navigation-drawer(bottom temporary app v-model='expanded')
    div

</template>

<script>
export default {
  props: {
    expanded: {
      type: Boolean,
      required: true,
    },
  },
}
</script>