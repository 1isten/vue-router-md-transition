import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    transition: true,
    transitionDuration: 300,
    drawer: null,
  },
  getters: {
    transitionDisabled(state) {
      return !state.transition;
    },
    drawerOpened(state) {
      return !!state.drawer;
    },
  },
  mutations: {
    TOGGLE_TRANSITION(state, enabled) {
      state.transition = enabled;
    },
    TOGGLE_DRAWER(state, { drawer }) {
      state.drawer = drawer;
    },
  },
  actions: {
    toggleTransition({ commit, state }, payload) {
      commit("TOGGLE_TRANSITION", payload || !state.transition);
    },
    toggleDrawer({ commit, getters }, payload) {
      commit("TOGGLE_DRAWER", payload || { drawer: !getters.drawerOpened });
    },
  },
  modules: {},
});
