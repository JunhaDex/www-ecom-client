<template>
  <div class="top-fixed">
    <div class="safe-area">
      <header class="nav-header">
        <button @click="goBack" class="btn btn-ghost">
          <Icon class="header-icon" :icon="BackIcon" />
        </button>
        <h1 class="text-xl font-bold">{{ pageTitle }}</h1>
        <div class="subfix-menu">
          <router-link to="/" class="btn btn-ghost mr-4">
            <Icon class="header-icon" :icon="HomeIcon" />
          </router-link>
          <router-link to="/cart" class="btn btn-ghost">
            <Icon class="header-icon" :icon="CartIcon" />
          </router-link>
        </div>
      </header>
    </div>
  </div>
</template>
<script setup lang="ts">
import Icon from '@/components/display/Icon.vue'
import BackIcon from '@/assets/icons/Back.svg'
import HomeIcon from '@/assets/icons/Home.svg'
import CartIcon from '@/assets/icons/Cart.svg'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
  pageTitle: string
}>()

function goBack() {
  router.go(-1)
}
</script>
<style>
.nav-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    flex: 1;
    text-align: left;
  }
}

.header-icon {
  width: 1.6rem;
  height: 1.6rem;
}
</style>
