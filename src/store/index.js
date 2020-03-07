import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: null,
  },
  getters: {
    drawerOpened(state) {
      return !!state.drawer;
    },
  },
  mutations: {
    TOGGLE_DRAWER(state, { drawer }) {
      state.drawer = drawer;
    },
  },
  actions: {
    toggleDrawer({ commit, getters }, payload) {
      commit('TOGGLE_DRAWER', payload || { drawer: !getters.drawerOpened });
    },
  },
  modules: {},
});
