<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item">
      <el-input v-model="form.password" :rules="rules.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit(form)">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (/^1(3|4|5|7|8)\d{9}$/.test(value)) {
        console.log(1);
      } else{
        callback(new Error("请输入正确的用户名"));
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        password: []
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit(form) {
      this.$emit("click", form);
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>