<template>
  <DetailLayout page-title="결제하기">
    <section class="item-list">
      <h2>구매상품</h2>
      <div class="section">
        <ProductListItem />
        <ProductListItem />
      </div>
    </section>
    <section class="shipment-form">
      <form>
        <h2>배송정보 입력</h2>
        <div class="select-location mb-4">
          <input class="input-check mr-2" type="radio" name="ship-location" checked />
          <span class="mr-4">매장으로 배송</span>
          <input class="input-check mr-2" type="radio" name="ship-location" />
          <span>배송지 직접 입력</span>
        </div>
        <div class="input-wrap address mb-4">
          <label class="label label-lt">배송지 주소</label>
          <input type="text" class="input" placeholder="주소 검색" />
          <input type="text" class="input" placeholder="상세 주소 입력" />
        </div>
        <div class="input-wrap address mb-4">
          <label class="label label-lt">배송 메모</label>
          <textarea class="input" placeholder="배송 메모입력" />
        </div>
        <h2>결제수단</h2>
      </form>
    </section>
    <section class="payment-action">
      <h2>최종 결제요청 금액</h2>
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
          <span>주문 총액</span>
          <span class="text-danger">13,000 원</span>
        </li>
      </ul>
      <button class="btn btn-primary w-full">결제하기</button>
    </section>
  </DetailLayout>
</template>
<script setup lang="ts">
import DetailLayout from '@/components/layouts/DetailLayout.vue'
import ProductListItem from '@/components/ProductListItem.vue'
</script>
<style scoped>
.select-location {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
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
