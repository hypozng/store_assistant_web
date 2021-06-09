<template>
  <div>
    <edit-dialog ref="editDialog" @success="loadData"/>
    <children-dialog ref="childrenDialog" @success="loadData" />
    <v-table ref="table" :url="url" :columns="columns" :search="search" :buttons="buttons" :tools="tools" />
  </div>
</template>
<script>
import editDialog from "./editDialog";
import childrenDialog from "./childrenDialog.vue";
export default {
  components: {
    editDialog,
    childrenDialog
  },
  data() {
    return {
      url: "api/sys/dictionary/page",
      columns: [
        { key: "groupKey", label: "字典分组", width: "150", align: "center" },
        { key: "name", label: "名称", width: "150" },
        { key: "createUserName", label: "创建人", width: "100" },
        { key: "createTime", label: "创建时间", width: "150", align: "center", render: "time" },
        { key: "updateUserName", label: "修改人", width: "100" },
        { key: "updateTime", label: "修改时间", width: "150", align: "center", render: "time" },
        { key: "remark", label: "备注", minWidth: "300" }
      ],
      search: [
        { key: "groupKey", label: "字典分组" },
        { key: "name", label: "字典名称" }
      ],
      buttons: [
        { label: "值列表", type: "primary", click: this.handleChildrenClick },
        { label: "编辑", type: "primary", click: this.handleEditClick },
        { label: "删除", type: "danger", click: this.handleDeleteClick }
      ],
      tools: [{ label: "新增", type: "success", click: this.handleAddClick }]
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    handleAddClick() {
      this.$refs.editDialog.show();
    },
    handleEditClick(r) {
      this.$refs.editDialog.show(r);
    },
    handleChildrenClick(r) {
      this.$refs.childrenDialog.show(r);
    },
    handleDeleteClick(r) {
      this.$utils.delete.call(this, "api/sys/dictionary/" + r.id);
    },
    loadData() {
      this.$refs.table.loadData();
    }
  }
};
</script>
