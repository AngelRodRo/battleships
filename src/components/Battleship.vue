<template>
  <div v-frag>
    <template
      v-for="(position, idx) in positionsArr"
    >
      <div
        class="Battleship"
        v-if="position.state"
        :key="idx"
        :id="id"
        :size="positionsArr.length"
        :style="positionStyles(position.row, position.col)"
        @click="$emit('select', {
          id,
          row: position.row,
          col: position.col
        })"
        :class="{ 'Battleship--drowned': isDrowned }"
      >
      </div>
      <div
        v-else
        class="Battleship Battleship--filled"
        :key="idx"
        :style="positionStyles(position.row, position.col)"
        :class="{ 'Battleship--drowned': isDrowned }"
      />
    </template>
  </div>
</template>

<script>
  import frag from 'vue-frag';
  import { SQUARE_SIZE } from '@/constants';

  export default {
    name: 'battleship',
    directives: {
      frag
    },
    props: {
      id: {
        type: String,
      },
      positions: {
        type: Object,
      }
    },
    computed: {
      positionsArr() {
        let arr = [];
        for (const position in this.positions) {
          const row = position[0];
          const col = position[1];

          arr.push({
            row,
            col,
            state: this.positions[position],
          });
        }

        return arr;
      },
      isDrowned() {
        return !(this.positionsArr.reduce((prev, currentValue) => {
          return prev || currentValue.state;
        }, false));
      }
    },
    methods: {
      positionStyles(row, col) {
        return {
          top: `${row * SQUARE_SIZE}px`,
          left: `${col * SQUARE_SIZE}px`
        }
      }
    }
  }
</script>

<style lang="scss">

  @import "../assets/css/constants.scss";

  .Battleship {
    width: $size_square;
    height: $size_square;
    position: absolute;
    border: 1px solid black;

    &--filled {
      background: black;
    }

    &--drowned {
      background: red;
    }
  }
</style>
