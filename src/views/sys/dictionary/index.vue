<template>
  <div class="page-main">
    <el-tree :data="listData" :props="props" :expand-on-click-node="false" @node-click="handleNodeClick" class="dictionary-tree"></el-tree>
    <div class="content">
      <el-form v-if="formData" ref="form" :model="formData" label-width="120px" align="left" size="medium">
        <v-input label="字典分组" prop="groupKey" v-model="formData.groupKey" required />
        <v-input label="名称" prop="name" v-model="formData.name" />
        <v-input label="编码" prop="code" v-model="formData.code" />
        <v-slider label="序号" prop="orderIndex" v-model="formData.orderIndex" />
        <v-textarea label="值" prop="value" v-model="formData.value" />
        <v-textarea label="备注" prop="remark" v-model="formData.remark" />
        <el-form-item v-if="mode=='edit'" label="操作">
          <el-button type="primary" size="small" plain @click="handleAddSiblingClick">添加同级</el-button>
          <el-button type="primary" size="small" plain @click="handleAddChildClick">添加下级</el-button>
          <el-button type="danger" size="small" plain @click="handleDeleteClick">删除</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="save">立即保存</el-button>
    </div>
  </div>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      listData: [],
      formData: {},
      mode: "add",
      props: {
        label: "name"
      }
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 将页面模式切换为添加模式
    switchToAdd(parentId) {
      parentId = parentId || 0;
      this.formData = { parentId };
      this.mode = "add";
    },
    // 将页面切换为编辑模式
    switchToEdit(r) {
      if (!r) {
        this.switchToAdd();
        return;
      }
      r = JSON.parse(JSON.stringify(r));
      delete r.children;
      this.formData = r;
      this.mode = "edit";
    },
    // 处理添加同级按钮click事件
    handleAddSiblingClick() {
      this.switchToAdd(this.formData.parentId);
    },
    // 处理添加下级按钮click事件
    handleAddChildClick() {
      this.switchToAdd(this.formData.id);
    },
    // 处理删除按钮click事件
    handleDeleteClick() {
      if (this.mode == "add") {
        return;
      }
      this.$utils.delete.call(this, "api/sys/dictionary/" + this.formData.id);
    },
    // 加载数据
    loadData() {
      fetch.get("api/sys/dictionary/").then(res => {
        this.listData = this.$utils.list2tree(res.data);
        if (!this.listData || !this.listData.length) {
          this.switchToAdd();
          return;
        }
        this.switchToEdit(this.listData[0]);
      });
    },
    // 保存数据
    save() {
      this.$utils.save.call(this, "api/sys/dictionary/save");
    }
  }
};
</script>
<style scoped>
.page-main {
  background-color: #e0e0e0;
  display: flex;
  flex-direction: row;
}

.dictionary-tree {
  width: 400px;
}

.content {
  flex: 1;
  padding: 10px;
  text-align: center;
}
</style>