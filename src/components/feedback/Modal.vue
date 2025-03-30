<template>
  <Teleport to="body">
    <div class="modal-backdrop backdrop-blur" :class="{ show: isOpen }" @click="closeModal"></div>
    <div class="modal-wrap" :class="{ show: isOpen }">
      <slot />
    </div>
  </Teleport>
</template>
<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  options?: {
    preventBackdrop?: boolean
  }
}>()

const emit = defineEmits(['closeModal'])

function closeModal() {
  if (!props.options?.preventBackdrop) {
    emit('closeModal')
  }
}
</script>
<style scoped>
.modal-backdrop {
  position: fixed;
  visibility: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(17, 24, 39, 0.5);
  z-index: 11;

  &.show {
    visibility: visible;
  }
}

.modal-wrap {
  position: fixed;
  opacity: 0;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 12;
  transition: all 0.3s ease;

  &.show {
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
