import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLoginUser } from '@/api/userController.ts'
import ACCESS_ENUM from '@/access/accessEnum'

/**
 * 登录用户信息存储
 */
export const useLoginUserStore = defineStore('loginUser', () => {
  const defaultLoginUser: API.LoginUserVO = {
    userName: '未登录',
  }
  const notLoginUser: API.LoginUserVO = {
    ...defaultLoginUser,
    userRole: ACCESS_ENUM.NOT_LOGIN,
  }

  // 默认值
  const loginUser = ref<API.LoginUserVO>({ ...defaultLoginUser })

  // 获取登录用户信息
  async function fetchLoginUser() {
    try {
      const res = await getLoginUser()
      if (res.data.code === 0 && res.data.data) {
        loginUser.value = res.data.data
        return
      }
      loginUser.value = { ...notLoginUser }
    } catch (error) {
      loginUser.value = { ...notLoginUser }
    }
  }
  // 更新登录用户信息
  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser
  }

  // 重置登录用户信息
  function resetLoginUser() {
    loginUser.value = { ...notLoginUser }
  }

  return { loginUser, setLoginUser, resetLoginUser, fetchLoginUser }
})
