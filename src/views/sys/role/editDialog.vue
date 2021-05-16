<template>
  <el-dialog :visible.sync="visible" title="角色" v-dialogDrag :append-to-body="false" :modal-append-to-body="false" :close-on-click-modal="false">
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
        </el-form>
      </el-main>
    </el-container>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      formData: {},
    };
  },
  methods: {
    // 显示对话框
    show(r) {
      this.visible = true;
    },
    // 关闭对话框
    close() {
      this.visible = false;
    },
  },
};
</script>