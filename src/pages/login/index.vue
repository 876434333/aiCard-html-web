<template>
  <login :type="loginType"
         ref="login">
    <FormItem slot="loginType"
              prop="loginType">
      <Select v-model="loginType">
        <Option v-for="v in loginTypeList"
                :key="v.value"
                :value="v.value">{{v.label}}</Option>
      </Select>
    </FormItem>
  </login>
</template>

<script>
import Login from './components/login'
import * as LOGIN_TYPE from '@/constants/src/loginType'
import { loginTypeLocal } from '@/storage'

export default {
  components: {
    Login
  },
  data() {
    return {
      loginType: Number(loginTypeLocal.getOrDefault()),
      loginTypeList: LOGIN_TYPE.LOGIN_TYPE_LIST
    }
  },
  watch: {
    loginType() {
      this.$refs.login.focus()
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.login.focus()
    }, 1000)
  }
}
</script>
