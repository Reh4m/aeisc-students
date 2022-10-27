import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { defaultClient as apolloClient } from "../main";
import { SIGNUP_STUDENT, GET_STUDENTS } from "../queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    error: null,
    authError: null,
  },
  mutations: {
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    clearError: (state) => (state.error = null),
    setAuthError: (state, payload) => {
      state.authError = payload;
    },
  },
  actions: {
    getStudents: ({ commit }) => {
      commit("setLoading", true);
      // use ApolloClient to fine getPosts query
      apolloClient
        .query({
          query: GET_STUDENTS,
        })
        .then(({ data }) => {
          // get data from actions to state via mutations
          // commit passes data from actions along to mutations functions
          // commit("setPosts", data.controlNumber);
          console.log(data);
          commit("setLoading", false);
        })
        .catch((err) => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    signupStudent: ({ commit }, payload) => {
      commit("clearError");
      commit("setLoading", true);
      console.log("store");
      // clear token to prevent errors
      apolloClient
        .mutate({
          mutation: SIGNUP_STUDENT,
          variables: payload,
        })
        .then(({ data }) => {
          commit("setLoading", true);
          console.log(data);
          // reload the page
          router.go();
        })
        .catch((err) => {
          commit("setLoading", false);
          commit("setError", err);
        });
    },
  },
  getters: {
    loading: (state) => state.loading,
    error: (state) => state.error,
    authError: (state) => state.authError,
  },
});
