<template>
  <div>
    <div class="home-opr">
      <RadioGroup class="home-radio"
                  v-model="params.dayNumber"
                  @on-change="change"
                  type="button">
        <Radio v-for="t in timeList"
               :key="t"
               :label="t">近{{ t }}天</Radio>
      </RadioGroup>
    </div>
    <div class="home-body">
      <div class="home-chart">
        <div class="echarts"
             ref="chart" />
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    timeList: {
      type: Array,
      default() {
        return [7, 30, 90]
      }
    }
  },
  data() {
    return {
      params: {
        dayNumber: this.timeList[0]
      },
      chart: null
    }
  },
  mounted() {
    this.$emit('ready', Object.assign({}, this.params))
  },
  methods: {
    change() {
      this.$emit('change', Object.assign({}, this.params))
    },
    buildChart(xAxisData = [], seriesData = []) {
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        color: ['#F0734B'],
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value',
          minInterval: 1
        },
        series: [{
          data: seriesData,
          type: 'line'
        }]
      }
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart)
      }
      this.chart.setOption(option)
    }
  }
}
</script>
