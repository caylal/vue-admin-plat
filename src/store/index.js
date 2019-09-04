import Vue from 'vue'
import vuex from 'vuex'
import app from './modules/app'
import tab from './modules/tab'
import vinType from './modules/vinType'
Vue.use(vuex)
const store = new vuex.Store({
  modules: {
    app: app,
    tab: tab,
    type: vinType
  }
})

export default store
