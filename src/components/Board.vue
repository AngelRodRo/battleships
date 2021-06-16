<template>
  <div v-if="showBoard" class="Board">
    <div class="Board__container"> 
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
      
      <div
        v-for="(element1, idx) in board"
        :key="idx + 'ab'"
        class="Board__letters"
        :style="getLetterPosition(idx)"
      >
        {{letters[idx]}}
      </div>

      <div
        v-for="(element1, idx) in board"
        :key="idx + '1a'"
        class="Board__numbers"
        :style="getNumberPosition(idx)"
      >
        {{idx + 1}}
      </div>
    </div>
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
      async turns(val) {
        if (val === 0) {
          const result = await this.$swal({
            title: 'Quieres intentarlo de nuevo?',
            showDenyButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
          });

          if (result.isConfirmed) {
            this.resetGame();
          } else {
            this.goToHome();
          }

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
        letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        initialTurns: 0,
        showBoard: true,
      };
    },
    created() {
      this.startSettings();
      this.initialTurns = +`${this.turns}`;
    },
    methods: {
      ...mapActions({
        increaseShots: 'increaseShots'
      }),
      resetGame() {
        this.startSettings();
        this.$store.commit('SET_TURNS', this.initialTurns);
        this.$store.commit('SET_SHOTS', 0);
      },
      startSettings() {
        const { board, battleships } = generateBattleShipsOnBoard();
        this.board = board;
        this.battleships = battleships;

        this.showBoard = false;
        this.$nextTick(() => {
          this.showBoard = true;
        });
      },
      handleSelect({ id , row , col }) {
        const battleship = this.battleships.find(battleship => battleship.id === id);
        if (battleship.positions[`${row}${col}`]) {
          this.increaseShots();
        }
        this.$set(battleship.positions, `${row}${col}`, false);
      },
      getLetterPosition(index) {
        return {
          top: `${index * 75}px`
        }
      },
      getNumberPosition(index) {
        return {
          left: `${index * 75 + 15}px`
        }
      },
      goToHome() {
        this.$router.push('/')
      }
    }
  }
</script>
<style lang="scss">
  .Board {
    display: flex;
    justify-content: center;
    &__container {
      position: relative;
      width: 750px;
      height: 750px;
      background: white;
      margin-top: 75px;
    }

    &__letters {
      position: absolute;
      margin-left: -50px;
      font-size: 40px;
      margin-top: 25px;
    }

    &__numbers {
      position: absolute;
      font-size: 40px;
      margin-top: -50px;
    }
  }
</style>
