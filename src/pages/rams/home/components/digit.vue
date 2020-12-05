<template>
  <digit :value="value" />
</template>

<script>
import { homeApi } from '@/api/rams'
import Digit from '@/components/packages/home/digit'

export default {
  components: {
    Digit
  },
  data() {
    return {
      value: 0,
      // 循环读取数据的时间间隔
      loopTime: 10000,
      timer: null
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.getData()
    }, this.loopTime)
    this.getData()
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    getData() {
      // this.value = Math.floor(Math.random() * 100000000000)
      homeApi.getPointNumber().then(data => {
        this.value = Number(Number(data.all || 0).toFixed(0))
      })
    }
  }
}
</script>
