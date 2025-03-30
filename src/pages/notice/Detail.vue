<template>
  <DetailLayout page-title="공지사항 상세">
    <section class="notice-detail">
      <h1 class="text-2xl font-bold mb-4">{{ notice.title }}</h1>
      <p class="text-sm text-gray-400">등록일: {{ notice.createdAt }}</p>
      <hr />
      <div class="section" v-html="notice.content"></div>
    </section>
  </DetailLayout>
</template>
<script setup lang="ts">
import DetailLayout from '@/components/layouts/DetailLayout.vue'
import { onMounted, ref } from 'vue'
import type { Notice } from '@/types/service.type'
import { NoticeService } from '@/services/notice.service'
import dayjs from 'dayjs'

const props = defineProps<{
  id: string
}>()
const noticeSvc = new NoticeService()
const notice = ref<Notice>({
  id: 0,
  title: '공지사항',
  content: '로딩중...',
  createdAt: '',
})

onMounted(async () => {
  notice.value = await noticeSvc.getNotice(Number(props.id))
  notice.value.createdAt = dayjs(notice.value.createdAt).format('YYYY-MM-DD HH:mm')
})
</script>
<style scoped>
.notice-detail {
  hr {
    margin: 1rem 0 0.5rem 0;
    border: 1px solid theme('colors.gray.100');
  }
}
</style>
