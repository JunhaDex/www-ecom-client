import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: redirectIfLogin,
    },
    {
      path: '/',
      redirect: { name: 'home' },
      beforeEnter: requireAuth,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: 'item',
          children: [
            {
              path: ':id',
              name: 'product-detail',
              component: () => import('@/pages/item/Detail.vue'),
              props: true,
            },
            {
              path: 'checkout',
              children: [
                {
                  path: '',
                  name: 'checkout',
                  component: () => import('@/pages/item/checkout/Index.vue'),
                },
                {
                  path: 'process',
                  name: 'checkout-process',
                  component: () => import('@/pages/item/checkout/Process.vue'),
                },
                {
                  path: 'success',
                  name: 'checkout-success',
                  component: () => import('@/pages/item/checkout/Success.vue'),
                },
                {
                  path: 'error',
                  name: 'checkout-error',
                  component: () => import('@/pages/item/checkout/Error.vue'),
                },
              ],
            },
          ],
        },
        {
          path: 'order',
          redirect: { name: 'order' },
          children: [
            {
              path: '',
              name: 'order',
              component: () => import('@/pages/order/Index.vue'),
            },
            {
              path: ':id',
              name: 'order-detail',
              component: () => import('@/pages/order/Detail.vue'),
              props: true,
            },
          ],
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('@/pages/cart/Index.vue'),
        },
        {
          path: 'notice',
          redirect: { name: 'notice' },
          children: [
            {
              path: '',
              name: 'notice',
              component: () => import('@/pages/notice/Index.vue'),
            },
            {
              path: ':id',
              name: 'notice-detail',
              component: () => import('@/pages/notice/Detail.vue'),
              props: true,
            },
          ],
        },
      ],
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/pages/Error.vue'),
    },
    {
      path: '/404',
      name: 'notfound',
      component: () => import('@/pages/NotFound.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'notfound' },
    },
  ],
})

function redirectIfLogin(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const auth = useAuthStore()
  if (auth.isAuthenticated()) {
    next({ name: 'home' })
  } else {
    next()
  }
}

function requireAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const auth = useAuthStore()
  if (auth.isAuthenticated()) {
    next()
  } else {
    if (from.path === '/') {
      next({ name: 'login' })
    } else {
      next({ name: 'login', query: { redirect: to.fullPath } })
    }
  }
}

router.onError((error) => {
  console.error(error)
  router.push({ name: 'error' })
})
export default router
