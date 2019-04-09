<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      style="width:150%"
    >
      <h3 class="title">秋富翁</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >Sign in</el-button>
      </el-form-item>
      <div class="tips">
        <span @click="signup" style="cursor: pointer">注册</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import user from "@/api/user";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loading: false,
      pwdType: "password",
      redirect: undefined
    };
  },
  methods: {
    handleLogin() {
      this.loading = true;
      user
        .login(this.loginForm)
        .then(res => {
          if (res.errno === 1000) {
            localStorage.richman_token = res.data.token;
            localStorage.userId = res.data.user._id;
            this.$router.push({ path: "/hall" });
          } else {
            Message({
              message: res.errmsg,
              type: "error",
              duration: 5 * 1000
            });
          }

          this.loading = false;
        })
        .catch(e => {
          console.log("error: ", e);
          this.loading = false;
        });
    },
    signup() {
      this.$router.push({ path: "/signup" });
    }
  }
};
</script>

<style>
.tips {
  float: right;
  margin-right: 20px;
  color: cornflowerblue;
}
</style>
