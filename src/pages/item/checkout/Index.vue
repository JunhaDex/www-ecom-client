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
          <span class="mr-4">이전 배송지</span>
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
            v-model="shipment.addr1"
            type="text"
            class="input"
            placeholder="주소 검색"
            :disabled="!isCustom"
            readonly
            @click="openPostcodeModal"
          />
          <input
            v-model="shipment.addr2"
            type="text"
            class="input"
            placeholder="상세 주소 입력"
            :disabled="!isCustom"
          />
        </div>
        <div class="input-wrap address mb-4">
          <label class="label label-lt">배송 메모</label>
          <textarea v-model="txNote" class="input" placeholder="배송 메모입력" />
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
          <span>0 원</span>
        </li>
        <li>
          <span>주문 총액</span>
          <span class="text-danger">{{ localizePrice(grandTotal) }} 원</span>
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
import { ShipmentService } from '@/services/shipment.service'

const router = useRouter()
const authStore = useAuthStore()
const productSvc = new ProductService()
const txSvc = new TransactionService()
const shipSvc = new ShipmentService()

const products = ref<CartItem[]>([])
const orderId = ref<string | null>()
const grandTotal = computed(() => {
  return products.value.reduce((acc, cur) => {
    return acc + cur.product.productPrice * cur.count
  }, 0)
})
const shipment = ref<{
  addr1: string
  addr2: string
  postalCode: string
}>({
  addr1: '',
  addr2: '',
  postalCode: '',
})
const txNote = ref<string>('')
const txName = computed(() => {
  const base = products.value[0].product.productName
  if (products.value.length > 1) {
    return `${base} 외 ${products.value.length - 1}건`
  }
  return base
})
const shipSelect = ref('prefilled')
const isCustom = computed(() => shipSelect.value === 'custom')
watch(
  () => shipSelect.value,
  () => {
    if (shipSelect.value === 'custom') {
      shipment.value.addr1 = ''
      shipment.value.addr2 = ''
      shipment.value.postalCode = ''
    } else {
      if (authStore.address) {
        shipment.value.addr1 = authStore.address.addr1
        shipment.value.addr2 = authStore.address.addr2
        shipment.value.postalCode = authStore.address.postalCode
      }
    }
  },
)
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
  const oid = router.currentRoute.value.query?.oid as string
  const payload = router.currentRoute.value.query?.data as string
  if (authStore.address) {
    shipment.value.addr1 = authStore.address.addr1
    shipment.value.addr2 = authStore.address.addr2
    shipment.value.postalCode = authStore.address.postalCode
  } else {
    shipSelect.value = 'custom'
  }
  if (payload && oid) {
    const data = decodeCheckout(payload)
    orderId.value = oid
    if (data && authStore.user!.id === data.userId) {
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
    value: grandTotal.value,
  })
  await Promise.all([
    widget.renderPaymentMethods({ selector: '#payment-method', variantKey: 'DEFAULT' }),
    widget.renderAgreement({ selector: '#toss-agreement', variantKey: 'AGREEMENT' }),
  ])
}

async function initPayment() {
  if (!widget) return
  if (!validateInput()) return
  if (!orderId.value) {
    await router.push('/error')
  }
  await widget.setAmount({
    currency: 'KRW',
    value: grandTotal.value + 3000,
  })
  // 결제 시도요청 (사전데이터 생성)
  await txSvc.initPaymentTx({
    products: products.value.map((itm) => ({
      item: itm.product,
      quantity: itm.count,
    })),
    payment: {
      orderId: orderId.value!,
      paidAmount: grandTotal.value + 3000,
      paidAt: new Date(),
    },
    txName: txName.value,
    txNote: txNote.value,
  })
  // 배송정보 등록
  await shipSvc.registerShipment({
    orderId: orderId.value!,
    address: `${shipment.value.addr1}###${shipment.value.addr2}`,
    postalCode: shipment.value.postalCode,
    recipientName: authStore.user!.branchManager,
    recipientPhone: authStore.user!.branchContact,
  })
  authStore.address = shipment.value
  // 카트 비우기
  const productIds = products.value.map((itm) => itm.product.id).filter((id) => id > 0)
  if (productIds.length > 0) {
    await productSvc.removeFromCart(productIds)
  }
  await widget.requestPayment({
    orderId: orderId.value!,
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
        shipment.value.addr1 = data.address
        shipment.value.postalCode = data.zonecode
      },
    }).open()
  }
}

function validateInput() {
  if (!shipment.value.addr1 || !shipment.value.addr2) {
    alert('배송지 주소를 입력해주세요.')
    return false
  }
  return true
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
