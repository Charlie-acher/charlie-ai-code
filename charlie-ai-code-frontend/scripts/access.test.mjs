import assert from 'node:assert/strict'
import { createServer } from 'vite'

const server = await createServer({
  appType: 'custom',
  logLevel: 'silent',
  server: {
    middlewareMode: true,
  },
})

try {
  const { default: ACCESS_ENUM } = await server.ssrLoadModule('/src/access/accessEnum.ts')
  const { default: checkAccess } = await server.ssrLoadModule('/src/access/checkAccess.ts')
  const { filterAccessibleMenus } = await server.ssrLoadModule('/src/access/menuAccess.ts')

  assert.equal(checkAccess(undefined), true)
  assert.equal(checkAccess(undefined, ACCESS_ENUM.USER), false)
  assert.equal(checkAccess({ userRole: ACCESS_ENUM.USER }, ACCESS_ENUM.ADMIN), false)
  assert.equal(checkAccess({ userRole: ACCESS_ENUM.ADMIN }, ACCESS_ENUM.ADMIN), true)

  const menus = [
    { label: 'Home', routeName: 'homePage' },
    { label: 'Admin', routeName: 'adminUserManage' },
    { label: 'Hidden', routeName: 'hiddenPage' },
  ]
  const routes = [
    { name: 'homePage', meta: {} },
    { name: 'adminUserManage', meta: { access: ACCESS_ENUM.ADMIN } },
    { name: 'hiddenPage', meta: { hideInMenu: true } },
  ]

  const userMenus = filterAccessibleMenus(menus, routes, { userRole: ACCESS_ENUM.USER })
  assert.deepEqual(
    userMenus.map((item) => item.routeName),
    ['homePage'],
  )

  const adminMenus = filterAccessibleMenus(menus, routes, { userRole: ACCESS_ENUM.ADMIN })
  assert.deepEqual(
    adminMenus.map((item) => item.routeName),
    ['homePage', 'adminUserManage'],
  )
} finally {
  await server.close()
}
