<template>
  <div class="chat-msg">
    <div class="aside">
      <div class="avatar" v-if="msg.from_id !== userStore.userid">
        <img :src="icon" alt="" />
      </div>
    </div>
    <div
      class="content"
      :style="{ backgroundColor: msg.from_id === userStore.userid ? '#dadff8' : '#f9f9f9' }"
    >
      <div v-if="props.msg.msg" v-html="messageContent" class="ai"></div>
      <div v-else v-html="messageContent" class="ai"></div>
    </div>
    <div class="aside">
      <div class="avatar" v-if="msg.from_id === userStore.userid">
        <img :src="userStore.icon" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChatStore, useUserStore } from '@/stores'
import { marked } from 'marked'
import { computed } from 'vue'

const userStore = useUserStore()
const chatStore = useChatStore()

const props = defineProps({
  msg: Object,
  icon: String,
})

// 创建计算属性来解析 Markdown 内容
const messageContent = computed(() => {
  const content = props.msg?.msg || chatStore.aiMsg || ''
  return marked.parse(content)
})
</script>

<style lang="less" scoped>
.chat-msg {
  width: 100%;
  padding: 10px;
  display: flex;

  .aside {
    width: 15%;
    display: flex;
    justify-content: center;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        background-size: contain;
      }
    }
  }

  .content {
    width: 70%;
    margin: 0 10px;
    padding: 15px;
    border-radius: 10px;
    overflow-wrap: break-word;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);
  }
}

.ai {
  list-style-position: inside;
}
</style>
