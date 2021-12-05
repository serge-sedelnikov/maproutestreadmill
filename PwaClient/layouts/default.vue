<template lang="pug">
v-app
  v-main
    Nuxt
  v-footer
    v-spacer
    span &copy; 2021 v.{{ version }}
</template>

<script>
import { version } from '@/package.json'
export default {
  data() {
    return {
      version,
    }
  },
}
</script>
