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
  <n-layout class="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- Enhanced Header -->
    <n-layout-header class="relative">
      <div class="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-white/20 shadow-lg"></div>
      <div class="relative flex items-center h-16 px-6 gap-6">
        <!-- Logo Section -->
        <div class="flex items-center gap-3 select-none">
          <div class="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <div class="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              WebCraft
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 -mt-1">工具集合</div>
          </div>
        </div>

        <!-- Navigation Menu -->
        <div class="flex-1 flex items-center">
          <n-menu
            mode="horizontal"
            :value="activeTopKey"
            :options="topMenuOptions as any"
            @update:value="handleTopSelect"
            class="nav-menu"
          />
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-4">
          <!-- Search Bar -->
          <div class="hidden lg:block">
            <div class="relative">
              <n-input
                placeholder="搜索工具和游戏..."
                size="medium"
                class="w-80 search-input"
              >
                <template #prefix>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </template>
              </n-input>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3">
            <!-- Mobile Search -->
            <n-button quaternary circle size="medium" class="lg:hidden">
              <template #icon>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </template>
            </n-button>

            <!-- Notifications -->
            <div class="relative">
              <n-badge dot type="success">
                <n-button quaternary circle size="medium" class="notification-btn">
                  <template #icon>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12c.944.944.944 2.475 0 3.419L8.5 14.04a1 1 0 01-.707.293H5v-2.793a1 1 0 01.293-.707l4.69-4.69c.944-.944 2.475-.944 3.419 0z" />
                    </svg>
                  </template>
                </n-button>
              </n-badge>
            </div>

            <!-- User Avatar -->
            <div class="flex items-center gap-2">
              <n-avatar
                size="medium"
                class="avatar-enhanced"
                style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
              >
                W
              </n-avatar>
            </div>
          </div>
        </div>
      </div>
    </n-layout-header>

    <n-layout has-sider>
      <!-- Enhanced Sidebar -->
      <n-layout-sider
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="280"
        class="sidebar-enhanced"
      >
        <div class="h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-r border-white/20 shadow-lg">
          <!-- Sidebar Header -->
          <div class="h-16 flex items-center px-6 border-b border-gray-200/30 dark:border-gray-700/30">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <div>
                <div class="text-sm font-semibold text-gray-800 dark:text-gray-200">导航菜单</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">选择分类</div>
              </div>
            </div>
          </div>

          <!-- Sidebar Content -->
          <div class="overflow-auto h-[calc(100vh-64px)] p-4">
            <n-menu
              :value="activeSideKey"
              :options="sideMenuOptions as any"
              @update:value="handleSideSelect"
              accordion
              class="sidebar-menu"
            />
          </div>
        </div>
      </n-layout-sider>

      <!-- Enhanced Main Content -->
      <n-layout-content class="main-content">
        <div class="h-full p-8 overflow-auto">
          <div class="max-w-7xl mx-auto">
            <template v-if="activeSideKey === 'widgets-video'">
              <div class="space-y-6">
                <!-- Section Header -->
                <div class="flex items-center gap-4 mb-8">
                  <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200">视频工具</h1>
                    <p class="text-gray-600 dark:text-gray-400">专业的视频处理和播放工具集合</p>
                  </div>
                </div>

                <!-- Tool Cards Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div class="tool-card group" @click="$router.push('/tools/video/m3u8-player')">
                    <div class="tool-card-icon bg-gradient-to-r from-blue-500 to-indigo-600">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10V7a3 3 0 01-3 3H6a3 3 0 01-3-3V4a3 3 0 013-3h12a3 3 0 013 3z" />
                      </svg>
                    </div>
                    <div class="tool-card-content">
                      <h3 class="tool-card-title">M3U8 在线播放器</h3>
                      <p class="tool-card-description">支持 HLS 直播流和点播，高质量视频播放体验</p>
                      <div class="tool-card-tags">
                        <span class="tool-tag">HLS</span>
                        <span class="tool-tag">直播</span>
                        <span class="tool-tag">点播</span>
                      </div>
                    </div>
                  </div>

                  <div class="tool-card group">
                    <div class="tool-card-icon bg-gradient-to-r from-green-500 to-emerald-600">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <div class="tool-card-content">
                      <h3 class="tool-card-title">视频格式转换</h3>
                      <p class="tool-card-description">支持多种视频格式之间的高质量转换</p>
                      <div class="tool-card-tags">
                        <span class="tool-tag">转换</span>
                        <span class="tool-tag">多格式</span>
                      </div>
                    </div>
                  </div>

                  <div class="tool-card group">
                    <div class="tool-card-icon bg-gradient-to-r from-orange-500 to-red-500">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                    <div class="tool-card-content">
                      <h3 class="tool-card-title">视频压缩</h3>
                      <p class="tool-card-description">智能压缩算法，在保持质量的同时减小文件体积</p>
                      <div class="tool-card-tags">
                        <span class="tool-tag">压缩</span>
                        <span class="tool-tag">优化</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="activeSideKey === 'widgets-image'">
              <div class="space-y-6">
                <!-- Section Header -->
                <div class="flex items-center gap-4 mb-8">
                  <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200">图片工具</h1>
                    <p class="text-gray-600 dark:text-gray-400">强大的图片处理和编辑工具</p>
                  </div>
                </div>

                <!-- Tool Cards Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div class="tool-card group">
                    <div class="tool-card-icon bg-gradient-to-r from-cyan-500 to-blue-500">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                    <div class="tool-card-content">
                      <h3 class="tool-card-title">图片压缩</h3>
                      <p class="tool-card-description">智能无损压缩，大幅减小图片文件大小</p>
                      <div class="tool-card-tags">
                        <span class="tool-tag">无损</span>
                        <span class="tool-tag">压缩</span>
                      </div>
                    </div>
                  </div>

                  <div class="tool-card group">
                    <div class="tool-card-icon bg-gradient-to-r from-emerald-500 to-teal-500">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <div class="tool-card-content">
                      <h3 class="tool-card-title">格式转换</h3>
                      <p class="tool-card-description">支持 JPG、PNG、WebP 等多种格式互转</p>
                      <div class="tool-card-tags">
                        <span class="tool-tag">多格式</span>
                        <span class="tool-tag">转换</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-else-if="activeSideKey === 'widgets-text'">
              <div class="space-y-6">
                <!-- Section Header -->
                <div class="flex items-center gap-4 mb-8">
                  <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200">文本处理</h1>
                    <p class="text-gray-600 dark:text-gray-400">高效的文本编辑和处理工具</p>
                  </div>
                </div>

                <!-- Tool Cards Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div class="tool-card group">
                    <div class="tool-card-icon bg-gradient-to-r from-violet-500 to-purple-500">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </div>
                    <div class="tool-card-content">
                      <h3 class="tool-card-title">文本对比</h3>
                      <p class="tool-card-description">智能比较两段文本的差异，高亮显示变化</p>
                      <div class="tool-card-tags">
                        <span class="tool-tag">对比</span>
                        <span class="tool-tag">差异</span>
                      </div>
                    </div>
                  </div>

                  <div class="tool-card group">
                    <div class="tool-card-icon bg-gradient-to-r from-amber-500 to-orange-500">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div class="tool-card-content">
                      <h3 class="tool-card-title">JSON 格式化</h3>
                      <p class="tool-card-description">美化和验证 JSON 数据，支持语法高亮</p>
                      <div class="tool-card-tags">
                        <span class="tool-tag">JSON</span>
                        <span class="tool-tag">格式化</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-else-if="activeSideKey === 'widgets-home'">
              <div class="space-y-6">
                <!-- Section Header -->
                <div class="flex items-center gap-4 mb-8">
                  <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200">常用工具</h1>
                    <p class="text-gray-600 dark:text-gray-400">日常工作中最实用的工具集合</p>
                  </div>
                </div>

                <!-- Tool Cards Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div class="tool-card group">
                    <div class="tool-card-icon bg-gradient-to-r from-slate-500 to-gray-600">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4" />
                      </svg>
                    </div>
                    <div class="tool-card-content">
                      <h3 class="tool-card-title">二维码生成</h3>
                      <p class="tool-card-description">快速生成自定义二维码，支持多种格式</p>
                      <div class="tool-card-tags">
                        <span class="tool-tag">二维码</span>
                        <span class="tool-tag">生成</span>
                      </div>
                    </div>
                  </div>

                  <div class="tool-card group">
                    <div class="tool-card-icon bg-gradient-to-r from-blue-500 to-cyan-500">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div class="tool-card-content">
                      <h3 class="tool-card-title">科学计算器</h3>
                      <p class="tool-card-description">功能强大的科学计算器，支持复杂运算</p>
                      <div class="tool-card-tags">
                        <span class="tool-tag">计算</span>
                        <span class="tool-tag">科学</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="flex flex-col items-center justify-center h-96 text-center">
                <div class="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mb-6">
                  <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">选择工具分类</h3>
                <p class="text-gray-500 dark:text-gray-400">请从左侧导航菜单选择一个分类开始使用工具</p>
              </div>
            </template>
          </div>
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
/* 现代化导航布局样式 */

