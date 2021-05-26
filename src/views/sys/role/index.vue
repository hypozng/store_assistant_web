<template>
  <div>
    <edit-dialog ref="editDialog" @success="loadData" />
    <v-table ref="table" :url="url" :columns="columns" :search="search" :buttons="buttons" :tools="tools" />
  </div>
</template>
<script>
import editDialog from "./editDialog";
export default {
  components: {
    editDialog
  },
  data() {
    return {
      url: "api/sys/role/page",
      columns: [
        { key: "name", label: "角色名称", width: "150" },
        { key: "code", label: "角色编码", width: "150" },
        { key: "disabled", label: "禁用", width: "100", align: "center", render: "disable" },
        { key: "remark", label: "备注", minWidth: "300" }
      ],
      search: [
        { key: "name", label: "角色名称", searchType: "input" },
        { key: "code", label: "角色编码", searchType: "input" },
        { key: "remark", label: "备注", searchType: "input" }
      ],
      buttons: [
        { label: "编辑", type: "primary", click: this.handleEditClick },
        { label: "删除", type: "danger", click: this.handleDeleteClick }
      ],
      tools: [{ label: "添加", type: "success", click: this.handleAddClick }]
    };
  },
  methods: {
    // 处理添加按钮点击事件
    handleAddClick() {
      this.$refs.editDialog.show();
    },
    // 处理编辑按钮点击事件
    handleEditClick(r) {
      this.$refs.editDialog.show(r);
    },
    // 处理删除按钮点击事件
    handleDeleteClick(r) {
      this.$utils.delete.call(this, "api/sys/role/" + r.id);
    },
    // 加载数据
    loadData() {
      this.$refs.table.loadData();
    }
  }
};
</script>
<style>
</style>