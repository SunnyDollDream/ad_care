import Layout from '@/views/layout/index.vue'
import Home from '@/views/layout/home.vue'
import Login from '@/views/login/index.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [{ path: '/home', component: Home }],
      redirect: '/home',
    },
    { path: '/login', component: Login },
  ],
})

const authUrls = ['/login']

router.beforeEach((to,from,next) => {
  if (authUrls.includes(to.path)) {
    next()
    return
  }
  const token = getToken()
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
