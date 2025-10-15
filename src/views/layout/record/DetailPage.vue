<template>
  <div class="main">
    <div class="content">
      <div class="info">
        <div class="title">
          <div class="icon"></div>
          <div class="text">患者信息</div>
        </div>
        <ul>
          <li>患者姓名 : {{ recordStore.patient.name || recordStore.record.patient_name }}</li>
          <li>年龄 : {{ recordStore.record.age || age }}</li>
          <li>过敏史 : {{ recordStore.patient.allergy || recordStore.record.allergy }}</li>
          <li>患病史 : {{ recordStore.patient.disease || recordStore.record.disease }}</li>
        </ul>
      </div>
      <div class="check">
        <div class="title">
          <div class="icon"></div>
          <div class="text">诊断</div>
        </div>
        <ul>
          <li>
            诊断内容 :
            <el-input
              style="width: auto; margin-left: 10px"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 6 }"
              resize="none"
              v-model="check"
              v-if="recordStore.patient.id"
            ></el-input>
            <div v-else>{{ recordStore.record.diagnosis }}</div>
          </li>
          <li>
            开方 :
            <el-input
              style="width: auto; margin-left: 42px"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 6 }"
              resize="none"
              v-model="med"
              v-if="recordStore.patient.id"
            ></el-input>
            <div v-else>{{ recordStore.record.prescription }}</div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <el-button type="primary" style="flex: 1" @click="submit">确认</el-button>
        <el-button type="info" style="flex: 1" @click="$router.push('/record')">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { recordAddService } from '@/api/record'
import { useRecordStore } from '@/stores/record'
import { calculateAge } from '@/utils/age'
import { ElMessage } from 'element-plus'
import { ref, computed, onUnmounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

const recordStore = useRecordStore()
const router = useRouter()

// 获取当前组件实例
const instance = getCurrentInstance()
const check = ref('')
const med = ref('')

const age = computed(() => {
  return calculateAge(recordStore.patient.birthday)
})

const submit = async () => {
  if (!check.value || !med.value) {
    ElMessage({
      type: 'error',
      message: '请输入内容',
    })
    return
  }
  const {
    data: { message },
  } = await recordAddService(recordStore.patient.id, check.value, med.value)
  ElMessage({
    type: 'success',
    message,
  })

  // 使用 emit 触发事件，通知父组件更新数据
  instance.emit('refresh-data')
  router.push('/record')
}

onUnmounted(() => {
  recordStore.setPatient({})
  recordStore.setRecord({})
})
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100vh;
  padding: 10%;
  background-color: #e1e1e1;

  .content {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 2px grey;
    border-radius: 20px;
    padding: 10%;
    background-color: #ffffff;
  }
}

.info {
  width: 100%;

  ul {
    list-style: none;
    padding-left: 7%;

    li {
      margin: 3% 0;
    }
  }
}

.title {
  display: flex;
  align-items: center;

  .icon {
    width: 20px;
    height: 50px;
    background-image: url(../../../assets/DoctorPage/patientList/line.svg);
    background-repeat: no-repeat;
    background-size: cover;
    margin-right: 3%;
  }
}

.check {
  ul {
    list-style: none;
    padding-left: 7%;

    li {
      margin: 3% 0;
      display: flex;
    }
  }
}

.bottom {
  margin-top: 10%;
  display: flex;
  justify-content: space-around;
}
</style>
