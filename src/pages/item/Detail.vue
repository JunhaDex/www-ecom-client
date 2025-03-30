<template>
  <DetailLayout page-title="상품상세">
    <section class="item-image">
      <Carousel v-bind="config">
        <Slide v-for="slide in product.imageUrls" :key="slide">
          <div class="carousel__item mb-2">
            <img :src="slide" alt="상품 이미지" />
          </div>
        </Slide>
        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </section>
    <section class="item-description">
      <h1 class="text-2xl font-bold mb-4">{{ product.productName }}</h1>
      <p>{{ product.description }}</p>
      <div class="box box-border item-action mt-4">
        <div class="input-group">
          <div class="subtotal mb-4">
            <label>상품 합계</label> <br />
            <span class="text-danger text-2xl font-bold">{{ priceDisplay }} 원</span>
          </div>
          <CounterInput class="counter" :value="itemCount" @change-value="handleChangeValue" />
        </div>
        <div class="btn-group">
          <button class="btn btn-secondary w-full" @click="addToCart">장바구니 담기</button>
          <button class="btn btn-primary w-full" @click="checkoutItem">바로구매</button>
        </div>
      </div>
    </section>
  </DetailLayout>
</template>
<script setup lang="ts">
import DetailLayout from '@/components/layouts/DetailLayout.vue'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import CounterInput from '@/components/inputs/CounterInput.vue'
import { ProductService } from '@/services/product.service'
import { computed, onMounted, ref } from 'vue'
import type { Product } from '@/types/service.type'
import router from '@/router'
import { encodeCheckout, issueOrderId, localizePrice } from '@/utils/index.util'
import { useAuthStore } from '@/stores/auth.store'

const props = defineProps<{
  id: string
}>()
const authStore = useAuthStore()
const productSvc = new ProductService()
const product = ref<Product>({
  id: 0,
  productName: '상품명',
  description: '상품 설명',
  productPrice: 0,
  imageUrls: [],
})
const config = {
  itemsToShow: 1,
}
const itemCount = ref(1)
const priceDisplay = computed(() => localizePrice(product.value.productPrice * itemCount.value))

onMounted(async () => {
  await accessProduct(Number(props.id))
})

function handleChangeValue(value: number) {
  itemCount.value = value
}

async function accessProduct(id: number) {
  try {
    product.value = await productSvc.getProduct(id)
    product.value.imageUrls = product.value.imageUrls || []
  } catch (e: any) {
    console.error(e)
    if (e.status === 403) {
      alert('해당 지역에 제공되지 않는 상품입니다.')
      await router.replace('/')
      window.location.reload()
    }
  }
}

async function addToCart() {
  const exist = await productSvc.getCartItem(product.value.id)
  let count = itemCount.value
  if (exist) {
    if (!window.confirm('이미 장바구니에 담긴 상품입니다. 계속 추가하시겠습니까?')) return
    count += exist.count
  }
  await productSvc.changeCartItem({
    productId: product.value.id,
    count,
  })
  alert('장바구니에 상품이 추가되었습니다.')
}

function checkoutItem() {
  const payload = encodeCheckout({
    userId: authStore.user!.id,
    list: [
      {
        id: 0,
        productId: product.value.id,
        count: itemCount.value,
      },
    ],
  })
  const orderId = issueOrderId()
  router.push(`/item/checkout?data=${payload}&oid=${orderId}`)
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
