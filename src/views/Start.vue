<template>
  <div class="Start">
    <h1>Battleships game!</h1>
    <div class="Start__container">
      <md-field>
        <md-input required placeholder="Ingrese el nro de turnos" v-model="turns" type="number" />
        <md-button :disabled="!turns" class="md-raised md-primary" @click="goToBoard">Ok</md-button>
      </md-field>
      <div class="Start__options">
        <md-button class="Start__button md-raised md-primary" @click="setTurn('infinite')">Facil</md-button>
        <md-button class="Start__button md-raised md-primary" @click="setTurn(100)">Medio</md-button>
        <md-button class="Start__button md-raised md-primary" @click="setTurn(50)">Dificil</md-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Start',
  methods: {
    setTurn(value){ 
      this.$store.commit('SET_TURNS', value !== 'infinite'? Number(value) : value);
      this.goToBoard();
    },
    goToBoard() {
      this.$router.push('/board');
    }
  },
  computed: {
    turns: {
      get() {
        return this.$store.state.user.turns;
      },

      set(val) {
        this.$store.commit('SET_TURNS', Number(val));
      }
    }
  }
}
</script>

<style lang="scss">
  .Start {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    &__button {
      width: 200px;
      height: 50px;

      margin-left: 8px !important;
    }

    &__container {
      max-width: 500px;
      
      align-self: center;
    }
  }
</style>
