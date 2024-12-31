<template>
  <footer class="app-footer">
    <p class="text-sm">&copy; 2025 Your App Name. All rights reserved.</p>
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
