<template>
  <div class="page">
    <el-tree :data="listData" :props="props" :expand-on-click-node="false" @node-click="handleNodeClick" />
    <div class="content">
      <el-container>
        <el-main>
          <el-form v-if="formData" ref="form" :model="formData" label-width="120px" align="left">
            <el-row>
              <el-col :span="24">
                <el-form-item label="种类名称" prop="name">
                  <el-input v-model="formData.name" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="序号" prop="orderIndex">
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
      <el-button type="success" plain @click="save">立即保存</el-button>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      listData: [],
      formData: null,
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
      if (!this.addMode) {
        this.delete();
      }
    },
    // 加载数据
    loadData() {
      fetch.get("api/sale/commodityCategory").then(res => {
        this.listData = res.data.filter(child => {
          let parent = res.data.find(item => item.id == child.parentId);
          if (!parent) {
            return true;
          }
          parent.children = parent.children || [];
          parent.children.push(child);
        });
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
      fetch.post("api/sale/commodityCategory/save", this.formData).then(() => {
        Message.success("保存成功");
        this.addMode = false;
        this.loadData();
      });
    },
    // 删除
    delete() {
      this.$confirm("确定删除这条数据吗？")
        .then(() => {
          fetch.delete("api/sale/commodityCategory/" + this.formData.id).then(() => {
            Message.success("删除成功");
            this.loadData();
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
.page {
  display: flex;
  flex-direction: row;
}
.content {
  flex: 1;
  background: #e0e0e0;
}
.el-tree {
  width: 400px;
}
</style>