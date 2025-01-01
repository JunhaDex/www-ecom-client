<template>
  <div class="content-layout">
    <main class="content-main">
      <slot />
    </main>
    <NavBar />
  </div>
</template>
<script setup lang="ts">
import NavBar from '@/components/navigations/NavBar.vue'
</script>
<style scoped>
.content-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 76px;
}

.content-main {
  display: block;
  flex: 1;
}
</style>
