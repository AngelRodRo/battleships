<template>
  <div class="Board">
    <template
      v-for="(element1, idx1) in board"
    >
      <template
        v-for="(element2, idx2) in element1"
      >
        <Blank
          :positions="[idx1, idx2]"
          :key="`${idx1}${idx2}`"
          v-if="!element2"
        />
      </template>
    </template>
    <Battleship 
      v-for="battleship in battleships"
      :key="battleship.id"
      :id="battleship.id"
      :positions="battleship.positions"
      @select="handleSelect"
    />
  </div>
 
</template>
<script>

  import Battleship from './Battleship.vue';
  import Blank from './Blank.vue';

  import { generateBattleShipsOnBoard } from '../utils/battleship';

  export default {
    name: 'Board',
    components: {
      Battleship,
      Blank,
    },
    data() {
      return {
        board: [],
        battleships: [],
        positions: [],
      };
    },
    created() {
      const { board, battleships, positions } = generateBattleShipsOnBoard();
      
      this.board = board;
      console.log(board)
      this.battleships = battleships;
      this.positions = positions;
    },
    methods: {
      handleSelect({id , row , col}) {
        const battleship = this.battleships.find(battleship => battleship.id === id);
        this.$set(battleship.positions, `${row}${col}`, false);
        // battleship.positions[`${row}${col}`] = false;
      }
    }
  }
</script>
<style lang="scss">
  * {
    box-sizing: border-box;
  }
  .Board {
    position: relative;
  }
</style>
