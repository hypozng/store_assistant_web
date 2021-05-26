<template>
  <el-dialog :visible.sync="visible" :title="`品牌${title}`" width="700px" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <el-container>
      <el-main>
        <el-form :model="formData" label-width="120px" align="left" :rules="rules">
          <el-row>
            <el-col :span="24">
              <el-form-item label="品牌名称" prop="name" required>
                <el-input v-model="formData.name" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label="图标" prop="icon">
                <el-input v-model="formData.icon" />
              </el-form-item>
            </el-col>
          </el-row>-->
          <el-row>
            <el-col :span="24">
              <el-form-item label="排序" prop="orderIndex">
                <el-slider v-model="formData.orderIndex" />
              </el-form-item>
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
export default {
  data() {
    return {
      visible: false,
      title: "添加",
      rules: {
        name: [
          {
            required: true,
            message: "请输入品牌名称",
            trigger: ["blur", "change"],
          },
        ],
      },
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