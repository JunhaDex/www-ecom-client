<template>
  <ContentLayout>
    <section class="order-list">
      <h2>주문내역</h2>
      <div class="section">
        <div v-for="dt in txDates" class="order-day" :key="dt">
          <h3 class="text-lg font-semibold">{{ dt }}</h3>
          <hr />
          <TxListItemUi v-for="(pd, i) in txList[dt]" :key="`${dt}-${i}`" :tx="pd" />
        </div>
      </div>
    </section>
  </ContentLayout>
</template>
<script setup lang="ts">
import ContentLayout from '@/components/layouts/ContentLayout.vue'
import TxListItemUi from '@/components/TxListItem.vue'
import { computed, onMounted, ref } from 'vue'
import type { TxListItem, TxListItemGroup } from '@/types/service.type'
import type { PageMeta } from '@/types/ui.type'
import { TransactionService } from '@/services/transaction.service'

const txSvc = new TransactionService()

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