/* 主内容区域 */
.main-content {
  background: transparent;
}

/* 导航菜单增强 */
:deep(.nav-menu .n-menu-item) {
  border-radius: 12px;
  margin: 0 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.nav-menu .n-menu-item:hover) {
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

:deep(.nav-menu .n-menu-item--selected) {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

/* 搜索输入框增强 */
:deep(.search-input .n-input__input-el) {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  transition: all 0.3s ease;
}

:deep(.search-input .n-input--focus .n-input__input-el) {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(34, 197, 94, 0.5);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

/* 侧边栏菜单增强 */
:deep(.sidebar-menu .n-menu-item) {
  border-radius: 10px;
  margin: 2px 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.sidebar-menu .n-menu-item:hover) {
  background: rgba(59, 130, 246, 0.08);
  transform: translateX(4px);
}

:deep(.sidebar-menu .n-menu-item--selected) {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
}

:deep(.sidebar-menu .n-menu-item-group-title) {
  font-weight: 600;
  color: #6b7280;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 16px 0 8px 0;
}

/* 通知按钮增强 */
:deep(.notification-btn) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.notification-btn:hover) {
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

/* 头像增强 */
:deep(.avatar-enhanced) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

:deep(.avatar-enhanced:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);
}

/* 工具卡片样式 */
.tool-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tool-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

@media (prefers-color-scheme: dark) {
  .tool-card {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(148, 163, 184, 0.2);
  }
}

.tool-card:hover {
  border-color: rgba(34, 197, 94, 0.3);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(34, 197, 94, 0.1);
}

.tool-card-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .tool-card-icon {
  transform: scale(1.1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.tool-card-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tool-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .tool-card-title {
  color: #2563eb;
}

.tool-card-description {
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.625;
}

.tool-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tool-tag {
  padding: 0.25rem 0.75rem;
  background: linear-gradient(to right, #eff6ff, #e0e7ff);
  color: #2563eb;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  border: 1px solid #bfdbfe;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .tool-tag {
  background: linear-gradient(to right, #dbeafe, #c7d2fe);
  border-color: #93c5fd;
}

@media (prefers-color-scheme: dark) {
  .tool-card-title {
    color: #e5e7eb;
  }

  .group:hover .tool-card-title {
    color: #60a5fa;
  }

  .tool-card-description {
    color: #d1d5db;
  }

  .tool-tag {
    background: linear-gradient(to right, #374151, #4b5563);
    color: #60a5fa;
    border-color: #4b5563;
  }

  .group:hover .tool-tag {
    background: linear-gradient(to right, #4b5563, #6b7280);
    border-color: #6b7280;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  :deep(.nav-menu) {
    display: none;
  }

  .tool-card {
    padding: 1rem;
  }

  .tool-card-icon {
    width: 3rem;
    height: 3rem;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tool-card {
  animation: fadeInUp 0.6s ease-out;
}

.tool-card:nth-child(2) {
  animation-delay: 0.1s;
}

.tool-card:nth-child(3) {
  animation-delay: 0.2s;
}

.tool-card:nth-child(4) {
  animation-delay: 0.3s;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(34, 197, 94, 0.6);
  border-radius: 4px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 197, 94, 0.8);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
}
</style>