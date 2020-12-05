/**
 * Created by flb on 2018/7/25.
 */
import {CHANGE_IMAGE_SHOW_MODE_STATE} from "../mutation-types"

const state = {
  imageShowMode:{
    mode:''
  }
}

const getters = {
  imageShowMode:state=>state.imageShowMode
}

const mutations = {
  [CHANGE_IMAGE_SHOW_MODE_STATE](state, mode) {
    state.imageShowMode.mode = mode
  }
}

export default {
  state,
  getters,
  mutations
}
