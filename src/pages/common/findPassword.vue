<template>
  <div class="login-bg forget-bg">
    <div class="forget-wrapper">
      <h1 class="login-title">找回密码</h1>
      <Form class="forget-form"
            ref="form"
            :model="form"
            :rules="rules">
        <FormItem label="手机号"
                  prop="phone">
          <i-input type="text"
                   v-model.trim="form.phone"
                   :maxlength="11"
                   @keyup.native="handlePhoneInput"
                   placeholder="请输入您注册的手机号"></i-input>
        </FormItem>
        <FormItem class="forget-code"
                  label="验证码"
                  prop="msgCode">
          <i-input type="text"
                   v-model.trim="form.msgCode"
                   :maxlength="6"
                   placeholder="请输入验证码"></i-input>
          <span class="forget-code-img"
                :class="{dis: codeBtn.disable}"
                @click="handleGetCode">{{codeBtn.title}}</span>
        </FormItem>
        <FormItem label="新密码"
                  prop="passWord">
          <i-input type="password"
                   v-model.trim="form.passWord"
                   :maxlength="16"
                   placeholder="请输入新密码，6-16位字母、数字、下划线"></i-input>
        </FormItem>
        <FormItem label="确认密码"
                  prop="rePassWord">
          <i-input type="password"
                   v-model.trim="form.rePassWord"
                   :maxlength="16"
                   placeholder="请再次输入新密码"></i-input>
        </FormItem>
        <FormItem>
          <Button class="forget-btn-submit"
                  type="primary"
                  @click="handleForgetSubmit">提交</Button>
        </FormItem>
      </Form>
      <div class="forget-more">
        <a href="javascript: void(0);"
           class="forget-back"
           @click="back">
          <i class="icon icon-login-back"></i>返回登录页面</a>
      </div>
    </div>
  </div>
</template>
<script>
import { accountApi, messageApi, enterpriseApi } from '@/api/common'
import { mobileValidator, passwordValidator } from '@/assets/js/asyncValidator/validators'

export default {
  data() {
    const rePassWordValidator = (rule, value, callback) => {
      let errors = []
      if (value && value !== this.form.passWord) {
        errors.push('两次密码不一致')
      }
      callback(errors)
    }
    return {
      form: {
        phone: '',
        msgCode: '',
        passWord: '',
        rePassWord: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'keyup' },
          { validator: mobileValidator, message: '请输入正确的手机号码', trigger: 'keyup' }
        ],
        msgCode: [
          { required: true, message: '请输入验证码' }
        ],
        passWord: [
          { required: true, message: '请输入新密码' },
          { validator: passwordValidator }
        ],
        rePassWord: [
          { required: true, message: '请再次输入新密码' },
          { validator: rePassWordValidator }
        ]
      },
      codeBtn: {
        title: '获取验证',
        disable: true
      }
    }
  },
  methods: {
    handleForgetSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          accountApi.findPWD(this.form).then(() => {
            this.success('您的密码已经成功找回，请重新用新密码登录')
            setTimeout(() => {
              // this.back()
              this.$router.push({
                name: 'LOGIN'
              })
            }, 1000)
          })
        }
      })
    },
    handlePhoneInput() {
      this.$refs.form.validateField('phone', errors => {
        console.log(errors)
        if (errors.length) {
          this.codeBtn.disable = true
        } else {
          this.codeBtn.disable = false
        }
      })
    },
    handleGetCode() {
      if (this.codeBtn.disable === false) {
        console.log(messageApi)
        // messageApi.sendCode(this.form.phone).then(data => {
        enterpriseApi.getCode(this.form.phone).then(data => {
          if (data === 'ok') {
            this.success('验证码发送成功')
            this.codeBtn.disable = true
            let time = 120
            let timer = setInterval(() => {
              if (time <= 0) {
                clearInterval(timer)
                this.codeBtn.title = '获取验证码'
                this.codeBtn.disable = false
              } else {
                this.codeBtn.title = `${time--}秒`
              }
            }, 1000)
          }
        })
      }
    },
    back() {
      history.back()
    }
  }
}
</script>
