<template>
  <ContentLayout>
    <section class="dashboard">
      <div class="mb-4">
        <img class="logo-home" src="@/assets/images/choi_logo.png" alt="logo" />
      </div>
      <div class="user-info mb-4">
        <h1 class="text-3xl font-extrabold">{{ authStore.user?.branchName ?? '지점명' }}</h1>
        <div
          class="dropdown-wrap"
          tabindex="1"
          @click="() => (isSetting = !isSetting)"
          @blur="() => (isSetting = false)"
        >
          <button class="btn btn-ghost">
            <Icon :icon="SettingIcon" />
          </button>
          <ul class="dropdown-menu" :class="{ show: isSetting }">
            <li class="dropdown-item" @click="() => (isModalOpen = true)">
              <span>비밀번호 초기화</span>
            </li>
            <li class="dropdown-item" @click="logout">
              <span>로그아웃</span>
            </li>
          </ul>
        </div>
      </div>
      <ul class="box stats">
        <li>
          <p class="mb-2">최근주문</p>
          <router-link
            to="/order"
            class="text-lg font-bold text-primary underline text-nowrap sm:text-2xl"
          >
            {{ dashInfo.count }} 건
          </router-link>
        </li>
        <li>
          <p class="mb-2">배송중</p>
          <router-link
            to="/order"
            class="text-lg font-bold text-primary underline text-nowrap sm:text-2xl"
          >
            {{ dashInfo.in_transit }} 건
          </router-link>
        </li>
        <li>
          <p class="mb-2">주문 총액</p>
          <span class="text-lg font-bold text-nowrap sm:text-2xl">{{ dashInfo.cost }} 원</span>
        </li>
      </ul>
    </section>
    <section class="product-list">
      <div class="notice-list-wrap mb-4">
        <h2>공지사항</h2>
        <ul class="notice-list mb-4">
          <li v-for="noti in noticeList" class="notice-item" :key="noti.id">
            <router-link :to="`/notice/${noti.id}`" class="notice-item-header">
              <h3 class="text-lg font-semibold">{{ noti.title }}</h3>
              <p class="text-sm text-gray-400">{{ tts(noti.createdAt) }}</p>
            </router-link>
            <p class="notice-item-content">{{ summarizeContent(noti.content) }}</p>
          </li>
        </ul>
        <div class="text-center">
          <router-link to="/notice" class="font-semibold text-primary underline">
            더보기
          </router-link>
        </div>
      </div>

      <h2>상품 목록</h2>
      <div class="section section-responsive">
        <div v-for="product in productPage.list" class="relative w-full" :key="product.id">
          <ProductCardItem :product="product" />
        </div>
      </div>
    </section>
  </ContentLayout>
  <Modal :is-open="isModalOpen" @close-modal="resetInput">
    <div class="dialog-modal">
      <h2 class="text-xl font-semibold   mb-4">비밀번호 변경하기</h2>
      <form @submit.prevent="updatePwd">
        <div class="input-wrap address mb-4">
          <label class="label label-lt">기존 비밀번호</label>
          <input v-model="userInput.oldPwd" type="password" class="input" placeholder="********" />
        </div>
        <div class="input-wrap address mb-4">
          <label class="label label-lt">신규 비밀번호</label>
          <input v-model="userInput.newPwd" type="password" class="input" placeholder="********" />
        </div>
        <div class="input-wrap address mb-4">
          <label class="label label-lt">비밀번호 확인</label>
          <input
            v-model="userInput.confirmPwd"
            type="password"
            class="input"
            placeholder="********"
          />
        </div>
        <div class="flex justify-end">
          <button class="btn btn-primary mr-4" type="submit">변경하기</button>
          <button class="btn btn-ghost" type="button" @click="resetInput">취소</button>
        </div>
      </form>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import ContentLayout from '@/components/layouts/ContentLayout.vue'
import Icon from '@/components/display/Icon.vue'
import SettingIcon from '@/assets/icons/Setting.svg'
import ProductCardItem from '@/components/ProductCardItem.vue'
import { onMounted, ref } from 'vue'
import type { PaginatedResponse } from '@/types/ui.type'
import type { Dashboard, Notice, Product } from '@/types/service.type'
import { TransactionService } from '@/services/transaction.service'
import { NoticeService } from '@/services/notice.service'
import { ProductService } from '@/services/product.service'
import { useAuthStore } from '@/stores/auth.store'
import { summarizeContent, tts } from '@/utils/index.util'
import { useRouter } from 'vue-router'
import Modal from '@/components/feedback/Modal.vue'
import { useChangePwd } from '@/compositions/ChangePwd'
import { UserService } from '@/services/user.service'

const authStore = useAuthStore()
const router = useRouter()
const txSvc = new TransactionService()
const userSvc = new UserService()
const noticeSvc = new NoticeService()
const productSvc = new ProductService()
const isSetting = ref(false)
const dashInfo = ref<Dashboard>({
  count: 0,
  cost: 0,
  in_transit: 0,
})

const noticeList = ref<Notice[]>([])
const { isModalOpen, userInput, submitChange, resetInput } = useChangePwd()
const productPage = ref<PaginatedResponse<Product>>({
  list: [],
  meta: {
    totalCount: 0,
    pageNo: 1,
    pageSize: 10,
    totalPage: 10,
  },
})

onMounted(async () => {
  dashInfo.value = await txSvc.getDashboard()
  const res = await noticeSvc.listNotice({ size: 5 })
  noticeList.value = res.list
  productPage.value = await productSvc.listProduct()
})

function logout() {
  window.alert('로그아웃 되었습니다.')
  authStore.invalidate()
  router.replace('/login')
}

async function updatePwd() {
  if (userInput.value.newPwd !== userInput.value.confirmPwd) {
    window.alert('새로운 비밀번호를 다시 확인해주세요')
    return
  }
  await userSvc.updatePwd({
    oldPwd: userInput.value.oldPwd,
    newPwd: userInput.value.newPwd,
  })
  window.alert('비밀번호가 변경되었습니다.')
  isModalOpen.value = false
}
</script>
<style scoped>
.logo-home {
  width: 180px;
}

.dashboard {
  background-color: theme('colors.gray.100');
}

.product-list {
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  i {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 1rem;
  background-color: white;
  border-radius: theme('borderRadius.lg');
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    p {
      font-size: 0.875rem;
      color: #666;
    }
  }

  li:not(:last-child) {
    border-right: 2px solid theme('colors.gray.100');
  }
}

.notice-list {
  .notice-item {
    padding: 1rem;
    background-color: white;
    cursor: pointer;

    .notice-item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .notice-item-content {
      color: #666;
      font-size: 0.875rem;
    }
  }

  .notice-item:not(:last-child) {
    border-bottom: 2px solid theme('colors.gray.100');
  }

  .notice-item:hover {
    background-color: theme('colors.gray.100');
  }
}
</style>
