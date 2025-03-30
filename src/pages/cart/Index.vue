<template>
  <ContentLayout>
    <section class="cart-list">
      <h2>장바구니</h2>
      <div class="cart-table mb-4">
        <div v-if="cartList.list.length === 0" class="cart-empty">
          <h2>장바구니가 비었습니다</h2>
        </div>
        <div v-for="(item, idx) in cartList.list" :key="item.id" class="cart-list-item">
          <div class="p-2 product-list">
            <ProductListItem :product="item.product" />
            <div class="to-right">
              <CounterInput
                class="counter"
                :value="item.count"
                @change-value="(newVal: number) => updateCount(idx, newVal)"
              />
              <div class="counter-result">
                <div class="subtotal">
                  <label>상품 합계</label> <br />
                  <span class="text-danger">{{ getSubtotal(idx) }} 원</span>
                </div>
                <button class="btn btn-danger btn-sm" @click="updateCount(idx, 0)">삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="checkout mb-2">
        <li>
          <label>총 상품금액</label>
          <span>{{ localizePrice(grandTotal) }} 원</span>
        </li>
        <li>
          <label>배송비</label>
          <span>0 원</span>
        </li>
        <li>
          <label>주문 총액</label>
          <span>{{ localizePrice(grandTotal) }} 원</span>
        </li>
      </ul>
      <button class="btn btn-primary w-full" @click="checkoutItem">주문하기</button>
    </section>
  </ContentLayout>
</template>
<script setup lang="ts">
import ContentLayout from '@/components/layouts/ContentLayout.vue'
import CounterInput from '@/components/inputs/CounterInput.vue'
import ProductListItem from '@/components/ProductListItem.vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { CartItem } from '@/types/service.type'
import type { PaginatedResponse } from '@/types/ui.type'
import { ProductService } from '@/services/product.service'
import { encodeCheckout, issueOrderId, localizePrice } from '@/utils/index.util'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()
const productSvc = new ProductService()
const cartList = ref<PaginatedResponse<CartItem>>({
  list: [],
  meta: {
    totalCount: 0,
    pageNo: 1,
    pageSize: 10,
    totalPage: 10,
  },
})
const grandTotal = computed(() => {
  return cartList.value.list.reduce((acc, item) => {
    return acc + item.product.productPrice * item.count
  }, 0)
})

onMounted(async () => {
  cartList.value = await productSvc.listCartItem()
  console.log(cartList.value.list)
})

function checkoutItem() {
  const payload = encodeCheckout({
    userId: authStore.user!.id,
    list: cartList.value.list.map((itm) => {
      return {
        id: itm.id,
        productId: itm.product.id,
        count: itm.count,
      }
    }),
  })
  const orderId = issueOrderId()
  router.push(`/item/checkout?data=${payload}&oid=${orderId}`)
}

function getSubtotal(idx: number): string {
  const item = cartList.value.list[idx]
  return localizePrice(item.product.productPrice * item.count)
}

async function updateCount(idx: number, count: number) {
  if (count === 0) {
    if (!window.confirm('장바구니에서 상품을 삭제하시겠습니까?')) return
  }
  const item = cartList.value.list[idx]
  item.count = count
  await productSvc.changeCartItem({
    productId: item.product.id,
    count,
  })
  if (count === 0) {
    cartList.value.list.splice(idx, 1)
  }
}
</script>
<style scoped>
.cart-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
  font-size: 1.25em;
  font-weight: bold;
  color: #666;
}

.product-list {
  display: block;
  @media (min-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.to-right {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;

  .product-list {
    width: 100%;
    min-height: 240px;
  }

  .counter {
    width: 150px;
  }

  .counter-result {
    width: 150px;
    display: flex;
    justify-content: space-between;
    align-items: end;

    .subtotal {
      label {
        color: #666;
        font-size: 0.875rem;
        font-weight: 800;
      }

      span {
        font-size: 1.25em;
        font-weight: bold;
        text-wrap: nowrap;
      }
    }
  }
}

.checkout {
  li {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    label {
      font-size: 0.875rem;
      color: #666;
    }

    span {
      font-size: 1.25em;
      font-weight: bold;
    }
  }

  li:last-child {
    border-top: 1px solid #e5e7eb;
  }
}
</style>
