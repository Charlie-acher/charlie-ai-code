import router from '@/router'
import { useLoginUserStore } from '@/stores/loginUser'
import ACCESS_ENUM from './accessEnum'
import checkAccess from './checkAccess'

router.beforeEach(async (to) => {
  const loginUserStore = useLoginUserStore()
  let loginUser = loginUserStore.loginUser
  // 如果之前没登录过，自动登录
  if (!loginUser || !loginUser.userRole) {
    await loginUserStore.fetchLoginUser()
    loginUser = loginUserStore.loginUser
  }

  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true
  }

  // 如果没登录，跳转到登录页面
  if (!loginUser || !loginUser.userRole || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
    return {
      path: '/user/login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  // 如果已经登录了，但是权限不足，那么跳转到无权限页面
  if (!checkAccess(loginUser, needAccess)) {
    return '/noAuth'
  }

  return true
})
