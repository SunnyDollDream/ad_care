import router from '@/router'
import { useUserStore } from '@/stores'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'http://101.126.153.13:8082'

const instance = axios.create({
  baseURL,
  timeout: 10000,
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if(userStore.token){
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => {
    Promise.reject(err)
  },
)

instance.interceptors.response.use(
  (res) => {
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
    if(err.response?.status === 401){
      router.push('/login')
    }
    ElMessage.error(err.response.data.message || '服务异常')
    Promise.reject(err)
  },
)

export default instance
export { baseURL }
