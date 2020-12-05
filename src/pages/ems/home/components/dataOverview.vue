<template>
  <div class="home-data-overview">
    <div class="home-header">
      <span>数据概览</span>
    </div>
    <Row>
      <i-col span="12">
        <div class="home-opr">
          <RadioGroup class="home-radio"
                      v-model="viewParam.type"
                      @on-change='changeView'
                      type="button">
            <Radio v-for="t in timeList"
                   :key="t.value"
                   :label="t.value">{{t.label}}</Radio>
          </RadioGroup>
        </div>
        <div class="home-square-grid">
          <ul>
            <li class="border1"
                v-for="(item,index) in viewList"
                :key="index">
              <div class="border2">
                <div class="grid-content">
                  <p>{{item.desc}}</p>
                  <p :class="['up-text',upOrDown(item.lastNum,item.nowNum,currType)>0?'up':'']">{{item.nowNum}}</p>
                  <p class="contrast">
                    <span v-if="upOrDown(item.lastNum,item.nowNum,currType)"
                          :class="upOrDown(item.lastNum,item.nowNum,currType)>0?'up':'down'">{{growthRate(item.lastNum,item.nowNum,currType)}}</span>
                    <span v-else>{{growthRate(item.lastNum,item.nowNum,currType)}}</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </i-col>
      <i-col span="12">
        <DataIndicator @ready="initChart"
                       @change="initChart"
                       ref="dataIndicator"></DataIndicator>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { homeApi } from '@/api/ems'
import DataIndicator from './dataIndicator'

export default {
  components: {
    DataIndicator
  },
  data() {
    return {
      timeList: [{ label: '汇总', value: 1 }, { label: '昨日', value: 2 }, { label: '近7天', value: 3 }, { label: '近30天', value: 4 }],
      viewParam: {
        type: 1
      },
      viewList: [],
      currType: 1
    }
  },
  created() {
    this.getData()
  },
  methods: {
    initChart(params) {
      homeApi.userAccount(params).then(data => {
        let xAxisData = []
        let seriesData = []
        if (data && data.length) {
          data.forEach(v => {
            xAxisData.push(v.name)
            seriesData.push(v.value)
          })
        }
        this.$refs.dataIndicator.buildChart(xAxisData, seriesData)
      })
    },
    getData() {
      homeApi.viewAccount(this.viewParam).then(data => {
        this.viewList = data
      })
    },
    changeView(type) {
      this.currType = type
      this.getData()
    },
    growthRate(last, now, type) {
      if (type !== 1) {
        if (last === 0) {
          return '无对比'
        } else {
          let rate = Math.round((now - last) / last * 100)
          if (rate > 0) {
            return `+${rate}%`
          } else {
            return `${rate}%`
          }
        }
      } else {
        return ''
      }
    },
    upOrDown(last, now, type) {
      if (type !== 1) {
        if (last === 0) {
          return ''
        } else {
          let rate = Math.round((now - last) / last * 100)
          return rate
        }
      } else {
        return ''
      }
    }
  }
}
</script>
