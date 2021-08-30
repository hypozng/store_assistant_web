<template>
  <div>
    <div>{{message}}</div>
    <el-button type="primmary" @click="backup">点击开始备份</el-button>
  </div>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      message: ""
    };
  },
  methods: {
    // 加载数据
    async backup() {
      this.messgae = "正在备份";
      await fetch.post("api/sys/backup/");
      this.message = "备份完成";
    }
  }
};
</script>
<style scoped></style>