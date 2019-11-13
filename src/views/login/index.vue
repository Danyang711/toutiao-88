<template>
  <div class="login">
    <el-card class="login-card">
      <!-- 卡片内容 -->
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
      <!-- model属性要绑定表单数据对象 rules表示绑定验证规则对象 -->
      <el-form style="margin-top:10px;" :model="loginForm" :rules="loginRules" ref="formObj">
        <!-- 手机号 -->
        <el-form-item prop="mobile">
        <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code">
        <el-input style="width:220px" v-model="loginForm.code" placeholder="请输入验证码"></el-input>
        <el-button style="float:right" plain type="primary">发送验证码</el-button>
        </el-form-item>

        <!-- 勾选框 -->
        <el-form-item prop="checked">
        <el-checkbox  v-model="loginForm.checked">我已阅读并同意用户协议及条款</el-checkbox>
        </el-form-item>

        <!-- 登录 -->
      <el-form-item>
        <el-button style="width:100%" type="primary" @click="login('loginForm')">登录</el-button>
      </el-form-item>
      </el-form>
  </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // var abc = function (rule, value, callback) {
    //   if (value) {
    //     // 表示直接通过
    //     callback()
    //   } else {
    //     // 不通过校验
    //     callback(new Error('您需要勾选用户协议'))
    //   }
    // }
    return {
    // 要校验的整个表单数据
      loginForm: {
      // 手机号
        mobile: '',
        // 验证码
        code: '',
        // 是否勾选协议
        checked: false
      },
      // 校验
      loginRules: {
        mobile: [
          { required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '请输入六位数' }
        ],
        // 自定义校验函数 validator
        checked: [
          // rule:当前的规则（没啥用）
          // value:当前的值=>代表字段checked的值
          // callback：回调函数
          { validator: function (rule, value, callback) {
            if (value) {
              // 表示直接通过
              callback()
            } else {
              // 不通过校验
              callback(new Error('您需要勾选用户协议'))
            }
          } }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.formObj.validate((isOK) => {
        if (isOK) {
          // 调用接口登录
          this.$axios({
            url: '/authorizations',
            data: this.loginForm,
            method: 'post'
          }).then((result) => {
          //  储存到本地
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            // 提示消息
            this.$message({
              message: '您的手机号或验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login{
  background: url(../../assets/img/login_bg.jpg);
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card{
    width: 400px;
    height: 320px;
    .logo{
  text-align: center;
  img{
    height: 35px;
  }
}
  }

}
</style>
