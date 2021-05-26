import global from "./global.js";
import fetch from "./fetch.js";
import {
  Message
} from "element-ui";

const utils = {

  // 调用函数
  call(fn, arg) {
    if (!fn || typeof fn !== "function") {
      return null;
    }
    return fn.call(this, arg);
  },

  // 验证表单数据
  validate(field) {
    field = field || "form";
    if (!this.$refs || !this.$refs[field] || typeof this.$refs[field].validate !== "function") {
      return Promise.resolve(null);
    }
    return new Promise((resolve, reject) => {
      this.$refs[field].validate(valid => {
        if (!valid) {
          reject(false);
          return;
        }
        resolve(true);
      });
    });
  },

  //  保存表单数据
  save(url, params) {
    if (!params) {
      params = this.formData;
    }
    utils.validate.call(this).then(() => {
      fetch.post(url, params).then(res => {
        Message.success("操作成功");
        if (typeof this.close === "function") {
          this.close();
        }
        if (typeof this.$emit === "function") {
          this.$emit("success");
        }
        return res;
      });
    });
  },

  // 删除操作
  delete(url) {
    return global.vue.$confirm("确定删除这条数据？").then(() => {
      return fetch.delete(url).then(res => {
        Message.success("删除成功");
        if (typeof this.loadData === "function") {
          this.loadData();
        }
        return res;
      });
    }, console.error);
  },

  // 显示编辑对话框
  showEditDialog(r, initData) {
    if (r) {
      this.title = "编辑";
      this.formData = JSON.parse(JSON.stringify(r));
    } else {
      this.title = "添加";
      this.$nextTick(() => {
        this.$refs.form.resetFields();
        this.formData = initData || {};
      });
    }
    this.visible = true;
  }
};

export default utils;