<template>
  <div>
    <edit-dialog ref="editDialog" @success="loadData" />
    <v-table :url="url" :columns="columns" :search="search" :buttons="buttons" :tools="tools" />
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
      url: "api/sys/user/page",
      columns: [
        { key: "user", label: "用户名", width: "200" },
        { key: "name", label: "姓名", width: "150" },
        { key: "nickname", label: "昵称", width: "150" },
        { key: "phone", label: "电话", width: "180", align: "center" },
        { key: "birthday", label: "生日", width: "180", align: "center", render: "date" },
        { key: "address", label: "地址", width: "300" },
        { key: "signature", label: "签名", minWidth: "300" }
      ],
      search: [
        { key: "user", label: "用户名" },
        { key: "name", label: "姓名" },
        { key: "nickname", label: "昵称" },
        { key: "phone", label: "电话" },
        { key: "address", label: "地址" },
        { key: "signature", label: "签名" }
      ],
      buttons: [
        { type: "primary", label: "编辑", click: this.handleEditClick },
        { type: "danger", label: "删除", click: this.handleDeleteClick }
      ],
      tools: [{ type: "success", label: "添加", click: this.handleAddClick }]
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
      this.$utils.delete("api/sys/user/" + r.id);
    }
  }
};
</script>
