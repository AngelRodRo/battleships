export default {
  state: {
    initialTurns: null,
    turns: null,
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
      if (state.turns !== 'infinite') {
        commit('SET_TURNS', (state.turns || 0) - 1);
      }
    },
    increaseShots({ commit, state }) {
      commit('SET_SHOTS', state.shots + 1);
    },
    resetShots({ commit }) {
      commit('SET_SHOTS', 0);
    },
    resetTurns({ commit }) {
      commit('SET_TURNS', 0);
    }
  },
}
