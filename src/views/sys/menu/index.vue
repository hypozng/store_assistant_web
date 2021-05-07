<template>
  <div class="page">
    <el-tree :data="menus" :props="props" :expand-on-click-node="false" @node-click="handleNodeClick" class="menu-tree"></el-tree>
    <div class="content">
      <el-form v-if="formData" ref="form" :model="formData" label-width="120px" :rules="rules">
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
                <el-form-item prop="remark" label="备注">
                  <el-input v-model="formData.remark" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="editMode">
              <el-col :span="24">
                <el-form-item label="操作" style="text-align:left">
                  <el-button type="primary" plain @click="addSiblingsMenu">添加同级菜单</el-button>
                  <el-button type="primary" plain @click="addSubMenu">添加下级菜单</el-button>
                  <el-button type="danger" plain @click="deleteMenu">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-button type="primary" @click="save">立即保存</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      formData: null,
      editMode: false,
      menus: [],
      props: {
        label: "name"
      },
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
    // 加载数据
    loadData() {
      fetch.get("api/sys/menu").then(res => {
        if (res.code != 0) {
          Message.error("" + res.message);
          return;
        }
        this.menus = res.data.filter(child => {
          let parent = res.data.find(item => item.id == child.parentId);
          if (!parent) {
            return true;
          }
          parent.children = parent.children || [];
          parent.children.push(child);
        });
      });
    },
    // 处理节点点击事件
    handleNodeClick(menu) {
      menu = JSON.parse(JSON.stringify(menu));
      delete menu.children;
      this.formData = menu;
      this.editMode = true;
    },
    // 添加同级菜单
    addSiblingsMenu() {
      let formData = this.formData;
      this.formData = {
        parentId: formData.parentId,
        disabled: 0
      };
      this.editMode = false;
    },
    // 添加子菜单
    addSubMenu() {
      let formData = this.formData;
      this.formData = {
        parentId: formData.id,
        disabled: 0
      };
      this.editMode = false;
    },
    // 删除菜单
    deleteMenu() {
      fetch.delete("api/sys/menu/" + this.formData.id).then(res => {
        if (res.code != 0) {
          Message.error("" + res.message);
          return;
        }
        this.formData = null;
        this.editMode = false;
      });
    },
    save() {
      this.$refs.form.validate(res => {
        if (!res) {
          return;
        }
        fetch.post("api/sys/menu/save", this.formData, {headers:{post:{"Content-Type": "application/x-www-form-urlencoded"}}}).then(res => {
          if (res.code != 0) {
            Message.error("" + res.message);
            return;
          }
          Message.success("" + res.message);
          this.formData = null;
          this.editMode = false;
          this.loadData();
        });
      });
    }
  }
};
</script>
<style>
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
  flex-grow: 1;
}
</style>
