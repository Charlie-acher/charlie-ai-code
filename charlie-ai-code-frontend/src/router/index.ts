import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import UserLoginPage from '../pages/user/UserLoginPage.vue'
import UserRegisterPage from '../pages/user/UserRegesiterPage.vue'
import UserManagePage from '../pages/admin/UserManagePage.vue'
import NoAuthPage from '@/pages/NoAuthPage.vue'
import ACCESS_ENUM from '@/access/accessEnum.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage,
    },
    {
      path: '/user/login',
      name: 'userLogin',
      component: UserLoginPage,
      meta: {
        layout: 'blank',
      },
    },
    {
      path: '/user/register',
      name: 'userRegister',
      component: UserRegisterPage,
      meta: {
        layout: 'blank',
      },
    },
    {
      path: '/admin/userManage',
      name: 'adminUserManage',
      component: UserManagePage,
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
    {
      path: '/noAuth',
      name: 'noAuthPage',
      component: NoAuthPage,
      meta: {
        hideInMenu: true,
      },
    },
  ],
})

export default router
