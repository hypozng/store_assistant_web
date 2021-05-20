<template>
  <el-dialog :visible.sync="visible" :title="`商品${title}`" width="700px" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <el-container>
      <el-main>
        <el-form ref="form" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="formData.name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="图片" prop="image">
                <el-input v-model="formData.image" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="价格" prop="price">
                <el-input v-model="formData.price" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="编码" prop="code">
                <el-input v-model="formData.code" />
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
import { Message } from "element-ui";
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      visible: false,
      title: "添加",
      formData: {}
    };
  },
  methods: {
    // 显示对话框
    show(r) {
      if (r) {
        this.title = "编辑";
        this.formData = JSON.parse(JSON.stringify(r));
      } else {
        this.title = "添加";
        this.formData = {};
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
    }
  }
};
</script>