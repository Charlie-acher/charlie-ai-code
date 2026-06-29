<script setup lang="ts">
import {
  AppstoreOutlined,
  ArrowRightOutlined,
  DownOutlined,
  SendOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'

const promptTags = ['波普风电商页面', '企业网站', '电商运营后台', '暗黑话题社区']
const categories = ['全部', '工具', '网站', '数据分析', '活动页面', '管理平台', '用户应用', '个人管理', '游戏']

const showcases = [
  {
    title: 'AI Coding 工作台',
    desc: '把一句需求拆成页面、接口和组件任务',
    category: '工具',
    tone: 'dark',
  },
  {
    title: '企业官网生成器',
    desc: '品牌、栏目、内容区块一键编排',
    category: '网站',
    tone: 'mint',
  },
  {
    title: '运营数据驾驶舱',
    desc: '从指标到图表的轻量管理后台',
    category: '数据分析',
    tone: 'blue',
  },
  {
    title: '活动报名页',
    desc: '海报、表单、名单流转一次搭好',
    category: '活动页面',
    tone: 'sunset',
  },
]
</script>

<template>
  <main class="home-page">
    <section class="hero-section">
      <div class="hero-inner">
        <div class="hero-title">
          <h1>一句话 <span>搭</span> 出所想</h1>
          <p>与 AI 对话，轻松创建应用和网站</p>
        </div>

        <div class="prompt-box">
          <div class="prompt-text">使用 妙搭 创建一个活动宣传页面，活动规则是......</div>
          <div class="prompt-actions">
            <button class="subtle-action" type="button">
              <UploadOutlined />
              <span>上传</span>
            </button>
            <button class="subtle-action muted" type="button">优化</button>
            <button class="send-button" type="button" aria-label="开始生成">
              <SendOutlined />
            </button>
          </div>
        </div>

        <div class="prompt-tags" aria-label="快捷提示词">
          <button v-for="tag in promptTags" :key="tag" type="button">{{ tag }}</button>
        </div>
      </div>
    </section>

    <section id="showcase" class="showcase-section">
      <div class="showcase-panel">
        <div class="showcase-header">
          <h2>案例广场</h2>
          <a-button class="all-cases-button">
            <AppstoreOutlined />
            全部案例
            <ArrowRightOutlined />
          </a-button>
        </div>

        <div class="filters-row">
          <a-button class="sort-button">
            默认排序
            <DownOutlined />
          </a-button>
          <div class="category-tabs">
            <button
              v-for="category in categories"
              :key="category"
              :class="{ active: category === '全部' }"
              type="button"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <div class="case-grid">
          <article v-for="item in showcases" :key="item.title" class="case-card" :class="item.tone">
            <div class="case-preview">
              <div class="preview-window">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="preview-lines">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
            <div class="case-info">
              <span>{{ item.category }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  min-height: calc(100vh - 137px);
  overflow: hidden;
  color: #101827;
  background:
    radial-gradient(circle at 8% 50%, rgba(61, 220, 207, 0.34), transparent 30%),
    radial-gradient(circle at 82% 58%, rgba(59, 130, 246, 0.44), transparent 36%),
    linear-gradient(180deg, #ffffff 0%, #fbfbf7 12%, #e9fbf7 38%, #71d6e1 66%, #4f8df7 100%);
}

.hero-section {
  min-height: 710px;
  padding: 142px 24px 96px;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(960px, 100%);
  margin: 0 auto;
}

.hero-title {
  display: grid;
  gap: 14px;
  text-align: center;
}

.hero-title h1 {
  margin: 0;
  color: #101827;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: clamp(38px, 5.4vw, 54px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: 0;
}

.hero-title h1 span {
  display: inline-grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin: 0 5px;
  color: #fff;
  font-size: 28px;
  background: #10d5b2;
  border-radius: 50%;
  transform: translateY(-2px);
}

.hero-title p {
  margin: 0;
  color: rgba(16, 24, 39, 0.68);
  font-size: 16px;
  line-height: 1.7;
}

.prompt-box {
  width: min(736px, 100%);
  min-height: 150px;
  margin-top: 42px;
  padding: 18px 18px 14px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(16, 24, 39, 0.08);
  border-radius: 22px;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(14px);
}

.prompt-text {
  min-height: 82px;
  color: #8c9ab2;
  font-size: 16px;
  line-height: 1.7;
}

.prompt-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.subtle-action,
.send-button,
.prompt-tags button,
.category-tabs button {
  border: 0;
  cursor: pointer;
  font-family: inherit;
}

.subtle-action {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 12px;
  color: #253044;
  background: #f4f6f8;
  border-radius: 999px;
}

.subtle-action.muted {
  color: #a1a9b6;
}

.send-button {
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin-left: auto;
  color: #fff;
  background: #b8c0ca;
  border-radius: 50%;
}

.prompt-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 22px;
}

.prompt-tags button {
  height: 34px;
  padding: 0 14px;
  color: #516175;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(16, 24, 39, 0.06);
  border-radius: 9px;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.07);
}

