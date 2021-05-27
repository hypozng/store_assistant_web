<template>
  <el-dialog :visible.sync="visible" :title="`商品${title}`" width="1000px" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <el-form ref="form" :model="formData" size="medium" label-width="120px" align="left">
      <el-row>
        <el-col :span="24">
          <v-input v-model="formData.name" label="商品名称" prop="name" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <v-select label="种类" prop="categoryId" v-model="formData.categoryId" url="api/sale/commodityCategory" />
        </el-col>
        <el-col :span="12">
          <v-select label="品牌" prop="brandId" v-model="formData.brandId" url="api/sale/commodityBrand" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <v-input v-model="formData.model" label="型号" prop="model" />
        </el-col>
        <el-col :span="12">
          <v-input v-model="formData.code" label="编码" prop="code" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <v-money label="销售价格" prop="salePrice" v-model="formData.salePrice" :disabled="mode!='add'" />
        </el-col>
        <el-col :span="12">
          <v-money label="采购价格" prop="purchasePrice" v-model="formData.purchasePrice" :disabled="mode!='add'" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <v-textarea label="备注" prop="remark" v-model="formData.remark" />
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button plain @click="close">关闭</el-button>
      <el-button type="primary" plain @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      title: "添加",
      mode: "add",
      formData: {},
      brandOptions: [],
      categoryOptions: [],
    };
  },
  methods: {
    // 显示对话框
    show(r) {
      this.mode = r ? "edit" : "add";
      this.$utils.showEditDialog.call(this, r, { salePrice: 0, purchasePrice: 0 });
    },
    // 关闭对话框
    close() {
      this.visible = false;
    },
    // 保存
    save() {
      this.$utils.save.call(this, "api/sale/commodity/save");
    },
  },
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>