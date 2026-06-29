import type { RouteRecordNormalized } from 'vue-router'
import checkAccess from '@/access/checkAccess'

export type AccessMenuItem = {
  routeName: string
}

const findRouteByMenu = (menu: AccessMenuItem, routes: RouteRecordNormalized[]) => {
  return routes.find((route) => route.name === menu.routeName)
}

export const filterAccessibleMenus = <T extends AccessMenuItem>(
  menus: T[],
  routes: RouteRecordNormalized[],
  loginUser?: API.LoginUserVO,
) => {
  return menus.filter((menu) => {
    const route = findRouteByMenu(menu, routes)
    if (!route) {
      return false
    }
    if (route.meta?.hideInMenu) {
      return false
    }
    return checkAccess(loginUser, route.meta?.access as string)
  })
}
