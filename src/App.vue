<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
// 去除tabs标签页与表格之间的空白
.el-tabs__header {
  margin: 0;
}
// 去除tabs标签页下边框
.el-tabs__nav-wrap::after {
  height: 0;
}
</style>
