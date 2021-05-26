<template>
  <el-dialog :visible.sync="visible" :title="`用户管理`+title" :close-on-click-modal="false" :append-to-boday="false" :modal-append-to-body="false">
    <el-container>
      <el-main>
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="用户名" prop="user">
                <el-input v-model="formData.user" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="formData.nickname" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="电话" prop="phone">
                <el-input v-model="formData.phone" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="生日" prop="birthday">
                <el-input v-model="formData.birthday" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="地址" prop="address">
                <el-input v-model="formData.address" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="签名" prop="signature">
                <el-input v-model="formData.signature" />
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
      title: "添加",
      formData: {}
    };
  },
  methods: {
    // 显示窗口
    show(r) {
      this.$utils.showEditDialog.call(this, r);
    },
    // 关闭窗口
    close() {
      this.visible = false;
    },
    // 保存数据
    save() {
      this.$utils.save.call(this, "api/sys/user/save");
    }
  }
};
</script>