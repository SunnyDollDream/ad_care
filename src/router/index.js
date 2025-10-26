import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/patient',
      children: [
        { path: '/ai', component: () => import('@/views/layout/AIPage.vue') },
        { path: '/chat', component: () => import('@/views/layout/patient/ChatPage.vue') },
        {
          path: '/record',
          component: () => import('@/views/layout/record/MedicalRecordPage.vue'),
          children: [
            {
              path: '/record/detail',
              component: () => import('@/views/layout/record/DetailPage.vue'),
            },
          ],
        },
        {
          path: '/me',
          component: () => import('@/views/layout/me/MePage.vue'),
          children: [
            { path: '/me/edit', component: () => import('@/views/layout/me/EditPage.vue') },
            { path: '/me/fallback', component: () => import('@/views/layout/me/FallbackPage.vue') },
            { path: '/me/help', component: () => import('@/views/layout/me/HelpPage.vue') },
            { path: '/me/about', component: () => import('@/views/layout/me/AboutUsPage.vue') },
            { path: '/me/license', component: () => import('@/views/layout/me/LicensePage.vue') },
          ],
        },
        {
          path: '/patient',
          component: () => import('@/views/layout/patient/PatientPage.vue'),
          children: [
            {
              path: '/patient/chat',
              component: () => import('@/views/layout/patient/ChatPage.vue'),
            },
          ],
        },
      ],
    },
    {
      path:'/test',component:()=>import('@/views/test/Test.vue')
    }
  ],
})

const noAuthUrls = ['/login']

let userStore = {}

router.beforeEach((to, from, next) => {
  if (userStore) userStore = useUserStore()
  if (noAuthUrls.includes(to.path)) {
    next()
    return
  }
  let token = userStore.token
  if (!token) {
    token = sessionStorage.getItem('token')
  }
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
