import { apolloClient } from "../../graphql/apollo";
import {
  AUTHENTICATE,
  AUTHENTICATE_WITH_GOOGLE,
  CREATE_USER,
  CREATE_USER_WITH_GOOGLE,
} from "../../graphql/queries/auth";
import router from "../../router";

// const status = localStorage.getItem("user")
//   ? { loggedIn: true }
//   : { loggedIn: false };

const state = () => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "",
  token: localStorage.getItem("token")
    ? JSON.parse(JSON.stringify(localStorage.getItem("token")))
    : "",
  // status: status,
});

const getters = {};

const actions = {
  async authenticate({ commit }, input) {
    const { res } = await apolloClient.query({
      query: AUTHENTICATE,
      variables: { input: input },
    });
    commit("setUser", res);
  },

  async authenticateWithGoogle({ commit }, input) {
    const { data } = await apolloClient.query({
      query: AUTHENTICATE_WITH_GOOGLE,
      variables: { input: input },
    });
    commit("setUser", data.authenticateWithGoogle.user);
    commit("setToken", data.authenticateWithGoogle.token);
    localStorage.setItem(
      "user",
      JSON.stringify(data.authenticateWithGoogle.user)
    );
    localStorage.setItem(
      "token",
      JSON.stringify(data.authenticateWithGoogle.token)
    );
    router.push("/home");
  },

  async createUserWithGoogle({ commit }, input) {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_USER_WITH_GOOGLE,
      variables: { input: input },
    });
    commit("setUser", data);
  },

  async createUser({ commit }, input) {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_USER,
      variables: { input: input },
    });
    commit("setUser", res);
  },
};

const mutations = {
  setUser(s, user) {
    s.user = user;
  },
  setToken(s, token) {
    console.log(token);
    s.token = token;
  },
  setNotes(s, notes) {
    s.notes = notes;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
