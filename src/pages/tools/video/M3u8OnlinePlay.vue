<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-center justify-center mb-4">
          <div class="flex items-center gap-3 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10V7a3 3 0 01-3 3H6a3 3 0 01-3-3V4a3 3 0 013-3h12a3 3 0 013 3z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                M3U8 在线播放器
              </h1>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                支持 HLS 直播流和点播，高质量视频播放体验
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls Section -->
      <div class="mb-8">
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                视频地址
              </label>
              <n-input
                v-model:value="inputUrl"
                placeholder="请输入 M3U8 视频地址..."
                size="large"
                class="w-full"
                :class="{ 'animate-pulse': isLoading }"
              >
                <template #prefix>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </template>
              </n-input>
            </div>
            <div class="flex gap-3 sm:items-end">
              <n-button
                type="primary"
                size="large"
                @click="applyUrl"
                :loading="isLoading"
                class="px-8 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <template #icon>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10V7a3 3 0 01-3 3H6a3 3 0 01-3-3V4a3 3 0 013-3h12a3 3 0 013 3z" />
                  </svg>
                </template>
                {{ isLoading ? '加载中...' : '播放视频' }}
              </n-button>
              <n-button
                size="large"
                @click="openInNew"
                class="shadow-md hover:shadow-lg transition-all duration-200"
              >
                <template #icon>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </template>
                新标签页
              </n-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Video Player Section -->
      <div class="relative">
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <!-- Player Header -->
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300">视频播放器</span>
              </div>
              <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>HLS 支持</span>
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- Video Container -->
          <div class="relative bg-black">
            <video-player
              class="video-player vjs-big-play-centered"
              :src="source"
              crossorigin="anonymous"
              playsinline
              controls
              :volume="volume"
              :height="540"
              :fluid="true"
              :aspect-ratio="'16:9'"
              :playback-rates="playbackRates"
              :control-bar="controlBar"
              @mounted="onMounted"
              @error="onError"
              @loadstart="onLoadStart"
              @loadeddata="onLoadedData"
            />

            <!-- Loading Overlay -->
            <div v-if="isLoading" class="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
              <div class="text-center text-white">
                <div class="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p class="text-lg font-medium">正在加载视频...</p>
                <p class="text-sm opacity-75 mt-1">请稍候</p>
              </div>
            </div>

            <!-- Error Overlay -->
            <div v-if="hasError" class="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
              <div class="text-center text-white max-w-md px-6">
                <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="text-xl font-semibold mb-2">播放失败</h3>
                <p class="text-gray-300 mb-4">{{ errorMessage }}</p>
                <n-button type="primary" @click="retryLoad" size="large">
                  重试播放
                </n-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content Section -->
      <div class="mt-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">关于 M3U8 和 HLS 技术</h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">了解视频流媒体技术的工作原理</p>
            </div>
          </div>
        </div>

        <div class="p-6">
          <n-tabs type="line" animated>
            <n-tab-pane name="overview" tab="技术概述">
              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">什么是 M3U8？</h3>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                      M3U8 是一种播放列表文件格式，用于 HLS（HTTP Live Streaming）视频流传输。它包含了视频片段的索引信息，
                      告诉播放器如何按顺序播放这些片段，从而实现流畅的视频播放体验。
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">HLS 技术优势</h3>
                    <ul class="text-gray-600 dark:text-gray-300 space-y-2">
                      <li class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>自适应码率：根据网络状况自动调整视频质量</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>跨平台兼容：支持所有主流浏览器和设备</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>低延迟：优化的流传输协议确保快速加载</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </n-tab-pane>

            <n-tab-pane name="how-it-works" tab="工作原理">
              <div class="space-y-6">
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    HLS 流媒体工作流程
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="text-center">
                      <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span class="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">视频分割</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-300">将完整视频分割成小片段（通常 2-10 秒）</p>
                    </div>
                    <div class="text-center">
                      <div class="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span class="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">生成索引</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-300">创建 M3U8 播放列表文件，记录片段信息</p>
                    </div>
                    <div class="text-center">
                      <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span class="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">流式播放</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-300">播放器按顺序下载并播放视频片段</p>
                    </div>
                  </div>
                </div>

                <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    自适应码率原理
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    HLS 技术的核心优势之一是自适应码率流（ABR），它能够根据用户的网络状况和设备性能自动调整视频质量：
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex items-start gap-3">
                      <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-800 dark:text-gray-200">网络监测</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300">实时监测网络带宽和延迟</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3">
                      <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-800 dark:text-gray-200">质量切换</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300">无缝切换到最适合的视频质量</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </n-tab-pane>

            <n-tab-pane name="use-cases" tab="应用场景">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">直播流媒体</h3>
                  </div>
                  <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• 在线直播平台</li>
                    <li>• 体育赛事直播</li>
                    <li>• 新闻直播</li>
                    <li>• 游戏直播</li>
                  </ul>
                </div>

                <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">点播服务</h3>
                  </div>
                  <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• 在线视频平台</li>
                    <li>• 教育培训视频</li>
                    <li>• 企业内部培训</li>
                    <li>• 视频会议回放</li>
                  </ul>
                </div>

                <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center shadow-md">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">移动应用</h3>
                  </div>
                  <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• 移动视频应用</li>
                    <li>• 社交媒体平台</li>
                    <li>• 短视频平台</li>
                    <li>• 音乐流媒体</li>
                  </ul>
                </div>

                <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">智能电视</h3>
                  </div>
                  <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• OTT 平台</li>
                    <li>• 智能电视应用</li>
                    <li>• 机顶盒服务</li>
                    <li>• IPTV 系统</li>
                  </ul>
                </div>
              </div>
            </n-tab-pane>
          </n-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { NInput, NButton, NTabs, NTabPane, useMessage } from 'naive-ui'

