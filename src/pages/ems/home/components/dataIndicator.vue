<template>
  <div>
    <div class="home-opr home-data-dicator">
      <span class="label">数据指标</span>
      <Select v-model="params.type"
              @on-change='change'
              style="width:200px">
        <Option v-for="item in indictorList"
                :value="item.value"
                :key="item.value">{{ item.label }}</Option>
      </Select>
      <RadioGroup class="home-radio"
                  v-model="params.day"
                  @on-change="change"
                  type="button">
        <Radio v-for="t in timeList"
               :key="t.value"
               :label="t.value">{{ t.label }}</Radio>
      </RadioGroup>
    </div>
    <div class="home-body">
      <div class="home-chart">
        <div class="echarts home-indicator-echarts"
             ref="chart" />
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      indictorList: [{ label: '客户总数', value: 1 }, { label: '跟进总数', value: 2 }, { label: '浏览总数', value: 3 }, { label: '被转发总数', value: 4 }, { label: '被保存总数', value: 5 }, { label: '被点击总数', value: 6 }],
      timeList: [{ label: '7天', value: 7 }, { label: '15天', value: 15 }, { label: '30天', value: 30 }],
      params: {
        type: 1,
        day: 7
      }
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
        color: ['#4877c1'],
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
