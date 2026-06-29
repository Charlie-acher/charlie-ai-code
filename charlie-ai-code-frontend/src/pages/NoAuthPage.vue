<template>
  <main class="no-auth-page">
    <a-result status="403" title="你没有权限" sub-title="当前账号无权访问该页面">
      <template #extra>
        <RouterLink :to="{ name: 'homePage' }">
          <a-button type="primary">返回首页</a-button>
        </RouterLink>
      </template>
    </a-result>
  </main>
</template>

<style scoped>
.no-auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 137px);
  padding: 48px 16px;
}
</style>
