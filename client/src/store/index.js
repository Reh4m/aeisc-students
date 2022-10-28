import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { defaultClient as apolloClient } from "../main";
import {
  SIGNUP_STUDENT,
  GET_STUDENTS,
  SIGNIN_ADMIN,
  GET_CURRENT_ADMIN,
} from "../queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    admin: null,
    students: [],
    loading: false,
    error: null,
    authError: null,
  },
  mutations: {
    setAdmin: (state, payload) => {
      state.admin = payload;
    },
    setStudents: (state, payload) => {
      state.students = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    clearAdmin: (state) => (state.admin = null),
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
          commit("setStudents", data.getStudents);
          commit("setLoading", false);
        })
        .catch((err) => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    getCurrentAdmin: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_CURRENT_ADMIN,
        })
        .then(({ data }) => {
          commit("setLoading", false);
          // add user data to state
          commit("setAdmin", data.getCurrentAdmin);
        })
        .catch((err) => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    signinAdmin: ({ commit }, payload) => {
      commit("clearError");
      commit("setLoading", true);
      // clear token to prevent errors
      localStorage.setItem("token", "");
      apolloClient
        .mutate({
          mutation: SIGNIN_ADMIN,
          variables: payload,
        })
        .then(({ data }) => {
          commit("setLoading", false);
          localStorage.setItem("token", data.signinAdmin.token);
          // to make sure created methods is run in main.js
          // (we run getCurrentUser), reload the page
          router.push("/admin");
        })
        .catch((err) => {
          commit("setLoading", false);
          commit("setError", err);
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
    signoutAdmin: async ({ commit }) => {
      // clear user in state
      commit("clearAdmin");
      // remove token in localStorage
      localStorage.setItem("token", "");
      // end session
      await apolloClient.resetStore();
      // redirect home - kick users out of private pages
      router.go();
    },
  },
  getters: {
    students: (state) => state.students,
    loading: (state) => state.loading,
    error: (state) => state.error,
    authError: (state) => state.authError,
  },
});
