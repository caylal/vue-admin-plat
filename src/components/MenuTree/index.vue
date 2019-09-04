<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.path">
    <template slot="title">
      <i :class="menu.meta.icon" ></i>
      <span slot="title">{{menu.name}}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.path" :menu="item"></MenuTree>
  </el-submenu>
  <el-menu-item v-else-if="!menu.hidden" :index="menu.path" @click="handleRoute(menu)">
    <i :class="menu.meta.icon"></i>
    <span slot="title">{{menu.name}}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRoute (menu) {
      // 通过菜单URL跳转至指定路由
      this.$router.push(menu.path)
    }
  }
}
</script>

<style scoped lang="scss">
// .el-submenu, .el-menu-item {
//   background-color: #3c4b5a44;
// }
 .fa {
    width: 24px;
    padding-left: 5px;
  }
</style>
