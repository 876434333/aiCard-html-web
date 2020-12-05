import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import base from './modules/base'
import render from './modules/render'
import property from './modules/property'

Vue.use(Vuex)

console.log(actions)

const store = new Vuex.Store({
  actions,
  modules: {
    base,
    render,
    property
  }
})

export default store
