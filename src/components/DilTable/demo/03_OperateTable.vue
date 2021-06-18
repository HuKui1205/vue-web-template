<template>
  <!-- 通用表格 包含了通用的表格样式 -->
  <div class="opertate">
    <!-- 在需要显示表格的位置写上标签 -->
    <!-- 传递熟悉建议用 v-bind.sync 的形式传递 -->
    <!-- 监听事件和平时使用一样 -->
    <dilTable
      v-bind.sync="option"
      @transportProgress="transportProgress"
    ></dilTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        // 表格请求数据的地址
        requestUrl: "/api/v1/truck/type/status2",
        // 声明最后一列操作列的内容
        lastColumnData: [
          {
            // 表头显示的文案
            label: "操作",
            // 设置列的宽度
            width: 100,
            // 固定操作列
            fixed: "right",
            // 注意！！！
            // 操作列按钮点击触发的操作改为 $emit 抛事件的形式
            // 默认可以获取 scope 属性；里面的具体内容和el-table一样
            template: `<el-button type="text" size="mini" @click="$emit('transportProgress',scope)"> 运输进度 </el-button>`,
          },
        ],
      },
    };
  },
  methods: {
    // 声明操作列事件回调方法
    // 参数和element table 回调的参数一样
    transportProgress(scope) {
      console.log(scope);
    },
  },
};
</script>
