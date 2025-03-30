<template>
  <div class="card-item-box">
    <router-link :to="`/item/${product.id}`" class="card-item-image">
      <img :src="image" alt="상품 이미지" />
    </router-link>
    <div class="card-item-content mt-4">
      <router-link :to="`/item/${product.id}`">
        <h3 class="card-item-title text-xl font-semibold mb-2">{{ product.productName }}</h3>
      </router-link>
      <p class="card-item-price text-lg font-bold text-danger">{{ priceStr }} 원</p>
      <p class="card-item-description">{{ product.description }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Product } from '@/types/service.type'
import { computed } from 'vue'
import { localizePrice } from '@/utils/index.util'

const props = defineProps<{
  product: Product
}>()
const image = computed(() => props.product.imageUrls[0])
const priceStr = computed(() => localizePrice(props.product.productPrice))
</script>
<style scoped>
.card-item-box {
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  padding: 1rem;
  max-width: 352px;
  width: 100%;
  @screen sm {
    max-width: 272px;
  }

  .card-item-image {
    width: 320px;
    height: 320px;
    margin: 0 auto;

    @screen sm {
      width: 240px;
      height: 240px;
    }

    img {
      width: 100%;
      height: auto;
      aspect-ratio: 1;
    }
  }
}
</style>
