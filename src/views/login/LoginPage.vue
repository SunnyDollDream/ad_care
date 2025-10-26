<template>
  <div class="login">
    <div class="left">
      <div class="logo"></div>
      <h1>银发智安</h1>
      <div class="image"></div>
    </div>
    <div class="right">
      <div class="form">
        <el-form
          ref="form"
          size="large"
          autocomplete="off"
          v-if="isRegister"
          :model="formModel"
          :rules="rules"
        >
          <el-form-item>
            <h1>注册</h1>
          </el-form-item>
          <el-form-item prop="phone_number">
            <el-input
              :prefix-icon="User"
              placeholder="请输入手机号"
              v-model="formModel.phone_number"
            ></el-input>
          </el-form-item>
          <el-form-item prop="verify_code" style="display: flex">
            <el-input
              :prefix-icon="User"
              placeholder="请输入验证码"
              v-model="formModel.verify_code"
              style="flex: 1"
            ></el-input>
            <el-button @click="sendVerify">发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
              v-model="formModel.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="re_password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入再次密码"
              v-model="formModel.re_password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="button" type="primary" auto-insert-space @click="register">
              注册
            </el-button>
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = false"> ← 返回 </el-link>
          </el-form-item>
        </el-form>
        <el-form
          ref="form"
          size="large"
          autocomplete="off"
          v-else
          :model="formModel"
          :rules="rules"
        >
          <el-form-item>
            <h1>登录</h1>
          </el-form-item>
          <el-form-item prop="phone_number">
            <el-input
              :prefix-icon="User"
              placeholder="请输入手机号"
              v-model="formModel.phone_number"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              name="password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
              v-model="formModel.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item class="flex">
            <div class="flex">
              <el-checkbox v-model="rememberMe">记住我</el-checkbox>
              <el-link type="primary" :underline="false">忘记密码？</el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="button" type="primary" auto-insert-space @click="login"
              >登录</el-button
            >
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = true"> 注册 → </el-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userGetVerifyService, userLoginService, userRegisterService } from '@/api/user'
import { useUserStore } from '@/stores'
import { User, Lock } from '@element-plus/icons-vue'
import { watch } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const isRegister = ref(false)
watch(isRegister, () => {
  formModel.value = {
    phone_number: '',
    verify_code: '',
    password: '',
    re_password: '',
  }
})

const rememberMe = ref(false)
const formModel = ref({
  phone_number: '',
  verify_code: '',
  password: '',
  re_password: '',
})
const rules = {
  phone_number: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    {
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur',
    },
  ],
  verify_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  re_password: [
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('请检查两次输入密码是否一致'))
        } else {
          callback()
        }
      },
    },
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
}
const form = ref()
const sendVerify = async () => {
  const {
    data: { message },
  } = await userGetVerifyService(formModel.value.phone_number)
  ElMessage({
    message,
    type: 'success',
    showClose: true,
    duration: 0,
  })
}

const register = async () => {
  await form.value.validate()
  const {
    data: { message },
  } = await userRegisterService(formModel.value)
  ElMessage({
    message,
    type: 'success',
  })
  isRegister.value = false
  router.push('/login')
}

const login = async () => {

  await form.value.validate()
  const {
    data: {
      message,
      data: { token },
    },
  } = await userLoginService(formModel.value)
  if (rememberMe.value) {
    userStore.setToken(token)
    sessionStorage.removeItem('token')
  } else {
    sessionStorage.setItem('token', token)
  }
  ElMessage({
    message,
    type: 'success',
  })

  router.push('/patient')
  console.log('login');

}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  .left {
    border-radius: 0 20px 20px 0;
    // background-color: blue;
    background-color: #dbf4f3;
    // background-image: url('D:\edge\银发智安\银发智安前端\重构\ad-care\src\assets\login\old-light.png');
    // background-repeat: no-repeat;
    // background-size: 70%;
    // background-position: bottom;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .logo {
      margin-top: 10%;
      margin-bottom: 3%;
      width: 100px;
      height: 100px;
      border-radius: 100px;
      box-shadow:
        6px 6px 12px rgba(0, 0, 0, 0.2),
        -2px -2px 8px rgba(255, 255, 255, 0.8);
      background-image: url('@/assets/login/logo.png');
      background-size: cover;
      background-position: center 10px;
    }
  }
  .right {
    // background-color: red;
    width: 50%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    .form {
      margin: 10%;
      padding: 10%;
      // box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    }
  }
  .flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .button {
    width: 100%;
  }
  .image {
    width: 100%;
    flex: 1;
    // background-color: red;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('../../assets//login/old-light.png');
    background-size: contain;
  }
}
</style>
