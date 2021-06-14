<template>
  <div>
    <div>
      <input v-model="turns" type="text">
      <button @click="$router.push('/board')">Ok</button>
    </div>
    <button @click="setTurn(null)">Facil</button>
    <button @click="setTurn(100)">Medio</button>
    <button @click="setTurn(50)">Dificil</button>
  </div>
</template>

<script>

export default {
  name: 'Start',
  methods: {
    setTurn(value){ 
      this.$store.commit('SET_TURNS', value);
      this.$router.push('/board');
    }
  },
  computed: {
    turns: {
      get() {
        return this.$store.state.user.turns;
      },

      set(val) {
        this.$store.commit('SET_TURNS', val);
      }
    }
  }
}
</script>

<style>

</style>
