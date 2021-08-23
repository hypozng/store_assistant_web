<template>
  <div class="index-page">
    <div class="menu-container">
      <div class="user-box">
        <div class="user-head-photo">
          <i class="el-icon-user-solid" style="font-size:30px"></i>
        </div>
        <span class="user-title">{{userInfo && userInfo.name}}</span>
        <span class="user-button" @click="logout">退出</span>
      </div>
      <el-menu mode="vertical" background-color="#333399" text-color="white" active-text-color="#FFD04B">
        <template v-for="menu in menus">
          <el-submenu v-if="menu.children" :key="menu.id" :index="menu.id">
            <template slot="title">{{menu.name}}</template>
            <template v-for="subMenu in menu.children">
              <el-submenu v-if="subMenu.children" :key="subMenu.id" :index="subMenu.id">
                <template slot="title">{{subMenu.name}}</template>
                <el-menu-item v-for="menuItem in subMenu.children" :key="menuItem.id" @click="handleMenuItemClick(menuItem)">{{menuItem.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :key="subMenu.id" :index="subMenu.id" @click="handleMenuItemClick(subMenu)">{{subMenu.name}}</el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :key="menu.id" :index="menu.id" @click="handleMenuItemClick(menu)">{{menu.name}}</el-menu-item>
        </template>
      </el-menu>
    </div>
    <router-view class="router-view" />
  </div>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      menus: [],
      userInfo: this.$store.getters.userInfo,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 退出登录
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.replace("/login");
      });
    },
    // 左部菜单点击事件
    handleMenuItemClick(menu) {
      this.$router.push(menu.url);
    },
    // 加载菜单数据
    loadData() {
      fetch.get("api/sys/menu").then((res) => {
        res.data.forEach((item) => (item.id = item.id + ""));
        this.menus = this.$utils.list2tree(res.data);
      });
    },
  },
};
</script>
<style>
.index-page {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
}
.menu-container {
  display: flex;
  flex-direction: column;
}

.user-box {
  height: 50px;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1px;
  border-right: 1px solid solid 1px #e6e6e6;
  background-color: #333399;
  box-shadow: 0 0 1px black;
}

.user-head-photo {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}

.user-title {
  margin-left: 10px;
  font-size: 15px;
  flex: 1;
}

.user-button {
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  color: #a0a0a0;
}
.user-button:hover {
  color: white;
}

.el-menu {
  width: 200px;
  flex: 1;
}
.router-view {
  flex: 1;
  overflow: auto;
  background-color: #fafafa;
}
</style>
