<template>
  <el-dialog :visible.sync="visible" :title="`商品${title}`" width="1000px" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <el-container>
      <el-main>
        <el-form ref="form" :model="formData" label-width="120px" align="left">
          <el-row>
            <el-col :span="24">
              <v-input v-model="formData.name" label="商品名称" prop="name" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="种类" prop="categoryId">
                <!-- <el-cascader v-model="formData.categoryId" :options="categoryOptions" :show-all-levels="false" :props="{ checkStrictly: true, value: 'id', label: 'name' }" /> -->
                <el-select v-model="formData.categoryId">
                  <el-option v-for="category in categoryOptions" :key="category.id" :label="category.name" :value="category.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品牌" prop="brandId" style="width: 100%">
                <el-select v-model="formData.brandId">
                  <el-option v-for="brand in brandOptions" :key="brand.id" :label="brand.name" :value="brand.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <v-input v-model="formData.model" label="型号" prop="model" />
            </el-col>
            <el-col :span="12">
              <el-form-item label="价格" prop="price">
                <el-input-number v-model="formData.price" :precision="2" :step="0.1" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <v-input v-model="formData.code" label="编码" prop="code" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" type="textarea" rows="3" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
    <span slot="footer">
      <el-button plain @click="close">关闭</el-button>
      <el-button type="primary" plain @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Message } from "element-ui";
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      visible: false,
      title: "添加",
      formData: {},
      brandOptions: [],
      categoryOptions: []
    };
  },
  mounted() {
    this.loadBrandOptions();
    this.loadCategoryOptions();
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
          price: 0
        };
      }
      this.visible = true;
    },
    // 关闭对话框
    close() {
      this.visible = false;
    },
    // 保存
    save() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return;
        }
        fetch.post("api/sale/commodity/save", this.formData).then(() => {
          this.close();
          Message.success("保存成功");
          this.$emit("success");
        });
      });
    },
    // 加载品牌数据
    loadBrandOptions() {
      fetch.get("api/sale/commodityBrand").then(res => {
        this.brandOptions = res.data;
      });
    },
    // 加载种类数据
    loadCategoryOptions() {
      fetch.get("api/sale/commodityCategory").then(res => {
        this.categoryOptions = res.data;
      });
    }
  }
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>