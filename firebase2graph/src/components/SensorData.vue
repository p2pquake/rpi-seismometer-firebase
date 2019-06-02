<template>
  <div class="sensor">
    <h3>簡易震度計による震度グラフ</h3>
    <p>(制作方法: <a href="https://www.p2pquake.net/dev/rpi_seismometer/">Raspberry Pi 簡易震度計 | P2P地震情報 ガラクタおきば</a>, GitHub: <a href="https://github.com/p2pquake/rpi-seismometer-firebase">p2pquake / rpi-seismometer-firebase</a>)</p>
    <p><strong>{{ time }} 現在</strong></p>
    <div class="graph">
      <line-chart
        v-if="loaded"
        :chart-data="records"
        :options="options"/>
    </div>
  </div>
</template>

<script>
import {db} from '../plugins/firebase.js'
import LineChart from './LineChart.vue'

export default {
  name: 'SensorData',
  components: {
    LineChart
  },
  data: () => ({
    loaded: false,
    time: "",
    records: [],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      scales: {
        yAxes: [ { scaleLabel: { display: true, labelString: '震度' }, ticks: { min: -1, max: 3 } } ],
        xAxes: [ { scaleLabel: { display: true, labelString: '秒' } } ]
      }
    }
  }),
  mounted() {
    db.ref('sensors/current').on('value', (snapshot) => {
      this.time = Object.keys(snapshot.val())[0]
      this.records = { labels: [...Array(600).keys()].map(i => i/10), datasets: [ {data: snapshot.val()[Object.keys(snapshot.val())[0]], backgroundColor: (new Array(600)).fill('limegreen') } ] }
      this.loaded = true
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.graph {
  max-width: 1024px;
  height: 160px;
  margin: auto;
}
</style>
