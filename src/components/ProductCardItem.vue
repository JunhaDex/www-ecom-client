<template>
  <div class="card-item-box">
    <router-link to="/item/1" class="card-item-image">
      <img src="https://via.placeholder.com/150" alt="상품 이미지" />
    </router-link>
    <div class="card-item-content mt-4">
      <router-link to="/item/1">
        <h3 class="card-item-title text-xl font-semibold mb-2">상품명</h3>
      </router-link>
      <p class="card-item-price text-lg font-bold text-danger">10,000 원</p>
      <p class="card-item-description">상품 설명</p>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
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
