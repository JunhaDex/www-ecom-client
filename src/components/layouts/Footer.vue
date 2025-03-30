<template>
  <footer class="app-footer">
    <p class="text-sm">
      주식회사 최선생 | 대표: 최종길 | 사업자등록번호: 331-87-01961 <br />
      주소: 경기도 포천시 가산면 메나리길 110-29 <br />
      Copyright &copy; 주식회사 최선생. All Rights Reserved.
    </p>
  </footer>
</template>
<script setup lang="ts"></script>
<style scoped>
.app-footer {
  padding: 1rem;
  text-align: center;
  background-color: white;
  border-radius: theme('borderRadius.lg') theme('borderRadius.lg') 0 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    color: #666;
  }
}
</style>
