<template>
  <div id="app">
    <el-menu class="el-menu-demo top" mode="horizontal" background-color="rgb(84, 92, 100)" text-color="white" active-text-color="rgb(255, 208, 75)">
      <el-menu-item v-for="menu in menus" :key="menu.id" @click="topMenuClick(menu)">{{menu.name}}</el-menu-item>
    </el-menu>
    <div class="page-bottom">
      <el-menu class="el-menu-demo sub" mode="vertical" background-color="rgb(84, 92, 100)" text-color="white" active-text-color="rgb(255, 208, 75)">
        <el-menu-item v-for="menu in subMenus" :key="menu.id" @click="subMenuClick(menu)">{{menu.name}}</el-menu-item>
      </el-menu>
      <router-view class="router-view" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {
          id: 1,
          name: "系统管理",
          // url: "/page1",
          children: [
            { id: 5, name: "菜单管理", url: "/sys_menu" },
            { id: 4, name: "用户管理", url: "/sys_user" },
            { id: 6, name: "组织架构", url: "/sys_dept" },
          ],
        },
        {
          id: 2,
          name: "选项二",
          url: "/page2",
          children: [
            { id: 4, name: "页面一", url: "/page1" },
            { id: 5, name: "页面二", url: "/page2" },
          ],
        },
        {
          id: 3,
          name: "选项三",
          url: "/page3",
          children: [
            { id: 4, name: "page1", url: "/page1" },
            { id: 5, name: "page2", url: "/page2" },
          ],
        },
      ],
      subMenus: [],
    };
  },
  mounted() {
    this.subMenus = this.menus[0].children;
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
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
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
.el-menu-demo.sub {
}
.router-view {
  flex-grow: 1;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
