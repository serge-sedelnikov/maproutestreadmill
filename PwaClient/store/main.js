// import demoRoutes from '@/data/routes.json'
import { fetchVideosWithinPolygon } from '~/plugins/video'

export const state = {
  areRoutesLoading: false,
  routes: [],
  selectedRoute: null,
}

export const mutations = {
  /** Selects the route */
  setSelectedRoute(state, id) {
    if (!id) {
      state.selectedRoute = null
      return
    }
    const route = state.routes.find((route) => route.id === id)
    state.selectedRoute = route
  },
  /** Saves the list of routes */
  setRoutes(state, routes) {
    state.routes = routes
  },
  /** Sets if routes are loading */
  setIsLoading(state, val) {
    state.areRoutesLoading = val
  },
}

export const actions = {
  /** Selects the route */
  setSelectedRoute({ commit }, id) {
    commit('setSelectedRoute', id)
  },
  /**
   * Fetches the videos from the API for the given boundaries and sets route to them.
   */
  async fetchVideosWithinPolygon({ commit }, boundaries) {
    commit('setIsLoading', true)
    const routes = await fetchVideosWithinPolygon(boundaries)
    commit('setRoutes', routes)
    commit('setIsLoading', false)
  },
}
