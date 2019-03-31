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
  //   watch: {
  //     $route: {
  //       handler: function(route) {
  //         console.log("route； ", route);
  //         this.redirect = route.query && route.query.redirect;
  //       },
  //       immediate: true
  //     }
  //   },
  methods: {
    handleLogin() {
      this.loading = true;
      console.log("loginForm: ", this.loginForm);
      user.login(this.loginForm)
        .then(res => {
          localStorage.richman_token = res.data.token;
          console.log("res: ", res);
          console.log(localStorage);
          this.loading = false;
          this.$router.push({ path: "/" });
        })
        .catch(e => {
          console.log("error: ", e);
          this.loading = false;
        });
    },
    signup() {
      console.log("aaaaa");
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
