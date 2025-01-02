<template>
  <AuthLayout>
    <div class="box box-login">
      <h1>Welcome Back</h1>
      <form @submit="submitLogin">
        <div class="input-wrap mb-4">
          <label class="label label-lt" for="email">사용자 계정</label>
          <input v-model="loginInput.userId" class="input" id="userid-input" />
        </div>
        <div class="input-wrap mb-6">
          <label class="label label-lt" for="password">비밀번호</label>
          <input v-model="loginInput.password" class="input" type="password" id="password-input" />
        </div>
        <button class="btn btn-primary w-full" type="submit">로그인</button>
      </form>
    </div>
  </AuthLayout>
</template>
<script setup lang="ts">
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import { ref } from 'vue'
import type { LoginInput } from '@/types/service.type'
import { UserService } from '@/services/user.service'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginInput = ref<LoginInput>({
  userId: '',
  password: '',
})
const userSvc = new UserService()

async function submitLogin(e: Event) {
  e.preventDefault()
  await userSvc.login(loginInput.value)
  router.push({ name: 'home' })
}
</script>
<style scoped>
.box-login {
  width: 320px;
}
</style>
