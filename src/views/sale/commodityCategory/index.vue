<template>
  <div class="page">
    <el-tree :data="listData" :props="props" :default-expanded-keys="defaultExpandedKeys" node-key="id" @node-click="handleNodeClick" class="category-tree" size="medium" />
    <div class="content">
      <el-container>
        <el-main>
          <el-form v-if="formData" ref="form" :model="formData" size="medium" label-width="120px" align="left">
            <el-row>
              <el-col :span="24">
                <ff-input label="种类名称" prop="name" v-model="formData.name" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <ff-slider label="序号" prop="orderIndex" v-model="formData.orderIndex" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <ff-textarea label="备注" prop="remark" v-model="formData.remark" />
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
      <el-button type="success" size="medium" @click="save">立即保存</el-button>
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
        label: "name"
      },
      defaultExpandedKeys: []
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
      this.formData = Object.fromEntries(Object.entries(r).filter(item => item[0] != "children"));
      this.mode = "edit";
    },
    // 树节点click事件
    handleNodeClick(r) {
      this.defaultExpandedKeys[0] = r.id;
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
      fetch.get("api/sale/commodityCategory").then(res => {
        this.listData = this.$utils.list2tree(res.data);
        let item = res.data.find(item => item.id == this.defaultExpandedKeys[0]);
        if (!item && this.listData) {
          item = this.listData;
        }
        if (item) {
          this.switchToEdit(item);
        } else {
          this.switchToAdd();
        }
      });
    },
    // 保存
    async save() {
      let res = await this.$utils.save.call(this, "api/sale/commodityCategory/save");
      this.handleNodeClick(res);
      this.loadData();
    }
  }
};
</script>
<style scoped>
.page {
  display: flex;
  flex-direction: row;
}
.category-tree {
  width: 400px;
  overflow: auto;
}
.content {
  flex: 1;
  text-align: center;
  background: #f0f0f0;
}
.el-tree {
  width: 400px;
}
</style>