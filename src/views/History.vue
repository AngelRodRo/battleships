<template>
  <div class="History">
    <h1 class="History__title">Historial</h1>
    <md-card class="History__card" :key="idx" v-for="(record, idx) in history">
      <md-card-content>
        <p><b>{{record.isWinner? 'Ganador' : 'Perdedor'}}</b></p>
        <p><b>Turnos:</b> {{record.turns}}</p>
        <p><b>Tiros:</b> {{record.shots}}</p>  
        <p><b>Fecha:</b> {{formattedDate(record.date)}}</p>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'History',
  data() {
    return {
      history: '',
    }
  },
  created() {
    this.history = this.getHistory().reverse();
  },
  methods: {
    getHistory() {
      return JSON.parse(localStorage.getItem('history') || '[]');
    },
    formattedDate(date) {
      return moment(date).format('DD.MM.YYYY hh:mm:ss')
    }
  }
}
</script>

<style lang="scss">
  .History {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #42b39e;

    &__title {
      color: white;
    }
    &__card {
      width: 600px;
      height: 200px;

      margin: 10px;

    }
  }
</style>
