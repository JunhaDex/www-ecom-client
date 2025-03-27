<template>
  <i class="icon" :style="iconStyle"></i>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon?: string
}>()
const iconStyle = computed(() => ({
  '--icon-url': props.icon ? `url("${props.icon}")` : 'none',
}))
</script>
<style scoped>
.icon {
  mask-image: var(--icon-url);
  -webkit-mask-image: var(--icon-url);
  background-color: currentColor;
}
</style>
