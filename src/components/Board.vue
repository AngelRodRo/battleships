<template>
  <div>
    <div
      :key="idx1"
      v-for="(element1, idx1) in matrix">
      <div
        :key="idx2"
        v-for="(element2, idx2) in element1[idx1]"
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
        default: []
      }
    }
  }
</script>

<style>

</style>
