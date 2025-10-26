import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore(
  'chat',
  () => {
    const users = ref([])
    const historyMsg = ref([])
    const aiMsg = ref('')
    const aiHistoryMsg = ref([])

    const addUser = (user) => {
      users.value.push(user)
    }

    const addMessage = (msg) => {
      msg.id = historyMsg.value.length
      historyMsg.value.push(msg)
    }

    const updateAIMsg = (val, userid) => {
      if (aiHistoryMsg.value[aiHistoryMsg.value.length - 1].from_id === 0) {
        aiHistoryMsg.value[aiHistoryMsg.value.length - 1].msg += val
      } else {
        aiHistoryMsg.value.push({
          from_id: 0,
          to_id: userid,
          msg: val,
          time: new Date().toLocaleString('zh-CN').replace(/\//g, '-'),
          id: aiHistoryMsg.value.length,
        })
      }
    }

    const clearAIMsg = () => {
      aiMsg.value = ''
    }

    const addAiMessage = (msg) => {
      msg.id = aiHistoryMsg.value.length
      aiHistoryMsg.value.push(msg)
    }

    return {
      users,
      historyMsg,
      addUser,
      addMessage,
      aiHistoryMsg,
      addAiMessage,
      aiMsg,
      clearAIMsg,
      updateAIMsg,
    }
  },
  {
    persist: true,
  },
)
