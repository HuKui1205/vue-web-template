<template>
  <!-- 单选表格 -->
  <div class="radio">
    <!-- 在需要显示表格的位置写上标签 -->
    <!-- 传递熟悉建议用 v-bind.sync 的形式传递 -->
    <dilTable v-bind.sync="option" @radio-change="currentRadioChange"></dilTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        // 表格请求数据的地址
        requestUrl: "/api/v1/truck/type/status2",
        // 控制显示当选列
        selectionType: "radio",
      },
    };
  },
  methods: {
    currentRadioChange(row) {
      console.log("当前选中行的数据：");
      console.log(row);
    },
  },
};
</script>
