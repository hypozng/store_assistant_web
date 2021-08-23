import global from "./global.js";
import fetch from "./fetch.js";
import render from "./render.js";
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

  // 渲染
  render(method, val) {
    let fn = render[method];
    return fn ? fn.call(this, val) : val;
  },

  // 将list转换成tree
  list2tree(list, options) {
    if (!list) {
      return list;
    }
    options = options || {};
    options.key = options.key || "id";
    options.parentKey = options.parentKey || "parentId";
    options.children = options.children || "children";
    return list.filter(child => {
      let parent = list.find(item => item[options.key] == child[options.parentKey]);
      if (!parent) {
        return true;
      }
      if (!parent[options.children]) {
        parent[options.children] = [];
      }
      parent[options.children].push(child);
    });
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
  async save(url, params) {
    if (!params) {
      params = this.formData;
    }
    await utils.validate.call(this);
    let res = await fetch.post(url, params);
    Message.success("操作成功");
    if (typeof this.close === "function") {
      this.close();
    }
    // if (typeof this.loadData === "function") {
    //   this.loadData();
    // }
    if (typeof this.$emit === "function") {
      this.$emit("success", res.data);
    }
    return res.data;
  },

  // 删除操作
  async delete(url) {
    try {
      await global.vue.$confirm("确定删除这条数据？");
      let res = await fetch.delete(url);
      Message.success("删除成功");
      if (typeof this.loadData === "function") {
        this.loadData();
      }
      return res;
    } catch (err) {
      console.error(err);
    }
  },

  // 显示编辑对话框
  showEditDialog(r, key) {
    key = key || "id";
    if (r && r[key]) {
      this.title = "编辑";
      this.formData = JSON.parse(JSON.stringify(r));
    } else {
      this.title = "添加";
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.resetFields();
        this.formData = JSON.parse(JSON.stringify(r || {}));
      });
    }
    this.visible = true;
  },

  // 复制文本
  copy(text) {
    let textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    let result = document.execCommand("copy");
    document.body.removeChild(textarea);
    return result;
  },

  // 显示加载进度
  showLoading(promise) {
    if (!promise) {
      return;
    }
    let loading = this.$loading({
      lock: true,
      text: "正在加载",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    return promise.finally(function () {
      loading.close();
    });
  }
};

export default utils;