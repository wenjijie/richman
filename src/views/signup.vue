<template>
  <div class="login-container" style="display: inline">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="pwdRules"
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
          placeholder="昵称"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item prop="checkPwd">
        <div style="display:flex;"><el-input
          :type="pwdType"
          v-model="loginForm.checkPwd"
          name="checkPwd"
          auto-complete="on"
          placeholder="确认密码"
        />
        <!-- <span>两次密码不一致</span> -->
        </div>
      </el-form-item>
      <!-- </div> -->
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          :disabled="signDisable"
          @click.native.prevent="handleSignup"
        >注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import user from "@/api/user";

export default {
  name: "Login",
  data() {
    const validateName = (rule, value, callback) => {
      if (value.length < 1) {
        this.signDisable = true;
        callback(new Error("昵称不能为空"));
      } else {
        if (
          this.loginForm.username.length > 0 &&
          this.loginForm.password.length > 3 &&
          this.loginForm.checkPwd === this.loginForm.password
        ) {
          this.signDisable = false;
        }
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 4) {
        this.signDisable = true;
        callback(new Error("密码不能小于四位"));
      } else {
        if (
          this.loginForm.username.length > 0 &&
          this.loginForm.password.length > 3 &&
          this.loginForm.checkPwd === this.loginForm.password
        ) {
          this.signDisable = false;
        }
        callback();
      }
    };
    const validateCheck = (rule, value, callback) => {
      if (value !== this.loginForm.password) {
        this.signDisable = true;
        callback(new Error("两次密码不相同"));
      } else {
        if (
          this.loginForm.username.length > 0 &&
          this.loginForm.password.length > 3 &&
          this.loginForm.checkPwd === this.loginForm.password
        ) {
          this.signDisable = false;
        }
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        checkPwd: ""
      },
      signDisable: true,
      loading: false,
      pwdType: "password",
      redirect: undefined,
      pwdRules: {
        username: [
          { required: true, trigger: "blur", validator: validateName }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass }
        ],
        checkPwd: [
          { required: true, trigger: "blur", validator: validateCheck }
        ]
      }
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log("route； ", route);
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    handleSignup() {
      this.loading = true;
      user
        .signup(this.loginForm)
        .then(res => {
          if (res.errno === 1000) {
            this.$router.push({ path: "/login" });
          }
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          console.log("error: ", e);
        });
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
