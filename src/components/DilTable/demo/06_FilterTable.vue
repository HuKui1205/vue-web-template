<template>
  <!-- 外部控制筛选 -->
  <div>
    <div class="filter_box">
      <el-input v-model="inputValue" placeholder="请输入内容">车牌号</el-input>
      <el-button @click="onClick">筛选</el-button>
    </div>

    <dilTable
      requestUrl="/api/v1/truck/type/status2"
      :requestQuery="requestQuery"
    ></dilTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      requestQuery: { capacity_number: 0 },
    };
  },
  methods: {
    onClick() {
      this.requestQuery.capacity_number = this.inputValue;
    },
  },
};
</script>

<style>
.filter_box {
  display: flex;
}
</style>
