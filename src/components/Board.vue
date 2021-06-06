<template>
  <div class="Board">
    <div
      v-for="(element1, idx1) in matrix"
      class="Board__row"
      :key="idx1"
    >
      <div
        v-for="(element2, idx2) in element1"
        class="Board__col"
        :key="idx2"
      >
      </div>
    </div>
  </div>
 
</template>
<script>
  export default {
    name: 'Board',
    props: {
      matrix: {
        type: Array,
        default: () => []
      }
    }
  }
</script>
<style lang="scss">
  * {
    box-sizing: border-box;
  }
  .Board {
    &__row {
      display: flex;
      height: 100px;
    }

    &__col {
      width: 100px;
      border: 1px solid black;
    }
  }
</style>
