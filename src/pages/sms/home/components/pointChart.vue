<template>
  <point-chart :number="number"
               @ready="onReady"
               @change="initChart"
               ref="pointChart" />
</template>

<script>
import { homeApi } from '@/api/sms'
import PointChart from '@/components/packages/home/pointChart'

export default {
  components: {
    PointChart
  },
  data() {
    return {
      number: {
        yesterday: 0,
        today: 0,
        all: 0
      }
    }
  },
  methods: {
    onReady(params) {
      homeApi.getPointNumber().then(data => {
        this.number = Object.assign({}, this.number, data)
      })
      this.initChart(params)
    },
    initChart(params) {
      homeApi.getDaysPointNumber(params.dayNumber).then(data => {
        let xAxisData = []
        let seriesData = []
        if (data && data.length) {
          data.forEach(v => {
            xAxisData.push(v.createTime)
            seriesData.push(v.pointNumber)
          })
        }
        this.$refs.pointChart.buildChart(xAxisData, seriesData)
      })
    }
  }
}
</script>
