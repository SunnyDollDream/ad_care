<template>
  <div style="width: 50%; height: 100%">
    <el-container style="width: 100%; height: 100%; background-color: #dadff8">
      <!-- <div class="exit">
        <div class="icon"></div>
        <div class="text">退出登录</div>
      </div> -->
      <div class="exit">
        <el-button type="danger" circle :icon="SwitchButton" @click="exit"></el-button>
      </div>

      <el-header class="header">
        <div class="avatar" @click="dialogVisible = true">
          <img :src="userIcon" alt="" />
          <div class="avatar-overlay">
            <el-icon size="50" style="opacity: 0.7"><Avatar /></el-icon>
          </div>
        </div>
        <div class="name">{{ username }}</div>
        <div class="pos">
          <el-icon><Position /></el-icon>
          <div class="address">{{ userLocation || '未知' }}</div>
        </div>
      </el-header>
      <el-main class="main">
        <div class="content">
          <div class="two">
            <div class="first" @click="$router.push('/me/license')">
              <div class="license"></div>
              <div style="font-size: large">我的认证</div>
            </div>
            <div class="second" @click="$router.push('/me/edit')">
              <div class="edit"></div>
              <div style="font-size: large">编辑资料</div>
            </div>
          </div>
          <div class="item" @click="$router.push('/me/help')">
            <div class="icon img1"></div>
            <div class="text">帮助中心</div>
            <div class="arrow"></div>
          </div>
          <div class="item" @click="$router.push('/me/fallback')">
            <div class="icon img2"></div>
            <div class="text">意见反馈</div>
            <div class="arrow"></div>
          </div>
          <div class="item" @click="$router.push('/me/about')">
            <div class="icon img3"></div>
            <div class="text">关于我们</div>
            <div class="arrow"></div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
  <el-dialog v-model="dialogVisible" title="修改头像" width="500" :show-close="false">
    <template #default>
      <img v-if="previewImage" :src="previewImage" class="preview-image" />
      <span v-else>请上传您的头像</span>
      <el-upload :show-file-list="false" accept="image/*" :before-upload="beforeUpload">
        <el-button type="primary" size="default" style="margin-top: 20px">选择图片</el-button>
      </el-upload>
    </template>
    <template #footer>
      <div>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpload">确定</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="ensureExit" title="退出登录" width="500" :show-close="false">
    <template #default>
      <span>确认要退出吗?</span>
    </template>
    <template #footer>
      <div>
        <el-button @click="ensureExit = false">取消</el-button>
        <el-button type="primary" @click="handleExit">确定</el-button>
      </div>
    </template>
  </el-dialog>
  <div style="width: 50%; height: 100%; box-sizing: border-box">
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { userGetInfoService, userUpdateIconService } from '@/api/user'
import { useUserStore } from '@/stores'
import { Position, Avatar, SwitchButton } from '@element-plus/icons-vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const userIcon = ref('')
const userLocation = ref('')
const username = ref('')

onBeforeMount(async () => {
  const {
    data: {
      data: { icon, location, user_name },
    },
  } = await userGetInfoService()
  userIcon.value = icon
  userLocation.value = location
  username.value = user_name
})

const dialogVisible = ref(false)
const previewImage = ref('')
const fileToUpload = ref(null)

// 图片上传前的校验
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJpgOrPng) {
    ElMessage.error('只能上传 JPG/PNG 格式的图片!')
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!')
  }

  if (isJpgOrPng && isLt2M) {
    // 生成预览图
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    fileToUpload.value = file
  }

  return false // 阻止默认上传
}

// 处理文件上传
const handleUpload = async () => {
  if (!fileToUpload.value) {
    ElMessage.error('请选择要上传的图片')
    return
  }

  // 调用上传API (这里需要根据你的实际API接口修改)
  const {
    data: { data, message },
  } = await userUpdateIconService(fileToUpload.value)

  // 更新用户头像
  userIcon.value = data

  // 显示成功消息
  ElMessage.success(message)

  // 关闭浮层
  dialogVisible.value = false

  previewImage.value = ''
}

const ensureExit = ref(false)

const exit = () => {
  ensureExit.value = true
}

const handleExit = () => {
  userStore.setToken('')
  router.push('/login')
}
</script>

<style lang="less" scoped>
// * {
//   border: 1px dashed grey;
//   box-sizing: border-box;
// }
.header {
  display: flex;
  width: 100%;
  height: 30%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;
    }
    .avatar-overlay {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      opacity: 0;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
    }
    &:hover {
      img {
        filter: brightness(0.8); /* 悬停时图片变暗 */
      }
      .avatar-overlay {
        opacity: 1;
      }
    }
  }
  .name {
    width: 100px;
    text-align: center;
    font-size: large;
    font-weight: bolder;
    color: #6c6c6c;
  }
  .pos {
    display: flex;
    width: 100px;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
}

.main {
  background-color: #fcfcfc;
  border-radius: 20px 20px 0 0;
  width: 100%;
  overflow: hidden;
  .content {
    padding: 5px;
    margin: 3px 10px;
    height: 100%;
    box-sizing: border-box;
    .two {
      height: 30%;
      border: none;
      display: flex;
      padding-top: 5px;
      .first {
        transition: all 0.3s ease;
        &:hover {
          filter: brightness(0.9);
        }
        // margin: 5px;
        background-color: #eff5f4;
        border-radius: 20px;
        width: 50%;
        height: 100%;
        margin: 0 10px;
        display: flex;
        // flex-direction: column;
        align-items: center;
        justify-content: center;
        .license {
          width: 30%;
          height: 30%;
          padding: 10%;
          background-image: url('../../../assets/DoctorPage/PersonalCenter/identity.svg');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
      .second {
        transition: all 0.3s ease;
        &:hover {
          filter: brightness(0.9);
        }
        background-color: #f6eff0;
        border-radius: 20px;
        // margin: 5px;
        width: 50%;
        height: 100%;
        margin: 0 10px;
        display: flex;
        // flex-direction: column;
        align-items: center;
        justify-content: center;
        .edit {
          width: 30%;
          height: 30%;
          padding: 10%;
          background-image: url('../../../assets/DoctorPage/PersonalCenter/editInformation.svg');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
    .item {
      transition: all 0.3s ease;
      &:hover {
        filter: brightness(0.9);
      }
      background-color: #e6e7f1;
      border-radius: 20px;
      margin: 10px;
      height: 20%;
      display: flex;
      align-items: center;
      .icon {
        margin: 0 5%;
        height: 35%;
        width: 15%;
        background-image: url('../../../assets/PersonalCenter/helpCenter.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
      .arrow {
        flex: 1;
        height: 20%;
        width: 15%;
        margin-right: 10%;
        background-image: url('../../../assets/PersonalCenter/arrow.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: right;
      }
      .img1 {
        background-image: url('../../../assets/PersonalCenter/helpCenter.svg');
      }
      .img2 {
        background-image: url('../../../assets/PersonalCenter/yijian.svg');
      }
      .img3 {
        background-image: url('../../../assets/PersonalCenter/aboutUs.svg');
      }
    }
  }
}

.exit {
  display: flex;
  justify-content: right;
}
.preview-image {
  max-width: 100%;
}
</style>
