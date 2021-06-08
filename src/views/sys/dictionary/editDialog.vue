<template>
  <el-dialog :title="`字典信息${title}`" :visible.sync="visible" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false" width="500px">
    <el-form ref="form" :model="formData" size="medium" label-width="120px">
      <v-input label="分组" prop="groupKey" v-model="formData.groupKey" />
      <v-input label="名称" prop="name" v-model="formData.name" />
      <v-textarea label="值" prop="value" v-model="formData.value" />
      <v-textarea label="备注" prop="remark" v-model="formData.remark" />
    </el-form>
    <span slot="footer">
      <el-button plain size="medium" @click="close">关闭</el-button>
      <el-button type="primary" size="medium" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      title: "添加",
      formData: {}
    };
  },
  methods: {
    show(r) {
      this.$utils.showEditDialog.call(this, r);
    },
    close() {
      this.visible = false;
    },
    save() {
      this.$utils.save.call(this, "api/sys/dictionary/save");
    }
  }
};
</script>