<template>
  <div
    class="Blank"
    :class="{ 'Blank--selected': selected }"
    :style="positionStyles"
    @click="changeStatus"
  >
  </div>
</template>

<script>

import { mapActions } from 'vuex';

import { SQUARE_SIZE } from '@/constants';

export default {
  props: {
    positions: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      selected: false,
    }
  },
  computed: {
    
    positionStyles() {
      const [row, col] = this.positions;
      
      return {
        top: `${row * SQUARE_SIZE}px`,
        left: `${col * SQUARE_SIZE}px`
      }
    }
  },
  methods: {
    ...mapActions({
      decreaseTurns: 'decreaseTurns',
      increaseShots: 'increaseShots'
    }),
    changeStatus() {
      if (!this.selected) {
        this.decreaseTurns();
        this.increaseShots();
      }
      this.selected = true;
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/css/constants.scss";

  .Blank {
    width: $size_square;
    height: $size_square;
    position: absolute;
    border: 1px solid black;

    &--selected {
      background: gray;
    }
  }
</style>
