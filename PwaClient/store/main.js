import demoRoutes from '@/data/routes.json'

export const state = {
    routes: demoRoutes,
    selectedRoutes: []
}

export const mutations = {
    setSelectedRoutes({ state }, routes) {
        state.selectedRoutes = routes
    }
}

export const actions = {
    setSelectedRoutes({ commit }, routes) {
        commit('setSelectedRoutes', routes)
    }
}