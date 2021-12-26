<template lang="pug">
    v-toolbar(floating elevation="4" :disabled="areRoutesLoading").ml-3.mt-3
        v-app-bar-nav-icon
            template(v-slot)
                v-icon(v-if="!areRoutesLoading") mdi mdi-menu
                v-progress-circular(v-else indeterminate)
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('main', ['areRoutesLoading'])
    }
}
</script>