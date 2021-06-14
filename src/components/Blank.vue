<template>
  <div class="Blank" :style="positionStyles"></div>
</template>

<script>
export default {
  props: {
    positions: {
      type: Array,
      default: () => {}
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
}
</script>

<style lang="scss">
  .Blank {
    width: 100px;
    height: 100px;
    position: absolute;
    border: 1px solid black;
  }
</style>
