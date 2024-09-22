import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/components/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/rootbeer/:id', component: () => import('@/components/RootBeerDetails.vue') },
    { path: '/add-rootbeer', component: () => import('@/components/AddRootBeer.vue') },
    { path: '/search', component: () => import('@/components/SearchRootBeer.vue') },
  ]
})

export default router
