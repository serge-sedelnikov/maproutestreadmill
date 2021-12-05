import Vue from 'vue'
import VueAzureMaps from 'vue-azure-maps'

Vue.use(VueAzureMaps, {
    key: process.env.NUXT_APP_AZURE_MAPS_API_KEY,
  })