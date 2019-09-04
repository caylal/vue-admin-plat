<template>
  <div class="navbar">
    <el-breadcrumb class="breadcrumb-container" separator="/">
      <el-breadcrumb-item v-for="item in title" :key="item.id">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style scoped lang="scss">
.navbar{
  background: #fff;
  height: 35px;
  margin: -9px -10px 0px -10px;
  padding-left: 15px;
  .breadcrumb-container{
    line-height: 35px;
  }
}
</style>
