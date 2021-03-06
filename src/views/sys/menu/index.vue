<template>
  <div class="page">
    <el-tree :data="menus" :props="props" :default-expanded-keys="defaultExpandedKeys" node-key="id" @node-click="handleNodeClick" class="menu-tree" />
    <div class="content">
      <el-form v-if="formData" ref="form" :model="formData" label-width="120px" align="left" :rules="rules">
        <el-container>
          <el-main>
            <el-row>
              <el-col :span="24">
                <ff-input label="菜单名称" prop="name" v-model="formData.name" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <ff-input label="菜单地址" prop="url" v-model="formData.url" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <ff-input label="菜单参数" prop="params" v-model="formData.params" />
              </el-col>
              <el-col :span="8">
                <el-form-item prop="disabled" label="禁用">
                  <el-select v-model="formData.disabled">
                    <el-option :value="0" label="启用" />
                    <el-option :value="1" label="禁用" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <ff-slider label="排序" prop="orderIndex" v-model="formData.orderIndex" />
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
          </el-main>
        </el-container>
      </el-form>
      <el-button type="success" size="medium" @click="save">立即保存</el-button>
    </div>
  </div>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      formData: null,
      mode: "add",
      menus: [],
      props: {
        label: "name"
      },
      defaultExpandedKeys: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: ["blur"]
          }
        ]
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
      this.formData = { parentId, disabled: 0 };
      this.mode = "add";
    },
    // 将页面切换为编辑模式
    switchToEdit(r) {
      if (!r) {
        this.switchToAdd();
        return;
      }
      this.formData = Object.fromEntries(Object.entries(r).filter(item => item[0] != "children"));
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
      this.$utils.delete.call(this, "api/sys/menu/" + this.formData.id);
    },
    // 处理节点点击事件
    handleNodeClick(menu) {
      this.defaultExpandedKeys[0] = menu.id;
      this.switchToEdit(menu);
    },
    // 添加同级菜单
    addSiblingsMenu() {
      this.switchToAdd(this.formData.parentId);
    },
    // 添加子菜单
    addSubMenu() {
      this.switchToAdd(this.formData.id);
    },
    // 加载数据
    loadData() {
      fetch.get("api/sys/menu").then(res => {
        this.menus = this.$utils.list2tree(res.data);
        let item = res.data.find(e => e.id == this.defaultExpandedKeys[0]);
        if (!item && this.menus) {
          item = this.menus[0];
        }
        if (item) {
          this.switchToEdit(item);
        } else {
          this.switchToAdd();
        }
      });
    },
    // 保存数据
    async save() {
      let res = await this.$utils.save.call(this, "api/sys/menu/save");
      this.handleNodeClick(res);
      this.loadData();
    }
  }
};
</script>
<style scoped>
.page {
  width: 100%;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: row;
}
.menu-tree {
  width: 400px;
  overflow: auto;
}
.content {
  flex: 1;
  text-align: center;
}
</style>
