import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatus: false,
  },
  mutations: {
    changeLoadingStartMut(state, varStatus) {
      state.loadingStatus = varStatus;
    },
  },
  actions: {
    loadingStart({ commit }) {
      commit("changeLoadingStartMut", true);
    },
    loadingEnd({ commit }) {
      commit("changeLoadingStartMut", false);
    },
  },
  modules: {},
});
