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
    <h1 style="text-align: center">意见反馈</h1>
    <el-input
      v-model="text"
      style="width: 100%"
      rows="10"
      maxlength="500"
      placeholder="请输入您的反馈内容"
      show-word-limit
      type="textarea"
      resize="none"
    />
    <el-button type="primary" @click="submit"> 提交反馈 </el-button>
  </div>
  <el-dialog v-model="dialogVisible" title="反馈成功" width="500" show-close="true">
    <template #default>
      <hr><br>
      <span>感谢您的反馈,我们会及时处理!</span>
    </template>
    <!-- <template #footer>
      <div>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpload">确定</el-button>
      </div>
    </template> -->
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)

const text = ref('')

const submit = () => {
  dialogVisible.value = true
  text.value = ''
}
</script>

<style lang="less" scoped></style>
