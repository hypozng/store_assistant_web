<template>
  <div>
    <el-table :data="tableData">
      <el-table-column v-for="column in columns" :key="column.key" :prop="column.key" :label="column.label" :width="column.width"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import fetch from "@/utils/fetch.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      tableData: [],
      params: {},
    };
  },
  methods: {
    // 加载数据
    loadData(url, params) {
      this.params = params;
      fetch.post(url, params).then((res) => {
        if (res.code != 0) {
          Message.error("" + res.message);
          return;
        }
        this.tableData = res.data.content;
      });
    },
  },
  props: {
    // 列的配置数据
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    // 查询的配置数据
    search: {
      type: Array,
      default() {
        return [];
      },
    },
    // 按钮的配置数据
    buttons: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>