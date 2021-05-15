import { createStore } from 'vuex'

export default createStore({
  state: {
    giveaways: null,
    filteredGiveaways: null,
  },
  mutations: {
    SET_DATA: (state, data) => {
      state.giveaways = data;
    }
  },
  actions: {
    GET_DATA({commit}, data) {
      commit('SET_DATA', data);
    }
  },
  getters: {
    GIVEAWAYS(state) {
      return state.giveaways;
    },
  },
  modules: {
  }
})
