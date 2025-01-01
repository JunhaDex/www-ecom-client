<template>
  <ContentLayout>
    <section class="notice-list">
      <h2>공지사항</h2>
      <div class="section">
        <ul class="notice-list mb-4">
          <li class="notice-item">
            <router-link to="/notice/1" class="notice-item-header">
              <h3 class="text-lg font-semibold">공지사항 제목</h3>
              <p class="text-sm text-gray-400">16분전</p>
            </router-link>
            <p class="notice-item-content">공지사항 내용</p>
          </li>
          <li class="notice-item">
            <router-link to="/notice/1" class="notice-item-header">
              <h3 class="text-lg font-semibold">공지사항 제목</h3>
              <p class="text-sm text-gray-400">3일전</p>
            </router-link>
            <p class="notice-item-content">공지사항 내용</p>
          </li>
        </ul>
        <div class="paginate">
          <button class="btn btn-ghost">
            <Icon :icon="BackIcon" />
          </button>
          <button class="btn btn-ghost">1</button>
          <button class="btn btn-ghost">
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
