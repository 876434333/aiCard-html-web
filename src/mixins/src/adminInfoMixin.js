import {
  adminInfoSession
} from '@/storage'
import {
  mapActions
} from 'vuex'
import {
  accountApi
} from '@/api/common'
import * as LOGIN_TYPE from '@/constants/src/loginType'
import {
  title
} from '@/config'

export default {
  watch: {
    '$route' () {
      this.__initAdminInfo()
    }
  },
  created() {
    this.__initAdminInfo()
  },
  methods: {
    ...mapActions(['setAdminInfo']),
    __initAdminInfo() {
      if (adminInfoSession.isLogin()) {
        this.__afterAdminInfo(adminInfoSession.getJSON())
      } else {
        accountApi.getAdminInfo(data => {
          this.__afterAdminInfo(data)
        })
      }
    },
    __afterAdminInfo(adminInfo) {
      this.setAdminInfo(adminInfo)

      // 修改web标题
      document.title = `${adminInfo.webTitle || (title + LOGIN_TYPE.getLabel())}`
      // 修改web图标
      if (adminInfo.webIcon) {
        document.getElementById('webIcon').href = adminInfo.webIcon
      }

      this.readyAdminInfo(adminInfo)
    },
    readyAdminInfo(adminInfo) {}
  }
}
