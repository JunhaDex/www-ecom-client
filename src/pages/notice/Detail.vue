<template>
  <DetailLayout page-title="공지사항 상세">
    <section class="notice-detail">
      <h1 class="text-2xl font-bold mb-4">공지사항 제목</h1>
      <p class="text-sm text-gray-400">등록일: 2024-12-05 12:35</p>
      <hr />
      <div class="section">
        <p>공지사항 내용</p>
      </div>
    </section>
  </DetailLayout>
</template>
<script setup lang="ts">
import DetailLayout from '@/components/layouts/DetailLayout.vue'
</script>
<style scoped>
.notice-detail {
  hr {
    margin: 1rem 0 0.5rem 0;
    border: 1px solid theme('colors.gray.100');
  }
}
</style>
