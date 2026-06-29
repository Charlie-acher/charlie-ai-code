<template>
  <section class="auth-page">
    <KnowledgeNetworkBackground />

    <div class="auth-content">
      <aside class="brand-panel">
        <div class="brand-copy">
          <p class="eyebrow">{{ eyebrow }}</p>
          <h1>{{ title }}</h1>
          <p class="subtitle">{{ subtitle }}</p>
        </div>

        <div class="build-flow" aria-label="妙搭应用搭建流程">
          <span>灵感</span>
          <span>知识</span>
          <span>组件</span>
          <span>应用</span>
        </div>
      </aside>

      <section class="auth-card">
        <slot></slot>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import KnowledgeNetworkBackground from '@/components/KnowledgeNetworkBackground.vue'

defineProps<{
  eyebrow: string
  title: string
  subtitle: string
}>()
</script>

<style scoped>
.auth-page {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
}

.auth-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(280px, 0.95fr) minmax(360px, 460px);
  gap: 64px;
  align-items: center;
  width: min(1180px, calc(100% - 48px));
  min-height: 100vh;
  min-height: 100svh;
  margin: 0 auto;
  padding: 56px 0;
}

.brand-panel {
  display: flex;
  flex-direction: column;
  gap: 34px;
  max-width: 560px;
}

.brand-copy {
  display: grid;
  gap: 14px;
}

.eyebrow {
  width: fit-content;
  margin: 0;
  padding: 7px 12px;
  color: #0f766e;
  font-size: 13px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(15, 118, 110, 0.14);
  border-radius: 999px;
}

h1 {
  max-width: 520px;
  margin: 0;
  color: #101827;
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: 0;
  text-wrap: pretty;
}

.subtitle {
  max-width: 500px;
  margin: 0;
  color: rgba(16, 24, 39, 0.72);
  font-size: 17px;
  line-height: 1.8;
}

.build-flow {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.build-flow span {
  padding: 9px 14px;
  color: #172033;
  font-size: 14px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(16, 24, 39, 0.08);
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(15, 118, 110, 0.08);
}

.auth-card {
  width: 100%;
  padding: 34px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 28px;
  box-shadow: 0 28px 90px rgba(15, 23, 42, 0.16);
  backdrop-filter: blur(22px);
}

@media (max-width: 900px) {
  .auth-content {
    grid-template-columns: 1fr;
    gap: 32px;
    width: min(560px, calc(100% - 32px));
    padding: 44px 0;
  }

  .brand-panel {
    gap: 22px;
  }

  .auth-card {
    padding: 26px;
    border-radius: 22px;
  }
}
</style>
