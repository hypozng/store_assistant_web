<template>
  <div class="login-page">
    <div class="login-box">
      <h2 class="title">得胜京东家电管理系统</h2>
      <el-input v-model="username" class="input" placeholder="账号">
        <i slot="prefix" class="el-input__icon el-icon-user"></i>
      </el-input>
      <el-input v-model="password" type="password" class="input" placeholder="密码">
        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        <i slot="suffix" class="el-input__icon el-icon-view"></i>
      </el-input>
      <el-button type="primary" @click="login" :loading="loginLoading">登录</el-button>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      username: "",
      password: "",
      loginLoading: false,
    };
  },
  methods: {
    // 登录
    login() {
      this.loginLoading = true;
      let params = {
        username: this.username,
        password: this.password,
      };
      this.$store
        .dispatch("login", params)
        .then(() => {
          Message.success("登录成功");
          this.$router.replace("/index");
        })
        .finally(() => {
          this.loginLoading = false;
        });
    },
  },
};
</script>
<style scoped>
.login-page {
  height: 100%;
  padding-right: 200px;
  background-image: url("~@/assets/login/bg3.jpeg");
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.login-box {
  width: 300px;
  height: 300px;
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 10px black;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.title {
  height: 100px;
  text-align: center;
}
</style>