<template>
  <el-dialog :visible.sync="visible" :title="`品牌${title}`" width="700px" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <el-container>
      <el-main>
        <el-form :model="formData" label-width="120px" align="left" :rules="rules">
          <el-row>
            <el-col :span="24">
              <v-input label="品牌名称" prop="name" required v-model="formData.name" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <v-slider label="排序" prop="orderIndex" v-model="formData.orderIndex" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <v-textarea label="备注" prop="remark" v-model="formData.remark" />
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
export default {
  data() {
    return {
      visible: false,
      title: "添加",
      rules: {},
      formData: {},
    };
  },
  methods: {
    // 显示对话框
    show(r) {
      this.$utils.showEditDialog.call(this, r);
    },
    // 关闭对话框
    close() {
      this.visible = false;
    },
    // 保存
    save() {
      this.$utils.save.call(this, "api/sale/commodityBrand/save");
    },
  },
};
</script>