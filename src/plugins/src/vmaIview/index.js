import vmaIview from 'vma-vue-iview'
import 'vma-vue-iview/dist/static/css/vmaIview.css'
import {
  getQiniuTokenUrl
} from '@/config'

export default {
  install(Vue, opts = {}) {
    Vue.use(vmaIview, {
      components: {
        upload: {
          qiniu: {
            getQiniuTokenUrl
          }
        }
      }
    })
  }
}
