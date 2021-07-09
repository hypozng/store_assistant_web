<template>
  <el-dialog :visible.sync="visible" :title="`用户管理`+title" :close-on-click-modal="false" :append-to-boday="false" :modal-append-to-body="false">
    <el-container>
      <el-main>
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="12">
              <ff-input label="姓名" prop="name" v-model="formData.name" />
            </el-col>
            <el-col :span="12">
              <ff-input label="用户名" prop="user" v-model="formData.user" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <ff-input label="电话" prop="phone" v-model="formData.phone" />
            </el-col>
            <el-col :span="12">
              <ff-input label="昵称" prop="nickname" v-model="formData.nickname" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <ff-date-picker label="生日" prop="birthday" v-model="formData.birthday" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <ff-input label="地址" prop="address" v-model="formData.address" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <ff-input label="签名" prop="signature" v-model="formData.signature" />
            </el-col>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
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
      formData: {},
      rules: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"],
          },
        ],
      },
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
    },
  },
};
</script>