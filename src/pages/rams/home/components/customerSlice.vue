<template>
  <div class="home-todo-list">
    <div class="home-todo-item">
      <p>{{ (number.yesterday || 0) | numberLabel }}</p>
      <p>昨日企业数</p>
    </div>
    <div class="home-todo-item">
      <p>{{ (number.today || 0) | numberLabel }}</p>
      <p>今日企业数</p>
    </div>
    <div class="home-todo-item">
      <p>{{ (number.all || 0) | numberLabel }}</p>
      <p>企业总数</p>
    </div>
  </div>
</template>

<script>
import { homeApi } from '@/api/rams'

export default {
  data() {
    return {
      number: {
        yesterday: 0,
        today: 0,
        all: 0
      }
    }
  },
  created() {
    homeApi.getEnterpriseNumber().then(data => {
      this.number = Object.assign({}, this.number, data)
    })
  }
}
</script>
