<template>
  <el-dialog :visible.sync="visible" :title="`角色管理${title}`" width="500px" :append-to-body="false" :modal-append-to-body="false" :close-on-click-modal="false">
    <el-container>
      <el-main>
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="formData.name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色编码" prop="code">
                <el-input v-model="formData.code" />
              </el-form-item>
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
              <el-form-item label="备注">
                <el-input v-model="formData.remark" type="textarea" rows="3" />
              </el-form-item>
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
      rules: {
        name: {
          required: true,
          message: "请输入角色名称",
          trigger: ["blur", "change"]
        },
        code: {
          required: true,
          message: "请输入角色编码",
          trigger: ["blur", "change"]
        }
      },
      formData: {},
      title: ""
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
    }
  }
};
</script>