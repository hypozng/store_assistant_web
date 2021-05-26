<template>
  <div class="page">
    <el-tree :data="menus" :props="props" :expand-on-click-node="false" @node-click="handleNodeClick" class="menu-tree"></el-tree>
    <div class="content">
      <el-form v-if="formData" ref="form" :model="formData" label-width="120px" align="left" :rules="rules">
        <el-container>
          <el-main>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="name" label="菜单名称">
                  <el-input v-model="formData.name" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="url" label="菜单地址">
                  <el-input v-model="formData.url" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item prop="params" label="菜单参数">
                  <el-input v-model="formData.params" />
                </el-form-item>
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
                <el-form-item prop="orderIndex" label="排序">
                  <el-slider v-model="formData.orderIndex" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="remark" label="备注">
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
          </el-main>
        </el-container>
      </el-form>
      <el-button type="success" size="medium" plain @click="save">立即保存</el-button>
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
        label: "name",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: ["blur"],
          },
        ],
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
      this.formData = { parentId, disabled: 0 };
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
      this.$utils.delete.call(this, "api/sys/menu/" + this.formData.id);
    },
    // 加载数据
    loadData() {
      fetch.get("api/sys/menu").then((res) => {
        this.menus = this.$utils.list2tree(res.data);
        let item = this.menus && this.menus[0];
        if (item) {
          this.switchToEdit(item);
        } else {
          this.switchToAdd();
        }
      });
    },
    // 处理节点点击事件
    handleNodeClick(menu) {
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
    // 保存数据
    save() {
      this.$utils.save.call(this, "api/sys/menu/save");
    },
  },
};
</script>
<style scoped>
.page {
  width: 100%;
  background-color: #e0e0e0;
  display: flex;
  flex-direction: row;
}
.menu-tree {
  width: 400px;
}
.content {
  flex: 1;
  text-align: center;
}
</style>
