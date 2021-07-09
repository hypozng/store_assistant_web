<template>
  <el-dialog :visible.sync="visible" :title="title+'客户资料'" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <el-form ref="form" :model="formData" label-width="120px" size="medium" align="left">
      <el-row>
        <el-col :span="12">
          <ff-input label="姓名" prop="name" v-model="formData.name" />
          <ff-select label="性别" prop="gender" v-model="formData.gender" dictionaryKey="gender" />
          <ff-input label="电话" prop="phone" v-model="formData.phone" />
          <ff-date-picker label="出生日期" prop="birthday" v-model="formData.birthday" />
        </el-col>
        <el-col :span="12">
          <ff-image label="头像" prop="photo" v-model="formData.photo" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <ff-input label="身份证号" prop="idcard" v-model="formData.idcard" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <ff-input label="住址" prop="address" v-model="formData.address" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <ff-textarea label="备注" prop="remark" v-model="formData.remark" />
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
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
      title: "编辑",
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
      this.$utils.save.call(this, "api/sale/customer/save");
    }
  }
};
</script>