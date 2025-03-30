<template>
  <ContentLayout>
    <section class="order-list">
      <h2>주문내역</h2>
      <div class="section">
        <div v-if="txDates.length === 0" class="cart-empty">
          <h2>주문내역이 없습니다.</h2>
          <router-link to="/" class="btn btn-primary">홈으로</router-link>
        </div>
        <div v-for="dt in txDates" class="order-day" :key="dt">
          <h3 class="text-lg font-semibold">{{ dt }}</h3>
          <hr />
          <TxListItemUi
            v-for="(pd, i) in txList[dt]"
            :key="`${dt}-${i}`"
            :tx="pd"
            @open-inquiry="() => (isInquiry = true)"
          />
        </div>
      </div>
    </section>
  </ContentLayout>
  <Modal :is-open="isInquiry" @close-modal="() => (isInquiry = false)">
    <div class="dialog-modal">
      <h2 class="text-xl font-semibold mb-4">문의하기</h2>
      <p>주문 변경 및 환불요청은 본사로 직접 문의 바랍니다.</p>
      <div class="flex justify-end">
        <button class="btn btn-ghost" type="button" @click="() => (isInquiry = false)">닫기</button>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import ContentLayout from '@/components/layouts/ContentLayout.vue'
import TxListItemUi from '@/components/TxListItem.vue'
import { computed, onMounted, ref } from 'vue'
import type { TxListItem, TxListItemGroup } from '@/types/service.type'
import type { PageMeta } from '@/types/ui.type'
import { TransactionService } from '@/services/transaction.service'
import Modal from '@/components/feedback/Modal.vue'

const txSvc = new TransactionService()
const isInquiry = ref(false)
const txList = ref<TxListItemGroup>({})
const txPageMeta = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})

const txDates = computed(() => Object.keys(txList.value))

onMounted(async () => {
  const txPaginated = await txSvc.listTx()
  sortTxListByDate(txPaginated.list)
  console.log(txList.value)
  txPageMeta.value = txPaginated.meta
})

function sortTxListByDate(unsorted: TxListItem[]) {
  unsorted.forEach((tx: TxListItem) => {
    const txDate = tx.createdAt
    if (txList.value[txDate] === undefined) {
      txList.value[txDate] = [tx]
    } else {
      txList.value[txDate].push(tx)
    }
  })
}
</script>
<style scoped>
.cart-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 240px;
  font-size: 1.25em;
  font-weight: bold;
  color: #666;
}

.order-action {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.order-day {
  hr {
    margin: 0.25rem 0 1rem 0;
    border: 1px solid theme('colors.gray.100');
  }
}
</style>
