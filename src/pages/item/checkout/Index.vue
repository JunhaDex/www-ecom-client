<template>
  <DetailLayout page-title="결제하기">
    <section class="item-list">
      <h2>구매상품</h2>
      <div class="section">
        <div class="mb-2" v-for="item in products" :key="item.id">
          <ProductListItem :product="item.product">
            <div class="subtotal mb-2 font-semibold">
              <p>선택 수량: {{ item.count }}</p>
              <p>
                상품 합계:
                <span class="text-danger"> {{ item.product.productPrice * item.count }} 원 </span>
              </p>
            </div>
          </ProductListItem>
        </div>
      </div>
    </section>
    <section class="shipment-form">
      <form>
        <h2>배송정보 입력</h2>
        <div class="select-location mb-4">
          <input
            v-model="shipSelect"
            value="prefilled"
            class="input-check mr-2"
            type="radio"
            name="ship-location"
            checked
          />
          <span class="mr-4">매장으로 배송</span>
          <input
            v-model="shipSelect"
            value="custom"
            class="input-check mr-2"
            type="radio"
            name="ship-location"
          />
          <span>배송지 직접 입력</span>
        </div>
        <div class="input-wrap address mb-4">
          <label class="label label-lt">배송지 주소</label>
          <input
            type="text"
            class="input"
            placeholder="주소 검색"
            :disabled="!isCustom"
            readonly
            @click="openPostcodeModal"
          />
          <input type="text" class="input" placeholder="상세 주소 입력" :disabled="!isCustom" />
        </div>
        <div class="input-wrap address mb-4">
          <label class="label label-lt">배송 메모</label>
          <textarea class="input" placeholder="배송 메모입력" />
        </div>
        <h2>결제수단</h2>
        <div id="payment-method"></div>
        <div id="toss-agreement"></div>
      </form>
    </section>
    <section class="payment-action">
      <h2>최종 결제요청 금액</h2>
      <ul class="checkout mb-2">
        <li>
          <label>총 상품금액</label>
          <span>{{ localizePrice(grandTotal) }} 원</span>
        </li>
        <li>
          <label>배송비</label>
          <span>3,000 원</span>
        </li>
        <li>
          <span>주문 총액</span>
          <span class="text-danger">{{ localizePrice(grandTotal + 3000) }} 원</span>
        </li>
      </ul>
      <button class="btn btn-primary w-full" @click="initPayment">결제하기</button>
    </section>
  </DetailLayout>
</template>
<script setup lang="ts">
import DetailLayout from '@/components/layouts/DetailLayout.vue'
import ProductListItem from '@/components/ProductListItem.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { decodeCheckout, localizePrice } from '@/utils/index.util'
import { useAuthStore } from '@/stores/auth.store'
import { ProductService } from '@/services/product.service'
import type { CartItem } from '@/types/service.type'
import { loadTossPayments, type TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk'
import { TransactionService } from '@/services/transaction.service'

const router = useRouter()
const authStore = useAuthStore()
const productSvc = new ProductService()
const txSvc = new TransactionService()

const products = ref<CartItem[]>([])
const grandTotal = computed(() => {
  return products.value.reduce((acc, cur) => {
    return acc + cur.product.productPrice * cur.count
  }, 0)
})
const shipSelect = ref('prefilled')
const isCustom = computed(() => shipSelect.value === 'custom')
let widget: TossPaymentsWidgets | null = null
watch(
  () => shipSelect.value,
  (val) => {
    if (val === 'custom') {
      address.value = ''
    }
  },
)
const address = ref('')
onMounted(async () => {
  await renderTossWidget()
  const payload = router.currentRoute.value.query?.data as string
  if (payload) {
    const data = decodeCheckout(payload)
    if (data && authStore.user!.id === data.userId) {
      console.log(data)
      const res = await productSvc.listCheckoutProduct(
        data.list.map((li: { productId: number }) => li.productId),
      )
      products.value.push(
        ...data.list.map((li: { productId: number }) => {
          const product = res.find((p) => p.id === li.productId)
          return {
            ...li,
            product: product!,
          }
        }),
      )
      console.log(res)
      return
    }
  }
  window.alert('잘못된 접근입니다.')
  router.replace({ name: 'home' }).then(() => {
    window.location.reload()
  })
})

async function renderTossWidget() {
  const toss = await loadTossPayments(import.meta.env.VITE_TOSS_CLIENT_KEY)
  const cKey = 'ANONYMOUS'
  widget = toss.widgets({ customerKey: cKey })
  await widget.setAmount({
    currency: 'KRW',
    value: grandTotal.value + 3000,
  })
  await Promise.all([
    widget.renderPaymentMethods({ selector: '#payment-method', variantKey: 'DEFAULT' }),
    widget.renderAgreement({ selector: '#toss-agreement', variantKey: 'AGREEMENT' }),
  ])
}

async function initPayment() {
  if (!widget) return
  console.log(shipSelect.value)
  console.log('total: ', grandTotal.value + 3000)
  const foo = await txSvc.initPaymentTx(grandTotal.value + 3000)
  console.log(foo)
  await widget.setAmount({
    currency: 'KRW',
    value: grandTotal.value + 3000,
  })
  await widget.requestPayment({
    orderId: foo.sessionId,
    orderName: '주문명',
    successUrl: window.location.origin + '/item/checkout/process',
    failUrl: window.location.origin + '/item/checkout/fail',
    customerName: authStore.user!.branchName,
  })
}

function openPostcodeModal() {
  if (isCustom.value) {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        console.log(data)
      },
    }).open()
  }
}
</script>
<style scoped>
.select-location {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.subtotal {
  display: flex;
  justify-content: end;
  margin-top: 1rem;
  gap: 1.5rem;
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
