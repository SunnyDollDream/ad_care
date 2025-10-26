import router from '@/router'
import { useUserStore } from '@/stores'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'http://localhost:8082'

const instance = axios.create({
  baseURL,
  timeout: 10000,
})

let loadingInstance = null

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()

    config.headers.Authorization = userStore.token || sessionStorage.getItem('token')

    console.log(config.headers.Authorization)

    loadingInstance = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(255, 255, 255, 0.6)',
    })
    return config
  },
  (err) => {
    if (loadingInstance) loadingInstance.close()
    Promise.reject(err)
  },
)

instance.interceptors.response.use(
  (res) => {
    if (loadingInstance) loadingInstance.close()
    if (res.data.code === '00000') {
      return res
    }
    ElMessage.error(res.data.message || '服务异常')
    if (res.data.message === 'token错误') {
      router.push('/login')
    }
    return Promise.reject(res.data)
  },
  (err) => {
    if (loadingInstance) loadingInstance.close()
    if (err.response?.status === 401) {
      router.push('/login')
    }
    console.log(err)

    ElMessage.error(err.response?.data?.message || '服务异常')
    return Promise.reject(err)
  },
)

export default instance
export { baseURL }
