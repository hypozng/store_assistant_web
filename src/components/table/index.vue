<template>
  <div class="v-table">
    <div class="search">
      <div v-for="(param, index) in search" :key="param.key" class="search-input">
        <div class="search-input-label">{{ param.label }}</div>
        <div class="search-input-content">
          <el-select v-if="param.type=='select'" :value="getSearchValue(param.key)" @input="handleSearchInput($event, param.key)" size="small" clearable>
            <el-option
              v-for="option in getParamData(param, [])"
              :key="option[param.props&&param.props.value||'id']"
              :label="option[param.props&&param.props.label||'name']"
              :value="option[param.props&&param.props.value||'id']"
            />
          </el-select>
          <el-input v-else :value="searchParameter.params[param.key]" @input="handleSearchInput($event, param.key)" size="small" clearable />
        </div>
        <template v-if="index == search.length - 1">
          <el-button type="primary" size="small" plain @click="handleSearchClick" style="margin-left: 10px">搜索</el-button>
          <el-button type="warning" size="small" plain @click="handleResetClick">重置</el-button>
        </template>
      </div>
    </div>
    <div v-if="tools && tools.length" class="tools">
      <el-button
        v-for="(tool, index) in tools"
        :key="index"
        v-show="!logic.getConfigProperty(tool.hidden)"
        :disabled="logic.getConfigProperty(tool.disabled)"
        :type="tool.type"
        size="small"
        plain
        @click="tool.click"
      >{{ tool.label }}</el-button>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        class="table"
        style="width: 100%"
        header-row-class-name="table-header-row"
        cell-class-name="table-cell"
        border
        stripe
        size="small"
      >
        <el-table-column type="index" align="center" />
        <el-table-column
          v-for="column in columns"
          :key="column.key"
          :prop="column.key"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :sortable="column.sortable"
          :align="column.align"
        >
          <template slot-scope="scope">{{ logic.getCellRender(scope.row[column.key], scope.row, column) }}</template>
        </el-table-column>
        <el-table-column v-if="buttons && buttons.length" fixed="right" label="操作" align="center" :width="operationColumnWidth">
          <template slot-scope="scope">
            <el-button
              v-for="(button, index) in buttons"
              :key="index"
              v-show="!logic.getConfigProperty(button.hidden, scope.row)"
              :disabled="logic.getConfigProperty(button.disabled, scope.row)"
              :type="button.type"
              size="mini"
              plain
              @click="button.click(scope.row)"
            >{{ button.label }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import fetch from "@/utils/fetch.js";
import logic from "./logic.js";
export default {
  data() {
    return {
      logic,
      cache: {},
      tableData: [],
      searchParameter: {
        page: 1,
        size: 10,
        sort: "id",
        params: {}
      }
    };
  },
  mounted() {
    if (this.autoLoad) {
      this.loadData();
    }
  },
  methods: {
    // 处理搜索按钮click事件
    handleSearchClick() {
      this.loadData();
    },
    // 处理充值按钮click事件
    handleResetClick() {
      this.searchParameter.params = {};
    },
    // 处理搜索条件input事件
    handleSearchInput(value, key) {
      this.$set(this.searchParameter.params, key, value);
    },
    // 获取搜索栏搜索条件的值
    getSearchValue(key) {
      return this.searchParameter.params[key];
    },
    // 获取搜索条件数据
    getParamData(param, defaultValue) {
      if (param.data) {
        return param.data;
      }
      if (this.cache[param.key]) {
        return this.cache[param.key];
      }
      if (param.url) {
        fetch.get(param.url).then(res => {
          this.$set(this.cache, param.key, res.data);
        });
      }
      return defaultValue;
    },
    // 加载数据
    loadData() {
      let loading = this.$loading({
        lock: true,
        text: "正在加载",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      fetch
        .post(this.url, this.searchParameter)
        .then(res => (this.tableData = res.data.content))
        .finally(() => {
          loading.close();
        });
    }
  },
  props: {
    // URL
    url: {
      type: String,
      require: true
    },
    // 自动加载数据
    autoLoad: {
      type: Boolean,
      default: true
    },
    // 查询条件
    search: {
      type: Array,
      default() {
        return [];
      }
    },
    // 表格的列
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    // 工具栏按钮
    tools: {
      type: Array,
      default() {
        return [];
      }
    },
    // 操作列按钮
    buttons: {
      type: Array,
      default() {
        return [];
      }
    },
    // 操作列宽度
    operationColumnWidth: {
      type: [String, Number],
      default: 250
    }
  }
};
</script>
<style>
.v-table {
  padding: 10px;
}
.v-table .search {
  text-align: left;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.v-table .search-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
}

.v-table .search-input-label {
  min-width: 80px;
  font-size: 14px;
  text-align: right;
}

.v-table .search-input-content {
  width: 200px;
  margin-left: 5px;
}

.v-table .tools {
  text-align: left;
  margin-top: 10px;
}

.v-table .table-header-row,
.v-table tr.table-header-row,
.v-table .table-header-row th {
  background-color: #f4fafd;
  font-weight: normal;
  text-align: center;
  color: black;
}

.v-table .content {
  margin-top: 10px;
}
</style>