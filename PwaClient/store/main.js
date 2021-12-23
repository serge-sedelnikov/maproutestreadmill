import demoRoutes from '@/data/routes.json'

export const state = {
    routes: demoRoutes,
    selectedRoute: null
}

export const mutations = {
    setSelectedRoute(state, id) {
        if(!id) {
            state.selectedRoute = null
            return
        }
        const route = state.routes.find(route => route.id === id)
        state.selectedRoute = route
    }
}

export const actions = {
    setSelectedRoute({ commit }, id) {
        commit('setSelectedRoute', id)
    }
}