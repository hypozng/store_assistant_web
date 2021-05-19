<template>
  <div>
    <edit-dialog ref="editDialog" @refresh="loadData" />
    <v-table ref="table" url="api/sys/role/page" :columns="columns" :search="search" :buttons="buttons" :tools="tools" />
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
      columns: [
        { key: "name", label: "角色名称", align: "left" },
        { key: "code", label: "角色编码", align: "left" },
        { key: "disabled", label: "禁用", align: "center" },
        { key: "createUserName", label: "创建人", align: "left" },
        { key: "createTime", label: "创建时间", align: "center", render: "time" }
      ],
      search: [
        { key: "name", label: "角色名称", searchType: "input" },
        { key: "code", label: "角色编码", searchType: "input" },
        { key: "remark", label: "备注", searchType: "input" }
      ],
      buttons: [
        { label: "编辑", type: "primary", click: this.editMethod },
        { label: "删除", type: "danger", click: this.deleteMethod }
      ],
      tools: [{ label: "添加", type: "success", click: this.addMethod }]
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 加载数据
    loadData() {
      this.$refs.table.loadData();
    },
    // 添加方法
    addMethod() {
      this.$refs.editDialog.show();
    },
    // 编辑
    editMethod() {
      Message.info("编辑");
    },
    // 删除
    deleteMethod() {
      Message.info("删除");
    }
  }
};
</script>
<style>
</style>