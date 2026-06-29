<template>
  <a-layout-header class="site-header">
    <div class="header-inner">
      <RouterLink class="brand-link" :to="{ name: 'homePage' }" aria-label="妙搭首页">
        <img class="logo" src="@/assets/logo.png" alt="妙搭 Logo" />
        <img class="title" src="@/assets/title.png" alt="妙搭" />
      </RouterLink>

      <nav class="nav-links" aria-label="主导航">
        <RouterLink
          v-for="item in navItems"
          :key="item.routeName"
          class="nav-link"
          :class="{ active: isActiveRoute(item.routeName) }"
          :to="{ name: item.routeName }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="header-actions">
        <a-dropdown v-if="loginUserStore.loginUser.id" :trigger="['hover']" placement="bottomRight">
          <button class="user-trigger" type="button" aria-label="用户菜单">
            <a-avatar class="user-avatar" :src="loginUserStore.loginUser.userAvatar">
              {{ userInitial }}
            </a-avatar>
            <span class="user-name">{{ displayName }}</span>
          </button>

          <template #overlay>
            <div class="user-menu-card">
              <div class="user-menu-profile">
                <a-avatar class="menu-avatar" :src="loginUserStore.loginUser.userAvatar">
                  {{ userInitial }}
                </a-avatar>
                <div>
                  <p class="menu-name">{{ displayName }}</p>
                  <p class="menu-account">{{ loginUserStore.loginUser.userAccount || '妙搭创作者' }}</p>
                </div>
              </div>

              <button class="menu-item" type="button" @click="handleProfileClick">
                <UserOutlined />
                <span>个人中心</span>
              </button>
              <RouterLink class="menu-item" :to="{ name: 'homePage', hash: '#showcase' }">
                <AppstoreOutlined />
                <span>我的作品</span>
              </RouterLink>

              <button class="menu-item logout" type="button" @click="handleLogout">
                <LogoutOutlined />
                <span>退出登录</span>
              </button>
            </div>
          </template>
        </a-dropdown>

        <RouterLink v-else to="/user/login">
          <a-button class="login-button" type="primary">登录</a-button>
        </RouterLink>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import {
  AppstoreOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { userLogout } from '@/api/userController'
import { useLoginUserStore } from '@/stores/loginUser'
import { filterAccessibleMenus } from '@/access/menuAccess'

const route = useRoute()
const router = useRouter()
const loginUserStore = useLoginUserStore()

const menus = [
  {
    label: '主页',
    routeName: 'homePage',
  },
  {
    label: '用户管理',
    routeName: 'adminUserManage',
  },
]

const navItems = computed(() =>
  filterAccessibleMenus(menus, router.getRoutes(), loginUserStore.loginUser),
)

const displayName = computed(() => {
  return loginUserStore.loginUser.userName || loginUserStore.loginUser.userAccount || '妙搭用户'
})

const userInitial = computed(() => displayName.value.slice(0, 1))

const isActiveRoute = (routeName: string) => route.name === routeName

const handleProfileClick = () => {
  message.info('个人中心即将开放')
}

const handleLogout = async () => {
  const res = await userLogout()

  if (res.data.code === 0) {
    loginUserStore.resetLoginUser()
    message.success('已退出登录')
    router.push({ name: 'homePage' })
    return
  }

  message.error(`退出登录失败，${res.data.message ?? '请稍后重试'}`)
}
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  height: 76px;
  padding: 0;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid rgba(16, 24, 39, 0.06);
  backdrop-filter: blur(18px);
}

.header-inner {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1380px;
  height: 100%;
  padding: 0 32px;
  margin: 0 auto;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  gap: 8px;
  line-height: 1;
}

.logo {
  width: 54px;
  height: 54px;
  object-fit: contain;
}

.title {
  width: auto;
  height: 34px;
  object-fit: contain;
}

.nav-links {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 38px;
  height: 100%;
  margin-left: 54px;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  color: #253044;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.nav-link::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3px;
  content: '';
  background: #1677ff;
  border-radius: 999px 999px 0 0;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #1677ff;
}

.nav-link:hover {
  transform: translateY(-1px);
}

.nav-link.active {
  font-weight: 700;
}

.nav-link.active::after {
  transform: scaleX(1);
}

.header-actions {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}

.login-button {
  min-width: 82px;
  height: 38px;
  padding: 0 24px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  background: #101827;
  border-color: #101827;
  border-radius: 12px;
  box-shadow: none;
}

.login-button:hover,
.login-button:focus {
  color: #fff;
  background: #172033;
  border-color: #172033;
}

.user-trigger {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  color: #101827;
  font-weight: 700;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.user-trigger:hover {
  color: #1677ff;
  transform: translateY(-1px);
}

.user-avatar,
.menu-avatar {
  color: #fff;
  font-weight: 800;
  background: linear-gradient(135deg, #14b8a6, #8b5cf6);
}

.user-name {
  max-width: 108px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.user-menu-card {
  width: 220px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(16, 24, 39, 0.08);
  border-radius: 8px;
  box-shadow: 0 18px 46px rgba(15, 23, 42, 0.18);
  backdrop-filter: blur(18px);
}

.user-menu-profile {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 4px 4px 10px;
}

.menu-name {
  margin: 0;
  color: #101827;
  font-size: 14px;
  font-weight: 800;
}

.menu-account {
  max-width: 150px;
  margin: 2px 0 0;
  overflow: hidden;
  color: #8a94a6;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 9px;
  padding: 8px 6px;
  color: #101827;
  font-size: 13px;
  line-height: 1;
  text-align: left;
  text-decoration: none;
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.menu-item:hover {
  color: #1677ff;
  background: rgba(22, 119, 255, 0.08);
}

.menu-item.logout {
  margin-top: 6px;
  color: #ef4444;
  border-top: 1px solid rgba(16, 24, 39, 0.08);
  border-radius: 0 0 6px 6px;
}

.menu-item.logout:hover {
  color: #dc2626;
  background: rgba(239, 68, 68, 0.08);
}

@media (max-width: 768px) {
  .site-header {
    height: 68px;
  }

  .header-inner {
    padding: 0 18px;
  }

  .logo {
    width: 46px;
    height: 46px;
  }

  .title {
    height: 30px;
  }

  .nav-links {
    gap: 20px;
    margin-left: 24px;
  }

  .header-actions {
    margin-left: auto;
  }

  .login-button {
    min-width: 72px;
    height: 36px;
    padding: 0 18px;
  }

  .user-name {
    display: none;
  }
}
</style>
