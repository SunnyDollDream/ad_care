<template>
  <div class="main">
    <div class="navbar">
      <el-page-header @back="$router.push('/patient')" style="width: 100%; display: flex">
        <template #content>
          <span class="to-name"> {{ toUser.name }} </span>
        </template>
      </el-page-header>
    </div>
    <div class="list" ref="content">
      <MsgItem v-for="msg in msgList" :key="msg.id" :msg="msg" :icon="toUser.icon"></MsgItem>
    </div>
    <!-- <div class="chat-msg">
      <div class="aside">
        <div class="avatar"></div>
      </div>
      <div class="content">
        我将查看ChatPage.vue文件的完整内容，特别是第78行附近的CSS样式和相关HTML结构，以了解如何让该容器宽度固定而不被内部文字撑开。
      </div>
      <div class="aside">
        <div class="avatar"></div>
      </div>
    </div> -->
    <div class="bottom">
      <div class="input">
        <el-input
          v-model="msg"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          resize="none"
          style="width: 80%"
        />
        <el-button type="primary" style="width: 18%" @click="submit" :disabled="msg === ''"
          >发送</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import MsgItem from '@/components/MsgItem.vue'
import { useChatStore, useUserStore, useWebSocketStore } from '@/stores'
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, onUpdated } from 'vue'

const route = useRoute()
const chatStore = useChatStore()
const userStore = useUserStore()
const chatSocket = useWebSocketStore().chatSocket

const toId = Number(route.query.id)
const toUser = chatStore.users.filter((item) => item.uid === toId)[0]
const userid = userStore.userid

const msg = ref('')
const content = ref(null)
const msgList = computed(() => {
  return chatStore.historyMsg.filter((item) => {
    return (
      (item.from_id === toId && item.to_id === userid) ||
      (item.from_id === userid && item.to_id === toId)
    )
  })
})

const submit = () => {
  chatSocket.sendMessage({
    to: toId,
    msg: msg.value,
  })
  const message = {
    from_id: userid,
    msg: msg.value,
    time: new Date().toLocaleString('zh-CN').replace(/\//g, '-'),
    to_id: toId,
  }
  chatStore.addMessage(message)
  msg.value = ''
}

onMounted(() => {
  content.value.scrollTop = content.value.scrollHeight
})

onUpdated(() => {
  content.value.scrollTo({
    top: content.value.scrollHeight,
    behavior: 'smooth',
  })
})
</script>

<style lang="less" scoped>

.main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .navbar {
    width: 100%;
    height: 8vh;
    display: flex;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
}

.to-name {
  display: flex;
  height: 100%;
}

.list {
  flex: 1;
  width: 100%;
  height: 80vh;
  overflow: auto;
}

.bottom {
  background-color: #fcfcfc;
  width: 100%;
  padding: 5px;
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.1);

  .input {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
}

// .chat-msg {
//   width: 100%;
//   padding: 10px;
//   display: flex;

//   .aside {
//     width: 15%;
//     display: flex;
//     justify-content: center;

//     .avatar {
//       width: 50px;
//       height: 50px;
//       border-radius: 100%;
//       box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
//     }
//   }

//   .content {
//     width: 70%;
//     margin: 0 10px;
//     padding: 5px;
//     border-radius: 10px;
//     overflow-wrap: break-word;
//     background-color: #dadff8;
//   }
// }
</style>
