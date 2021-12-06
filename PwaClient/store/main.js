import demoRoutes from '@/data/routes.json'

export const state = {
    routes: demoRoutes,
    selectedRoute: null
}

export const mutations = {
    setSelectedRoute(state, id) {
        const route = state.routes.find(route => route.id === id)
        console.log(route)
        state.selectedRoute = route
    }
}

export const actions = {
    setSelectedRoute({ commit }, id) {
        commit('setSelectedRoute', id)
    }
}