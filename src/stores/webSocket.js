import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebSocketStore = defineStore('webSocket', () => {
  const chatSocket = ref(null)
  const setChatSocket = (ws) => {
    chatSocket.value = ws
  }

  return { chatSocket, setChatSocket }
})
