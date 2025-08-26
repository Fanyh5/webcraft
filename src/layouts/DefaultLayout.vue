<script setup lang="ts">
import { computed, ref } from 'vue'
import { NLayout, NLayoutHeader, NLayoutSider, NLayoutContent, NMenu, NInput, NButton, NBadge, NAvatar } from 'naive-ui'

type NavKey = 'widgets' | 'games' | 'trending'

const activeTopKey = ref<NavKey>('widgets')
const activeSideKey = ref<string>('widgets-home')

const topMenuOptions = [
  { label: '小工具', key: 'widgets' },
  { label: '小游戏', key: 'games' },
  { label: '今日热点', key: 'trending', disabled: true },
] as const

const sideMenuOptions = computed(() => {
  if (activeTopKey.value === 'widgets') {
    return [
      { type: 'group', label: '精选', key: 'grp-w1', children: [
        { label: '常用工具', key: 'widgets-home' },
        { label: '图片工具', key: 'widgets-image' },
        { label: '视频工具', key: 'widgets-video' },
      ]},
      { type: 'group', label: '处理', key: 'grp-w2', children: [
        { label: '文本处理', key: 'widgets-text' },
        { label: '开发者', key: 'widgets-dev' },
      ]},
    ] as any
  }
  if (activeTopKey.value === 'games') {
    return [
      { type: 'group', label: '发现', key: 'grp-g1', children: [
        { label: '热门推荐', key: 'games-home' },
        { label: '休闲益智', key: 'games-casual' },
      ]},
      { type: 'group', label: '分类', key: 'grp-g2', children: [
        { label: '闯关挑战', key: 'games-action' },
        { label: '棋类对弈', key: 'games-board' },
      ]},
    ] as any
  }
  // trending（占位，未来扩展）
  return [
    { label: '今日热点', key: 'trending-home', disabled: true },
  ]
})

function handleTopSelect(key: string | number) {
  activeTopKey.value = key as NavKey
  // 切换一级导航时，重置对应侧栏的默认项
  const first = sideMenuOptions.value[0]
  if (first) activeSideKey.value = String(first.key)
}

function handleSideSelect(key: string | number) {
  activeSideKey.value = String(key)
}
</script>

<template>
  <n-layout class="h-screen">
    <n-layout-header bordered class="px-4 shadow-sm">
      <div class="flex items-center h-14 gap-4">
        <div class="mr-2 select-none">
          <div class="text-xl font-bold bg-gradient-to-r from-blue-500 via-sky-400 to-teal-400 bg-clip-text text-transparent">
            WebCraft
          </div>
        </div>
        <n-menu
          mode="horizontal"
          :value="activeTopKey"
          :options="topMenuOptions as any"
          @update:value="handleTopSelect"
        />
        <div class="ml-auto flex items-center gap-3">
          <div class="hidden md:block w-72">
            <n-input round placeholder="搜索工具 / 游戏" size="small" />
          </div>
          <n-badge dot>
            <n-button quaternary size="small">通知</n-button>
          </n-badge>
          <n-avatar size="small">W</n-avatar>
        </div>
      </div>
    </n-layout-header>

    <n-layout has-sider>
      <n-layout-sider bordered show-trigger collapse-mode="width" :collapsed-width="56" :width="220">
        <div class="h-14 flex items-center px-3 border-b border-gray-200/40 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm">
          <span class="text-sm text-gray-500">子导航</span>
        </div>
        <div class="overflow-auto h-[calc(100vh-56px-56px)] pb-3">
          <n-menu
            :value="activeSideKey"
            :options="sideMenuOptions as any"
            @update:value="handleSideSelect"
            accordion
          />
        </div>
      </n-layout-sider>

      <n-layout-content content-style="padding:16px;background:var(--n-color);">
        <div class="max-w-[1200px] mx-auto">
          <template v-if="activeSideKey === 'widgets-video'">
            <div>
              <div class="mb-3 text-sm text-gray-500">视频工具</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div class="rounded-lg border hover:shadow-sm transition p-4 cursor-pointer" @click="$router.push('/tools/video/m3u8-player')">
                  <div class="font-medium">m3u8 在线播放器</div>
                  <div class="mt-1 text-xs text-gray-500">支持 HLS/直播流播放</div>
                </div>
                <div class="rounded-lg border hover:shadow-sm transition p-4 cursor-pointer">
                  <div class="font-medium">视频格式转换</div>
                  <div class="mt-1 text-xs text-gray-500">常用视频格式互转</div>
                </div>
                <div class="rounded-lg border hover:shadow-sm transition p-4 cursor-pointer">
                  <div class="font-medium">视频压缩</div>
                  <div class="mt-1 text-xs text-gray-500">减小视频文件体积</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else-if="activeSideKey === 'widgets-image'">
            <div>
              <div class="mb-3 text-sm text-gray-500">图片工具</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div class="rounded-lg border hover:shadow-sm transition p-4 cursor-pointer">
                  <div class="font-medium">图片压缩</div>
                  <div class="mt-1 text-xs text-gray-500">无损压缩图片</div>
                </div>
                <div class="rounded-lg border hover:shadow-sm transition p-4 cursor-pointer">
                  <div class="font-medium">图片格式转换</div>
                  <div class="mt-1 text-xs text-gray-500">支持多种格式互转</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else-if="activeSideKey === 'widgets-text'">
            <div>
              <div class="mb-3 text-sm text-gray-500">文本处理</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div class="rounded-lg border hover:shadow-sm transition p-4 cursor-pointer">
                  <div class="font-medium">文本对比</div>
                  <div class="mt-1 text-xs text-gray-500">比较文本差异</div>
                </div>
                <div class="rounded-lg border hover:shadow-sm transition p-4 cursor-pointer">
                  <div class="font-medium">JSON格式化</div>
                  <div class="mt-1 text-xs text-gray-500">美化JSON数据</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else-if="activeSideKey === 'widgets-home'">
            <div>
              <div class="mb-3 text-sm text-gray-500">常用工具</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div class="rounded-lg border hover:shadow-sm transition p-4 cursor-pointer">
                  <div class="font-medium">二维码生成</div>
                  <div class="mt-1 text-xs text-gray-500">生成自定义二维码</div>
                </div>
                <div class="rounded-lg border hover:shadow-sm transition p-4 cursor-pointer">
                  <div class="font-medium">计算器</div>
                  <div class="mt-1 text-xs text-gray-500">科学计算器</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="text-gray-500">请选择左侧分类开始使用。</div>
          </template>
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
/* 仅做极简容器样式，占位供后续扩展 */
</style>