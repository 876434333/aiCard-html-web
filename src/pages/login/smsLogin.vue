<template>
  <login :type="loginType"
         ref="login" />
</template>

<script>
import Login from './components/login'
import * as LOGIN_TYPE from '@/constants/src/loginType'

export default {
  components: {
    Login
  },
  data() {
    return {
      loginType: LOGIN_TYPE.SMS
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.login.focus()
    }, 1000)
  }
}
</script>
