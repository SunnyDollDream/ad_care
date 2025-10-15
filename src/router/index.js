import { useUserStore } from '@/stores'
import AIPage from '@/views/layout/AIPage.vue'
import ChatPage from '@/views/layout/patient/ChatPage.vue'
import EditPage from '@/views/layout/me/EditPage.vue'
import FallbackPage from '@/views/layout/me/FallbackPage.vue'
import LayoutContainer from '@/views/layout/LayoutContainer.vue'
import MedicalRecord from '@/views/layout/record/MedicalRecordPage.vue'
import MePage from '@/views/layout/me/MePage.vue'
import PatientPage from '@/views/layout/patient/PatientPage.vue'
import LoginPage from '@/views/login/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HelpPage from '@/views/layout/me/HelpPage.vue'
import AboutUsPage from '@/views/layout/me/AboutUsPage.vue'
import LicensePage from '@/views/layout/me/LicensePage.vue'
import DetailPage from '@/views/layout/record/DetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: LoginPage },
    {
      path: '/',
      component: LayoutContainer,
      redirect:'/patient',
      children: [
        { path: '/ai', component: AIPage },
        { path: '/chat', component: ChatPage },
        {
          path: '/record',
          component: MedicalRecord,
          children: [{ path: '/record/detail', component: DetailPage }],
        },
        {
          path: '/me',
          component: MePage,
          children: [
            { path: '/me/edit', component: EditPage },
            { path: '/me/fallback', component: FallbackPage },
            { path: '/me/help', component: HelpPage },
            { path: '/me/about', component: AboutUsPage },
            { path: '/me/license', component: LicensePage },
          ],
        },
        {
          path: '/patient',
          component: PatientPage,
          children: [{ path: '/patient/chat', component: ChatPage }],
        },
      ],
    },
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
  const token = userStore.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
