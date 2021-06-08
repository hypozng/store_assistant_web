<template>
  <div>
    <edit-dialog ref="editDialog" @success="loadData" />
    <value-list-dialog ref="valueListDialog" @success="loadData" />
    <v-table ref="table" :url="url" :columns="columns" :search="search" :buttons="buttons" :tools="tools" />
  </div>
</template>
<script>
import editDialog from "./editDialog";
import valueListDialog from "./valueListDialog.vue";
export default {
  components: {
    editDialog,
    valueListDialog
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
        { label: "值列表", type: "primary", click: this.handleValueClick },
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
    handleValueClick(r) {
      this.$refs.valueListDialog.show(r.groupKey);
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
