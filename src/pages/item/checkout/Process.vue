<template>
  <AuthLayout class="bg-white">
    <div class="flex flex-col justify-center">
      <h1 class="text-2xl font-bold mb-4">결제 진행중...</h1>
      <div class="text-center">
        <span class="animate-spin spinner">
          <Icon :icon="LoadingIcon" />
        </span>
      </div>
    </div>
  </AuthLayout>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import LoadingIcon from '@/assets/icons/Loading.svg'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import Icon from '@/components/display/Icon.vue'
import { useRouter } from 'vue-router'
import { TransactionService } from '@/services/transaction.service'

const router = useRouter()
const txSvc = new TransactionService()
onMounted(async () => {
  const { orderId, paymentKey, amount } = router.currentRoute.value.query
  if (orderId && paymentKey && amount) {
    await txSvc.confirmPaymentTx({
      orderId: orderId as string,
      paymentKey: paymentKey as string,
      amount: Number(amount),
    })
    await router.push('/item/checkout/success')
  } else {
    await router.push('/error')
  }
})
</script>
<style scoped>
.spinner {
  display: inline-block;
  width: 2rem;
  height: 2rem;

  i {
    width: 100%;
    height: 100%;
    background-color: theme('colors.primary');
  }
}
</style>
