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
        top: `${row * 100}px`,
        left: `${col * 100}px`
      }
    }
  },
  methods: {
    ...mapActions({
      decreaseTurns: 'decreaseTurns'
    }),
    changeStatus() {
      if (!this.selected) {
        this.decreaseTurns();
      }
      this.selected = true;
    }
  }
}
</script>

<style lang="scss">
  .Blank {
    width: 100px;
    height: 100px;
    position: absolute;
    border: 1px solid black;

    &--selected {
      background: gray;
    }
  }
</style>
