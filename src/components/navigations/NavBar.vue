<template>
  <div class="bottom-fixed">
    <div class="safe-area">
      <nav class="navbar">
        <router-link to="/" class="nav-item" :class="{ active: activePath === 'home' }">
          <div class="nav-icon">
            <Icon :icon="HomeIcon" />
          </div>
          <span class="nav-label">홈 화면</span>
        </router-link>

        <router-link to="/cart" class="nav-item" :class="{ active: activePath === 'cart' }">
          <div class="nav-icon">
            <Icon :icon="CartIcon" />
          </div>
          <span class="nav-label">장바구니</span>
        </router-link>

        <router-link to="/order" class="nav-item" :class="{ active: activePath === 'order' }">
          <div class="nav-icon">
            <Icon :icon="ReceiptIcon" />
          </div>
          <span class="nav-label">주문내역</span>
        </router-link>

        <router-link to="/notice" class="nav-item" :class="{ active: activePath === 'notice' }">
          <div class="nav-icon">
            <Icon :icon="NoticeIcon" />
          </div>
          <span class="nav-label">공지사항</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
import HomeIcon from '@/assets/icons/Home.svg'
import CartIcon from '@/assets/icons/Cart.svg'
import ReceiptIcon from '@/assets/icons/Receipt.svg'
import NoticeIcon from '@/assets/icons/Notice.svg'
import { onMounted, ref } from 'vue'

import Icon from '@/components/display/Icon.vue'
import { useRoute } from 'vue-router'

const activePath = ref('')
const route = useRoute()

onMounted(() => {
  const current = route.path
  if (current === '/') {
    activePath.value = 'home'
  } else {
    activePath.value = current.split('/')[1]
  }
  console.log(activePath.value)
})
</script>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  text-align: center;
  background-color: white;
  border-radius: theme('borderRadius.lg') theme('borderRadius.lg') 0 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;

  &.active {
    color: theme('colors.primary');
  }
}

.nav-icon > i {
  width: 1.4rem;
  height: 1.4rem;
}

.nav-label {
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
