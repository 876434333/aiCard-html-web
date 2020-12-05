<template>
  <div>
    <Modal v-model="visible"
           :mask-closable="false"
           :title="title">
      <Form class="panel-form"
            ref="form"
            :model="detail"
            :rules="rules"
            :label-width="120"
            >
        <FormItem label="员工账号：" prop="login"><i-input v-model.trim="detail.login" placeholder="请输入员工账号" :disabled="!!id" type="text"></i-input></FormItem>
        <FormItem label="员工姓名：" prop="name"><i-input v-model.trim="detail.name" placeholder="请输入员工姓名" type="text"></i-input></FormItem>
        <FormItem label="登录密码：" prop="passWord" v-if="!id"><i-input v-model.trim="detail.passWord" placeholder="请输入登录密码" type="password"></i-input></FormItem>
        <FormItem label="确认密码：" prop="confirmParssWord" v-if="!id"><i-input v-model.trim="detail.confirmParssWord" placeholder="请输入确认密码" type="password"></i-input></FormItem>
        <FormItem label="备注信息：" prop="remark"><i-input v-model.trim="detail.remark" placeholder="请输入备注信息" type="text"></i-input></FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handlerCancel">取消</Button>
        <Button type="primary" @click="handlerSave">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { staffApi } from '@/api/common'
import { INIT_DETAIL } from '../src/const.js'
import { accountValidator, passwordValidator } from '@/assets/js/asyncValidator/validators'
export default {
  props: {
    value: false,
    id: ''
  },
  data() {
    return {
      detail: {
        ...INIT_DETAIL,
        confirmParssWord: ''
      },
      rules: {
        login: [
          { required: true, message: '请输入账号' },
          { validator: accountValidator }
        ],
        name: [
          { required: true, message: '请输入姓名' },
          { max: 32, message: '不能超过32位字符' }
        ],
        passWord: [
          { required: true, message: '请输入密码' },
          { validator: passwordValidator }
        ],
        confirmParssWord: [
          { required: true, message: '请输入确认密码' },
          { validator: (rules, value, cb) => {
            if (value !== this.detail.passWord) {
              cb(new Error('两次密码不一致'))
            } else {
              cb()
            }
          } }
        ],
        address: [
          { max: 128, message: '不能超过128位字符' }
        ],
        remark: [
          { max: 200, message: '不能超过200位字符' }
        ]
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
    },
    title () {
      return this.id ? '编辑员工信息' : '添加员工'
    }
  },
  watch: {
    value(n) {
      if (n) {
        if (this.id) {
          this.loadDetail()
        }
      } else {
        this.$refs.form.resetFields()
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
    },
    async handlerSave () {
      let _valid = false
      this.$refs.form.validate(valid => { _valid = valid })
      if (!_valid) {
        return
      }
      let { login, name, passWord, remark } = this.detail
      let data = { login, name, remark }
      if (this.id) {
        data.id = this.id
        await staffApi.updateStaff(data)
      } else {
        data.passWord = passWord
        await staffApi.addStaff(data)
      }
      this.$emit('after-save')
      this.success('操作成功')
      this.handlerCancel()
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
