<template>
  <el-dialog :visible.sync="visible" title="角色" width="500px" :append-to-body="false" :modal-append-to-body="false" :close-on-click-modal="false">
    <el-container>
      <el-main>
        <el-form :model="formData" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色名称" required>
                <el-input v-model="formData.name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色编码" required>
                <el-input v-model="formData.code" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="禁用状态" required>
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
      <el-button type="primary" plain @click="handleSaveClick">保存</el-button>
      <el-button type="warning" plain @click="handleCancelClick">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      formData: {},
      title: ""
    };
  },
  methods: {
    // 显示对话框
    show(r) {
      if (r) {
        this.title = "编辑";
        this.formData = JSON.parse(JSON.stringify(r));
      } else {
        this.title = "添加";
        this.formData = {
          disabled: 0
        };
      }
      this.visible = true;
    },
    // 关闭对话框
    close() {
      this.visible = false;
    },
    handleSaveClick() {},
    handleCancelClick() {}
  }
};
</script>