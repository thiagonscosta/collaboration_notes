import { apolloClient } from "../../graphql/apollo";
import {
  AUTHENTICATE,
  AUTHENTICATE_WITH_GOOGLE,
  CREATE_USER,
} from "../../graphql/queries/auth";

const state = {
  // user: JSON.parse(localStorage.getItem("user") || ""),
  // token: localStorage.getItem("token") || "",
};

const getters = {};

const actions = {
  async authenticate({ commit }, data) {
    const { res } = await apolloClient.mutate({
      mutation: AUTHENTICATE,
      variables: { data },
    });
    commit("setUser", res);
  },

  async authenticateWithGoogle({ commit }, input) {
    const { res } = await apolloClient.query({
      query: AUTHENTICATE_WITH_GOOGLE,
      variables: { input: input },
    });
    commit("setUser", res);
  },

  async createUser({ commit }, input) {
    const { res } = await apolloClient.mutate({
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
