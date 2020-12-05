<template>
  <span :id="id"></span>
</template>

<script>
import GVerify from '@/assets/js/vendors/gVerify'
import uuid from 'uuid'

export default {
  data() {
    return {
      id: `gVerify_${uuid()}`,
      gVerifyInstance: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.init()
    }, 0)
  },
  methods: {
    init() {
      let rect = this.$el.getBoundingClientRect()
      this.gVerifyInstance = new GVerify({
        id: this.id,
        width: rect.width,
        height: rect.height
      })
      this.$emit('ready', this.gVerifyInstance)
    },
    validate(value) {
      return this.gVerifyInstance.validate(value)
    }
  }
}
</script>
