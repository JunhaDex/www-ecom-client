<template>
  <AuthLayout>
    <div class="box box-login">
      <h1>Welcome Back</h1>
      <form>
        <div class="input-wrap mb-4">
          <label class="label label-lt" for="email">사용자 계정</label>
          <input class="input" type="email" id="email-input" />
        </div>
        <div class="input-wrap mb-6">
          <label class="label label-lt" for="password">비밀번호</label>
          <input class="input" type="password" id="password-input" />
        </div>
        <button class="btn btn-primary w-full" type="submit">로그인</button>
      </form>
    </div>
  </AuthLayout>
</template>
<script setup lang="ts">
import AuthLayout from '@/components/layouts/AuthLayout.vue'
</script>
<style scoped>
.box-login {
  width: 320px;
}
</style>
