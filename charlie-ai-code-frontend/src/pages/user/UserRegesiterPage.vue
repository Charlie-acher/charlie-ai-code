<template>
  <AuthPageShell
    eyebrow="开始搭建"
    title="创建账号，连接你的第一个应用网络"
    subtitle="注册后即可回到登录页，用妙搭把需求、知识和页面组件组织成可运行的 AI 应用。"
  >
    <div class="form-heading">
      <p>新用户注册</p>
      <h2>创建妙搭账号</h2>
    </div>

    <a-form
      class="auth-form"
      :model="formState"
      layout="vertical"
      autocomplete="off"
      @finish="handleSubmit"
    >
      <a-form-item label="账号" name="userAccount" :rules="[{ required: true, message: '请输入账号' }]">
        <a-input v-model:value="formState.userAccount" size="large" placeholder="请输入账号" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="userPassword"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 8, message: '密码不能小于 8 位' },
        ]"
      >
        <a-input-password
          v-model:value="formState.userPassword"
          size="large"
          placeholder="至少 8 位密码"
        />
      </a-form-item>

      <a-form-item
        label="确认密码"
        name="checkPassword"
        :rules="[
          { required: true, message: '请确认密码' },
          { min: 8, message: '密码不能小于 8 位' },
          { validator: validateCheckPassword },
        ]"
      >
        <a-input-password
          v-model:value="formState.checkPassword"
          size="large"
          placeholder="请再次输入密码"
        />
      </a-form-item>

      <a-button class="submit-button" type="primary" html-type="submit" :loading="submitting">
        注册并返回登录
      </a-button>
    </a-form>

    <p class="switch-tips">
      已有账号？
      <RouterLink to="/user/login">去登录</RouterLink>
    </p>
  </AuthPageShell>
</template>

<script setup lang="ts">
import AuthPageShell from '@/components/AuthPageShell.vue'
import { userRegister } from '@/api/userController'
import { message } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const submitting = ref(false)

const formState = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
})

const validateCheckPassword = async (_rule: unknown, value: string) => {
  if (value && value !== formState.userPassword) {
    return Promise.reject(new Error('两次输入密码不一致'))
  }

  return Promise.resolve()
}

const handleSubmit = async (values: API.UserRegisterRequest) => {
  submitting.value = true

  try {
    const res = await userRegister(values)

    if (res.data.code === 0) {
      message.success('注册成功，请登录')
      router.push({
        path: '/user/login',
        replace: true,
      })
      return
    }

    message.error(`注册失败，${res.data.message ?? '请稍后重试'}`)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.form-heading {
  display: grid;
  gap: 6px;
  margin-bottom: 26px;
}

.form-heading p {
  margin: 0;
  color: #0f766e;
  font-size: 13px;
  font-weight: 800;
}

.form-heading h2 {
  margin: 0;
  color: #101827;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0;
}

.auth-form {
  display: grid;
  gap: 2px;
}

.auth-form :deep(.ant-form-item-label > label) {
  color: #172033;
  font-weight: 700;
}

.auth-form :deep(.ant-input),
.auth-form :deep(.ant-input-affix-wrapper) {
  min-height: 46px;
  background: rgba(255, 255, 255, 0.88);
  border-color: rgba(16, 24, 39, 0.1);
  border-radius: 14px;
}

.auth-form :deep(.ant-input:hover),
.auth-form :deep(.ant-input-affix-wrapper:hover),
.auth-form :deep(.ant-input:focus),
.auth-form :deep(.ant-input-affix-wrapper-focused) {
  border-color: #14b8a6;
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.12);
}

.submit-button {
  width: 100%;
  height: 48px;
  margin-top: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  background: #101827;
  border-color: #101827;
  border-radius: 14px;
  box-shadow: 0 18px 34px rgba(16, 24, 39, 0.2);
}

.submit-button:hover,
.submit-button:focus {
  background: #172033;
  border-color: #172033;
}

.switch-tips {
  margin: 22px 0 0;
  color: rgba(16, 24, 39, 0.58);
  font-size: 14px;
  text-align: center;
}

.switch-tips a {
  color: #0f766e;
  font-weight: 800;
}
</style>
