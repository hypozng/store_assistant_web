<template>
  <div id="home">
    <el-menu class="el-menu-demo top" mode="horizontal" background-color="#545C64" text-color="white" active-text-color="#FFD04B">
      <el-menu-item v-for="menu in menus" :key="menu.id" @click="topMenuClick(menu)">{{menu.name}}</el-menu-item>
    </el-menu>
    <div class="page-bottom">
      <el-menu class="el-menu-demo sub" mode="vertical" background-color="#545C64" text-color="white" active-text-color="#FFD04B">
        <el-menu-item v-for="menu in subMenus" :key="menu.id" @click="subMenuClick(menu)">{{menu.name}}</el-menu-item>
      </el-menu>
      <router-view class="router-view" />
    </div>
  </div>
</template>
<script>
import fetch from "@/utils/fetch.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      menus: [],
      subMenus: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 顶部菜单点击事件
    topMenuClick(menu) {
      this.subMenus = menu.children;
    },
    // 左部菜单点击事件
    subMenuClick(menu) {
      this.$router.push(menu.url);
    },
    // 加载菜单数据
    loadData() {
      fetch.get("api/sys/menu").then((res) => {
        if (res.code != 0) {
          Message.error("" + res.message);
          return;
        }
        this.menus = res.data.filter((child) => {
          let parent = res.data.find((item) => item.id == child.parentId);
          if (!parent) {
            return true;
          }
          parent.children = parent.children || [];
          parent.children.push(child);
        });
        if (this.menus && this.menus.length) {
          this.subMenus = this.menus[0].children;
        }
      });
    },
  },
};
</script>
<style>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.el-menu-demo.top {
  width: 100%;
}
.page-bottom {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}
.router-view {
  flex-grow: 1;
}
</style>
