<template>
  <div>
    <div class="panel home-row">
      <div class="panel-body">
        <digit />
      </div>
    </div>

    <div class="home-row">
      <div class="home-fl"
           style="width: 40%;">
        <div class="panel">
          <div class="panel-body">
            <p class="home-header">客户数据</p>
            <customer-slice />
          </div>
        </div>
      </div>
      <div class="home-fr"
           style="margin-left: 41%;">
        <div class="panel">
          <div class="panel-body">
            <p class="home-header">名片数据</p>
            <card-slice />
          </div>
        </div>
      </div>
    </div>

    <div class="home-row">
      <div class="home-fl"
           style="width: 55%;">
        <div class="panel">
          <div class="panel-body">
            <p class="home-header">迹点统计</p>
            <point-chart />
          </div>
        </div>
      </div>
      <div class="home-fr"
           style="margin-left: 56%;">
        <div class="panel">
          <div class="panel-body">
            <p class="home-header">名片统计</p>
            <card-chart />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Digit from './components/digit'
import CustomerSlice from './components/customerSlice'
import CardSlice from './components/cardSlice'
import PointChart from './components/pointChart'
import CardChart from './components/cardChart'

export default {
  components: {
    Digit,
    CustomerSlice,
    CardSlice,
    PointChart,
    CardChart
  }
}
</script>
