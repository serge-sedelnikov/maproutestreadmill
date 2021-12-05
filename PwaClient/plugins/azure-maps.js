import Vue from 'vue'
import VueAzureMaps, { AzureMap } from 'vue-azure-maps'

Vue.use(VueAzureMaps, {
    key: process.env.NUXT_ENV_AZURE_MAPS_API_KEY,
})

Vue.component('AzureMap', AzureMap)