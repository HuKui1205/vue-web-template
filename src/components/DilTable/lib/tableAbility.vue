<template>
  <div class="st-base-table" v-show="isShow">
    <!-- 表格主体 -->
    <el-table
      ref="mainTable"
      :data="dataTabel"
      row-key="ROW_ID"
      :stripe="stripe"
      :border="border"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :height="height"
      :max-height="maxHeight"
      :highlight-current-row="highlightCurrentRow"
      @sort-change="sortChange"
      @selection-change="selectionChange"
      @filter-change="filterChange"
      @row-click="rowClick"
    >
      <!-- 多选列 -->
      <el-table-column
        v-if="selectionType == 'select'"
        type="selection"
        width="50"
        align="center"
        fixed="left"
        :reserve-selection="reserveSelection"
        :resizable="false"
      >
      </el-table-column>

      <!-- 单选 -->
      <el-table-column
        v-if="selectionType == 'radio'"
        width="50"
        align="center"
        label="单选"
        fixed="left"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-radio
            :value="dataRadioId"
            :label="scope.row.ROW_ID"
            @click.native.prevent.stop="rowClick(scope.row)"
          >
            {{ "" }}
          </el-radio>
        </template>
      </el-table-column>

      <!-- 序号 -->
      <el-table-column
        v-if="showIndex"
        type="index"
        width="50"
        label="序号"
        align="center"
        fixed="left"
        :resizable="false"
      >
      </el-table-column>

      <!-- 表格列 -->
      <el-table-column
        v-for="(item, index) in dataColumnData"
        :key="item.id || 'auto_' + index"
        v-bind="item"
        :column-key="dataDropColumn[index].prop"
        :align="item.align || align"
        :sortable="dataSortable(item)"
        :show-overflow-tooltip="item.showOverflowTooltip || showOverflowTooltip"
        :min-width="item['min-width'] || dataColumnMinWidth(item)"
        :class-name="item['class-name'] || 'allowDrag'"
      >
        <!-- 表格每行的内容 -->
        <div slot-scope="scope">
          <!-- 功能位置 -->
          <component-proxy
            v-if="item.template"
            :html="item.template"
            :scope="scope"
            v-on="$listeners"
          >
          </component-proxy>

          <!-- 文本位置 -->
          <template v-else>
            {{ dataTabel[scope.$index][dataDropColumn[index].prop] }}
          </template>
        </div>
      </el-table-column>

      <!-- 默认插槽 -->
      <slot></slot>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      v-if="isPagination"
      :layout="layout"
      :current-page="dataCurrentPage"
      :page-sizes="pageSizes"
      :page-size="dataPageSize"
      :total="dataTotal"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
