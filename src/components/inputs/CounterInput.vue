<template>
  <span class="input number-input">
    <button @click="decrement" class="btn">-</button>
    <input type="number" v-model="internalValue" class="w-full text-center" />
    <button @click="increment" class="btn">+</button>
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  value: number
}>()
const emit = defineEmits(['changeValue'])
const internalValue = ref(props.value)

watch(internalValue, (newValue) => {
  if (newValue < 0) {
    window.alert('최소 수량은 1개입니다.')
    internalValue.value = 1
    emit('changeValue', 1)
  }
  emit('changeValue', newValue)
})

function increment() {
  internalValue.value++
}

function decrement() {
  if (internalValue.value > 1) {
    internalValue.value--
  }
}
</script>

<style scoped>
.number-input {
  padding: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
}
</style>
