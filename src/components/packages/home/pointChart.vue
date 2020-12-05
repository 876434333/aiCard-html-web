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
      <div class="home-call-l">
        <div class="home-call-block">
          <div class="right">
            <p class="num">{{ number.yesterday || 0 }}</p>
            <p><span class="circle circle-purple"></span>昨日迹点数</p>
          </div>
        </div>
        <div class="home-call-block">
          <div class="right">
            <p class="num">{{ number.today || 0 }}</p>
            <p><span class="circle circle-blue"></span>今日迹点数</p>
          </div>
        </div>
        <div class="home-call-block">
          <div class="right">
            <p class="num">{{ number.all || 0 }}</p>
            <p><span class="circle circle-green"></span>累积迹点数</p>
          </div>
        </div>
      </div>
      <div class="home-call-r">
        <div class="home-chart">
          <div class="echarts"
               ref="chart" />
        </div>
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
    },
    number: {
      type: Object,
      default() {
        return {
          yesterday: 0,
          today: 0,
          all: 0
        }
      }
    }
  },
  data() {
    return {
      params: {
        dayNumber: 7
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
        color: ['#3EC093'],
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
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
