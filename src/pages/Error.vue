<template>
  <AuthLayout class="bg-white">
    <div class="flex flex-col justify-center">
      <h1 class="text-2xl font-bold mb-4 text-center">
        문제가 발생했습니다. <br />
        지속될 경우, 본사로 문의바랍니다.
      </h1>
      <div class="text-center">
        <button class="btn btn-primary" @click="$router.push('/')">홈으로</button>
      </div>
    </div>
  </AuthLayout>
</template>
<script setup lang="ts">
import AuthLayout from '@/components/layouts/AuthLayout.vue'
</script>
<style scoped>
.bg-white {
  background-color: white !important;
}
</style>
