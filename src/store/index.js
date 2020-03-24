import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: { active: false, color: "", mode: "", timeout: 0, text: "" },
    informationDialog: false
  },
  mutations: {
    setInformationDialog(state, val) {
      state.informationDialog = val;
    },
    setSnackbar(state, val) {
      state.snackbar = Object.assign({}, val, { active: true });
    }
  },
  actions: {},
  modules: {}
});
