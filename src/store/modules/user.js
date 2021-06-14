export default {
  state: {
    turns: 0,
  },
  mutations: {
    SET_TURNS(state, val) {
      state.turns = val;
    }
  },
  actions: {
    decreaseTurns({ commit, state }) {
      commit('SET_TURNS', state.turns - 1);
    },
  },
}
