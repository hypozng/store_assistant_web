<template>
  <el-dialog :visible.sync="visible" title="商品详情" width="1000px" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <el-form ref="form" :model="formData" size="medium" label-width="120px" align="left">
      <el-row>
        <el-col :span="12">
          <ff-input label="名称" prop="name" v-model="formData.name" readonly />
          <ff-select label="种类" prop="categoryId" v-model="formData.categoryId" url="api/sale/commodityCategory" readonly />
          <el-row>
            <el-col :span="12">
              <ff-select label="品牌" prop="brandId" v-model="formData.brandId" url="api/sale/commodityBrand" readonly />
            </el-col>
            <el-col :span="12">
              <ff-input v-model="formData.model" label="型号" prop="model" readonly />
            </el-col>
          </el-row>
          <ff-input label="货号" prop="code" v-model="formData.code" readonly />
        </el-col>
        <el-col :span="12">
          <ff-image label="图片" prop="image" v-model="formData.image" disabled />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <ff-input label="SKU" prop="sku" v-model="formData.sku" readonly />
        </el-col>
        <el-col :span="12">
          <ff-input label="备用SKU" prop="spareSku" v-model="formData.spareSku" readonly />
        </el-col>
      </el-row>
      <el-row @click.native="handlePriceClick">
        <el-col :span="12">
          <ff-money label="销售价格" prop="salePrice" v-model="formData.salePrice" readonly />
        </el-col>
        <el-col :span="12">
          <ff-money label="采购价格" prop="purchasePrice" v-model="formData.purchasePrice" readonly />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <ff-input label="商品URL" prop="url" v-model="formData.url" readonly @click.native="handleUrlClick(formData.url)" class="url" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <ff-textarea label="详细信息" prop="detail" v-model="formData.detail" readonly />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <ff-textarea label="备注" prop="remark" v-model="formData.remark" readonly />
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button plain @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      id: 0,
      visible: false,
      formData: {}
    };
  },
  methods: {
    // 显示弹窗
    show(id) {
      this.visible = true;
      this.id = id;
      this.loadData();
    },
    // 关闭窗口
    close() {
      this.visible = false;
    },
    handleUrlClick(url) {
      window.open(url);
    },
    // 加载页面数据
    async loadData() {
      let res = await fetch.get("api/sale/commodity/" + this.id);
      this.formData = res.data;
    }
  }
};
</script>
<style scoped>
.url {
  color: blue;
  cursor: pointer;
}
</style>