<template>
  <DetailLayout page-title="결제 완료">
    <div class="flex flex-col justify-center">
      <h1 class="text-2xl font-bold mb-4">결제가 완료되었습니다.</h1>
      <div class="text-center">
        <button class="btn btn-primary" @click="$router.push('/')">홈으로</button>
      </div>
    </div>
  </DetailLayout>
</template>
<script setup lang="ts">
import DetailLayout from '@/components/layouts/DetailLayout.vue'
</script>
