<template>
  <div
    style="
      width: 100%;
      height: 100%;
      padding: 10%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    "
  >
    <h1 style="text-align: center">帮助中心</h1>
    <el-input
      v-model="text"
      style="width: 100%"
      rows="10"
      maxlength="500"
      placeholder="请输入您的问题"
      show-word-limit
      type="textarea"
      resize="none"
    />
    <el-button type="primary" @click="submit"> 提交反馈 </el-button>
  </div>
  <el-dialog v-model="dialogVisible" title="温馨提示" width="500" show-close="true">
    <template #default>
      <hr />
      <br />
      <span>我们的工作人员会在看到问题后尽快回访,请留下您的联系方式</span>
      <el-input v-model="input" style="width: 100%" placeholder="请输入您的联系方式" />
    </template>
    <template #footer>
      <div>
        <el-button type="primary" @click="ensure">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const dialogVisible = ref(false)

const text = ref('')

const submit = () => {
  dialogVisible.value = true
  text.value = ''
}

const ensure = () => {
  dialogVisible.value = false
  ElMessage({
    message: '提交成功!',
    type: 'success',
  })
}
</script>

<style lang="less" scoped></style>
