<template>
  <ContentLayout>
    <section class="dashboard">
      <div class="user-info mb-4">
        <h1 class="text-3xl font-extrabold">의정부역점</h1>
        <Icon :icon="SettingIcon" />
      </div>
      <ul class="box stats">
        <li>
          <p class="mb-2">최근주문</p>
          <router-link to="/order" class="text-2xl font-bold text-primary underline">
            123 건
          </router-link>
        </li>
        <li>
          <p class="mb-2">배송중</p>
          <router-link to="/order" class="text-2xl font-bold text-primary underline">
            4 건
          </router-link>
        </li>
        <li>
          <p class="mb-2">주문 총액</p>
          <span class="text-2xl font-bold">1,232,000 원</span>
        </li>
      </ul>
    </section>
    <section class="product-list">
      <div class="notice-list-wrap mb-4">
        <h2>공지사항</h2>
        <!--vertical list of notice with title, description and uploaded date-->
        <ul class="notice-list mb-4">
          <li class="notice-item">
            <div class="notice-item-header">
              <h3 class="text-lg font-semibold">공지사항 제목</h3>
              <p class="text-sm text-gray-400">16분전</p>
            </div>
            <p class="notice-item-content">공지사항 내용</p>
          </li>
          <li class="notice-item">
            <div class="notice-item-header">
              <h3 class="text-lg font-semibold">공지사항 제목</h3>
              <p class="text-sm text-gray-400">3일전</p>
            </div>
            <p class="notice-item-content">공지사항 내용</p>
          </li>
        </ul>
        <div class="text-center">
          <router-link to="/notice" class="font-semibold text-primary underline">
            더보기
          </router-link>
        </div>
      </div>

      <h2>상품 목록</h2>
      <div class="section section-responsive">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </section>
  </ContentLayout>
</template>
<script setup lang="ts">
import ContentLayout from '@/components/layouts/ContentLayout.vue'
import Icon from '@/components/display/Icon.vue'
import SettingIcon from '@/assets/icons/Setting.svg'
</script>
<style scoped>
.dashboard {
  background-color: theme('colors.gray.100');
}

.product-list {
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  i {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: theme('borderRadius.lg');
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    p {
      font-size: 0.875rem;
      color: #666;
    }
  }

  li:not(:last-child) {
    border-right: 1px solid theme('colors.gray.200');
  }
}

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
</style>
