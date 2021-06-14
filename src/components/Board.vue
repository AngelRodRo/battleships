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

  import { mapState, mapActions } from 'vuex';

  import Battleship from '@/components/Battleship.vue';
  import Blank from '@/components/Blank.vue';

  import { 
    generateBattleShipsOnBoard,
    saveGameProgress
  } from '../utils/battleship';

  export default {
    name: 'Board',
    components: {
      Battleship,
      Blank,
    },
    computed: {
      ...mapState({
        shots: state => state.user.shots,
        turns: state => state.user.turns,
      }),
      positionsAvailable() {
        let positions = []
        this.battleships.forEach(battleship => {
          for (const key in battleship.positions) {
            if (Object.hasOwnProperty.call(battleship.positions, key)) {
              const isAvailable = battleship.positions[key];
              positions.push(isAvailable);
            }
          }
        });

        return positions;
      },
      hasWon() {
        return !this.positionsAvailable.reduce((prev, currentValue) => {
          return prev || currentValue;
        }, false);
      }
      
    },
    watch:{
      turns(val) {
        if (val === 0) {
          alert('You lose');
          saveGameProgress({
            shots: this.shots,
            turns: this.turns,
            isWinner: false,
          });
        }
      },
      hasWon(val) {
        if (val) {
          alert('You win!');
          saveGameProgress({
            shots: this.shots,
            turns: this.turns,
            isWinner: true,
          });
        }
      }
    },
    data() {
      return {
        board: [],
        battleships: [],
      };
    },
    created() {
      const { board, battleships } = generateBattleShipsOnBoard();
      this.board = board;
      this.battleships = battleships;
    },
    methods: {
      ...mapActions({
        increaseShots: 'increaseShots'
      }),
      handleSelect({ id , row , col }) {
        const battleship = this.battleships.find(battleship => battleship.id === id);
        if (battleship.positions[`${row}${col}`]) {
          this.increaseShots();
        }
        this.$set(battleship.positions, `${row}${col}`, false);
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
