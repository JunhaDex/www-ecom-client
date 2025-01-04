<template>
  <div class="auth-layout bg-gray-100">
    <main class="auth-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Footer from '@/components/layouts/Footer.vue'
</script>
<style scoped>
.auth-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.auth-content {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}
</style>
