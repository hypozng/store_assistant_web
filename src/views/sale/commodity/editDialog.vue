<template>
  <div>
    <price-edit-dialog ref="priceEditDialog" @success="handlePriceDialogSuccess" />
    <el-dialog :visible.sync="visible" :title="`商品${title}`" width="1000px" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
      <el-form ref="form" :model="formData" size="medium" label-width="120px" align="left">
        <el-row>
          <el-col :span="12">
            <ff-input label="名称" prop="name" v-model="formData.name" />
            <ff-select label="种类" prop="categoryId" v-model="formData.categoryId" url="api/sale/commodityCategory" />
            <ff-select label="品牌" prop="brandId" v-model="formData.brandId" url="api/sale/commodityBrand" />
            <ff-input v-model="formData.model" label="型号" prop="model" />
          </el-col>
          <el-col :span="12">
            <ff-image label="图片" prop="image" v-model="formData.image" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ff-input label="货号" prop="code" v-model="formData.code" />
          </el-col>
          <el-col :span="12">
            <ff-input label="SKU" prop="code" v-model="formData.sku" />
          </el-col>
        </el-row>
        <el-row @click.native="handlePriceClick">
          <el-col :span="12">
            <ff-money label="销售价格" prop="salePrice" v-model="formData.salePrice" :disabled="mode!='add'" />
          </el-col>
          <el-col :span="12">
            <ff-money label="采购价格" prop="purchasePrice" v-model="formData.purchasePrice" :disabled="mode!='add'" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ff-textarea label="详细信息" prop="detail" v-model="formData.detail" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ff-textarea label="备注" prop="remark" v-model="formData.remark" />
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
        <el-button plain @click="close">关闭</el-button>
        <el-button type="primary" plain @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import priceEditDialog from "./priceEditDialog";
export default {
  components: {
    priceEditDialog
  },
  data() {
    return {
      visible: false,
      title: "添加",
      mode: "add",
      imageUrl: "",
      formData: {},
      brandOptions: [],
      categoryOptions: []
    };
  },
  methods: {
    // 显示对话框
    show(r) {
      this.mode = r ? "edit" : "add";
      r = r || { salePrice: 0, purchasePrice: 0 };
      this.$utils.showEditDialog.call(this, r);
    },
    // 关闭对话框
    close() {
      this.visible = false;
    },
    // 价格点击事件
    handlePriceClick() {
      if (this.mode == "edit") {
        this.$refs.priceEditDialog.show({
          commodityId: this.formData.id,
          salePrice: this.formData.salePrice,
          purchasePrice: this.formData.purchasePrice
        });
      }
    },
    // 价格调整弹窗成功事件
    handlePriceDialogSuccess(r) {
      if (r) {
        this.formData.salePrice = r.salePrice;
        this.formData.purchasePrice = r.purchasePrice;
        this.$emit("success");
        this.close();
      }
      // console.log("price dialog success", r);
    },
    // 保存
    save() {
      this.$utils.save.call(this, "api/sale/commodity/save");
    }
  }
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>