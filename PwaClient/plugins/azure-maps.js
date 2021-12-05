import Vue from 'vue'
import VueAzureMaps from 'vue-azure-maps'
import { AzureMap } from 'vue-azure-maps'

Vue.use('VueAzureMaps', VueAzureMaps, {
    key: process.env.NUXT_APP_AZURE_MAPS_API_KEY,
})

Vue.component('AzureMap', AzureMap)