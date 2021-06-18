<template>
  <!-- 单选表格 -->
  <div class="selection">
    <!-- 在需要显示表格的位置写上标签 -->
    <!-- 传递熟悉建议用 v-bind.sync 的形式传递 -->
    <dilTable v-bind.sync="option" @selection-change="selectionChange"></dilTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        // 表格请求数据的地址
        requestUrl: "/api/v1/truck/type/status2",
        // 控制显示多选列
        selectionType: "select",
      },
    };
  },
  methods: {
    selectionChange(selection) {
      console.log("所有选中行的数据：");
      console.log(selection);
    },
  },
};
</script>
