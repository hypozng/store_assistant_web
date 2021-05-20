<template>
  <div>
    <edit-dialog ref="editDialog" @success="loadData" />
    <v-table ref="table" :url="url" :columns="columns" :search="search" :buttons="buttons" :tools="tools" />
  </div>
</template>

<script>
import { Message } from "element-ui";
import fetch from "@/utils/fetch.js";
import editDialog from "./editDialog";
export default {
  components: {
    editDialog
  },
  data() {
    return {
      url: "api/sale/commodityBrand/page",
      columns: [
        { key: "name", label: "品牌名称", align: "left", width: "300" },
        { key: "createTime", label: "创建时间", align: "center", width: "150", render: "time" },
        { key: "remark", label: "备注", align: "left", minWidth: "300" }
      ],
      search: [{ key: "name", label: "品牌名称", searchType: "input" }],
      buttons: [
        { label: "编辑", type: "primary", click: this.handleRowEditClick },
        { label: "删除", type: "danger", click: this.handleRowDeleteClick }
      ],
      tools: [{ label: "添加", type: "success", click: this.handleAddClick }]
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 处理表格数据编辑按钮click事件
    handleRowEditClick(r) {
      this.$refs.editDialog.show(r);
    },
    // 处理表格数据删除按钮click事件
    handleRowDeleteClick(r) {
      this.$confirm("确定删除这条数据？")
        .then(() => {
          fetch.delete("api/sale/commodityBrand/" + r.id).then(() => {
            Message.success("删除成功");
            this.loadData();
          });
        })
        .catch(() => {});
    },
    // 处理添加按钮click事件
    handleAddClick() {
      this.$refs.editDialog.show();
    },
    // 加载数据
    loadData() {
      this.$refs.table.loadData();
    }
  }
};
</script>