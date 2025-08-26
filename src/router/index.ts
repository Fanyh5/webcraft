import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: []
  },
  {
    path: '/tools/video/m3u8-player',
    name: 'M3u8Player',
    component: () => import('../pages/tools/video/M3u8OnlinePlay.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router