import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')

    const setToken = (val) => {
      token.value = val
    }

    const userid = ref(null)

    const setUserid = (id) => {
      userid.value = id
    }

    const icon = ref(null)
    const setIcon = (val) => {
      icon.value = val
    }

    return { token, setToken, userid, setUserid, icon, setIcon }
  },
  {
    persist: true,
  },
)
