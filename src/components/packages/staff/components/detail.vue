<template>
  <div>
    <Modal v-model="visible"
           :title="title">
      <Form class="panel-form"
            :label-width="120"
            >
        <FormItem label="员工账号：">{{detail.login}}</FormItem>
        <FormItem label="员工姓名：">{{detail.name}}</FormItem>
        <FormItem label="初始密码：">{{detail.passWord}}</FormItem>
        <FormItem label="备注信息：">{{detail.remark}}</FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { staffApi } from '@/api/common'
export default {
  props: {
    value: false,
    id: ''
  },
  data() {
    return {
      title: '员工信息',
      detail: {
        createTime: '',
        login: '',
        loginTime: '',
        name: '',
        passWord: '',
        remark: '',
        status: ''
      }
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
    }
  },
  watch: {
    value(n) {
      if (n) {
        this.loadDetail()
      }
    }
  },
  methods: {
    loadDetail () {
      if (!this.id) {
        return
      }
      staffApi.getStaffDetail(this.id).then(data => {
        this.detail = data
      })
    }
  },
  create () {
  }
}
</script>

<style>
</style>
