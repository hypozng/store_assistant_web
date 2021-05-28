<template>
  <div class="page">
    <el-tree :data="listData" :props="props" :expand-on-click-node="false" @node-click="handleNodeClick" />
    <div class="content">
      <el-container>
        <el-main>
          <el-form v-if="formData" ref="form" :model="formData" size="medium" label-width="120px" align="left">
            <el-row>
              <el-col :span="24">
                <v-input label="种类名称" prop="name" v-model="formData.name" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <v-input label="序号" prop="orderIndex" v-model="formData.orderIndex" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <v-textarea label="备注" prop="remark" v-model="formData.remark" />
              </el-col>
            </el-row>
            <el-row v-if="mode=='edit'">
              <el-col :span="24">
                <el-form-item label="操作">
                  <el-button type="primary" plain size="small" @click="handleAddSiblingClick">添加同级</el-button>
                  <el-button type="primary" plain size="small" @click="handleAddChildClick">添加下级</el-button>
                  <el-button type="danger" plain size="small" @click="handleDeleteClick">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-main>
      </el-container>
      <el-button type="success" size="medium" plain @click="save">立即保存</el-button>
    </div>
  </div>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      listData: [],
      formData: null,
      mode: "add",
      props: {
        label: "name",
      },
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
    // 将页面模式切换为编辑模式
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
    // 树节点click事件
    handleNodeClick(r) {
      this.switchToEdit(r);
    },
    // 添加同级按钮click事件
    handleAddSiblingClick() {
      this.switchToAdd(this.formData.parentId);
    },
    // 添加下级按钮click事件
    handleAddChildClick() {
      this.switchToAdd(this.formData.id);
    },
    // 处理删除按钮点击事件
    handleDeleteClick() {
      this.$utils.delete.call(this, "api/sale/commodityCategory/" + this.formData.id);
    },
    // 加载数据
    loadData() {
      fetch.get("api/sale/commodityCategory").then((res) => {
        this.listData = this.$utils.list2tree(res.data);
        let item = this.listData && this.listData[0];
        if (item) {
          this.switchToEdit(item);
        } else {
          this.switchToAdd();
        }
      });
    },
    // 保存
    save() {
      this.$utils.save.call(this, "api/sale/commodityCategory/save");
    },
  },
};
</script>
<style scoped>
.page {
  display: flex;
  flex-direction: row;
}
.content {
  flex: 1;
  text-align: center;
  background: #e0e0e0;
}
.el-tree {
  width: 400px;
}
</style>