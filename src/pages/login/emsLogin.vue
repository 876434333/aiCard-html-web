<template>
  <login :type="loginType" :uuid="uuid"
         ref="login" />
</template>

<script>
import Login from './components/login'
import * as LOGIN_TYPE from '@/constants/src/loginType'
import { accountApi } from '@/api/common'
import { adminInfoSession } from '@/storage'
// import { navigateToSystem } from '@/router'

export default {
  components: {
    Login
  },
  data() {
    return {
      loginType: LOGIN_TYPE.EMS,
      uuid: ''
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.$route.query.sessionId !== null && this.$route.query.sessionId !== undefined && this.$route.query.sessionId !== '') {
        adminInfoSession.setToken(this.$route.query.sessionId)
        accountApi.getAdminInfo().then(data => {
          this.success('登录成功')
          adminInfoSession.setJSON(data)
          // 登录成功
          // navigateToSystem()
          // this.$router.push({
          //   name: 'COMMON/CHOOSEENT'
          // })
        })
      } else {
        this.uuid = this.$route.query.uuid.replace(/\s/ig, '+')
      }
      this.$refs.login.focus()
    }, 1000)
  }
}
</script>
