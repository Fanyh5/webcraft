<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { NLayout, NLayoutHeader, NLayoutSider, NLayoutContent, NMenu, NInput, NButton } from 'naive-ui'

type NavKey = 'widgets' | 'games' | 'trending'

const activeTopKey = ref<NavKey>('widgets')
const activeSideKey = ref<string>('widgets-home')

// Responsive state management
const isMobileMenuOpen = ref(false)
const isSidebarCollapsed = ref(false)
const screenWidth = ref(0)

// Computed properties for responsive behavior
const isMobile = computed(() => screenWidth.value < 768)
const isTablet = computed(() => screenWidth.value >= 768 && screenWidth.value < 1024)

// Update screen width
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
  // Auto-close mobile menu when switching to desktop
  if (!isMobile.value) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  updateScreenWidth()
  window.addEventListener('resize', updateScreenWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
})

const topMenuOptions = [
  { label: '小工具', key: 'widgets' , disabled: false},
  { label: '小游戏', key: 'games' , disabled: true},
  { label: '今日热点', key: 'trending', disabled: true },
] as const

const sideMenuOptions = computed(() => {
  if (activeTopKey.value === 'widgets') {
    return [
      { label: '常用工具', key: 'widgets-home' },
      { label: '图片工具', key: 'widgets-image' },
      { label: '视频工具', key: 'widgets-video' },
      { label: '文本工具', key: 'widgets-text' },
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
  // Close mobile menu after selection
  if (isMobile.value) {
    isMobileMenuOpen.value = false
  }
}

function handleSideSelect(key: string | number) {
  activeSideKey.value = String(key)
  // Close mobile menu after selection
  if (isMobile.value) {
    isMobileMenuOpen.value = false
  }
}

// Mobile navigation functions
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

</script>

<template>
  <n-layout class="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- Enhanced Responsive Header -->
    <n-layout-header class="relative z-50 sm:px-4 md:px-12 lg:px-18">
      <div class="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-white/20 shadow-lg"></div>
      <div class="relative flex items-center h-14 sm:h-16 px-3 sm:px-4 lg:px-6 gap-2 sm:gap-4">

        <!-- Mobile Hamburger Menu -->
        <n-button
          v-if="isMobile"
          quaternary
          circle
          size="medium"
          @click="toggleMobileMenu"
          class="hamburger-btn"
        >
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </template>
        </n-button>

        <!-- Logo Section -->
        <div class="flex items-center gap-2 sm:gap-3 select-none">
          <div class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl shadow-lg">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div class="hidden sm:block">
            <div class="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              WebCraft
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 -mt-1">工具集合</div>
          </div>
        </div>

        <!-- Desktop Navigation Menu -->
        <div class="hidden md:flex flex-1 items-center ml-4">
          <n-menu
            mode="horizontal"
            :value="activeTopKey"
            :options="topMenuOptions as any"
            @update:value="handleTopSelect"
            class="nav-menu"
          />
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-2 sm:gap-3 ml-auto">
          <!-- Desktop Search Bar -->
          <div class="hidden xl:block">
            <div class="relative">
              <n-input
                placeholder="搜索工具和游戏..."
                size="medium"
                class="w-64 xl:w-80 search-input"
              >
                <template #prefix>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </template>
              </n-input>
            </div>
          </div>

        </div>
      </div>
    </n-layout-header>

    <!-- Mobile Navigation Overlay -->
    <div
      v-if="isMobile && isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      @click="closeMobileMenu"
    ></div>

    <!-- Mobile Navigation Panel -->
    <div
      v-if="isMobile"
      :class="[
        'fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-r border-white/20 shadow-2xl z-50 transition-transform duration-300 ease-out',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Mobile Menu Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200/30 dark:border-gray-700/30">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <div class="text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              WebCraft
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">工具集合</div>
          </div>
        </div>
        <n-button quaternary circle size="small" @click="closeMobileMenu">
          <template #icon>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </template>
        </n-button>
      </div>

      <!-- Mobile Top Navigation -->
      <div class="p-4 border-b border-gray-200/30 dark:border-gray-700/30">
        <div class="space-y-2">
          <button
            v-for="option in topMenuOptions"
            :key="option.key"
            @click="handleTopSelect(option.key)"
            :disabled="option.disabled"
            :class="[
              'w-full text-left px-4 py-3 rounded-xl transition-all duration-200',
              activeTopKey === option.key
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300',
              option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            ]"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Mobile Side Navigation -->
      <div class="flex-1 overflow-auto p-4">
        <n-menu
          :value="activeSideKey"
          :options="sideMenuOptions as any"
          @update:value="handleSideSelect"
          accordion
          class="mobile-menu"
        />
      </div>
    </div>

    <n-layout has-sider>
      <!-- Enhanced Responsive Sidebar -->
      <n-layout-sider
        v-if="!isMobile"
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="isTablet ? 240 : 280"
        :collapsed="isTablet && isSidebarCollapsed"
        class="sidebar-enhanced"
      >
        <div class="h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-r border-white/20 shadow-lg">

          <!-- Sidebar Content -->
          <div class="overflow-auto h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] p-3 lg:p-4">
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

      <!-- Enhanced Responsive Main Content -->
      <n-layout-content class="main-content">
        <div class="h-full p-4 sm:p-6 lg:p-8 overflow-auto">
          <div class="max-w-7xl mx-auto">
            <template v-if="activeSideKey === 'widgets-video'">
              <div class="space-y-4 sm:space-y-6">
                <!-- Section Header -->
                <div class="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">视频工具</h1>
                    <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">专业的视频处理和播放工具集合</p>
                  </div>
                </div>

                <!-- Tool Cards Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div class="tool-card group" @click="$router.push('/tools/video/m3u8-player')">
                    <div class="tool-card-icon bg-gradient-to-r from-blue-500 to-indigo-600">
                      <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                </div>
              </div>
            </template>
            <template v-else-if="activeSideKey === 'widgets-image'">
              <div class="space-y-4 sm:space-y-6">
                <!-- Section Header -->
                <div class="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">图片工具</h1>
                    <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">强大的图片处理和编辑工具</p>
                  </div>
                </div>

                <!-- Tool Cards Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div class="tool-card group" @click="$router.push('/tools/image/compressor')">
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
                </div>
              </div>
            </template>

            <template v-else-if="activeSideKey === 'widgets-text'">
              <div class="space-y-4 sm:space-y-6">
                <!-- Section Header -->
                <div class="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">文本处理</h1>
                    <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">高效的文本编辑和处理工具</p>
                  </div>
                </div>

                <!-- Tool Cards Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                </div>
              </div>
            </template>

            <template v-else-if="activeSideKey === 'widgets-home'">
              <div class="space-y-4 sm:space-y-6">
                <!-- Section Header -->
                <div class="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h1 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">常用工具</h1>
                    <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">日常工作中最实用的工具集合</p>
                  </div>
                </div>

                <!-- Tool Cards Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div class="tool-card group" @click="$router.push('/tools/common/qr-generator')">
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

                  <div class="tool-card group" @click="$router.push('/tools/common/scientific-calculator')">
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
              <div class="flex flex-col items-center justify-center h-64 sm:h-96 text-center px-4">
                <div class="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <svg class="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 class="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">选择工具分类</h3>
                <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md">
                  {{ isMobile ? '点击左上角菜单按钮选择分类' : '请从左侧导航菜单选择一个分类开始使用工具' }}
                </p>
              </div>
            </template>
          </div>
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
/* 主内容区域 */
.main-content {
  background: transparent;
}

/* 移动端汉堡菜单按钮 */
.hamburger-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hamburger-btn:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: scale(1.05);
}

/* 移动端菜单样式 */
:deep(.mobile-menu .n-menu-item) {
  border-radius: 12px;
  margin: 4px 0;
  padding: 12px 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 44px; /* 触摸友好的最小高度 */
}

:deep(.mobile-menu .n-menu-item:hover) {
  background: rgba(59, 130, 246, 0.08);
  transform: translateX(4px);
}

:deep(.mobile-menu .n-menu-item--selected) {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
}

:deep(.mobile-menu .n-menu-item-group-title) {
  font-weight: 600;
  color: #6b7280;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 16px 0 8px 0;
  padding: 0 16px;
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

/* 响应式工具卡片样式 */
.tool-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 120px; /* 确保触摸友好的最小高度 */
}

.tool-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* 移动端优化 */
@media (max-width: 767px) {
  .tool-card {
    padding: 1rem;
    min-height: 140px;
  }

  .tool-card:hover {
    transform: translateY(-2px); /* 移动端减少悬停效果 */
  }
}

/* 平板端优化 */
@media (min-width: 768px) and (max-width: 1023px) {
  .tool-card {
    padding: 1.25rem;
  }
}

/* 桌面端优化 */
@media (min-width: 1024px) {
  .tool-card {
    padding: 1.5rem;
  }
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
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-bottom: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 响应式图标尺寸 */
@media (min-width: 640px) {
  .tool-card-icon {
    width: 3.5rem;
    height: 3.5rem;
    margin-bottom: 1rem;
  }
}

.group:hover .tool-card-icon {
  transform: scale(1.1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* 移动端减少悬停效果 */
@media (max-width: 767px) {
  .group:hover .tool-card-icon {
    transform: scale(1.05);
  }
}

.tool-card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .tool-card-content {
    gap: 0.75rem;
  }
}

.tool-card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  line-height: 1.4;
}

@media (min-width: 640px) {
  .tool-card-title {
    font-size: 1.125rem;
  }
}

.group:hover .tool-card-title {
  color: #2563eb;
}

.tool-card-description {
  font-size: 0.8rem;
  color: #4b5563;
  line-height: 1.5;
}

@media (min-width: 640px) {
  .tool-card-description {
    font-size: 0.875rem;
    line-height: 1.625;
  }
}

.tool-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.75rem;
}

@media (min-width: 640px) {
  .tool-card-tags {
    gap: 0.5rem;
    margin-top: 1rem;
  }
}

.tool-tag {
  padding: 0.25rem 0.625rem;
  background: linear-gradient(to right, #eff6ff, #e0e7ff);
  color: #2563eb;
  font-size: 0.7rem;
  font-weight: 500;
  border-radius: 9999px;
  border: 1px solid #bfdbfe;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

@media (min-width: 640px) {
  .tool-tag {
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
  }
}

.group:hover .tool-tag {
  background: linear-gradient(to right, #dbeafe, #c7d2fe);
  border-color: #93c5fd;
}

/* 深色模式样式 */
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

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .tool-card:hover {
    transform: none;
  }

  .group:hover .tool-card-icon {
    transform: none;
  }

  .tool-card:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .tool-card {
    border: 2px solid #000;
  }

  .tool-tag {
    border: 2px solid currentColor;
  }
}

/* 进入动画效果 */
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

/* 减少动画在移动设备上的使用 */
@media (prefers-reduced-motion: reduce) {
  .tool-card {
    animation: none;
  }

  .tool-card:hover,
  .group:hover .tool-card-icon {
    transform: none;
  }
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