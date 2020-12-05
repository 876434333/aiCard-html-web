<template>
  <div>
    <Modal v-model="visible"
           :mask-closable="false">
      <Tree :data="detail" ref="tree" @on-select-change="choiceAll"></Tree>
      <div slot="footer">
        <Button @click="handlerCancel">取消</Button>
        <Button type="primary" @click="handlerSave">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { personApi } from '@/api/ems'
export default {
  props: {
    value: false
  },
  data() {
    return {
      detail: [],
      departmentId: ''
    }
  },
  components: {
  },
  computed: {
    visible: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    title () {
      return '部门树'
    }
  },
  watch: {
    value(n) {
      this.loadDetail()
    }
  },
  methods: {
    loadDetail () {
      personApi.tree().then(data => {
        this.detail = data
      })
    },
    choiceAll(data) {
      this.departmentId = data[0].id
    },
    async handlerSave () {
      this.$emitBus('departmentId', this.departmentId)
    },
    handlerCancel () {
      this.visible = false
    }
  },
  create () {
  }
}
</script>

<style>
</style>
