<template>
  <div class="product-list-item">
    <img src="https://via.placeholder.com/108" alt="상품 이미지" />
    <div class="product-info ml-4">
      <div class="product-info-header mb-2">
        <h3 class="text-lg font-semibold mb-2">상품명</h3>
        <p class="text-sm text-gray-400 mb-1">상품 설명</p>
      </div>
      <p class="font-semibold text-danger">10,000 원</p>
    </div>
  </div>
  <div class="extra">
    <slot />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.product-list-item {
  display: flex;
  align-items: center;

  img {
    width: 108px;
    height: 108px;
    border-radius: theme('borderRadius.sm');
  }

  .product-info {
    display: grid;
    grid-template-rows: auto 1fr auto;
    flex: 1;
    gap: 0.5rem;
  }
}
</style>
