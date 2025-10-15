<template>
  <div class="main">
    <div class="form">
      <el-radio-group v-model="op" style="width: 100%; padding: 10%">
        <el-radio-button label="更改个人信息" :value="true" class="button" />
        <el-radio-button label="修改密码" :value="false" class="button" />
      </el-radio-group>
      <el-form
        :model="form"
        label-width="auto"
        style="max-width: 100%"
        v-if="op"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="位置" prop="location">
          <el-input v-model="form.location" />
        </el-form-item>
      </el-form>
      <el-form
        :model="form"
        label-width="auto"
        style="max-width: 100%"
        v-else
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" show-password />
        </el-form-item>
      </el-form>
      <div class="flex">
        <el-button type="primary" @click="onSubmit" size="large">确认</el-button>
        <el-button @click="$router.push('/me')" size="large">取消</el-button>
      </div>
    </div>
    <div class="image">
      <!-- <img src="@\assets\DoctorPage\doctor.svg" alt="" /> -->
    </div>
  </div>
</template>

<script setup>
import { userUpdateInfoService, userUpdatePasswordService } from '@/api/user'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const form = ref({
  name: '',
  location: '',
  oldPassword: '',
  newPassword: '',
})
const rules = {
  name: [{ required: true, message: '请输入新的昵称', trigger: 'blur' }],
  location: [
    { required: true, message: '请输入位置', trigger: 'blur' },
    {
      pattern:
        /^浙江|上海|北京|天津|重庆|黑龙江|吉林|辽宁|内蒙古|河北|新疆|甘肃|青海|陕西|宁夏|河南|山东|山西|安徽|湖北|湖南|江苏|四川|贵州|云南|广西|西藏|江西|广东|福建|台湾|海南|香港|澳门$/,
      message: '请输入正确的省份',
      trigger: 'blur',
    },
  ],
  oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === form.value.oldPassword) {
          callback(new Error('新密码必须与原密码不一致'))
        } else {
          callback()
        }
      },
    },
  ],
}

const formRef = ref()

const op = ref(true)

const onSubmit = async () => {
  await formRef.value.validate()
  if (op.value) {
    const {
      data: { message },
    } = await userUpdateInfoService(form.value)
    ElMessage({
      message,
      type: 'success',
    })
  } else {
    const {
      data: { message },
    } = await userUpdatePasswordService(form.value)
    ElMessage({
      message,
      type: 'success',
    })
    useUserStore().setToken('')
  }
  window.location.reload()
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .form {
    width: 100%;
    padding: 10%;
  }
  .button {
    width: 50%;
    ::v-deep span {
      width: 100%;
    }
  }
}

.image {
  flex: 1;
  height: 50%;
  width: 100%;
  background-image: url('../../../assets/DoctorPage/doctor.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.flex {
  margin-top: 10px;
  display: flex;
  width: 100%;
  .el-button {
    flex: 1;
  }
}
</style>
