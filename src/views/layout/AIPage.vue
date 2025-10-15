<template>
  <div class="main">
    <div class="navbar">辅助诊断</div>
    <div class="list" ref="content">
      <MsgItem v-for="msg in msgList" :key="msg.id" :msg="msg" :icon="icon"></MsgItem>
      <MsgItem
        :msg="{ from_id: 0, to_id: userid }"
        :icon="icon"
        v-if="chatStore.aiMsg !== ''"
      ></MsgItem>
    </div>
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
import { ref, onMounted, onUpdated } from 'vue'

const chatStore = useChatStore()
const userStore = useUserStore()
const chatSocket = useWebSocketStore().chatSocket

const toId = 0
const icon = 'https://image.acg.lol/file/2025/09/17/AI.png'
const userid = userStore.userid

const msg = ref('')
const content = ref(null)
const msgList = chatStore.aiHistoryMsg

const submit = () => {
  if (chatStore.aiMsg !== '') {

    const aiMsgToUpdate = {
      from_id: 0,
      msg: chatStore.aiMsg,
      time: new Date().toLocaleString('zh-CN').replace(/\//g, '-'),
      to_id: userid,
    }
    chatStore.clearAIMsg()
    chatStore.addAiMessage(aiMsgToUpdate)
  }
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
  chatStore.addAiMessage(message)
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
// * {
//   border: 1px dashed grey;
//   box-sizing: border-box;
// }

.main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .navbar {
    width: 100%;
    height: 8vh;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    line-height: 8vh;
    font-weight: bolder;
    font-size: 20px;
  }
}

// .to-name {
//   display: flex;
//   height: 100%;
// }

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
