<template>
  <div>
    <el-container>
      <el-aside class="aside">
        <el-header class="header">
          <div class="logo"></div>
          <h3>银发智安</h3>
        </el-header>
        <el-menu
          active-text-color="#409EFF"
          background-color="#DBF4F3"
          default-active="/patient"
          class="el-menu-vertical-demo"
          :router="true"
          style="border: none"
        >
          <el-menu-item index="/patient">
            <el-icon>
              <User />
            </el-icon>
            <template #title>患者</template>
          </el-menu-item>
          <el-menu-item index="/record">
            <el-icon>
              <Document />
            </el-icon>
            <template #title>病历</template>
          </el-menu-item>
          <el-menu-item index="/ai">
            <el-icon>
              <Opportunity />
            </el-icon>
            <template #title>AI辅助</template>
          </el-menu-item>
          <el-menu-item index="/me">
            <el-icon>
              <House />
            </el-icon>
            <template #title>我的</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <RouterView></RouterView>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { userGetInfoService } from '@/api/user'
import { useChatStore, useUserStore, useWebSocketStore } from '@/stores'
import useWebSocket from '@/utils/webSocketService'
import { User, Document, Opportunity, House } from '@element-plus/icons-vue'

const userStore = useUserStore()
const webSocketStore = useWebSocketStore()
const chatStore = useChatStore()

webSocketStore.setChatSocket(
  useWebSocket(
    `ws://localhost:8082/recovery/?Authorization=${userStore.token || sessionStorage.getItem('token')}`,
  ),
)
const chatSocket = webSocketStore.chatSocket

const users = chatStore.users

onMounted(async () => {
  if (userStore.userid === null || userStore.icon === null) {
    const {
      data: {
        data: { id, icon },
      },
    } = await userGetInfoService()
    userStore.setUserid(id)
    userStore.setIcon(icon)
  }
})

watch(
  chatSocket,
  () => {
    if (chatSocket.message === null) return
    const data = JSON.parse(chatSocket.message)
    if (data.role) {
      chatStore.updateAIMsg(data.content, userStore.userid)
    } else if (data.msgs) {
      // 更新离线期间聊天对象
      data.msgs.forEach(({ msg }) => {
        const { uid, from, icon, text } = JSON.parse(msg)
        const user = { uid, name: from, icon }
        if (!users.some((item) => item.uid === user.uid)) {
          chatStore.addUser(user)
        }
        const message = {
          from_id: uid,
          to_id: userStore.userid,
          msg: text,
          time: new Date().toLocaleString('zh-CN').replace(/\//g, '-'),
        }
        chatStore.addMessage(message)
      })
    } else {
      //更新在线期间聊天对象
      const { uid, from, icon, text } = data

      const user = {
        uid,
        name: from,
        icon,
      }

      if (!users.some((item) => item.uid === user.uid)) {
        chatStore.addUser(user)
      }
      const message = {
        from_id: uid,
        to_id: userStore.userid,
        msg: text,
        time: new Date().toLocaleString('zh-CN').replace(/\//g, '-'),
      }
      chatStore.addMessage(message)
    }
  },
  { deep: true },
)
</script>

<style lang="less" scoped>
.aside {
  width: 15%;
  height: 100vh;
  border-right: 2px solid #dcdfe6;
  border-radius: 10px;
  background-color: #dbf4f3;

  .header {
    padding: 0;
    width: 100%;
    display: flex;
    // height: 8vh;
    // justify-content: center;
    align-items: center;

    h3 {
      margin: 0 10px;
    }
  }
}

.logo {
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 100px;
  background-image: url('@/assets/login/logo.png');
  background-size: 150%;
  background-position: center 20%;
  background-repeat: no-repeat;
}

.ain {
  transition: all;
}
</style>