.showcase-section {
  position: relative;
  z-index: 1;
  padding: 0 24px 96px;
  margin-top: -118px;
}

.showcase-panel {
  width: min(1440px, 100%);
  padding: 38px 42px 46px;
  margin: 0 auto;
  background: #fff;
  border-radius: 30px 30px 0 0;
  box-shadow: 0 -22px 80px rgba(15, 23, 42, 0.12);
}

.showcase-header,
.filters-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.showcase-header h2 {
  margin: 0;
  color: #101827;
  font-size: 26px;
  font-weight: 900;
}

.all-cases-button,
.sort-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-color: rgba(16, 24, 39, 0.1);
  border-radius: 999px;
}

.filters-row {
  margin-top: 18px;
}

.category-tabs {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.category-tabs button {
  height: 36px;
  padding: 0 18px;
  color: #5b6678;
  background: #f5f7f9;
  border-radius: 999px;
}

.category-tabs button.active {
  color: #fff;
  background: #101827;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-top: 20px;
}

.case-card {
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(16, 24, 39, 0.08);
  border-radius: 8px;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
}

.case-preview {
  position: relative;
  min-height: 156px;
  padding: 18px;
  background: linear-gradient(135deg, #111827, #111827 40%, #334155);
}

.case-card.mint .case-preview {
  background: linear-gradient(135deg, #bbf7d0, #67e8f9);
}

.case-card.blue .case-preview {
  background: linear-gradient(135deg, #dbeafe, #60a5fa);
}

.case-card.sunset .case-preview {
  background: linear-gradient(135deg, #fed7aa, #f97316);
}

.preview-window {
  display: flex;
  gap: 5px;
  width: 100%;
  height: 24px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.86);
  border-radius: 8px;
}

.preview-window span {
  width: 8px;
  height: 8px;
  background: rgba(16, 24, 39, 0.28);
  border-radius: 50%;
}

.preview-lines {
  display: grid;
  gap: 12px;
  margin-top: 28px;
}

.preview-lines i {
  display: block;
  height: 12px;
  background: rgba(255, 255, 255, 0.72);
  border-radius: 999px;
}

.preview-lines i:nth-child(1) {
  width: 72%;
}

.preview-lines i:nth-child(2) {
  width: 48%;
}

.preview-lines i:nth-child(3) {
  width: 84%;
}

.case-info {
  padding: 16px;
}

.case-info span {
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
}

.case-info h3 {
  margin: 6px 0 6px;
  color: #101827;
  font-size: 17px;
  font-weight: 900;
}

.case-info p {
  margin: 0;
  color: #6b7280;
  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 1100px) {
  .case-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .hero-section {
    min-height: 650px;
    padding: 86px 16px 78px;
  }

  .hero-title h1 span {
    width: 40px;
    height: 40px;
    font-size: 23px;
  }

  .prompt-box {
    margin-top: 32px;
  }

  .showcase-section {
    padding: 0 12px 64px;
  }

  .showcase-panel {
    padding: 28px 18px 34px;
    border-radius: 24px 24px 0 0;
  }

  .showcase-header,
  .filters-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .category-tabs {
    justify-content: flex-start;
  }

  .case-grid {
    grid-template-columns: 1fr;
  }
}
</style>
