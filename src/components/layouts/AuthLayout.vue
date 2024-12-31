<template>
  <div class="auth-layout">
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
  background-color: theme('colors.gray.100');
}

.auth-content {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}
</style>
