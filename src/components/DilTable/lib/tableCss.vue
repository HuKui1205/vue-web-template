<template>
  <tableAbility v-bind="$attrs" v-on="$listeners"></tableAbility>
</template>

<script>
import tableAbility from "./tableAbility.vue";
export default {
  components: {
    tableAbility
  },
  created() {
    if (this.$attrs.selection != false) {
      this.$attrs.selection = true;
    }
  }
};
</script>

<style scoped lang="scss">
.tableAbility {
  >>> .el-table {
    thead {
      tr {
        th {
          background-color: #f0f7ff;
          border-width: 0.125rem 0.0625rem 0.0625rem 0;
          border-style: solid;
          border-color: #3a70ea rgb(220, 223, 231) rgb(220, 223, 231);
          border-image: initial;
        }
      }
    }
    th {
      padding: 4px 0;
      .cell {
        max-height: 35.22px;
      }
    }
    td {
      padding: 10px 0;
    }
  }

  >>> .el-table--border {
    border: none;

    .el-table__body {
      tr.el-table__row {
        td {
          border: none;
          border-bottom: 1px solid #dfe6ec;
        }
      }
    }
  }

  >>> .el-table--striped {
    .el-table__body {
      tr.el-table__row--striped {
        td {
          background-color: #f0f7ff;
        }

        &.hover-row {
          td {
            background-color: #f5f7fa;
          }
        }
      }
    }
  }

  >>> .el-pagination {
    float: right;
    margin: 1.25rem 1.25rem 0 0;
  }
}
</style>
