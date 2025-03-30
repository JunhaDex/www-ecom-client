<template>
  <div class="mb-4">
    <div class="tx-list-item mb-2">
      <img :src="prodImage" alt="상품 이미지" />
      <div class="product-info ml-4">
        <div class="product-info-header mb-2">
          <div>
            <span class="badge badge-danger">{{ getTxStatus(tx.status) }}</span>
            <h3 class="text-lg font-semibold mb-2">{{ tx.txName }}</h3>
          </div>
          <ul class="text-sm text-gray-400 mb-1">
            <li>주문 수량: {{ itemCount }} 건</li>
            <li>결제 일시: {{ paidAt }}</li>
          </ul>
        </div>
        <p class="font-semibold text-danger">{{ priceStr }} 원</p>
      </div>
    </div>
    <div v-if="tx.status === 1" class="extra">
      <button class="btn btn-secondary" @click="() => emit('open-inquiry')">문의하기</button>
      <button class="btn btn-danger">주문취소</button>
    </div>
    <div v-else-if="tx.status === 2" class="extra">
      <button class="btn btn-danger" @click="cancelPayment">결제실패 삭제</button>
    </div>
    <div v-else class="extra">
      <button class="btn btn-secondary" @click="() => emit('open-inquiry')">문의하기</button>
    </div>
    <div v-if="tx.status !== 2 && tx.products.length > 1" class="show-more">
      <div class="text-center font-semibold text-primary underline">
        <span class="cursor-pointer" @click="() => (isExpand = !isExpand)">
          {{ isExpand ? '숨기기' : '펼쳐보기' }}
        </span>
      </div>
      <div class="details" :class="{ show: isExpand }">
        <ul>
          <li v-for="prod in tx.products" :key="prod.product.id">
            <span>
              <label>상품명</label>
              <span>{{ prod.product.productName }}</span>
            </span>
            <span>
              <label>수량</label>
              <span>{{ prod.count }} 개</span>
            </span>
            <span>
              <label>가격</label>
              <span>{{ localizePrice(prod.product.productPrice) }} 원</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TxListItem } from '@/types/service.type'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { getTxStatus, localizePrice } from '@/utils/index.util'
import { TransactionService } from '@/services/transaction.service'
import { useRouter } from 'vue-router'

const props = defineProps<{
  tx: TxListItem
}>()
const emit = defineEmits(['open-inquiry'])
const txSvc = new TransactionService()
const router = useRouter()
const prodImage = computed(() => props.tx.products[0].product.imageUrls[0])
const itemCount = computed(() => props.tx.products.reduce((acc, cur) => acc + cur.count, 0))
const paidAt = computed(() => dayjs(props.tx.payment.createdAt).format('YYYY-MM-DD HH:mm:ss'))
const priceStr = computed(() => localizePrice(props.tx.payment.paidAmount))
const isExpand = ref(false)

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
    width: 124px;
    height: 124px;
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

.show-more {
  .details {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;

    &.show {
      max-height: 500px;
    }

    ul {
      padding: 0.5rem 1rem;
      margin-top: 0.5rem;

      li {
        display: flex;
        background-color: #f8f8f8;
        border-radius: 0.5rem;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        margin-bottom: 0.5rem;

        label {
          font-size: theme('fontSize.xs');
          color: #666;
          margin-right: 0.5rem;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