// import Vue from 'vue/dist/vue.esm.js';
import Sortablejs from "sortablejs";
export default {
  props: {
    // 基础地址
    baseUrl: {
      default: "https://diltd.steerinfo.com",
    },
    // 请求地址
    requestUrl: {
      default: "",
    },
    // 请求参数 请求体中的参数
    requestQuery: {
      default() {
        return {};
      },
    },
    // 请求参数 请求连接中的参数 (暂未实现)
    requestParams: {
      default() {
        return {};
      },
    },
    // 表头数据
    columnData: {
      default() {
        return [];
      },
    },
    // 在尾部增加的表头数据
    lastColumnData: {
      default() {
        return [];
      },
    },
    // 是否显示序号
    showIndex: {
      default: true,
    },
    // 是否显示选择框
    // radio：显示单选框
    // select：显示多选框
    selectionType: {
      default: "",
    },
    // 是否 在数据翻页后保留之前选中的数据（需指定 row-key）
    reserveSelection: {
      default: true,
    },
    // 是否为斑马纹 table
    stripe: {
      default: true,
    },
    // Table 的高度，默认为自动高度。
    // 如果 height 为 number 类型，单位 px；
    // 如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
    height: {
      default: null,
    },
    // Table 的最大高度。合法的值为数字或者单位为 px 的高度。
    "max-height": {
      default: null,
    },
    // 是否启用排序
    sortable: {
      default: "custom",
    },
    // 对齐方式 left/center/right
    align: {
      default: "center",
    },
    // 是否带有纵向边框
    border: {
      default: true,
    },
    // 是否要高亮当前行
    "highlight-current-row": {
      default: false,
    },
    // 当内容过长被隐藏时显示 tooltip
    "show-overflow-tooltip": {
      default: true,
    },
    // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
    rowClassName: {
      default() {
        return ({ row, rowIndex }) => "";
      },
    },
    // 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
    cellClassName: {
      default() {
        return ({ row, rowIndex }) => "";
      },
    },

    // 是否启用分页器
    isPagination: {
      default: true,
    },
    // 当前页数，支持 .sync 修饰符
    "current-page": {
      default: 0,
    },
    // 每页显示个数选择器的选项设置
    "page-sizes": {
      default() {
        return [1, 2, 5, 10];
      },
    },
    // 每页显示条目个数，支持 .sync 修饰符
    "page-size": {
      default() {
        return 10;
      },
    },
    //组件布局，子组件名用逗号分隔
    layout: {
      default() {
        return "total, prev, pager, next, sizes, jumper";
      },
    },
  },
  data() {
    return {
      // 等数据渲染完了再显示
      isShow: false,
      // 自己 请求体 参数
      dataRequestQuery: {},
      // 自己的表数据
      dataTabel: [],
      // 自己的表头数据
      dataColumnData: [],
      // 拖拽的表头数据
      dataDropColumn: [],
      // 自己的数据总条数
      dataTotal: 0,
      // 自己的当前页面数
      dataCurrentPage: 1,
      // 自己的每页显示条目个数
      dataPageSize: 10,
      // 保存表格所有页面所选中的数据
      dataSelection: [],
      // 保存表格单选的数据 保存数据的id
      dataRadioId: "",
    };
  },
  created() {
    this.currentChange(this.currentPage || 1);
  },
  mounted() {
    // this.rowDrop();
    this.columnDrop();
  },
  methods: {
    // 通过请求获取数据
    requestData({ pageNum, pageSize }) {
      if (this.requestUrl) {
        // 处理请求地址逻辑
        let url;
        if (this.requestUrl.indexOf("//") > -1) {
          url = this.requestUrl;
        } else {
          url = this.baseUrl + this.requestUrl;
        }
        // 处理请求地址逻辑

        if (
          !this.dataTotal ||
          (this.dataCurrentPage - 1) * this.dataPageSize < this.dataTotal
        ) {
          // 判断是否需要在请求体中放入参数
          let data = undefined;
          for (const key in this.dataRequestQuery) {
            const val = this.dataRequestQuery[key];
            if (val) {
              if (!data) data = {};
              data[key] = val;
            }
          }

          this.$axios
            .post(url, data, {
              // 请求地址 中
              params: {
                pageNum: pageNum || this.dataCurrentPage,
                pageSize: pageSize || this.dataPageSize,
              },
            })
            .then((response) => {
              let d = response.data.data;
              this.dataTabel = d.list;
              this.dataTotal = d.total;

              this.refreshColumnData(d.columnData);

              this.isShow = true;
            });
        }
      } else {
        console.warn("requestUrl 参数不能为 null");
      }
    },
    // 刷新表头显示数据
    refreshColumnData(columnData) {
      // 表头只赋值一次
      if (this.dataColumnData.length > 0) return;

      var d;

      // 如果前端有写表头，则加载后端表头前面
      if (this.columnData.length == 0) {
        d = columnData;
      } else {
        d = this.columnData.concat(columnData);
      }

      // 把操作列拼接到最后一列
      this.dataColumnData = d.concat(this.lastColumnData);
      this.dataDropColumn = this.dataColumnData.concat([]);
    },
    // 排序回调
    sortChange({ column, prop, order }) {
      // column : 列的数据
      // prop : 排序字段参数名
      // order : 排序方式 （ascending:升序;descending:降序;null:无）

      // 前端排序
      // const sort = {
      //   ascending: (a, b) => {
      //     a[prop] = this.getString(a[prop]);
      //     b[prop] = this.getString(b[prop]);
      //     return a[prop].localeCompare(b[prop] || "", 'zh-CN');
      //   },
      //   descending: (a, b) => {
      //     a[prop] = this.getString(a[prop]);
      //     b[prop] = this.getString(b[prop]);
      //     return b[prop].localeCompare(a[prop] || "", 'zh-CN')
      //   },
      // };
      // this.dataTabel.sort(sort[order]);
      // 前端排序

      // 后端排序
      let s = {
        ascending: "asc",
        descending: "desc",
      };

      let value = {
        orderType: s[order] || undefined,
        orderField: order ? prop : undefined,
      };

      this.setDataRequestQuery(value);
    },
    // 更新请求参数
    setDataRequestQuery(value) {
      let q = this.dataRequestQuery;
      for (const key in value) {
        q[key] = value[key];
      }
      this.requestData(q);
      this.$emit("update:requestQuery", q);
      this.dataRequestQuery = q;
    },
    // 格式化字符串
    getString(str) {
      if (str != null && str != undefined && str.toString) {
        return str.toString();
      } else {
        return str || "";
      }
    },
    // 当某一行被点击时会触发该事件
    rowClick(row, column, event) {
      if (this.selectionType == "radio") {
        if (this.dataRadioId == row.ROW_ID) {
          this.dataRadioId = "";
          row = {};
        } else {
          this.dataRadioId = row.ROW_ID;
        }
        this.$emit("radio-change", row);
      }
    },
    // 多选的选中行改变回调
    selectionChange(selection) {
      this.dataSelection = selection;
      // 将多选中的数据抛出
      this.$emit("selection-change", selection);
    },
    // 当表格的筛选条件发生变化的时候会触发该事件，
    // 参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。
    filterChange(filters) {
      let value = {};
      for (const key in filters) {
        value[key] = filters[key].length > 0 ? filters[key] : undefined;
      }
      // 每次筛选时，都默认将页面改为第一页，避免数据过少时，显示没有数据
      this.currentChange(1, false);
      this.setDataRequestQuery(value);
    },
    // 行拖拽
    rowDrop() {
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      const _this = this;
      Sortablejs.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.dataTabel.splice(oldIndex, 1)[0];
          _this.dataTabel.splice(newIndex, 0, currRow);
        },
      });
    },
    // 列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector(".el-table__header-wrapper tr");
      this.sortablejs = Sortablejs.create(wrapperTr, {
        animation: 180,
        delay: 0,
        handle: ".allowDrag",
        onEnd: (evt) => {
          // 因为序号列和单多选列不在数组中，所以需要进行偏移计算
          const offset = this.dragColumnOffset;
          evt.oldIndex -= offset;
          evt.newIndex -= offset;
          // 换列
          const oldItem = this.dataDropColumn[evt.oldIndex];
          this.dataDropColumn.splice(evt.oldIndex, 1);
          this.dataDropColumn.splice(evt.newIndex, 0, oldItem);
        },
      });
    },
    // current-page 改变时会触发
    currentChange(val, isRequest = true) {
      this.dataCurrentPage = val;
      if (isRequest) {
        this.requestData({ pageNum: val });
      }
      // 最后通知父节点页面改变
      this.$emit("update:current-page", val);
    },
    // pageSize 改变时会触发
    sizeChange(val) {
      this.dataPageSize = val;
      this.requestData({});
      this.$emit("update:size-change", val);
    },
  },
  computed: {
    // 计算是否使用排序功能
    dataSortable() {
      return function(item) {
        let b = false;
        if (item.template == "") {
          switch (item.sortable) {
            case true:
              return true;
            case false:
              return false;
            default:
              return this.sortable;
          }
        } else {
          return false;
        }
      };
    },
    // 计算每列的最小宽度
    dataColumnMinWidth() {
      return function(item) {
        let mw = 0;
        if (this.dataSortable(item)) {
          // 如果使用排序功能
          mw += 24;
        }

        if (item.filters && item.filters.length > 0) {
          mw += 12;
        }
        if (item.label) {
          mw += item.label.toString().length * 14;
        }
        return mw;
      };
    },
    // 计算拖拽列的偏移差
    dragColumnOffset() {
      let o = 0;
      if (this.showIndex) {
        o++;
      }
      if (this.selectionType != "") {
        o++;
      }
      return o;
    },
  },
  watch: {
    requestQuery: {
      deep: true,
      handler(val, oldVal) {
        let q = this.dataRequestQuery;
        for (const key in val) {
          q[key] = val[key] ? val[key] : undefined;
        }
        
        this.setDataRequestQuery(q);
      },
    },
  },
  // 注册组件
  components: {
    // 代理组件
    componentProxy: {
      props: {
        html: {
          default: "",
        },
        scope: {
          default() {
            return {};
          },
        },
      },
      template: ``,
      created() {
        this.$options.template = this.html;
      },
    },
  },
};
</script>
