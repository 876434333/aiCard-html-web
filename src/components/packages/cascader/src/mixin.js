export default {
  model: {
    prop: 'value',
    event: 'model'
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      initial: false,
      data: []
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
  watch: {
    'value' () {
      if (this.value && this.value.length) {
        this.initData()
      }
    }
  },
  mounted() {
    if (this.value && this.value.length) {
      this.initData()
    }
  },
  methods: {
    initData() {
      if (this.initial === false) {
        this.getData()
      }
    },
    getData() {
      throw new Error('请重写该方法')
    },
    loadData(item, callback) {
      throw new Error('请重写改方法')
    },
    onVisibleChange(visible) {
      if (visible) {
        this.initData()
      }
      this.$emit('on-visible-change', visible)
    },
    onChange(value, selectedData) {
      this.$emit('on-change', value, selectedData)
    }
  }
}
