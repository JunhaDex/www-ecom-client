<template>
  <ContentLayout>
    <section class="order-list">
      <h2>주문내역</h2>
      <div class="section">
        <div class="order-day">
          <h3 class="text-lg font-semibold">2024-10-10</h3>
          <hr />
          <ProductListItem>
            <div class="order-action my-4">
              <button class="btn btn-primary">주문 상세</button>
              <button class="btn btn-secondary">영수증 보기</button>
              <button class="btn btn-danger">주문취소</button>
            </div>
          </ProductListItem>
          <ProductListItem>
            <div class="order-action my-4">
              <button class="btn btn-primary">주문 상세</button>
              <button class="btn btn-secondary">영수증 보기</button>
              <button class="btn btn-danger">주문취소</button>
            </div>
          </ProductListItem>
        </div>
        <div class="order-day">
          <h3 class="text-lg font-semibold">2024-9-25</h3>
          <hr />
          <ProductListItem>
            <div class="order-action my-4">
              <button class="btn btn-primary">주문 상세</button>
              <button class="btn btn-secondary">영수증 보기</button>
              <button class="btn btn-danger">주문취소</button>
            </div>
          </ProductListItem>
          <ProductListItem>
            <div class="order-action my-4">
              <button class="btn btn-primary">주문 상세</button>
              <button class="btn btn-secondary">영수증 보기</button>
              <button class="btn btn-danger">주문취소</button>
            </div>
          </ProductListItem>
        </div>
      </div>
    </section>
  </ContentLayout>
</template>
<script setup lang="ts">
import ContentLayout from '@/components/layouts/ContentLayout.vue'
import ProductListItem from '@/components/ProductListItem.vue'
</script>
<style scoped>
.order-action {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.order-day {
  hr {
    margin: 0.25rem 0 1rem 0;
    border: 1px solid theme('colors.gray.100');
  }
}
</style>