const message = useMessage()

const defaultSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
const search = new URLSearchParams(window.location.search)
const initialSrc = search.get('src') || defaultSrc

// Reactive state
const inputUrl = ref<string>(initialSrc)
const source = ref<string>(initialSrc)
const volume = ref<number>(0.6)
const isLoading = ref<boolean>(false)
const hasError = ref<boolean>(false)
const errorMessage = ref<string>('')

// Video.js configuration
const playbackRates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0]
const controlBar = {
  volumePanel: { inline: false },
  pictureInPictureToggle: true,
  remainingTimeDisplay: true,
  playbackRateMenuButton: true,
  fullscreenToggle: true,
}

const playerRef = ref<any>()

// Event handlers
function onMounted(payload: any) {
  playerRef.value = payload.player
  console.log('Video player mounted successfully')
}

function onLoadStart() {
  isLoading.value = true
  hasError.value = false
  errorMessage.value = ''
}

function onLoadedData() {
  isLoading.value = false
  hasError.value = false
  message.success('视频加载成功！')
}

function onError(error: any) {
  isLoading.value = false
  hasError.value = true
  errorMessage.value = '无法加载视频，请检查网址是否正确或网络连接是否正常'
  console.error('Video player error:', error)
  message.error('视频加载失败')
}

async function applyUrl() {
  const url = inputUrl.value.trim()
  if (!url) {
    message.warning('请输入有效的视频地址')
    return
  }

  // Basic URL validation
  if (!url.startsWith('http') && !url.startsWith('//')) {
    message.error('请输入有效的 HTTP/HTTPS 地址')
    return
  }

  isLoading.value = true
  hasError.value = false

  try {
    // Wait a bit for UI feedback
    await nextTick()
    source.value = url
    message.info('正在加载视频...')
  } catch (error) {
    console.error('Error applying URL:', error)
    onError(error)
  }
}

function retryLoad() {
  hasError.value = false
  applyUrl()
}

function openInNew() {
  const url = new URL(window.location.href)
  url.searchParams.set('tool', 'm3u8')
  url.searchParams.set('src', inputUrl.value.trim() || defaultSrc)
  window.open(url.toString(), '_blank')
  message.success('已在新标签页中打开')
}
</script>

<style scoped>
/* 自定义动画 */
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

.container > * {
  animation: fadeInUp 0.6s ease-out;
}

.container > *:nth-child(2) {
  animation-delay: 0.1s;
}

.container > *:nth-child(3) {
  animation-delay: 0.2s;
}

/* 视频播放器样式 */
.video-player {
  border-radius: 0;
  overflow: hidden;
}

/* 按钮悬停效果 */
:deep(.n-button) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.n-button:hover) {
  transform: translateY(-1px);
}

:deep(.n-button--primary) {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border: none;
}

:deep(.n-button--primary:hover) {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
}

/* 输入框样式增强 */
:deep(.n-input) {
  transition: all 0.3s ease;
}

:deep(.n-input:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:deep(.n-input--focus) {
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(34, 197, 94, 0.6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 197, 94, 0.8);
}
</style>