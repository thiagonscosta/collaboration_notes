import { apolloClient } from "../../graphql/apollo";

import { NOTES } from "../../graphql/queries/notes";

const state = () => ({
  notes: [],
});

const getters = {};

const actions = {
  async findNotes({ commit }) {
    const { data } = await apolloClient.query({
      query: NOTES,
    });
    commit("setNotes", data);
  },
};

const mutations = {
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
