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
      url: "api/sale/customer/page",
      columns: [
        { key: "name", label: "姓名", width: "150" },
        { key: "gender", label: "性别", width: "100", align: "center" },
        { key: "birthday", label: "出生日期", width: "180", align: "center", render: "date" },
        { key: "phone", label: "电话", width: "180", align: "center" },
        { key: "idcard", label: "身份证号", width: "200", align: "center" },
        { key: "address", label: "住址", minWidth: "300" }
      ],
      search: [
        { key: "name", label: "姓名" },
        { key: "gender", label: "性别", type: "select", dictionaryKey: "gender" },
        { key: "phone", label: "电话" },
        { key: "idcard", label: "身份证号" },
        { key: "address", label: "住址" }
      ],
      buttons: [
        { label: "编辑", type: "primary", click: this.handleEditClick },
        { label: "删除", type: "danger", click: this.handleDeleteClick }
      ],
      tools: [{ label: "添加", type: "success", click: this.handleAddClick }]
    };
  },
  methods: {
    handleAddClick() {
      this.$refs.editDialog.show();
    },
    handleEditClick(r) {
      this.$refs.editDialog.show(r);
    },
    handleDeleteClick(r) {
      this.$utils.delete.call(this, "api/sale/customer/" + r.id);
    },
    loadData() {
      this.$refs.table.loadData();
    }
  }
};
</script>