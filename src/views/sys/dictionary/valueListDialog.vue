<template>
  <el-dialog title="字典值列表" :visible.sync="visible" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <ul class="dictionary-list">
      <li v-for="item in listData" :key="item.id" class="dictionary-list-item">{{item.name}}</li>
    </ul>
    <el-input v-model="groupName" size="small">
      <el-button slot="append" size="small" plain @click="handleAddClick">添加</el-button>
    </el-input>
    <span slot="footer">
      <el-button palin size="medium">关闭</el-button>
      <el-button type="primary" size="medium">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      visible: false,
      groupName: "",
      listData: []
    };
  },
  methods: {
    handleAddClick() {
      if (this.groupName) {
        this.listData.push({
          name: this.groupName
        });
        this.groupName = "";
      }
    },
    show(groupKey) {
      if (!groupKey) {
        return;
      }
      this.visible = true;
      this.loadData();
    },
    close() {
      this.visible = false;
    },
    loadData() {
      fetch.get("api/sys/dictionary/group/" + this.groupKey).then(res => {
        this.listData = res.data;
      });
    }
  }
};
</script>
<style scoped>
.dictionary-list {
  height: 500px;
  background-color: green;
  overflow: auto;
}
</style>