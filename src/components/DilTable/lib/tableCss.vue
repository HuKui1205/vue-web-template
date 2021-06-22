<template>
  <tableAbility class="tableAbility" v-bind="$attrs" v-on="$listeners"></tableAbility>
</template>

<script>
import tableAbility from "./tableAbility.vue";
export default {
  components: {
    tableAbility
  },
  created() {
    if (this.$attrs.selection && this.$attrs.selection != false) {
      this.$attrs.selection = true;
    }
  }
};
</script>

<style scoped lang="scss">
.tableAbility ::v-deep {
  .el-table {
    th {
      padding: 0.25rem 0;
      .cell {
        max-height: 2.2012rem;
      }
    }
    td {
      padding: 0.625rem 0;
    }
  }

  .el-table--border {
    border: none;
  }

  .el-pagination {
    float: right;
    margin: 1.25rem 1.25rem 0 0;
  }
}
</style>
