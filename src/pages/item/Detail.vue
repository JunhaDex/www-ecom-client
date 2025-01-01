<template>
  <DetailLayout page-title="상품상세">
    <section class="item-image">
      <Carousel v-bind="config">
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item mb-2">
            <img src="https://via.placeholder.com/512" alt="상품 이미지" />
          </div>
        </Slide>
        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </section>
    <section class="item-description">
      <h1 class="text-2xl font-bold mb-4">상품명</h1>
      <p>상품 설명</p>
      <div class="box box-border item-action mt-4">
        <div class="input-group">
          <div class="subtotal mb-4">
            <label>상품 합계</label> <br />
            <span class="text-danger text-2xl font-bold">10,000 원</span>
          </div>
          <CounterInput class="counter" :value="1" />
        </div>
        <div class="btn-group">
          <button class="btn btn-secondary w-full">장바구니 담기</button>
          <button class="btn btn-primary w-full">바로구매</button>
        </div>
      </div>
    </section>
  </DetailLayout>
</template>
<script setup lang="ts">
import DetailLayout from '@/components/layouts/DetailLayout.vue'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import CounterInput from '@/components/inputs/CounterInput.vue'

const config = {
  itemsToShow: 1,
}
</script>
<style scoped>
.item-image {
  max-width: 528px;
  margin: 0 auto;

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }
}

.input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .subtotal {
    label {
      color: #666;
      font-size: 0.875rem;
      font-weight: 800;
    }
  }

  .counter {
    width: 150px;
  }
}

.btn-group {
  display: flex;
  gap: 1rem;
}
</style>
