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

    const updateAIMsg = (val) => {
      aiMsg.value += val
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
