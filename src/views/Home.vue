<template>
  <div class="home">
    <h1 style="padding-top: 40px; margin: 0">Battleships game!</h1>
    <div class="home__statics">
      <div class="home__turns">
        <span>Turnos restantes: </span>
        {{turns}}
      </div>
      <div class="home__shots">
        <span>Tiros : </span>
        {{shots}}
      </div>
    </div>
    
    <Board />
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex';

import Board from '@/components/Board.vue';


export default {
  name: 'Home',
  components: {
    Board
  },
  computed: {
    ...mapState({
      turns: state => state.user.turns,
      shots: state => state.user.shots,
    })
  }
}
</script>
<style lang="scss">
  .home {
    background: #b4ecead9;
    height: 100vh;

    &__statics {
      display: flex;
      font-size: 30px;
      margin-top: 35px;
      justify-content: center;
    }

    &__turns,
    &__shots {
      margin-left: 15px;
      margin-bottom: 15px;
    }
  }
</style>
