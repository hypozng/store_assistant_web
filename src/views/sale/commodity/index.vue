<template>
  <div>
    <edit-dialog ref="editDialog" @sucess="loadData" />
    <v-table ref="table" :url="url" :columns="columns" :search="search" :buttons="buttons" :tools="tools" />
  </div>
</template>

<script>
import { Message } from "element-ui";
import editDialog from "./editDialog";
export default {
  components: {
    editDialog
  },
  data() {
    return {
      url: "api/sale/commodity/page",
      columns: [
        { key: "name", label: "商品名称", align: "left", width: "300" },
        { key: "price", label: "价格", align: "center", width: "120" },
        { key: "brandId", label: "品牌", align: "center", width: "120" },
        { key: "categoryId", label: "种类", align: "center", width: "200" }
      ],
      search: [
        { key: "name", label: "商品名称", searchType: "input" },
        { key: "price", label: "价格", searchType: "input" }
      ],
      buttons: [
        { label: "详情", type: "info", click: this.handleRowDetailClick },
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
    // 处理添加按钮click事件
    handleAddClick() {
      this.$refs.editDialog.show();
    },
    // 处理表格数据编辑按钮click事件
    handleRowEditClick(r) {
      this.$refs.editDialog.show(r);
    },
    // 处理表格数据详情按钮
    handleRowDetailClick() {},
    // 处理表格数据删除按钮delete事件
    handleRowDeleteClick() {
      this.$confirm("确定删除这条数据?")
        .then(() => {
          Message.success("删除成功");
          this.loadData();
        })
        .catch(() => {});
    },
    // 加载数据
    loadData() {
      this.$refs.table.loadData();
    }
  }
};
</script>