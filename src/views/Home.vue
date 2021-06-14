<template>
  <div class="home">

    {{turns}}
    {{shots}}
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
