import vmaAssistPlugin from './src/vmaAssist'
import vmaIviewPlugin from './src/vmaIview'
import axiosPlugin from './src/axios'

export default {
  install(Vue) {
    Vue.use(vmaAssistPlugin)
    Vue.use(vmaIviewPlugin)
    Vue.use(axiosPlugin)
  }
}
