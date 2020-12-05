import axios from 'axios'
import {
  adminInfoSession
} from '@/storage'

const getSessionId = () => {
  return adminInfoSession.getToken()
}

export default {
  install(Vue, opts = {}) {
    axios.interceptors.request.use(config => {
      if (config.sessionId !== false) {
        Object.assign(config.headers, {
          session_id: getSessionId()
        })
      }
      return config
    })
  }
}
