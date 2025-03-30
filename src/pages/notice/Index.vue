<template>
  <ContentLayout>
    <section class="notice-list">
      <h2>공지사항</h2>
      <div class="section">
        <ul class="notice-list mb-4">
          <li v-for="noti in noticePage.list" class="notice-item" :key="noti.id">
            <router-link :to="`/notice/${noti.id}`" class="notice-item-header">
              <h3 class="text-lg font-semibold">{{ noti.title }}</h3>
              <p class="text-sm text-gray-400">{{ tts(noti.createdAt) }}</p>
            </router-link>
            <p class="notice-item-content">{{ summarizeContent(noti.content) }}</p>
          </li>
        </ul>
        <div class="paginate">
          <button
            v-if="hasBefore"
            class="btn btn-ghost"
            @click="loadPage(noticePage.meta.pageNo - 1)"
          >
            <Icon :icon="BackIcon" />
          </button>
          <button
            v-for="num in pageNo"
            class="btn btn-ghost"
            :key="num"
            :disabled="num === Number(noticePage.meta.pageNo)"
            @click="loadPage(num)"
          >
            {{ num }}
          </button>
          <button
            v-if="hasNext"
            class="btn btn-ghost"
            @click="loadPage(noticePage.meta.pageNo + 1)"
          >
            <Icon :icon="ForwardsIcon" />
          </button>
        </div>
      </div>
    </section>
  </ContentLayout>
</template>
<script setup lang="ts">
import ContentLayout from '@/components/layouts/ContentLayout.vue'
import Icon from '@/components/display/Icon.vue'
import ForwardsIcon from '@/assets/icons/Forward.svg'
import BackIcon from '@/assets/icons/Back.svg'
import { computed, onMounted, ref } from 'vue'
import { NoticeService } from '@/services/notice.service'
import type { PaginatedResponse } from '@/types/ui.type'
import type { Notice } from '@/types/service.type'
import { summarizeContent, tts } from '@/utils/index.util'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const noticeSvc = new NoticeService()
const noticePage = ref<PaginatedResponse<Notice>>({
  list: [],
  meta: {
    totalCount: 0,
    pageNo: 1,
    pageSize: 10,
    totalPage: 10,
  },
})
const pageNo = computed<number[]>(() => {
  const { totalPage, pageNo } = noticePage.value.meta
  const start = pageNo - 2 > 0 ? pageNo - 2 : 1
  const end = start + 4 < totalPage ? start + 4 : totalPage
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
const hasNext = computed(() => {
  const { totalPage, pageNo } = noticePage.value.meta
  return pageNo < totalPage
})

const hasBefore = computed(() => {
  const { pageNo } = noticePage.value.meta
  return pageNo > 1
})

const currentPage = computed(() => {
  const pgp = route.query.page
  return pgp ? Number(pgp) : 1
})

onMounted(async () => {
  await loadPage(currentPage.value)
})

async function loadPage(pageNo: number) {
  noticePage.value = await noticeSvc.listNotice({ page: pageNo })
  await router.push({ query: { page: pageNo } })
}
</script>
<style scoped>
.notice-list {
  .notice-item {
    padding: 1rem;
    background-color: white;
    cursor: pointer;

    .notice-item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .notice-item-content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-wrap: pretty;
      color: #666;
      font-size: 0.875rem;
    }
  }

  .notice-item:not(:last-child) {
    border-bottom: 2px solid theme('colors.gray.100');
  }

  .notice-item:hover {
    background-color: theme('colors.gray.100');
  }
}

.paginate {
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  .btn {
    width: 2rem;
    height: 2rem;
    padding: 8px;
    line-height: 16px;
  }

  i {
    width: 1rem;
    height: 1rem;
  }
}
</style>
