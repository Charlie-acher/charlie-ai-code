<template>
  <a-layout-footer class="footer">
    <div class="footer-content">
      <p class="copyright">
        <a
          href="https://www.codefather.cn"
          target="_blank"
          rel="noopener noreferrer"
          class="author-link"
        >
            © 2026 Charlie-acher
        </a>
      </p>
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts">
// 无需额外的响应式数据
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 18px 24px 22px;
  background: rgba(255, 255, 255, 0.72);
  border-top: 1px solid rgba(15, 23, 42, 0.04);
}

.copyright {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}

.author-link {
  color: inherit;
  text-decoration: none;
}

.author-link:hover {
  color: #0f766e;
}
</style>
