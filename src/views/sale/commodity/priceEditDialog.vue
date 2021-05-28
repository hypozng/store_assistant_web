<template>
  <el-dialog :visible.sync="visible" title="调整价格" width="500px" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <el-form ref="form" :model="formData" label-width="120px" size="medium">
      <v-money label="销售价格" prop="salePrice" v-model="formData.salePrice" />
      <v-money label="采购价格" prop="purchasePrice" v-model="formData.purchasePrice" />
      <v-textarea label="备注" prop="remark" v-model="formData.remark" />
    </el-form>
    <span slot="footer">
      <el-button plain @click="close">关闭</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      formData: {}
    };
  },
  methods: {
    // 显示弹窗
    show(r) {
      this.formData = JSON.parse(JSON.stringify(r));
      this.visible = true;
    },
    // 关闭弹窗
    close() {
      this.visible = false;
    },
    // 保存表单数据
    save() {
      this.$utils.save.call(this, "api/sale/commodity/price/modify");
    }
  }
};
</script>