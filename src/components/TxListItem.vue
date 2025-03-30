<template>
  <div class="tx-list-item mb-2">
    <img :src="prodImage" alt="상품 이미지" />
    <div class="product-info ml-4">
      <div class="product-info-header mb-2">
        <h3 class="text-lg font-semibold mb-2">{{ tx.txName }}</h3>
        <ul class="text-sm text-gray-400 mb-1">
          <li>주문 수량: {{ itemCount }} 건</li>
          <li>결제 일시: {{ paidAt }}</li>
        </ul>
      </div>
      <p class="font-semibold text-danger">{{ priceStr }} 원</p>
    </div>
  </div>
  <div v-if="tx.status === 1" class="extra">
    <button class="btn btn-primary">주문 상세</button>
    <button class="btn btn-secondary">영수증 보기</button>
    <button class="btn btn-danger">주문취소</button>
  </div>
  <div v-else-if="tx.status === 2" class="extra">
    <button class="btn btn-danger" @click="cancelPayment">결제취소</button>
  </div>
  <div v-else-if="tx.status === 3" class="extra">
    <button class="btn btn-primary">주문 상세</button>
    <button class="btn btn-secondary">영수증 보기</button>
    <button class="btn btn-secondary">배송조회</button>
  </div>
  <div v-else-if="tx.status === 4" class="extra">
    <button class="btn btn-primary">주문 상세</button>
    <button class="btn btn-secondary">영수증 보기</button>
  </div>
  <div v-else-if="tx.status === 7" class="extra">
    <button class="btn btn-primary" disabled>주문 상세</button>
  </div>
</template>
<script setup lang="ts">
import type { TxListItem } from '@/types/service.type'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { localizePrice } from '@/utils/index.util'
import { TransactionService } from '@/services/transaction.service'
import { useRouter } from 'vue-router'

const props = defineProps<{
  tx: TxListItem
}>()

const txSvc = new TransactionService()
const router = useRouter()
const prodImage = computed(() => props.tx.products[0].product.imageUrls[0])
const itemCount = computed(() => props.tx.products.reduce((acc, cur) => acc + cur.count, 0))
const paidAt = computed(() => dayjs(props.tx.payment.createdAt).format('YYYY-MM-DD HH:mm:ss'))
const priceStr = computed(() => localizePrice(props.tx.payment.paidAmount))

async function cancelPayment() {
  await txSvc.invalidateTx(props.tx.payment.orderId)
  router.go(0)
}
</script>
<style scoped>
.tx-list-item {
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

.extra {
  display: flex;
  gap: 0.5rem;
  justify-content: end;
  align-content: center;
  margin-bottom: 1rem;
}
</style>
