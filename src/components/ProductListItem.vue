<template>
  <div class="product-list-item">
    <img :src="image" alt="상품 이미지" />
    <div class="product-info ml-4">
      <div class="product-info-header mb-2">
        <h3 class="text-lg font-semibold mb-2">{{ product.productName }}</h3>
        <p class="text-sm text-gray-400 mb-1">{{ product.description }}</p>
      </div>
      <p class="font-semibold text-danger">{{ priceStr }} 원</p>
    </div>
  </div>
  <div class="extra">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { localizePrice } from '@/utils/index.util'
import { computed } from 'vue'
import type { Product } from '@/types/service.type'

const props = defineProps<{
  product: Product
}>()
const image = computed(() => props.product.imageUrls[0])
const priceStr = computed(() => localizePrice(props.product.productPrice))
</script>
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
