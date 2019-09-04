<template>
  <div class="container">
      <!-- 导航菜单栏 -->
      <nav-bar></nav-bar>
      <!-- 头部区域 -->
      <header-bar></header-bar>
      <!-- 主内容区域 -->
      <main-content></main-content>
  </div>
</template>
<script>
import HeaderBar from '@/components/HeaderBar'
import NavBar from '@/components/NavBar'
import MainContent from '@/components/MainContent'
export default {
  components: {
    HeaderBar,
    NavBar,
    MainContent
  },
  methods: {
    getVinType () {
      this.$api.types.findAll().then(res => {
        if (res.data) {
          this.$store.commit('setVinType', res.data)
        }
      }).catch(err => {
        this.$message({message: err, type: 'error'})
      })
    }
  },
  created () {
    this.getVinType()
  }
}
</script>
<style scoped lang="scss">
  .container {
    position:absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    // background: rgba(224, 234, 235, 0.1);
  }
</style>
