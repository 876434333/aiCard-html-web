<template>
  <div class="home-todo-list">
    <div class="home-todo-item">
      <p>{{ (number.yesterday || 0) | numberLabel }}</p>
      <p class="ellipsis">昨日名片数</p>
    </div>
    <div class="home-todo-item">
      <p>{{ (number.today || 0) | numberLabel }}</p>
      <p class="ellipsis">今日名片数</p>
    </div>
    <div class="home-todo-item">
      <p>{{ (number.sevenDay || 0) | numberLabel }}</p>
      <p class="ellipsis">近7天名片数</p>
    </div>
    <div class="home-todo-item">
      <p>{{ (number.thirtyDay || 0) | numberLabel }}</p>
      <p class="ellipsis">近30天名片数</p>
    </div>
    <div class="home-todo-item">
      <p>{{ (number.ninetyDay || 0) | numberLabel }}</p>
      <p class="ellipsis">近90天名片数</p>
    </div>
    <div class="home-todo-item">
      <p>{{ (number.all || 0) | numberLabel }}</p>
      <p class="ellipsis">总名片数</p>
    </div>
  </div>
</template>

<script>
import { homeApi } from '@/api/sms'

export default {
  data() {
    return {
      number: {
        all: 0,
        ninetyDay: 0,
        thirtyDay: 0,
        sevenDday: 0,
        yesterday: 0,
        today: 0
      }
    }
  },
  created() {
    homeApi.getCardNumber().then(data => {
      this.number = Object.assign({}, this.number, data)
    })
  }
}
</script>
