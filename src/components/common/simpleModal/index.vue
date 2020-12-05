<template>
  <div>
    <Modal v-model="computedValue"
           title="提示"
           @on-ok="ok">
      <p>{{content}}</p>
    </Modal>
  </div>
</template>

<script>

export default {
  model: {
    prop: 'value',
    event: 'model'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('model', val)
      }
    }
  },
  mounted() {

  },
  methods: {
    ok() {
      this.$emit('on-click')
    }
  }
}
</script>
