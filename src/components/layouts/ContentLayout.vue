<template>
  <div class="content-layout">
    <main class="content-main">
      <slot />
    </main>
    <footer class="footer">
      <p class="text-center text-xs text-gray-400">
        주식회사 최선생 | 대표: 최종길 | 사업자번호: 331-87-01961 <br />
        주소: 경기도 포천시 가산면 메나리길 110-29 <br />
        Copyright &copy; 주식회사 최선생. All Rights Reserved.
      </p>
    </footer>
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

.footer {
  border-top: 2px solid #f4f4f6;
  padding: 1rem;
  text-align: center;
  margin: 0 1rem;
}
</style>
