export default {
  state: {
    turns: 0,
    shots: 0,
  },
  mutations: {
    SET_SHOTS(state, val) {
      state.shots = val;
    },
    SET_TURNS(state, val) {
      state.turns = val;
    }
  },
  actions: {
    decreaseTurns({ commit, state }) {
      commit('SET_TURNS', state.turns - 1);
    },
    increaseShots({ commit, state }) {
      commit('SET_SHOTS', state.shots + 1);
    }
  },
}
