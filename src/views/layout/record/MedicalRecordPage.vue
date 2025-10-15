<template>
  <div class="main">
    <div class="left">
      <div class="header">
        <div class="title">电子病历</div>
        <el-select
          v-model="select"
          filterable
          clearable
          placeholder="请输入患者姓名"
          style="width: 240px"
          @change="handelSelect(select)"
        >
          <el-option v-for="item in patients" :key="item.id" :value="item.name" />
        </el-select>
      </div>
      <div class="body">
        <div class="content">
          <RecordItem
            v-for="record in records"
            :record="record"
            :key="records.find(record)"
            @click="handleDetail(record)"
          ></RecordItem>
        </div>
      </div>
      <div class="add" @click="open">
        <div class="text">添加病历</div>
      </div>
    </div>
    <div class="right">
      <!-- 在 RouterView 上监听子组件触发的事件 -->
      <RouterView @refresh-data="handleRefreshData" />
    </div>
    <el-dialog v-model="dialogVisible" width="300" :show-close="false">
      <template #default>
        <div class="info">
          <div class="title">
            <div class="icon"></div>
            <div class="text">选择患者</div>
          </div>
          <el-select
            v-model="toAdd"
            filterable
            clearable
            style="display: flex; justify-content: center"
          >
            <el-option
              v-for="item in patients"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </template>
      <template #footer>
        <div>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="add">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import RecordItem from '@/components/RecordItem.vue'
import { patientGetList } from '@/api/patient'
import { recordGetList } from '@/api/record'
import { useRecordStore } from '@/stores/record'
import { useRouter } from 'vue-router'

const recordStore = useRecordStore()
const router = useRouter()

const select = ref('')
const toAdd = ref({})
const patients = ref([])
const records = ref([])
const dialogVisible = ref(false)

const handelSelect = async (name = '') => {
  // 因为查询结果为空时会直接被响应拦截无法将记录赋值为空,所以提前赋空
  records.value = []
  const {
    data: { data },
  } = await recordGetList(name)

  records.value = data
}

// 添加处理刷新数据的方法
const handleRefreshData = () => {
  // 当接收到子组件的刷新事件时，重新加载数据
  handelSelect('')
}

const open = () => {
  dialogVisible.value = true
}

const add = () => {
  recordStore.setPatient(
    patients.value.filter((patient) => {
      return patient.id === toAdd.value
    })[0],
  )
  recordStore.setRecord({})
  router.push('/record/detail')
  dialogVisible.value = false
}

const handleDetail = (record) => {
  recordStore.setRecord(record)
  recordStore.setPatient({})
  router.push('/record/detail')
}

onBeforeMount(async () => {
  const {
    data: { data },
  } = await patientGetList()
  patients.value = data
  handelSelect()
})
</script>

<style lang="less" scoped>
// * {
//   border: 1px dashed grey;
// }

.main {
  width: 100%;
  height: 100vh;
  display: flex;
}

.left {
  width: 50%;
  height: 100%;
  background-color: #dadff8;
  position: relative;

  .header {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .title {
      font-weight: bold;
      font-size: large;
    }
  }

  .body {
    width: 100%;
    height: 90%;
    background-color: white;
    border-radius: 30px 30px 0 0;
    padding-top: 5%;

    .content {
      width: 100%;
      max-height: 100%;
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
    }
  }
}

.right {
  width: 50%;
  height: 100%;
}

.add {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0 0 2px grey;
  position: absolute;
  bottom: 20px;
  right: 30px;
  background-image: url('../../../assets/DoctorPage/patientList/add.svg');
  background-repeat: no-repeat;
  background-position: 50% 30%;
  background-size: 60%;
  background-color: white;
  transition: all 0.3s ease;
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }

  .text {
    margin-top: 58%;
    font-size: 13px;
    text-align: center;
    color: grey;
  }
}

.info {
  width: 100%;

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
}
</style>
