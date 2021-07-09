<template>
  <el-dialog :visible.sync="visible" :title="`角色管理${title}`" width="500px" :append-to-body="false" :modal-append-to-body="false" :close-on-click-modal="false">
    <el-container>
      <el-main>
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="24">
              <ff-input label="角色名称" prop="name" v-model="formData.name" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <ff-input label="角色编码" prop="code" v-model="formData.code" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="禁用状态">
                <el-select v-model="formData.disabled" style="width:100%">
                  <el-option :value="0" label="启用" />
                  <el-option :value="1" label="禁用" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <ff-textarea label="备注" prop="remark" v-model="formData.remark" />
            </el-col>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
    <span slot="footer">
      <el-button plain @click="close">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      rules: {},
      formData: {},
      title: "",
    };
  },
  methods: {
    // 显示对话框
    show(r) {
      this.$utils.showEditDialog.call(this, r, { disabled: 0 });
    },
    // 关闭对话框
    close() {
      this.visible = false;
    },
    // 保存数据
    save() {
      this.$utils.save.call(this, "api/sys/role/save");
    },
  },
};
</script>