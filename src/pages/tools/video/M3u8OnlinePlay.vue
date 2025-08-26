<template>
  <div class="space-y-4">
    <div class="flex items-center">
      <div class="text-xl font-semibold bg-gradient-to-r from-blue-500 via-sky-400 to-teal-400 bg-clip-text text-transparent">m3u8 在线播放</div>
      <div class="ml-3 text-xs text-gray-500">支持 HLS 直播流，解析地址后点击播放即可</div>
    </div>
    <div class="flex items-center gap-2">
      <n-input v-model:value="inputUrl" placeholder="输入 m3u8 地址" class="flex-1" />
      <n-button type="primary" @click="applyUrl">播放</n-button>
      <n-button @click="openInNew">新标签</n-button>
    </div>

    <div class="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
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
      />
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { NInput, NButton } from 'naive-ui'

const defaultSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
const search = new URLSearchParams(window.location.search)
const initialSrc = search.get('src') || defaultSrc

const inputUrl = ref<string>(initialSrc)
const source = ref<string>(initialSrc)
const volume = ref<number>(0.6)
const playbackRates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0]
const controlBar = {
  volumePanel: { inline: false },
  pictureInPictureToggle: true,
  remainingTimeDisplay: true,
  playbackRateMenuButton: true,
}

const playerRef = ref<any>()
function onMounted(payload: any) {
  playerRef.value = payload.player
}

function applyUrl() {
  source.value = inputUrl.value.trim() || defaultSrc
}

function openInNew() {
  const url = new URL(window.location.href)
  url.searchParams.set('tool', 'm3u8')
  url.searchParams.set('src', inputUrl.value.trim() || defaultSrc)
  window.open(url.toString(), '_blank')
}
</script>

<style scoped>

</style>