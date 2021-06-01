<template>
  <el-upload
    action="api/sys/attachment/upload"
    :show-file-list="false"
    :on-success="handleSuccess"
    :before-upload="handleBeforeUpload"
    v-loading="loading"
    :disabled="disabled"
  >
    <slot :data="result"></slot>
  </el-upload>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      result: {},
      loading: false
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 处理上传之前的事件
    handleBeforeUpload() {},
    // 处理上传成功事件
    handleSuccess(res) {
      let data = (res && res.data) || {};
      if (data.id) {
        data.url = "api/sys/attachment/download?id=" + data.id;
      }
      this.result = data;
      this.$emit("success", data);
    },
    // 加载服务器文件数据
    loadData() {
      if (!this.attachmentId) {
        this.result = {};
        return;
      }
      this.loading = true;
      fetch
        .get("api/sys/attachment/" + this.attachmentId)
        .then(this.handleSuccess)
        .finally(() => {
          this.loading = false;
        });
    }
  },
  watch: {
    attachmentId() {
      this.loadData();
    }
  },
  props: {
    attachmentId: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style>
.el-upload {
  width: 100%;
  height: 100%;
}
</style>