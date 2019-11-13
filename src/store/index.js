import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
  },
  getters: {
    
  },
  mutations: {
    TOGGLE_DRAWER(state, { val }) {
      state.drawer = val || !state.drawer;
    },
  },
  actions: {
    toggleDrawer({ commit }, payload) {
      commit('TOGGLE_DRAWER', payload || {});
    },
  },
  modules: {

  },
});
