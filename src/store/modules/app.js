export default {
  state: {
    appName: 'Avenir 平台', // 应用名称
    collapse: false, // 导航栏收缩状态
    themeColor: '#1890ff', // 主题颜色
    oldThemeColor: '#1890ff', // 上一次主题颜色
    agentInfo: { agentName: 'admin', recordNo: '', callTime: '' }
  },
  getters: {
    collapse (state) {
      return state.collapse
    }
  },
  mutations: {
    onCollapse (state) {
      state.collapse = !state.collapse
    },
    setThemeColor (state, themeColor) { // 改变主题颜色
      state.oldThemeColor = state.themeColor
      state.themeColor = themeColor
    },
    setAgentInfo (state, info) {
      state.agentInfo = info
    }
  },
  actions: {
  }
}
