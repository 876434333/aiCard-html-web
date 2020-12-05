<template>
  <div class="home-call">
    <span class="home-call-item"
          v-for="n in digits"
          :key="n">
      <ul class="digits-num"
          :class="'digits-num-' + computedValue[n]">
        <li>0</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
      </ul>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    // 位数
    digits: {
      type: Number,
      default: 12
    }
  },
  computed: {
    computedValue() {
      let arr = String(this.value).split('')
      let len = arr.length
      if (len < this.digits) {
        while (len++ < this.digits) {
          arr.unshift('0')
        }
      }
      return arr
    }
  }
}
</script>
<style lang="scss" scoped>
.home-call {
  overflow: hidden;
}
.digits-num {
  transition: margin-top 1s linear;
  @for $i from 0 through 9 {
    &.digits-num-#{$i} {
      margin-top: -7.3rem * $i;
    }
  }
}
</style>
