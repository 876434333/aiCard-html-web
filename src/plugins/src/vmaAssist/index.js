import vmaAssist, {
  utils
} from 'vma-vue-assist'
import Loader from './src/loader'
import handleError from './src/handleError'
import {
  api
} from '@/config'
import {
  adminInfoSession
} from '@/storage'

export default {
  install(Vue, opts = {}) {
    Vue.use(vmaAssist, {
      plugins: {
        axios: {
          defaults: {
            baseURL: api
          },
          interceptor: {
            errorHandle: {
              handleError(error) {
                handleError(error)
                return Promise.reject(error)
              }
            },
            loading: {
              showLoader() {
                Loader.show()
              },
              hideLoader() {
                Loader.hide()
              }
            },
            authorization: {
              getMacKey() {
                let macKey = adminInfoSession.getToken()
                return this.decode ? decodeURIComponent(macKey) : macKey
              }
            },
            returnResponseData: true
          }
        }
      }
    })
    Vue.prototype.fmt = utils.fmt
  }
}
