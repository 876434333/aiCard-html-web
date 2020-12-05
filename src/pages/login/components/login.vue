<style>
  .forget {
    height:2rem;
    line-height: 2rem;
    font-size:1rem;
    color:#646464;
    text-align: right;
    cursor: pointer;
  }
</style>
<template>
  <div class="login-bg">
    <div class="login-wrapper" :style="title === '企业后台' ? 'padding-bottom: 2rem' : ''">
      <h1 class="login-title">{{title}}</h1>
      <Form class="login-form"
            ref="form"
            :model="form"
            :rules="rules">
        <FormItem prop="phone">
          <i-input type="text"
                   v-model.trim="form.phone"
                   :maxlength="20"
                   placeholder="请输入登录账号或手机号"
                   @keyup.native.enter="handleLoginSubmit"
                   ref="phone" />
        </FormItem>
        <FormItem prop="passWord">
          <i-input type="password"
                   v-model.trim="form.passWord"
                   :maxlength="20"
                   placeholder="请输入密码"
                   @keyup.native.enter="handleLoginSubmit" />
        </FormItem>
        <FormItem class="login-code"
                  prop="code">
          <i-input type="text"
                   v-model.trim="form.code"
                   :maxlength="4"
                   placeholder="请输入验证码"
                   @keyup.native.enter="handleLoginSubmit" />
          <g-verify class="login-code-img"
                    ref="gVerify" />
        </FormItem>
        <slot name="loginType" />

        <FormItem>
          <Button class="login-btn-submit"
                  type="primary"
                  @click="handleLoginSubmit">登录</Button>
        </FormItem>
      </Form>
      <div class="forget" @click="goForget" v-if="type === 5">找回密码</div>
    </div>
  </div>
</template>
<script>
import * as LOGIN_TYPE from '@/constants/src/loginType'
import { accountApi } from '@/api/common'
import { navigateToSystem } from '@/router'
import { adminInfoSession, loginTypeLocal, setSessionPhone } from '@/storage'
import { adminInfoMixin } from '@/mixins'

export default {
  mixins: [adminInfoMixin],
  props: {
    type: Number,
    uuid: String
  },
  data() {
    // let verifyCodeValidator = (rule, value, callback, source, options) => {
    //   let errors = []
    //   if (value && !this.$refs.gVerify.validate(value)) {
    //     errors.push(rule.message || '验证码错误')
    //   }
    //   callback(errors)
    // }
    return {
      form: {
        phone: '',
        passWord: '',
        code: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入账号' }
        ],
        passWord: [
          { required: true, message: '请输入密码' }
        ]
        // M by PLH at 2019-01-09 for 暂时本版本不验证验证码
        // ,
        // code: [
        //  { required: true, message: '请输入验证码' },
        //  { validator: verifyCodeValidator, trigger: 'blur' }
        // ]
      }
    }
  },
  computed: {
    title() {
      return LOGIN_TYPE.getLabel(this.type)
    }
  },
  mounted() {
    this.focus()
  },
  methods: {
    handleLoginSubmit() {
      loginTypeLocal.set(this.type)
      this.$refs['form'].validate(valid => {
        if (valid) {
          let entity = Object.assign({
            type: this.type,
            uuid: this.uuid
          }, this.form)
          // 暂时移除验证码
          delete entity.code
          accountApi.login(entity).then(data => {
            this.success('登录成功')
            setSessionPhone(this.form.phone)
            adminInfoSession.setJSON(data)
            adminInfoSession.setToken(data.token)
            // 登录成功
            if (this.type === 5) {
              this.$router.push({
                name: 'COMMON/CHOOSEENT'
              })
            } else {
              navigateToSystem()
            }
          })
        }
      })
    },
    focus() {
      this.$refs.phone.focus()
    },
    // 跳转到忘记密码页面
    goForget() {
      this.$router.push({
        name: 'COMMON/FIND_PASSWORD'
      })
    }
  }
}
</script>
