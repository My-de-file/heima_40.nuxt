<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input v-model="form.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item">
      <el-input placeholder="确认密码" type="password" ref="pass"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit('form')">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    const validatename = (rule, value, callback) => {
      if (/^1(3|4|5|7|8)\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    const validatecaptcha = (rule, value, callback) => {
      if (/^\d{6}$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的验证码"));
      }
    };
    const validatepass = (rule, value, callback) => {
      if (/^\w{6,16}$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入6-16位密码"));
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        nickname: "",
        captcha: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [{ validator: validatename, trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        captcha: [{ validator: validatecaptcha, trigger: "blur" }],
        password: [{ validator: validatepass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha(name) {
      if (/^1(3|4|5|7|8)\d{9}$/.test(this.form.username)) {
        console.log(this.form.username);
        this.$axios.defaults.headers.post["Content-Type"] =
          "application/x-www-form-urlencoded";
        this.$axios({
          url: "/captchas",
          method: "post",
          data: {
            tel: this.form.username
          }
        }).then(res => {
        console.log(res);
        });
      } else {
        this.$message.error("请输入手机号码,再发送验证码");
      }
    },

    // 注册
    handleRegSubmit(form) {
      if (this.$refs.pass.currentValue !== this.form.password) {
        return;
      } else {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.$axios({
              url: "/accounts/register",
              method: "post",
              data: {
                username: this.form.username,
                nickname: this.form.nickname,
                captcha: this.form.captcha,
                password: this.form.password
              }
            }).then(res => {
              this.$message({
                message: "恭喜你，注册成功!请登录",
                type: "success"
              });
            this.$emit('click',0)//返回上一层
            });
          } else {
            this.$message.error("请核对注册信息是否都正确");
            return false;
          }
        });
      }
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