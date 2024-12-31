<template>
  <ContentLayout>
    <section class="cart-list">
      <h2>장바구니</h2>
      <table class="cart-table mb-4">
        <tbody>
          <tr>
            <th class="p-2">
              <input class="input-check" type="checkbox" />
            </th>
            <th class="text-left pl-4">상품 정보</th>
            <th class="text-right">
              <button class="btn btn-danger btn-sm">선택 삭제</button>
            </th>
          </tr>
          <tr>
            <td class="p-2">
              <input class="input-check" type="checkbox" />
            </td>
            <td class="product-list">
              <ProductListItem />
            </td>
            <td class="p-2 count-column">
              <CounterInput class="counter" :value="1" />
              <div class="counter-result">
                <div class="subtotal">
                  <label>상품 합계</label> <br />
                  <span class="text-danger">{{ subtotal }} 원</span>
                </div>
                <button class="btn btn-danger btn-sm">삭제</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <ul class="checkout mb-2">
        <li>
          <label>총 상품금액</label>
          <span>10,000 원</span>
        </li>
        <li>
          <label>배송비</label>
          <span>3,000 원</span>
        </li>
        <li>
          <label>주문 총액</label>
          <span>13,000 원</span>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const subtotal = ref(10000)

function checkoutItem() {
  console.log('checkout')
  router.push('/item/checkout')
}
</script>
<style scoped>
.cart-table {
  width: 100%;
  border-collapse: collapse;

  .product-list {
    width: 100%;
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
