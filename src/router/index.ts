import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: []
  },
    // 关于我们
    {
    path: '/about',
    name: 'AboutUs',
    component: () => import('../pages/about/AboutUs.vue')
  },
    {
    path: '/tools/common/scientific-calculator',
    name: 'ScientificCalculator',
    component: () => import('../pages/tools/common/ScientificCalculator.vue')
  },
    {
    path: '/tools/common/qr-generator',
    name: 'QRGenerator',
    component: () => import('../pages/tools/common/QRGenerator.vue')
  },
  {
    path: '/tools/video/m3u8-player',
    name: 'M3u8Player',
    component: () => import('../pages/tools/video/M3u8OnlinePlay.vue')
  },
  {
    path: '/tools/image/compressor',
    name: 'ImageCompressor',
    component: () => import('../pages/tools/image/ImageCompressor.vue')
  },
  {
    path: '/tools/text/comparison',
    name: 'TextComparison',
    component: () => import('../pages/tools/text/TextComparison.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router