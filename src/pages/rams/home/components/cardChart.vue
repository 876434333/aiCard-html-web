<template>
  <card-chart @ready="initChart"
              @change="initChart"
              ref="cardChart" />
</template>

<script>
import { homeApi } from '@/api/rams'
import CardChart from '@/components/packages/home/cardChart'

export default {
  components: {
    CardChart
  },
  methods: {
    initChart(params) {
      homeApi.getDaysCardNumber(params.dayNumber).then(data => {
        let xAxisData = []
        let seriesData = []
        if (data && data.length) {
          data.forEach(v => {
            xAxisData.push(v.createTime)
            seriesData.push(v.cardNumber)
          })
        }
        this.$refs.cardChart.buildChart(xAxisData, seriesData)
      })
    }
  }
}
</script>
