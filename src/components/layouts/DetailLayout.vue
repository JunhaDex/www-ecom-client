<template>
  <div class="detail-layout">
    <NavHeader :page-title="pageTitle" />
    <main class="content-main">
      <slot />
    </main>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import NavHeader from '@/components/navigations/NavHeader.vue'
import Footer from '@/components/layouts/Footer.vue'

const props = defineProps<{
  pageTitle: string
}>()
</script>
<style scoped>
.detail-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 4rem;
}

.content-main {
  display: block;
  flex: 1;
}
</style>
