// 首先导入router
import { useRouter } from 'vue-router'

// 在组件中使用
const router = useRouter()

// 刷新当前页面的方法
export const refreshPage = () => {
  router.go(0)
}
