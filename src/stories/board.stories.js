import Board from '../components/Board.vue'

export default {
  title: 'Board',
}

export const Default = () => ({
  components: { Board },
  data: () => {
    return {
      matrix: [
        [0, 1, 1, 1, 1],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0] 
      ] 
    }
  },
  template: '<board :matrix="matrix"></board>'
})
