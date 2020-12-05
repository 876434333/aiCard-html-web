<template>
  <ul class="list">
    <li :class="{active : current.id == item.id}"
      v-for="(item, i) in list"
      :key="i"
      @click="handlerChangeCurrent(item)">
    <div class="list-item">
      <div class="list-item-ext">
        <div class="list-item-ext-text">
          {{item.moneyLeave}}
        </div>
      </div>
      <div class="list-item-main">
        <p class="list-item-title">{{item.name}}</p>
        <div class="list-item-info">{{item.phone}}</div>
      </div>
    </div>
  </li>
</ul>
</template>

<script>
export default {
  model: {
    prop: 'current'
  },
  props: {
    current: {
      type: Object,
      require: true
    },
    list: {
      type: Array,
      require: true
    }
  },
  data() {
    return {}
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    handlerChangeCurrent (item) {
      this.$emit('input', item)
    }
  },
  create () {
  }
}
</script>

<style>
</style>
